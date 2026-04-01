// Run: node seedUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedUsers = [
  {
    name: 'Test Student',
    email: 'student@elitex.com',
    password: 'Elite@123',
    role: 'student'
  },
  {
    name: 'Admin User', 
    email: 'admin@elitex.com',
    password: 'Elite@123',
    role: 'admin'
  },
  {
    name: 'Test Company',
    email: 'company@elitex.com', 
    password: 'Elite@123',
    role: 'company'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await User.deleteMany({});
    console.log('🗑️ Cleared existing users');
    
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created: ${userData.email}`);
    }
    
    console.log('🎉 Seed completed!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Accounts:');
    console.log('Student: student@elitex.com / ********');
    console.log('Admin:   admin@elitex.com / ********');
    console.log('Company: company@elitex.com / ********');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
};

seed();
