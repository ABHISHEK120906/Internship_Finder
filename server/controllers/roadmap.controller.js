const Anthropic = require('@anthropic-ai/sdk');
const LearningProgress = require('../models/learningProgress.model');
const EarnedCertificate = require('../models/earnedCertificate.model');

// Initialize anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, 
});

// Claude Features
exports.generatePersonalRoadmap = async (req, res) => {
  try {
    const { goal, currentLevel } = req.body;
    if (!goal) return res.status(400).json({ error: 'Goal is required' });

    const prompt = `As an expert career counselor, generate a highly personalized, week-by-week learning roadmap for a student whose goal is to become a "${goal}" and their current experience level is "${currentLevel || 'Beginner'}". Keep it clear, concise, actionable, and formatted in Markdown. Include recommended projects, topics to study, and expected timelines.`;

    const message = await anthropic.messages.create({
      max_tokens: 1500,
      system: "You are an expert career counselor providing precise, actionable step-by-step career roadmaps.",
      messages: [{ role: 'user', content: prompt }],
      model: 'claude-3-haiku-20240307',
    });

    res.json({ result: message.content[0].text });
  } catch (error) {
    console.error('Claude error:', error);
    res.status(500).json({ error: 'Failed to generate personalized roadmap' });
  }
};

exports.explainTechnology = async (req, res) => {
  try {
    const { technology } = req.body;
    
    const prompt = `Explain why a student should learn "${technology}". Focus on real world use cases, which companies hire for this, average salary range, learning timeline, and if it is worth learning in 2024. Use simple, engaging language suitable for a student. Format as Markdown.`;

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      system: "You are an experienced industry mentor explaining technologies to students in a clear, engaging way.",
      messages: [{ role: 'user', content: prompt }],
      model: 'claude-3-haiku-20240307',
    });

    res.json({ result: message.content[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to explain technology' });
  }
};

exports.solveDoubt = async (req, res) => {
  try {
    const { question, context } = req.body;
    
    const prompt = `A student studying ${context} is stuck and has this question: "${question}". Explain the answer clearly with examples and code snippets if applicable. Be encouraging, concise, and act like a personal 24/7 teacher. Format in Markdown.`;

    const message = await anthropic.messages.create({
      max_tokens: 1500,
      system: "You are an empathetic, highly skilled programming tutor.",
      messages: [{ role: 'user', content: prompt }],
      model: 'claude-3-haiku-20240307',
    });

    res.json({ result: message.content[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to answer question' });
  }
};

exports.planCertificatePath = async (req, res) => {
  try {
    const { dreamCompany, targetRole } = req.body;
    
    const prompt = `A student wants to get placed in "${dreamCompany}" as a "${targetRole}". Provide an exact certificate and simulation plan. List which certificates they should get first, which Forage job simulations to complete, the exact order, and an estimated timeline (e.g. Job ready in 6 months). Keep it structured in Markdown.`;

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      system: "You are an elite career strategist helping students reach top tech companies.",
      messages: [{ role: 'user', content: prompt }],
      model: 'claude-3-haiku-20240307',
    });

    res.json({ result: message.content[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to plan path' });
  }
};

// Progress Tracking
exports.getProgress = async (req, res) => {
  try {
    // Assuming auth middleware sets req.user
    const userId = req.user?.id || req.body.userId; // fallback for testing without auth
    const { fieldId } = req.params;
    
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    let progress = await LearningProgress.findOne({ user: userId, fieldId });
    if (!progress) {
       progress = new LearningProgress({ user: userId, fieldId });
       await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { fieldId } = req.params;
    const updateData = req.body;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    updateData.lastActive = Date.now();
    
    const progress = await LearningProgress.findOneAndUpdate(
      { user: userId, fieldId },
      { $set: updateData },
      { new: true, upsert: true }
    );
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

// Certificates
exports.addCertificate = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const newCert = new EarnedCertificate({
       ...req.body,
       user: userId
    });
    
    await newCert.save();
    res.status(201).json(newCert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add certificate' });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
    const certs = await EarnedCertificate.find({ user: userId }).sort({ issueDate: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get certificates' });
  }
};
