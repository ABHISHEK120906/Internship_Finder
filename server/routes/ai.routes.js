const express = require('express');
const router = express.Router();
const ClaudeService = require('../services/claude.service');

// Career AI Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    // Format messages for Claude
    const claudeMessages = messages.map(m => ({ role: m.role, content: m.content }));
    const system = "You are a career expert. Help the user with job search, resume building, and placement prep. Keep it professional/encouraging.";
    const reply = await ClaudeService.chat(claudeMessages, system);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resume Analysis endpoint
router.post('/analyze-resume', async (req, res) => {
  try {
    const { text } = req.body;
    let analysis = await ClaudeService.analyzeResume(text);
    // Parse the JSON string from Claude if needed
    try {
      analysis = JSON.parse(analysis);
    } catch (e) {
      // If Claude didn't return pure JSON, return as is or handle it
    }
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
