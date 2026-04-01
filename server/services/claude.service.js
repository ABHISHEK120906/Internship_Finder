const { Anthropic } = require('@anthropic-ai/sdk');
require('dotenv').config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

class ClaudeService {
  static async chat(messages, system = "You are a helpful AI assistant for a career placement platform.") {
    try {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is not configured in .env');
      }

      const response = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        system,
        messages,
      });

      return response.content[0].text;
    } catch (error) {
      console.error('❌ Claude API Error:', error.message);
      throw error;
    }
  }

  static async analyzeResume(resumeText) {
    const prompt = `Analyze the following resume and return a JSON object with:
    - score (0-100)
    - skills (array)
    - strengths (array)
    - weaknesses (array)
    - ATSCompatibility (0-100)
    - summary (string)
    
    Resume Text: ${resumeText}`;

    return await this.chat([{ role: 'user', content: prompt }], "You are a professional hiring manager and ATS expert.");
  }
}

module.exports = ClaudeService;
