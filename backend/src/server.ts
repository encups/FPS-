// Frame Fables Backend Server
// Medieval-themed AI Marketing Platform

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger';
import clientRoutes from './routes/clients';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ===== MIDDLEWARE =====

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// ===== ROUTES =====

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Frame Fables Backend',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/clients', clientRoutes);

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🏰 Welcome to Frame Fables Backend API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health',
    endpoints: {
      onboard: 'POST /api/clients/onboard',
      generateContent: 'POST /api/clients/:id/generate-content',
      runAudit: 'POST /api/clients/:id/run-audit',
      scheduleContent: 'POST /api/clients/:id/schedule-content',
      getAnalytics: 'GET /api/clients/:id/analytics',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
  });
});

// Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
  });
});

// ===== SERVER STARTUP =====

const server = app.listen(PORT, () => {
  logger.info(`🏰 Frame Fables Backend is running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`API Base URL: http://localhost:${PORT}`);

  // Log agent system status
  logger.info('🎭 Multi-Agent System: ACTIVE');
  logger.info('Agents: DungeonMaster, SocialScribe, AuditAlchemist, SchedulerBard, InsightOracle, BrandKnight, RoyalArchivist, AutoWirer');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
