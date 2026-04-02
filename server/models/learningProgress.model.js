const mongoose = require('mongoose');

const learningProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fieldId: {
    type: String,
    required: true,
    description: 'ID of the career field (e.g. python-dev)'
  },
  completedSteps: [{
    type: String
  }],
  completedCourses: [{
    type: String
  }],
  completedSimulations: [{
    type: String
  }],
  streak: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  hoursTracked: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// To retrieve a unique progress per user per field
learningProgressSchema.index({ user: 1, fieldId: 1 }, { unique: true });

module.exports = mongoose.model('LearningProgress', learningProgressSchema);
