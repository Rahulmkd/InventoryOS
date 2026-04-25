import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/client";
import { env } from "../../config/env";
import { RegisterInput, LoginInput } from "./auth.types";
import { AppError } from "../../utils/app.error";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";

/**
 * REGISTER USER
 */
export const registerUser = async (data: RegisterInput) => {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

/**
 * LOGIN USER (Access + Refresh Token)
 */
export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Store refresh token in DB

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      ),
    },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * REFRESH ACCESS TOKEN (ROTATION)
 */

export const refreshAccessToken = async (token: string) => {
  if (!token) {
    throw new AppError("Refresh token required", 401);
  }

  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  // Check token in DB
  const existingToken = await prisma.refreshToken.findUnique({
    where: { token },
  });
  if (!existingToken) {
    throw new AppError("Refresh token not found", 401);
  }

  // DELETE old token (rotation)
  await prisma.refreshToken.delete({
    where: { token },
  });

  const payload = {
    userId: decoded.userId,
    role: decoded.role,
  };

  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);

  // Save new refresh token
  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * LOGOUT (Single Device)
 */
export const logoutUser = async (refreshToken: string) => {
  if (!refreshToken) return;

  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken },
  });

  return { message: "Logged out successfully" };
};

/**
 * LOGOUT ALL DEVICES
 */
export const logoutAllSessions = async (userId: string) => {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });

  return { message: "Logged out from all devices" };
};
