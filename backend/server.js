import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { setSocketIO } from './services/notificationService.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();
const server = http.createServer(app);
const origins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(x => x.trim().replace(/\/$/, '')).filter(Boolean);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || origins.includes(origin.replace(/\/$/, ''))) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
};
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));

const io = new Server(server, { cors: corsOptions });
setSocketIO(io);
io.on('connection', socket => socket.on('join', userId => { if (userId) socket.join(String(userId)); }));

app.get('/', (_req, res) => res.json({ service: 'InterviewIQ API', status: 'running', health: '/api/health' }));
app.get('/api/health', (_req, res) => res.json({ success: true, status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', timestamp: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;
try {
  await connectDB();
  server.listen(port, '0.0.0.0', () => console.log(`[InterviewIQ] Listening on ${port}`));
} catch (error) {
  console.error('[Startup failed]', error.message);
  process.exit(1);
}

async function shutdown(signal) {
  console.log(`${signal}: shutting down`);
  io.close();
  server.close(async () => { await mongoose.disconnect(); process.exit(0); });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
