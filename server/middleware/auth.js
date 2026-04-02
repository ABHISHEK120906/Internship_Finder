const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Server error during authentication'
      });
    }
  }
};

// Role-based access control middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - insufficient permissions'
      });
    }

    next();
  };
};

// Optional: Check if user is admin
const isAdmin = authorizeRoles('admin');

// Optional: Check if user is student
const isStudent = authorizeRoles('student');

// Optional: Check if user is company
const isCompany = authorizeRoles('company');

// Optional: Check if user is student or admin
const isStudentOrAdmin = authorizeRoles('student', 'admin');

// Optional: Check if user is company or admin
const isCompanyOrAdmin = authorizeRoles('company', 'admin');

module.exports = {
  authenticateToken,
  authorizeRoles,
  isAdmin,
  isStudent,
  isCompany,
  isStudentOrAdmin,
  isCompanyOrAdmin
};
