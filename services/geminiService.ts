import { GoogleGenAI } from "@google/genai";

// Vite exposes environment variables on the `import.meta.env` object
// FIX: Switched to process.env.API_KEY to align with @google/genai guidelines, resolving the type error on import.meta.env.
const apiKey = process.env.API_KEY;

if (!apiKey) {
    // FIX: Updated warning message to reflect the new environment variable name.
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

// Initialize the AI client only if the API key is available
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getAIProductInsights = async (productName: string): Promise<string> => {
  if (!ai) {
    return Promise.resolve("AI features are currently unavailable. Please configure an API key.");
  }
  
  try {
    const prompt = `You are a helpful product expert. Provide three key features for the "${productName}".
    Each feature should be a short, compelling point on a new line. Do not use markdown or bullet points, just plain text lines.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching product insights from Gemini API:", error);
    return "Sorry, I couldn't get product insights at the moment. Please try again later.";
  }
};