import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './authRoutes.js';
import cryptoRoutes from './cryptoRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS is required so your frontend can talk to this API
app.use(cors({
  origin: process.env.FRONT_END_URL || 'http://localhost:3000',
  credentials: true
}));

// Database Connection
const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/coinbase-clone';
mongoose.connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/crypto', cryptoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));