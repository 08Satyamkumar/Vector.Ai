import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is missing in server/.env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const configPath = path.join(__dirname, '../src/data/companyConfig.json');
const dbPath = path.join(__dirname, 'vectorDb.json');

async function main() {
  try {
    if (!fs.existsSync(configPath)) {
      console.error(`Config file not found at: ${configPath}`);
      process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const chunks = [];

    // 1. Company Info Chunk
    const c = config.company;
    chunks.push(
      `Vector.Ai Company Profile & Contact Info:\n` +
      `- Name: ${c.name}\n` +
      `- Founder & CEO: ${c.ceo}\n` +
      `- Email: ${c.email}\n` +
      `- Phone Numbers: ${c.phones.join(', ')}\n` +
      `- Address: ${c.address}\n` +
      `- Vibe/Brand: Premium, professional, data-driven, client-focused, "Built on Values".\n` +
      `- Mission: To stop businesses from wasting money on vanity metrics and start focusing on what matters—Revenue.`
    );

    // 2. Team Member Chunks
    if (config.team && Array.isArray(config.team)) {
      config.team.forEach(member => {
        chunks.push(
          `Vector.Ai Team Member details:\n` +
          `- Name: ${member.name}\n` +
          `- Role: ${member.role}\n` +
          `- Description: ${member.description}`
        );
      });
    }

    // 3. Pricing Plan Chunks
    if (config.pricing && Array.isArray(config.pricing)) {
      config.pricing.forEach(plan => {
        const featureList = plan.features
          ? plan.features.map(f => `${f.name} (${f.included ? 'Included' : 'Not Included'})`).join(', ')
          : '';
        chunks.push(
          `Vector.Ai Pricing Package details:\n` +
          `- Plan Name: ${plan.name} Plan\n` +
          `- Price: ${plan.price}/month (Original: ${plan.originalPrice || 'N/A'}, Discount: ${plan.discount || 'N/A'})\n` +
          `- Description: ${plan.description}\n` +
          `- Features: ${featureList}`
        );
      });
    }

    // 4. Service Chunks
    if (config.services && Array.isArray(config.services)) {
      config.services.forEach(service => {
        const keyFeatures = service.features ? service.features.join(', ') : '';
        const detailed = service.detailedFeatures 
          ? service.detailedFeatures.map(df => `${df.title}: ${df.description}`).join('\n') 
          : '';
        const trust = service.trustPoints 
          ? service.trustPoints.map(tp => `${tp.title}: ${tp.description}`).join('\n') 
          : '';

        chunks.push(
          `Vector.Ai Service details:\n` +
          `- Title: ${service.title}\n` +
          `- Category: ${service.category}\n` +
          `- Description: ${service.description}\n` +
          `- Key Offerings: ${keyFeatures}\n` +
          `- Detailed Features:\n${detailed}\n` +
          `- Why Trust Us for this Service:\n${trust}`
        );
      });
    }

    // 5. Recent Projects & Portfolio Chunks
    if (config.projects && Array.isArray(config.projects)) {
      config.projects.forEach(project => {
        chunks.push(
          `Vector.Ai Portfolio / Completed Project details:\n` +
          `- Project Name: ${project.name}\n` +
          `- Category: ${project.category}\n` +
          `- Description: ${project.description}\n` +
          `- Highlights: ${project.highlight || 'N/A'}`
        );
      });
    }

    console.log(`Generating embeddings for ${chunks.length} text chunks...`);

    const vectorDb = [];
    for (let i = 0; i < chunks.length; i++) {
      const text = chunks[i];
      console.log(`Embedding chunk ${i + 1}/${chunks.length}...`);
      
      try {
        const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: text
        });

        if (response) {
          const embeddingObj = response.embedding || (response.embeddings && response.embeddings[0]);
          if (embeddingObj && embeddingObj.values) {
            const vector = embeddingObj.values;
            vectorDb.push({ text, vector });
          } else {
            console.warn(`Warning: Failed to get embedding values for chunk ${i + 1}. Response keys:`, Object.keys(response));
          }
        } else {
          console.warn(`Warning: Empty response for chunk ${i + 1}`);
        }
      } catch (err) {
        console.error(`Error generating embedding for chunk ${i + 1}:`, err);
      }
      
      // Small pause to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    fs.writeFileSync(dbPath, JSON.stringify(vectorDb, null, 2));
    console.log(`Vector database successfully compiled and saved to ${dbPath}`);

  } catch (error) {
    console.error("Error during embedding generation:", error);
    process.exit(1);
  }
}

main();
