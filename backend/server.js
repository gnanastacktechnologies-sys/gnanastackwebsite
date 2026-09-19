import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import technologyRoutes from './routes/technologyRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 17200;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/company', companyRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'GnanaStack Technologies',
    tagline: 'From Village Vision to Digital Innovation',
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server & DB connection
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [GnanaStack Server] Running on http://0.0.0.0:${PORT} (Accessible on Local Network)`);
  });
});
