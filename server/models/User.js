const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: { 
    type: String, 
    enum: ['student', 'admin', 'company'],
    default: 'student'
  },
  profile: {
    skills: [String],
    education: String,
    experience: String,
    resume: String,
    company: String,
    website: String,
    college: String,
    branch: String,
    year: String,
    companyName: String,
    industry: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
