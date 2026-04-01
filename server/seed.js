const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const { User } = require('./models');

// Test users data
const testUsers = [
  {
    name: 'Student User',
    email: 'student@elitex.com',
    password: 'Elite@123',
    role: 'student',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    education: [
      {
        school: 'MIT',
        degree: 'Computer Science',
        year: 2024,
        cgpa: 3.8
      }
    ],
    readinessScore: 85
  },
  {
    name: 'Admin User',
    email: 'admin@elitex.com',
    password: 'Elite@123',
    role: 'admin',
    skills: ['System Administration', 'Security'],
    readinessScore: 100
  },
  {
    name: 'Company User',
    email: 'company@elitex.com',
    password: 'Elite@123',
    role: 'company',
    companyDescription: 'Leading technology company specializing in AI and machine learning solutions.',
    website: 'https://company.com',
    industry: 'Technology',
    verified: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb+srv://Database:Ushi2244@database.7mrn6be.mongodb.net/?appName=Database";
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Hash passwords and create users
    const usersWithHashedPasswords = await Promise.all(
      testUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert test users
    await User.insertMany(usersWithHashedPasswords);
    console.log('✅ Created test users:');
    console.log('   📧 student@elitex.com / Elite@123');
    console.log('   📧 admin@elitex.com / Elite@123');
    console.log('   📧 company@elitex.com / Elite@123');

    console.log('\n🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
