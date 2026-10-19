import {type Request, type Response, type NextFunction, type ErrorRequestHandler} from "express";

// Define a custom error class for operational errors
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Flag to distinguish from programmer errors

    // Restore prototype chain (required when extending built-ins in TS)
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// The global error handler
export const globalErrorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // If headers already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal Server Error";

  // Log the error (in production, use a structured logger like pino)
  console.error(`[Error] ${req.method} ${req.url}`, err);

  res.status(statusCode).json({
    status: "error",
    message,
    // Only expose stack trace in development
    ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
  });
};
