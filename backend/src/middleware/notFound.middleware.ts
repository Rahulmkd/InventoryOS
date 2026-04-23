import { Request, Response, NextFunction } from "express";

/**
 * 404 Not Found Handler
 * This runs when no route matches
 */

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};
