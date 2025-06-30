import { GoogleGenAI } from "@google/genai";
import { Persona, ProductInput, StrategyRecommendation } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not configured in environment variables.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


const personaGenerationPrompt = (productInput: ProductInput): string => `
Your output MUST be a valid JSON array of three persona objects. Do not include any surrounding text, explanations, or markdown formatting like \`\`\`json.

**JSON Structure for each persona object:**
{
  "name": "string",
  "age": "number",
  "occupation": "string",
  "location": "string (City, Country)",
  "bio": "string (2-3 sentences)",
  "demographics": {
    "gender": "string",
    "education": "string",
    "familyStatus": "string",
    "income": "string (e.g., '$50,000 - $70,000')"
  },
  "psychographics": {
    "personality": ["string", "string", "string"],
    "values": ["string", "string", "string"],
    "interests": ["string", "string", "string"],
    "lifestyle": "string"
  },
  "goals": ["string", "string", "string"],
  "frustrations": ["string", "string", "string"],
  "behaviors": ["string (e.g., 'Prefers online shopping')", "string"],
  "quote": "string",
  "scenario": "A short story of how this persona might interact with the product.",
  "jobToBeDone": "What job is this persona 'hiring' the product to do?",
  "successCriteria": "What does success look like for this persona when using the product?",
  "previousExperiences": ["string of previous experiences with similar products"]
}

Based on the following product information, generate the three user personas:

**Product Information:**
- Name: ${productInput.name}
- Category: ${productInput.category}
- Description: ${productInput.description}
- Target Audience: ${productInput.targetAudience}
- Key Features: ${productInput.keyFeatures}
- User Pain Points: ${productInput.painPoints}
`;


async function generatePersonasWithGemini(productInput: ProductInput): Promise<Omit<Persona, 'id' | 'imageUrl' | 'moodBoard' | 'voiceNote'>[]> {
  console.log('Calling Gemini API to generate personas...');

  try {
    const prompt = personaGenerationPrompt(productInput);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
        throw new Error("Gemini API returned no text.");
    }
    
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error('Error calling Gemini API for persona generation:', error);
    if (error instanceof SyntaxError) {
        throw new Error('Failed to parse JSON response from Gemini. The AI might have returned an invalid format.');
    }
    throw new Error(`Gemini API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function generateUnsplashKeywordWithGemini(persona: Omit<Persona, 'id' | 'imageUrl' | 'moodBoard' | 'voiceNote'>): Promise<string> {
  console.log(`Calling Gemini API for Unsplash keyword for ${persona.name}`);
  
  try {
    const prompt = `Based on the following user persona, generate a single, concise, effective search keyword (2-4 words) for a portrait photo on an image API like Unsplash. Only return the keyword itself, without quotes or explanations.

Persona:
- Name: ${persona.name}
- Age: ${persona.age}
- Occupation: ${persona.occupation}
- Bio: ${persona.bio}
- Lifestyle: ${persona.psychographics.lifestyle}
- Interests: ${persona.psychographics.interests.join(', ')}

Keyword:`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    const text = response.text;
    if (!text) {
      return `${persona.age} year old ${persona.demographics.gender} ${persona.occupation}`;
    }
    
    return text.trim().replace(/"/g, '');

  } catch (error) {
    console.error('Error calling Gemini API for keyword:', error);
    // Fallback to a generic keyword if generation fails
    return `${persona.age} year old ${persona.demographics.gender} ${persona.occupation}`;
  }
}

async function generateImageWithUnsplash(keyword: string): Promise<string> {
  console.log(`Calling Unsplash API with keyword: "${keyword}"`);

  if (!UNSPLASH_API_KEY) {
    console.warn('UNSPLASH_API_KEY not configured. Returning placeholder image.');
    return 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300';
  }

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&orientation=portrait`, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_API_KEY}`,
        'Accept-Version': 'v1'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Unsplash API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      console.warn(`No images found on Unsplash for keyword: ${keyword}. Trying a broader search.`);
      const fallbackResponse = await fetch(`https://api.unsplash.com/search/photos?query=person&per_page=1&orientation=portrait`, {
          headers: { 'Authorization': `Client-ID ${UNSPLASH_API_KEY}`, 'Accept-Version': 'v1' }
      });
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.results && fallbackData.results.length > 0) {
        return fallbackData.results[0].urls.regular;
      }
      return 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300';
    }
    
    return data.results[0].urls.regular;

  } catch (error) {
    console.error('Error calling Unsplash API:', error);
    return 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300';
  }
}

const strategyGenerationPrompt = (productInput: ProductInput, personas: Persona[]): string => {
  const personaSummaries = personas.map(p => 
    `- **${p.name} (${p.occupation})**: 
      - Bio: ${p.bio}
      - Goals: ${p.goals.join(', ')}
      - Frustrations: ${p.frustrations.join(', ')}`
  ).join('\n');

  return `
Your output MUST be a valid JSON array of 5 distinct strategy recommendation objects. Do not include any surrounding text, explanations, or markdown formatting like \`\`\`json.

Categories should include 'Onboarding', 'Feature Prioritization', 'UI/UX Design', 'Marketing & Communication', and 'KPIs & Metrics'.

**JSON Structure for each object:**
{
  "category": "string",
  "title": "string",
  "description": "string",
  "actionItems": ["string", "string", "string"],
  "priority": "'High' | 'Medium' | 'Low'"
}

Based on the following product summary and user personas, generate the 5 strategic recommendations.

**Product Summary:**
- Name: ${productInput.name}
- Description: ${productInput.description}
- Key Features: ${productInput.keyFeatures}

**Selected User Personas:**
${personaSummaries}
`;
};

export const generateStrategies = async (productInput: ProductInput, personas: Persona[]): Promise<StrategyRecommendation[]> => {
  console.log('Calling Gemini API to generate strategies...');
  try {
    const prompt = strategyGenerationPrompt(productInput, personas);
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini API returned no text for strategies.");
    }

    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API for strategy generation:', error);
    if (error instanceof SyntaxError) {
        throw new Error('Failed to parse JSON response from Gemini for strategies.');
    }
    throw new Error(`Gemini strategy API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generatePersonas = async (productInput: ProductInput): Promise<Persona[]> => {
    const personaDrafts = await generatePersonasWithGemini(productInput);
  
    const fullPersonas = await Promise.all(
      personaDrafts.map(async (draft, index) => {
        try {
          const keyword = await generateUnsplashKeywordWithGemini(draft);
          const imageUrl = await generateImageWithUnsplash(keyword);
  
          return {
            ...draft,
            id: `persona-${Date.now()}-${index}`,
            imageUrl,
            moodBoard: [], // Placeholder
            voiceNote: '', // Placeholder
          };
        } catch (error) {
          console.error(`Failed to process persona ${index}:`, error);
          return {
            ...draft,
            id: `persona-${Date.now()}-${index}`,
            imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300',
            moodBoard: [],
            voiceNote: '',
          };
        }
      })
    );
  
    return fullPersonas;
  }; 