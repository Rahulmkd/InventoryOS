type ErrorStatus = "fail" | "error";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: ErrorStatus;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(message: string, statusCode: number = 500, errors?: unknown) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    // Capture clean stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  //  Static helpers (very useful in real apps)

  static badRequest(message = "Bad Request", errors?: unknown) {
    return new AppError(message, 400, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new AppError(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return new AppError(message, 403);
  }

  static notFound(message = "Resource not found") {
    return new AppError(message, 404);
  }

  static conflict(message = "Conflict", errors?: unknown) {
    return new AppError(message, 409, errors);
  }

  static internal(message = "Internal Server Error") {
    return new AppError(message, 500);
  }
}
