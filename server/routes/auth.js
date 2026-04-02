const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '7d' }
  );
};

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { 
      name, email, password, 
      confirmPassword, role,
      college, branch, year,
      companyName, website, 
      industry, accessKey 
    } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Block admin registration publicly
    if (role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin registration not allowed here'
      });
    }

    // Company access key check
    if (role === 'company') {
      if (accessKey !== process.env.COMPANY_ACCESS_KEY) {
        return res.status(403).json({
          success: false,
          message: '❌ Invalid company access key. Contact admin.'
        });
      }
    }

    // Check duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please login.'
      });
    }

    // Hash password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // Add role-specific fields
    if (role === 'student') {
      userData.profile = {
        college: college || '',
        branch: branch || '',
        year: year || '',
        skills: [],
        experience: ''
      };
    }

    if (role === 'company') {
      userData.profile = {
        companyName: companyName || name,
        website: website || '',
        industry: industry || ''
      };
    }

    const user = await User.create(userData);

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: `Welcome to ELITEX AI! 🎉`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Try again.'
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    // Find user — role optional filter
    const query = role ? { email, role } : { email };
    const user = await User.findOne(query);

    // Debug logs (remove in production)
    console.log('Login attempt:', email, role);
    console.log('User found:', user ? 'YES' : 'NO');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please register.'
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password, user.password
    );
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Try again.'
    });
  }
});

// ADMIN SETUP (hidden route)
router.post('/admin/setup', async (req, res) => {
  try {
    const { name, email, password, masterKey } = req.body;

    // Check master key
    if (masterKey !== process.env.ADMIN_MASTER_KEY) {
      return res.status(403).json({
        success: false,
        message: '🚫 Invalid master key'
      });
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ 
      role: 'admin' 
    });
    if (adminExists) {
      return res.status(403).json({
        success: false,
        message: '🚫 Admin already exists. Setup disabled.'
      });
    }

    // Hash password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: '✅ Admin created! Setup now disabled.',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET PROFILE
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful. Please clear token from client.'
  });
});

module.exports = router;
