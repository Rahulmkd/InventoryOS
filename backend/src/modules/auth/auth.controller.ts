import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { registerUserSchema, loginUserSchema } from "./auth.validation";
import { ApiResponse } from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";

/**
 * Cookie Options (Production Safe)
 */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

/**
 * REGISTER
 */

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = registerUserSchema.parse(req.body);

    const user = await authService.registerUser(parsed);

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  },
);

/**
 * LOGIN (Access + Refresh Token)
 */

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = loginUserSchema.parse(req.body);

    const { user, accessToken, refreshToken } =
      await authService.loginUser(parsed);

    // 🍪 Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { user, accessToken }, "Login successful"));
  },
);

/**
 * REFRESH ACCESS TOKEN
 */
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw new AppError("Refresh token not found", 401);
  }

  const { accessToken, refreshToken } =
    await authService.refreshAccessToken(token);

  // 🔄 Rotate refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { accessToken }, "Token refreshed successfully"),
    );
});

/**
 * LOGOUT (Single Device)
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    await authService.logoutUser(token);
  }

  // 🧹 Clear cookie
  res.clearCookie("refreshToken", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

/**
 * LOGOUT ALL DEVICES
 */
export const logoutAll = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401);
    }

    await authService.logoutAllSessions(req.user.id);

    res.clearCookie("refreshToken", cookieOptions);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out from all devices"));
  },
);
