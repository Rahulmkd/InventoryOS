import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = asyncHandler(
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // 1. Check header existence + format
    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Access token missing or invalid"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Token not provided"));
    }

    try {
      // 2. Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET as string);

      // 3. Attach user safely
      req.user = decoded as JwtPayload;

      return next();
    } catch (err) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid or expired token"));
    }
  },
);
