const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const { authenticateToken } = require('../middleware/auth');

// Apply for internship
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can apply for internships'
      });
    }

    const { internshipId, coverLetter, resume } = req.body;

    // Check if internship exists and is active
    const internship = await Internship.findById(internshipId);
    if (!internship || internship.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Internship not available'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      internship: internshipId,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this internship'
      });
    }

    const application = await Application.create({
      internship: internshipId,
      applicant: req.user.id,
      coverLetter,
      resume
    });

    await application.populate([
      { path: 'internship', select: 'title company' },
      { path: 'applicant', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get student's applications
router.get('/my-applications', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can view their applications'
      });
    }

    const applications = await Application.find({ applicant: req.user.id })
      .populate('internship', 'title company location type stipend deadline')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get applications for company's internships
router.get('/company-applications', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can view applications'
      });
    }

    // Get all internships posted by this company
    const internships = await Internship.find({ postedBy: req.user.id }).select('_id');
    const internshipIds = internships.map(i => i._id);

    const applications = await Application.find({
      internship: { $in: internshipIds }
    })
      .populate('internship', 'title company location type')
      .populate('applicant', 'name email profile.college profile.branch profile.year')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get company applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update application status (company only)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Only companies can update application status'
      });
    }

    const { status, notes } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('internship');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if this application belongs to company's internship
    if (application.internship.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    application.status = status;
    application.notes = notes;
    application.reviewedAt = new Date();
    application.reviewedBy = req.user.id;

    await application.save();

    res.json({
      success: true,
      message: 'Application status updated',
      application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
