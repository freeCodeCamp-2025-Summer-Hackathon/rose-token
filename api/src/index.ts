// Load environment variables FIRST
require('dotenv').config();

import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import error handling middleware
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Body parsing middleware
app.use(cookieParser()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security and logging middleware
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true 
}));
app.use(helmet());              
app.use(morgan('combined')); 

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", categoryRoutes);

// Error handling - must be last
app.use(notFoundHandler);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});