import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";
import { TokenPayload, verifyAccessToken } from "../utils/jwt";


/**
 * Extend Express Request
 */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * AUTHENTICATE MIDDLEWARE
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized: Invalid token format", 401);
    }

    /**
     * ✅ Use centralized JWT logic
     */
    let decoded: TokenPayload;

    try {
      decoded = verifyAccessToken(token);
    } catch {
      throw new AppError("Unauthorized: Invalid or expired token", 401);
    }

    /**
     * ⚠️ IMPORTANT: use userId (not id)
     */
    if (!decoded?.userId) {
      throw new AppError("Unauthorized: Invalid token payload", 401);
    }

    /**
     * Optional but recommended:
     * Check if user still exists
     */
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError("Unauthorized: User not found", 401);
    }

    /**
     * Attach user to request
     */
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
