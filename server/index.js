const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import API routes
const apiRoutes = require('./api/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'ELITEX AI Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 ELITEX AI Server Started Successfully!
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
⏰ Time: ${new Date().toLocaleString()}
🔗 Health Check: http://localhost:${PORT}/health
  `);
});

module.exports = app;
