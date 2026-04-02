require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Connected');

    // Get collection directly
    const db = mongoose.connection.db;
    const users = db.collection('users');

    // Clear existing
    await users.deleteMany({});
    console.log('🗑️ Cleared users');

    // Hash passwords manually
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash('Elite@123', salt);
    console.log('🔐 Password hashed');

    // Insert directly with proper profiles
    await users.insertMany([
      {
        name: 'Test Student',
        email: 'student@elitex.com',
        password: hash,
        role: 'student',
        profile: {
          college: 'Indian Institute of Technology',
          branch: 'Computer Science',
          year: '3rd Year',
          skills: ['JavaScript', 'React', 'Node.js'],
          experience: '',
          education: 'B.Tech',
          resume: '',
          company: '',
          website: '',
          companyName: '',
          industry: ''
        },
        createdAt: new Date()
      },
      {
        name: 'Admin User',
        email: 'admin@elitex.com', 
        password: hash,
        role: 'admin',
        profile: {
          skills: [],
          education: '',
          experience: '',
          resume: '',
          company: '',
          website: '',
          college: '',
          branch: '',
          year: '',
          companyName: '',
          industry: ''
        },
        createdAt: new Date()
      },
      {
        name: 'Test Company',
        email: 'company@elitex.com',
        password: hash,
        role: 'company',
        profile: {
          companyName: 'Tech Solutions Inc',
          website: 'https://techsolutions.com',
          industry: 'Technology',
          skills: [],
          education: '',
          experience: '',
          resume: '',
          company: '',
          college: '',
          branch: '',
          year: ''
        },
        createdAt: new Date()
      }
    ]);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SEED SUCCESS!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ student@elitex.com created');
    console.log('✅ admin@elitex.com created');
    console.log('✅ company@elitex.com created');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Login Credentials:');
    console.log('Email: student@elitex.com');
    console.log('Password: Elite@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
