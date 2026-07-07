import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Load local Vector Database for RAG
let vectorDb = [];
const dbPath = path.join(__dirname, 'vectorDb.json');
if (fs.existsSync(dbPath)) {
  try {
    vectorDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    console.log(`Loaded ${vectorDb.length} vector embeddings for RAG.`);
  } catch (err) {
    console.error("Error reading vectorDb.json:", err);
  }
} else {
  console.warn("Warning: vectorDb.json not found. Run 'npm run build:embeddings' to compile it.");
}

// Helper to compute Cosine Similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing in backend .env file.' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Get the last user query to search the Vector DB
    const lastUserMessage = messages[messages.length - 1];
    const userQuery = lastUserMessage ? lastUserMessage.content : "";
    let ragContext = "";

    if (userQuery && vectorDb.length > 0) {
      try {
        // Generate query embedding
        const embedResponse = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: userQuery
        });
        const embeddingObj = embedResponse.embedding || (embedResponse.embeddings && embedResponse.embeddings[0]);
        if (!embeddingObj || !embeddingObj.values) {
          throw new Error("Invalid embedding response structure");
        }
        const queryVector = embeddingObj.values;

        // Rank chunks by similarity
        const scoredChunks = vectorDb.map(chunk => ({
          text: chunk.text,
          score: cosineSimilarity(queryVector, chunk.vector)
        })).sort((a, b) => b.score - a.score);

        // Retrieve top 3 matching contexts
        const topMatches = scoredChunks.slice(0, 3);
        ragContext = topMatches.map(match => match.text).join('\n\n');
      } catch (err) {
        console.error("Error executing vector search:", err);
      }
    }

    let conversationHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Maya'}: ${m.content}`).join('\n');

    const prompt = `
You are Maya, the official AI support agent for Vector.Ai.
Your goal is to help visitors understand Vector.Ai's services, pricing, and company values.
Always be polite, professional, and concise. Do not use overly long paragraphs.

LANGUAGE & TONE RULES:
- Detect the language used by the user.
- If the user speaks in Hinglish (Hindi written in English alphabet, e.g. "kaise ho", "kya packages hain"), you MUST reply in natural, easy-to-understand, and professional Hinglish.
- If the user speaks in Hindi (Devanagari script), reply in Hindi.
- If the user speaks in English, reply in English.
- Always match the user's language preference dynamically while staying professional.

PURPOSE & GUARDRAILS:
- Your absolute priority is to help visitors understand Vector.Ai (services, pricing, CEO Satyam Samrat Singh, and contact).
- If the user asks general questions or unrelated queries (e.g., asking you to write code, tell jokes, solve general problems, etc.), politely decline and steer them back to Vector.Ai. For example: "Bhai, main Vector.Ai ki official support bot hoon. Main aapki in details me help kar sakti hoon: ..."
- If you don't know the answer, politely tell them to book a free consultation call or contact vector.ai09@gmail.com.

Here is the verified company information context relevant to the query:
${ragContext}

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
