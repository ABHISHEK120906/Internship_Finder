const mongoose = require('mongoose');

// User Schema (Student, Admin, Company)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'company'], default: 'student' },
  avatar: { type: String },
  // Student specific fields
  skills: [String],
  education: [{ school: String, degree: String, year: Number, cgpa: Number }],
  experience: [{ company: String, role: String, duration: String }],
  readinessScore: { type: Number, default: 0 },
  resumeUrl: { type: String },
  // Company specific fields
  companyDescription: String,
  website: String,
  industry: String,
  verified: { type: Boolean, default: false }
}, { timestamps: true });

// Internship Schema
const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: String,
  location: { type: String, required: true }, // city, remote, hybrid
  stipend: { type: Number, default: 0 },
  duration: String, // 1-3m, 3-6m, 6-12m
  skillsRequired: [String],
  requirements: String,
  type: { type: String, enum: ['internship', 'full-time', 'part-time'], default: 'internship' },
  status: { type: String, enum: ['active', 'closed', 'paused'], default: 'active' },
  applicantsCount: { type: Number, default: 0 }
}, { timestamps: true });

// Application Schema
const applicationSchema = new mongoose.Schema({
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Applied', 'Reviewing', 'Interview', 'Selected', 'Rejected'], default: 'Applied' },
  aiMatchScore: { type: Number, default: 0 },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Visitor Log Schema
const visitorLogSchema = new mongoose.Schema({
  sessionId: String,
  action: String, // Page Visit, Button Click, Form Submit, etc.
  page: String,
  location: String,
  ip: String,
  device: String,
  referrer: String,
  timeOnPage: String,
  utmSource: String,
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Internship: mongoose.model('Internship', internshipSchema),
  Application: mongoose.model('Application', applicationSchema),
  VisitorLog: mongoose.model('VisitorLog', visitorLogSchema)
};
