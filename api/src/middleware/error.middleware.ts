import { Request, Response, NextFunction } from "express";

// Error types for better error handling
export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

// Global error handler middleware
export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  // Default error response
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let code = error.code || "INTERNAL_ERROR";

  // Handle specific error types
  if (error.name === "ValidationError") {
    statusCode = 400;
    code = "VALIDATION_ERROR";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    code = "INVALID_ID";
  } else if (error.message.includes("duplicate key")) {
    statusCode = 409;
    message = "Resource already exists";
    code = "DUPLICATE_RESOURCE";
  } else if (error.message.includes("not found")) {
    statusCode = 404;
    code = "NOT_FOUND";
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: code,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack })
  });
};

// 404 handler for unknown routes
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
    error: "ROUTE_NOT_FOUND"
  });
};

// Request validation helpers
export const validateRequired = (fields: string[], body: any): string[] => {
  const missing: string[] = [];
  
  fields.forEach(field => {
    if (!body[field] || (typeof body[field] === "string" && body[field].trim() === "")) {
      missing.push(field);
    }
  });
  
  return missing;
};

export const validateObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};
