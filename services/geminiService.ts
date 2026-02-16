
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, GrowthStrategy } from "../types";

/**
 * Generates a high-level growth strategy using the Gemini 3 Pro model.
 * This function is optimized for complex reasoning using the thinkingConfig.
 */
export const generateGrowthStrategy = async (input: UserInput): Promise<GrowthStrategy> => {
  // Create a new instance right before making the call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a senior growth consultant at Outgrow. Based on the following business details, provide a high-level growth strategy.
  Business Name: ${input.businessName}
  Industry: ${input.industry}
  Main Challenge: ${input.mainChallenge}
  
  The response must be specific to Outgrow's core expertise: Business growth strategy, Marketing & brand development, Social media & digital presence, Content creation & campaign execution, and Business development support.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        // Higher budget for more detailed reasoning and "Vertex-grade" depth
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  action: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ["title", "action", "category"]
              }
            }
          },
          required: ["headline", "summary", "recommendations"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI engine");
    }

    return JSON.parse(response.text.trim()) as GrowthStrategy;
  } catch (error: any) {
    // Specifically handle the "Requested entity was not found" error often seen in Vertex/GCP project context
    if (error?.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_NOT_FOUND");
    }
    throw error;
  }
};
