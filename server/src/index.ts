import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { checkDatabaseConnection } from './middleware/dbCheck';

// Routes
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import paymentRoutes from './routes/payments';
import userRoutes from './routes/users';
import adminRoutes from './routes/admin';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
    },
  },
}));

// Rate limiting (skip health checks and Render pings)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // higher ceiling to avoid false positives
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => {
    // Skip health and static assets
    const ua = String(req.headers['user-agent'] || '');
    const path = req.path || '';
    if (path === '/health' || path === '/api/health') return true;
    // Skip Render health prober
    if (ua.includes('Render/1.0')) return true;
    return false;
  }
});
app.use('/api/', limiter);

// CORS configuration with support for comma-separated origins and wildcard subdomains
const parseAllowedOrigins = (rawOrigins?: string): string[] => {
  if (!rawOrigins) return [];
  return rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
};

const isOriginAllowedByPattern = (requestOrigin: string, pattern: string): boolean => {
  // Exact match when no wildcard is present
  if (!pattern.includes('*')) return requestOrigin === pattern;

  // Support patterns like https://*.vercel.app
  const schemeSeparatorIndex = pattern.indexOf('://');
  if (schemeSeparatorIndex === -1) {
    // If scheme is missing, do a simple wildcard host match
    const normalizedPatternHost = pattern.replace('*.', '');
    try {
      const reqUrl = new URL(requestOrigin);
      return reqUrl.host.endsWith(`.${normalizedPatternHost}`) || reqUrl.host === normalizedPatternHost;
    } catch {
      return false;
    }
  }

  const scheme = pattern.slice(0, schemeSeparatorIndex + 3); // includes ://
  const hostPattern = pattern.slice(schemeSeparatorIndex + 3).replace('*.', '');
  try {
    const reqUrl = new URL(requestOrigin);
    const schemeMatches = `${reqUrl.protocol}//` === scheme;
    const hostMatches = reqUrl.host === hostPattern || reqUrl.host.endsWith(`.${hostPattern}`);
    return schemeMatches && hostMatches;
  } catch {
    return false;
  }
};

const allowedOriginPatterns = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
const fallbackClientOrigin = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., curl, health checks) that have no origin
    if (!origin) return callback(null, true);

    // Check explicit patterns list first
    const allowedByPatterns = allowedOriginPatterns.some((pattern) =>
      isOriginAllowedByPattern(origin, pattern)
    );

    if (allowedByPatterns) return callback(null, true);

    // Fallback to single CLIENT_URL exact match for backward compatibility
    if (origin === fallbackClientOrigin) return callback(null, true);

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection check middleware (applied to all API routes)
app.use('/api', checkDatabaseConnection);

// Health check endpoint (kept public and excluded from rate limits)
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const isHealthy = dbStatus === 'connected';
  
  res.status(isHealthy ? 200 : 503).json({ 
    status: isHealthy ? 'OK' : 'SERVICE_UNAVAILABLE',
    message: isHealthy ? 'DripNest API is running' : 'Database connection issue',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      readyState: mongoose.connection.readyState
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DripNest Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
