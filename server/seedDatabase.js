require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Internship, Application, VisitorLog } = require('./models');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Internship.deleteMany({}),
      Application.deleteMany({}),
      VisitorLog.deleteMany({})
    ]);
    console.log('🗑️ Cleared all collections');

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash('Elite@123', salt);

    // Create Users
    const users = await User.insertMany([
      {
        name: 'Test Student',
        email: 'student@elitex.com',
        password: hash,
        role: 'student',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        education: [
          { school: 'Pune University', degree: 'B.Tech Computer Science', year: 2024, cgpa: 8.5 }
        ],
        experience: [
          { company: 'Tech Startup', role: 'Web Developer Intern', duration: '3 months' }
        ],
        readinessScore: 85,
        resumeUrl: 'https://example.com/resume.pdf'
      },
      {
        name: 'Admin User',
        email: 'admin@elitex.com',
        password: hash,
        role: 'admin'
      },
      {
        name: 'Tech Company Pvt Ltd',
        email: 'company@elitex.com',
        password: hash,
        role: 'company',
        companyDescription: 'Leading technology company specializing in web and mobile development',
        website: 'https://techcompany.com',
        industry: 'Information Technology',
        verified: true
      },
      {
        name: 'Another Student',
        email: 'student2@elitex.com',
        password: hash,
        role: 'student',
        skills: ['Python', 'Django', 'Machine Learning', 'Data Science'],
        education: [
          { school: 'Mumbai University', degree: 'M.Sc Computer Science', year: 2023, cgpa: 9.0 }
        ],
        readinessScore: 78
      }
    ]);

    console.log('✅ Users created:', users.length);

    // Create Internships
    const internships = await Internship.insertMany([
      {
        title: 'Frontend Developer Intern',
        companyId: users[2]._id, // Company user
        companyName: 'Tech Company Pvt Ltd',
        location: 'Pune',
        stipend: 15000,
        duration: '3-6m',
        skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
        requirements: 'Strong knowledge of frontend technologies. Experience with React is required.',
        type: 'internship',
        status: 'active',
        applicantsCount: 0
      },
      {
        title: 'Full Stack Developer Intern',
        companyId: users[2]._id,
        companyName: 'Tech Company Pvt Ltd',
        location: 'Remote',
        stipend: 20000,
        duration: '6m',
        skillsRequired: ['JavaScript', 'Node.js', 'MongoDB', 'React', 'Express'],
        requirements: 'Experience with MERN stack. Strong problem-solving skills.',
        type: 'internship',
        status: 'active',
        applicantsCount: 0
      },
      {
        title: 'Machine Learning Intern',
        companyId: users[2]._id,
        companyName: 'Tech Company Pvt Ltd',
        location: 'Bangalore',
        stipend: 25000,
        duration: '3-6m',
        skillsRequired: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
        requirements: 'Strong foundation in ML algorithms. Experience with TensorFlow/PyTorch.',
        type: 'internship',
        status: 'active',
        applicantsCount: 0
      }
    ]);

    console.log('✅ Internships created:', internships.length);

    // Create Applications
    const applications = await Application.insertMany([
      {
        internshipId: internships[0]._id,
        studentId: users[0]._id,
        status: 'Applied',
        aiMatchScore: 92,
        appliedAt: new Date()
      },
      {
        internshipId: internships[1]._id,
        studentId: users[0]._id,
        status: 'Reviewing',
        aiMatchScore: 88,
        appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        internshipId: internships[2]._id,
        studentId: users[3]._id,
        status: 'Interview',
        aiMatchScore: 95,
        appliedAt: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 days ago
      }
    ]);

    console.log('✅ Applications created:', applications.length);

    // Update internship applicant counts
    await Promise.all([
      Internship.findByIdAndUpdate(internships[0]._id, { applicantsCount: 1 }),
      Internship.findByIdAndUpdate(internships[1]._id, { applicantsCount: 1 }),
      Internship.findByIdAndUpdate(internships[2]._id, { applicantsCount: 1 })
    ]);

    // Create sample Visitor Logs
    const visitorLogs = await VisitorLog.insertMany([
      {
        sessionId: 'session_1',
        action: 'Page Visit',
        page: '/home',
        location: 'Pune',
        ip: '192.168.1.1',
        device: 'Chrome/Windows',
        referrer: 'google.com',
        timeOnPage: '2:30',
        utmSource: 'google'
      },
      {
        sessionId: 'session_2',
        action: 'Page Visit',
        page: '/internships',
        location: 'Mumbai',
        ip: '192.168.1.2',
        device: 'Safari/Mac',
        timeOnPage: '5:15'
      },
      {
        sessionId: 'session_1',
        action: 'Button Click',
        page: '/internships',
        location: 'Pune',
        ip: '192.168.1.1',
        device: 'Chrome/Windows'
      }
    ]);

    console.log('✅ Visitor logs created:', visitorLogs.length);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 DATABASE SEEDING SUCCESS!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Database Summary:');
    console.log(`   👥 Users: ${users.length}`);
    console.log(`   💼 Internships: ${internships.length}`);
    console.log(`   📄 Applications: ${applications.length}`);
    console.log(`   📈 Visitor Logs: ${visitorLogs.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Login Credentials:');
    console.log('   Student: student@elitex.com');
    console.log('   Admin: admin@elitex.com');
    console.log('   Company: company@elitex.com');
    console.log('   Password: Elite@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
