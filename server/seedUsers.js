require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
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
    console.log('🔐 Password hashed:', hash);

    // Insert directly
    await users.insertMany([
      {
        name: 'Test Student',
        email: 'student@elitex.com',
        password: hash,
        role: 'student',
        createdAt: new Date()
      },
      {
        name: 'Admin User',
        email: 'admin@elitex.com', 
        password: hash,
        role: 'admin',
        createdAt: new Date()
      },
      {
        name: 'Test Company',
        email: 'company@elitex.com',
        password: hash,
        role: 'company',
        createdAt: new Date()
      }
    ]);

    console.log('✅ student@elitex.com created');
    console.log('✅ admin@elitex.com created');
    console.log('✅ company@elitex.com created');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SEED SUCCESS!');
    console.log('Login: student@elitex.com');
    console.log('Password: Elite@123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
