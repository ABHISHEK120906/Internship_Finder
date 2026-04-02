const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected!');
  } catch (err) {
    console.error('❌ MongoDB Failed:', err.message);
    setTimeout(connectDB, 5000);
  }
};

// MongoDB connection event listener
mongoose.connection.on('connected', async () => {
  console.log('✅ MongoDB Connected!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📦 Collections will auto-create:');
  console.log('   → users');
  console.log('   → internships');
  console.log('   → applications');
  console.log('   → notifications');
  console.log('   → visitor_logs');
  console.log('   → certifications');
  console.log('   → trainings');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Server ready!');
});

connectDB();

// Routes
const authRoutes = require('../routes/auth');
const roadmapRoutes = require('../routes/roadmap.routes');

app.use('/auth', authRoutes);
app.use('/roadmap', roadmapRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ELITEX AI API' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

module.exports = app;
