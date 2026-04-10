const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const Application = require('../models/Application');
const { authenticateToken } = require('../middleware/auth');

// Get all internships
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type, location } = req.query;
    const filter = { status: 'active' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: 'i' };

    const internships = await Internship.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Internship.countDocuments(filter);

    res.json({
      success: true,
      internships,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get single internship
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('postedBy', 'name email');

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      internship
    });
  } catch (error) {
    console.error('Get internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create internship (company only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can post internships'
      });
    }

    const {
      title,
      location,
      type,
      duration,
      stipend,
      description,
      requirements,
      skills,
      deadline
    } = req.body;

    const internship = await Internship.create({
      title,
      company: req.user.profile.companyName || req.user.name,
      location,
      type,
      duration,
      stipend,
      description,
      requirements,
      skills,
      postedBy: req.user.id,
      deadline
    });

    await internship.populate('postedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Internship posted successfully',
      internship
    });
  } catch (error) {
    console.error('Create internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update internship
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    if (internship.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this internship'
      });
    }

    Object.assign(internship, req.body);
    await internship.save();

    res.json({
      success: true,
      message: 'Internship updated successfully',
      internship
    });
  } catch (error) {
    console.error('Update internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete internship
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    if (internship.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this internship'
      });
    }

    await Application.deleteMany({ internship: req.params.id });
    await Internship.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    console.error('Delete internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
