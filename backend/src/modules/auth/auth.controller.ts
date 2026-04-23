import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { registerUserSchema, loginUserSchema } from "./auth.validation";
import { ApiResponse } from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = registerUserSchema.parse(req.body);

    const user = await authService.registerUser(parsed);

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = loginUserSchema.parse(req.body);

    const result = await authService.loginUser(parsed);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Login successful"));
  },
);
