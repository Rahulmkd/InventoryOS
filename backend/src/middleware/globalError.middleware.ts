import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 🔹 Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors: any = null;

  // 🔹 Development logging (cleaner)
  if (process.env.NODE_ENV === "development") {
    console.error(" ERROR:", err);
  }

  // -----------------------------
  // 🔴 ZOD VALIDATION ERROR
  // -----------------------------
  if (err instanceof ZodError) {
    statusCode = 400;

    errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    message = "Validation failed";
  }

  // -----------------------------
  // 🔴 PRISMA ERRORS (TYPE SAFE)
  // -----------------------------
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Duplicate
    if (err.code === "P2002") {
      statusCode = 409;
      message = `Duplicate value for field: ${
        (err.meta?.target as string[])?.join(", ") || "unknown"
      }`;
    }

    // Not found
    if (err.code === "P2025") {
      statusCode = 404;
      message = "Resource not found";
    }
  }

  // -----------------------------
  // 🔴 UNKNOWN ERROR SAFETY
  // -----------------------------
  if (statusCode === 500 && process.env.NODE_ENV === "production") {
    message = "Something went wrong";
  }

  // -----------------------------
  // ✅ FINAL RESPONSE
  // -----------------------------
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),

    // Optional debug info (only dev)
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
