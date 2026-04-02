const mongoose = require('mongoose');

const earnedCertificateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificateName: {
    type: String,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
  },
  fieldId: {
    type: String, // Associate with specific career path
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  credentialUrl: {
    type: String
  },
  fileUrl: {
    type: String // In case they upload a file
  },
  isSimulation: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('EarnedCertificate', earnedCertificateSchema);
