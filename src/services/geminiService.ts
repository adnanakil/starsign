import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChartInterpretation, ZodiacSign } from '../types';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export async function generateAIInterpretation(
  sunSign: ZodiacSign,
  moonSign: ZodiacSign,
  risingSign: ZodiacSign,
  chartData: Partial<ChartInterpretation>
): Promise<string> {
  try {
    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a detailed prompt with all chart information
    const prompt = `You are an expert astrologer providing a personalized birth chart interpretation. Write a detailed, insightful, and empowering interpretation for someone with the following astrological placements:

**Birth Chart Details:**
- Sun Sign: ${sunSign}
- Moon Sign: ${moonSign}
- Rising Sign (Ascendant): ${risingSign}
- Birth Location: ${chartData.birthChartData?.placeOfBirth}

**Planetary Positions:**
${chartData.planetaryPositions?.map(p => `- ${p.planet} in ${p.sign} (${p.degree.toFixed(1)}°) in House ${p.house}`).join('\n')}

**House Cusps:**
${chartData.houses?.map(h => `- House ${h.number}: ${h.sign} (${h.degree.toFixed(1)}°)`).join('\n')}

Please provide a comprehensive interpretation that:
1. Explains the significance of their Sun, Moon, and Rising signs and how they work together
2. Discusses key planetary positions and what they reveal about personality, relationships, career, and life path
3. Is written in second person ("you") and feels personal and insightful
4. Is approximately 300-400 words
5. Maintains a warm, encouraging, and professional tone
6. Focuses on strengths, potential, and self-understanding rather than predictions

Write the interpretation in a flowing paragraph format, not bullet points. Make it feel like a personalized reading from a professional astrologer.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating AI interpretation:', error);

    // Fallback to a basic interpretation if API fails
    return `Your Sun in ${sunSign} reveals your core identity and life purpose, illuminating the path you're meant to walk.

With your Moon in ${moonSign}, your emotional landscape is shaped by unique sensibilities that guide your inner world and relationships. This placement speaks to how you process feelings and what brings you emotional security.

Your ${risingSign} Rising sign is the lens through which you view the world and how others first experience you. It colors your approach to new situations and shapes the persona you present to the world.

The interplay between these three fundamental placements creates a rich and multifaceted personality. Your ${sunSign} Sun provides the driving force of your will and consciousness, while your ${moonSign} Moon governs your emotional responses and deepest needs. Meanwhile, your ${risingSign} Ascendant acts as the bridge between your inner self and outer expression.

Each planetary position in your chart adds additional layers of meaning, creating a unique cosmic blueprint that is entirely your own. This birth chart is a map of potential, showing both your natural strengths and areas for growth and development.`;
  }
}
