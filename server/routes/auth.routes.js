const express = require('express');
const router = express.Router();
const { login, register, getProfile } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Login Route
router.post('/login', login);

// Register Route (for testing - can be removed in production)
router.post('/register', register);

// Get Profile Route (protected)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
