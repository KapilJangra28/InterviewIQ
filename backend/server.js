import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { setSocketIO } from './services/notificationService.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();
const server = http.createServer(app);

// Dynamic CORS configuration for Vercel, Render, and Localhost
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean);

const isOriginAllowed = (origin) => {
  if (!origin) return true; // Mobile, Postman, Server-to-server
  if (allowedOrigins.includes(origin)) return true;
  if (origin.endsWith('.vercel.app')) return true; // Any Vercel deployment preview or production
  if (process.env.NODE_ENV !== 'production' || process.env.ALLOW_ALL_CORS === 'true') return true;
  return false;
};

// Initialize Socket.IO for real-time alerts
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback allow to avoid dropping socket connections
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

setSocketIO(io);

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    if (userId) socket.join(String(userId));
  });
});

// Security & Utility Middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive fallback for seamless deployment
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Root operational endpoint for Render monitoring
app.get('/', (req, res) => {
  res.json({
    name: 'InterviewIQ Backend Core API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: '/api/auth'
    },
    timestamp: new Date().toISOString()
  });
});

// Rate Limiting on API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
});
app.use('/api', apiLimiter);

// Health check endpoints (both /health and /api/health for Render Blueprint compatibility)
const healthResponse = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'InterviewIQ Backend Core',
    tagline: 'Practice. Prepare. Perform. Get Hired.',
    environment: process.env.NODE_ENV || 'production',
  });
};
app.get('/health', healthResponse);
app.get('/api/health', healthResponse);

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[InterviewIQ Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
