import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/apiError';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies['access_token'];
  if (!token) return next(new ApiError(401, 'No token provided'));

  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as any;
    req.userId = decoded.id;
    next();
  } catch {
    next(new ApiError(401, 'Session expired, please login again'));
  }
};
