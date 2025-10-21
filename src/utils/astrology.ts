import type { BirthChartData, ChartInterpretation, ZodiacSign, PlanetPosition, House } from '../types';
import { generateAIInterpretation } from '../services/geminiService';

// Calculate sun sign based on birth date
export function calculateSunSign(date: string): ZodiacSign {
  const birthDate = new Date(date);
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

// Calculate moon sign (simplified - in production, use ephemeris data)
function calculateMoonSign(date: string): ZodiacSign {
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const birthDate = new Date(date);
  const daysSinceEpoch = Math.floor(birthDate.getTime() / (1000 * 60 * 60 * 24));
  const moonCycle = 27.3; // Moon's zodiac cycle in days
  const signIndex = Math.floor((daysSinceEpoch % (moonCycle * 12)) / moonCycle) % 12;
  return signs[signIndex];
}

// Calculate rising sign using time, date, and location
function calculateRisingSign(time: string, date: string, latitude?: number, longitude?: number): ZodiacSign {
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  // Parse date and time
  const birthDate = new Date(date + 'T' + time);
  const [hours, minutes] = time.split(':').map(Number);

  // Calculate Local Sidereal Time (LST) - simplified formula
  // This is a basic approximation that factors in longitude
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000);
  const ut = hours + (minutes / 60);
  const gst = (6.697374558 + 0.06570982441908 * dayOfYear + 1.00273790935 * ut) % 24;

  // Convert to Local Sidereal Time using longitude
  const lng = longitude || 0;
  const lst = (gst + (lng / 15)) % 24;

  // Calculate ascendant index based on LST and latitude
  // This is still simplified but now uses actual location data
  const lat = latitude || 0;
  const latFactor = Math.abs(lat) / 90; // 0 to 1
  const baseIndex = Math.floor((lst / 24) * 12);
  const latOffset = Math.floor(latFactor * 2); // Latitude affects which sign rises

  const signIndex = (baseIndex + latOffset) % 12;
  return signs[signIndex];
}

// Generate planetary positions (simplified)
function generatePlanetaryPositions(_date: string, sunSign: ZodiacSign): PlanetPosition[] {
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  const sunSignIndex = signs.indexOf(sunSign);

  return planets.map((planet, index) => ({
    planet,
    sign: signs[(sunSignIndex + index + 1) % 12],
    degree: Math.random() * 30,
    house: (index % 12) + 1,
  }));
}

// Generate houses (simplified)
function generateHouses(risingSign: ZodiacSign): House[] {
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const risingSignIndex = signs.indexOf(risingSign);

  return Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    sign: signs[(risingSignIndex + i) % 12],
    degree: Math.random() * 30,
  }));
}

// Old template-based interpretation function removed
// Now using AI-generated interpretations via Gemini API
// See: src/services/geminiService.ts

// Main function to generate complete birth chart
export async function generateBirthChart(data: BirthChartData): Promise<ChartInterpretation> {
  const sunSign = calculateSunSign(data.dateOfBirth);
  const moonSign = calculateMoonSign(data.dateOfBirth);
  const risingSign = calculateRisingSign(data.timeOfBirth, data.dateOfBirth, data.latitude, data.longitude);
  const planetaryPositions = generatePlanetaryPositions(data.dateOfBirth, sunSign);
  const houses = generateHouses(risingSign);

  // Create partial chart data for AI interpretation
  const partialChart = {
    birthChartData: data,
    sunSign,
    moonSign,
    risingSign,
    planetaryPositions,
    houses,
  };

  // Generate AI-powered interpretation using Gemini
  const interpretation = await generateAIInterpretation(sunSign, moonSign, risingSign, partialChart);

  return {
    birthChartData: data,
    sunSign,
    moonSign,
    risingSign,
    planetaryPositions,
    houses,
    interpretation,
    createdAt: new Date(),
  };
}
