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
You are Maya, a warm, friendly, and highly professional assistant representing Vector.Ai.
You MUST output your response in JSON format matching this schema:
{
  "reply": "Conversational text response to the user. Maintain a friendly, supportive, Hinglish/English tone. Use bold text and emojis to make it interesting like ChatGPT.",
  "action": { // Optional, only include if the user requests an action or if you should guide them to a section.
    "type": "NAVIGATE" | "FILL_FORM" | "SUBMIT_FORM",
    "path": "/contact" | "/services" | "/pricing" | "/team" | "/project" | "/blog" | "/services/digital-marketing" | "/services/google-meta-ads" | "/services/search-engine-optimization" | "/services/custom-web-app-development" | "/services/ai-workflow-automation" | "/services/branding-design" | "/services/startup-mentorship" | "/", // For NAVIGATE action
    "data": { // For FILL_FORM action. Populate with details you know from the chat history
      "name": "string",
      "email": "string",
      "phone": "string",
      "service": "Digital Marketing" | "Google & Meta Ads" | "Search Engine Optimization" | "Custom Web & App Development" | "AI & Workflow Automation" | "Branding & Design" | "Startup Mentorship",
      "message": "string"
    }
  }
}

CONVERSATIONAL PERSONALITY RULES:
- NEVER say "I am an AI", "I am a machine", "I don't have feelings", or use any generic robotic disclaimer phrases.
- If someone asks personal questions (e.g., "kaise ho", "kya chal raha hai"), reply warmly and naturally in a friendly conversational tone (e.g., "Main bilkul badhiya hoon! Aap bataiye, aap kaise hain? Business kaisa chal raha hai?").
- Use natural conversational words (like "Bilkul", "Zaroor", "Acha", "Bhai") to make the user feel comfortable and valued.
- Always maintain an enthusiastic, helpful, and supportive attitude as if you are a real team member of Vector.Ai.

SALES & PERSUASION STRATEGY RULES:
- BE A CLEVER SALES REP: Your ultimate goal is to hook the user, build massive curiosity, and secure their contact details (name, email, phone) to make them a customer.
- PROGRESSIVE DISCOVERY: Never dump all services or prices at once. Share interesting hooks to build curiosity. For example, mention: "Humne ek fashion e-commerce brand 'Forever' ki sales 150% boost kari thi, kya aap janna chahte hain humne kaise kiya?" or "Aapke business ke liye hum ek free customized AI marketing plan ready kar sakte hain."
- VALUE-FIRST LEAD CAPTURE: Instead of asking for details directly, offer value. Tell them: "Bhai, aapki brand ke liye hum ek customized digital growth roadmap bilkul free me design kar sakte hain! Main use aapko email/WhatsApp par send kar doon? Bas aap apna Naam, Email, aur Phone number de dijiye!"
- GENTLE URGENCY: Highlight that free consultation call slots with our CEO Satyam Samrat Singh are highly limited and fill up fast. Encourage them to let you fill the contact form to lock in a slot.

ACTION TRIGGER RULES:
- If the user says they want to book a call, fill the contact form, ask where the form is, or express interest in starting a project: Set action type to "NAVIGATE" and path to "/contact".
- If the user provides details like their name, email, phone, or project details, or says "form bharo" or "fill details": Set action type to "FILL_FORM" and populate the data object with all known fields from the conversation history, and set a friendly reply like "Zaroor! Maine contact form me aapki details bhar di hain."
- If the user says "submit karo", "send message", "form submit kar do", or "bhej do": Set action type to "SUBMIT_FORM" and a reply like "Zaroor, main form submit kar rahi hoon...".
- If the user is done with the conversation (e.g., says "thank you", "bye", "okay done", "baat khatam"): Set action type to "NAVIGATE" and path to "/".

LANGUAGE & TONE RULES:
- Detect the language used by the user.
- If the user speaks in Hinglish (Hindi written in English alphabet, e.g. "kaise ho", "kya packages hain"), you MUST reply in natural, easy-to-understand, and professional Hinglish.
- If the user speaks in Hindi (Devanagari script), reply in Hindi.
- If the user speaks in English, reply in English.
- Always match the user's language preference dynamically while staying professional.

PURPOSE & GUARDRAILS:
- Your absolute priority is to help visitors understand Vector.Ai (services, pricing, CEO Satyam Samrat Singh, and contact).
- If the user asks general questions or queries (e.g., asking you to write code, solve general problems, etc.), politely decline and steer them back to Vector.Ai.
- If you don't know the answer, politely tell them to book a free consultation call or contact vector.ai09@gmail.com.

Here is the verified company information context relevant to the query:
${ragContext}

Here is the conversation history:
${conversationHistory}

Maya: `;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let replyData;
    try {
      replyData = JSON.parse(response.text);
    } catch (e) {
      console.warn("Failed to parse response text as JSON, falling back:", response.text);
      replyData = {
        reply: response.text,
        action: null
      };
    }
    // Intercept form submission to write lead data to Google Sheet Webhook
    if (replyData.action && replyData.action.type === 'SUBMIT_FORM') {
      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwk6hv5GTzktgUpu5upRHqwGbL5m89n4meOkoT8-uQKVjahw8lAEU97HDXx8PD_ZAv78A/exec';
      const leadData = replyData.action.data || {};
      if (leadData.name || leadData.email || leadData.phone) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          });
        } catch (err) {
          console.error("Error sending lead to Google Sheet Webhook:", err);
        }
      }
    }

    res.json(replyData);
  } catch (error) {
    console.error('Error generating AI response:', error);
    // Fail-safe fallback response to prevent Chat Widget from showing "Sorry..." error box
    res.json({
      reply: "Aapka message mil gaya hai! Lekin thoda server load hone ki wajah se reply me deri ho sakti hai. Aap aage badhne ke liye humse direct **+91 9217571488** par call ya WhatsApp par contact kar sakte hain! Hum hamesha aapki madad ke liye ready hain. 😊",
      action: null
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Maya AI Backend is running on http://localhost:${PORT}`);
});
