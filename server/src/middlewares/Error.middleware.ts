import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,

      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }

  
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};