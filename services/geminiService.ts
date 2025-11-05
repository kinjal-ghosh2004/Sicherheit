
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this example, we'll throw an error if the key is missing.
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIProductInsights = async (productName: string): Promise<string> => {
  if (!process.env.API_KEY) {
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