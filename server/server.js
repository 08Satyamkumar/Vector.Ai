import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { scallarKnowledgeBase } from './knowledgeBase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
// Make sure to add GEMINI_API_KEY to your .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing in backend .env file.' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Convert the frontend message history to Gemini format if needed,
    // or just pass the conversation context.
    // For simplicity, we can format the entire history into a single prompt for this demo.
    let conversationHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Maya'}: ${m.content}`).join('\n');

    const prompt = `
${scallarKnowledgeBase}

Here is the conversation history:
${conversationHistory}

Maya: `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reply = response.text;

    res.json({ reply });
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ error: 'Failed to generate response. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Maya AI Backend is running on http://localhost:${PORT}`);
});
