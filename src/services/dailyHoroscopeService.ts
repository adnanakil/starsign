import { GoogleGenerativeAI } from '@google/generative-ai';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { ChartInterpretation } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const DAILY_HOROSCOPES_COLLECTION = 'dailyHoroscopes';

export interface DailyHoroscope {
  id?: string;
  userId: string;
  chartId: string;
  date: string; // YYYY-MM-DD format
  horoscope: string;
  createdAt: Date;
}

// Generate daily horoscope for a user's birth chart
export async function generateDailyHoroscope(
  userId: string,
  chart: ChartInterpretation
): Promise<string> {
  const today = new Date().toISOString().split('T')[0];

  // Check if we already have a horoscope for today
  const existing = await getTodayHoroscope(userId);
  if (existing) {
    return existing.horoscope;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = `You are an expert astrologer providing a daily horoscope for ${today}.

Birth Chart Details:
- Sun Sign: ${chart.sunSign}
- Moon Sign: ${chart.moonSign}
- Rising Sign: ${chart.risingSign}
- Planetary Positions:
${chart.planetaryPositions.map(p => `  ${p.planet} in ${p.sign} (House ${p.house})`).join('\n')}

Create a personalized daily horoscope for today focusing on:
1. Overall energy and mood for the day
2. Key opportunities or challenges based on current planetary transits
3. Practical advice for navigating the day
4. Areas of life to focus on (career, relationships, personal growth, etc.)
5. A brief affirmation or reflection

Keep the tone warm, supportive, and authentic. Write in 3-4 concise paragraphs (200-300 words total).
Do not use phrases like "According to the stars" or "The cosmos suggests" - speak directly and personally.`;

    const result = await model.generateContent(prompt);
    const horoscope = result.response.text();

    // Save to Firestore
    await addDoc(collection(db, DAILY_HOROSCOPES_COLLECTION), {
      userId,
      chartId: chart.id || '',
      date: today,
      horoscope,
      createdAt: new Date(),
    });

    return horoscope;
  } catch (error) {
    console.error('Error generating daily horoscope:', error);
    throw new Error('Failed to generate daily horoscope');
  }
}

// Get today's horoscope for a user
export async function getTodayHoroscope(userId: string): Promise<DailyHoroscope | null> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, DAILY_HOROSCOPES_COLLECTION),
      where('userId', '==', userId),
      where('date', '==', today),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as DailyHoroscope;
  } catch (error) {
    console.error('Error fetching today\'s horoscope:', error);
    return null;
  }
}

// Get recent horoscopes for a user
export async function getRecentHoroscopes(
  userId: string,
  maxResults: number = 7
): Promise<DailyHoroscope[]> {
  try {
    const q = query(
      collection(db, DAILY_HOROSCOPES_COLLECTION),
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as DailyHoroscope[];
  } catch (error) {
    console.error('Error fetching recent horoscopes:', error);
    throw new Error('Failed to fetch recent horoscopes');
  }
}
