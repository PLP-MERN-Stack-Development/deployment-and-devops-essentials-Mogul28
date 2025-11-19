const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName] || process.env[varName].includes('your-') || process.env[varName].includes('change-this'));

if (missingVars.length > 0 && process.env.NODE_ENV !== 'test') {
  console.error('❌ Error: Missing or invalid required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\nPlease set these in your .env file or environment variables.');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  } else {
    console.warn('⚠️  WARNING: Running with invalid environment variables. This is not secure for production!');
  }
}

// Validate JWT_SECRET specifically
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Error: JWT_SECRET must be set and at least 32 characters long for production!');
    process.exit(1);
  } else if (process.env.NODE_ENV !== 'test') {
    console.warn('⚠️  WARNING: JWT_SECRET not set or too short. Using default (NOT SECURE FOR PRODUCTION)');
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'default-insecure-secret-change-in-production-min-32-chars';
  }
}

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
// Normalize FRONTEND_URL by removing trailing slash to match browser origin
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const normalizedFrontendUrl = frontendUrl.replace(/\/$/, ''); // Remove trailing slash

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Normalize origin by removing trailing slash
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    // Check if origin matches (with or without trailing slash)
    if (normalizedOrigin === normalizedFrontendUrl) {
      callback(null, true);
    } else {
      // Log for debugging
      console.warn(`CORS: Origin "${origin}" (normalized: "${normalizedOrigin}") does not match "${normalizedFrontendUrl}"`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// MongoDB connection with connection pooling
const connectDB = async () => {
  try {
    // Validate MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Trim whitespace and validate format
    const mongoUri = process.env.MONGODB_URI.trim();
    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
      throw new Error(`Invalid MongoDB URI format. Must start with "mongodb://" or "mongodb+srv://". Got: ${mongoUri.substring(0, 20)}...`);
    }

    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (error.message.includes('MONGODB_URI')) {
      console.error('Please set MONGODB_URI environment variable in your deployment platform.');
    }
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MERN Stack API Server',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start server if not in test environment and not already started
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      mongoose.connection.close();
    });
  });
}

module.exports = app;

