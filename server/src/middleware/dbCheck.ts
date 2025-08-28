import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const checkDatabaseConnection = (req: Request, res: Response, next: NextFunction): void => {
  // Skip database check for health endpoint
  if (req.path === '/api/health') {
    return next();
  }

  // Check if database is connected
  if (mongoose.connection.readyState !== 1) {
    console.error('Database not connected. ReadyState:', mongoose.connection.readyState);
    res.status(503).json({
      success: false,
      error: 'Database service unavailable. Please try again later.',
      timestamp: new Date().toISOString()
    });
    return;
  }

  next();
};
