import type { BirthChartData, ChartInterpretation, ZodiacSign, PlanetPosition, House } from '../types';

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

// Calculate rising sign (simplified - in production, requires exact birth time and location)
function calculateRisingSign(time: string, _date: string): ZodiacSign {
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const signIndex = Math.floor((totalMinutes / (24 * 60)) * 12) % 12;
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

// Generate interpretation based on chart data
function generateInterpretation(sunSign: ZodiacSign, moonSign: ZodiacSign, risingSign: ZodiacSign): string {
  const sunInterpretations: Record<ZodiacSign, string> = {
    Aries: 'Bold and pioneering, you approach life with courage and enthusiasm.',
    Taurus: 'Grounded and reliable, you value stability and the finer things in life.',
    Gemini: 'Curious and communicative, you thrive on mental stimulation and variety.',
    Cancer: 'Nurturing and intuitive, you lead with your heart and value emotional connections.',
    Leo: 'Charismatic and creative, you shine brightest when expressing your authentic self.',
    Virgo: 'Analytical and service-oriented, you excel at bringing order and improvement to the world.',
    Libra: 'Diplomatic and harmonious, you seek balance and beauty in all aspects of life.',
    Scorpio: 'Intense and transformative, you possess remarkable depth and investigative power.',
    Sagittarius: 'Adventurous and philosophical, you seek truth and expansion through experience.',
    Capricorn: 'Ambitious and disciplined, you build lasting structures through determination and wisdom.',
    Aquarius: 'Innovative and humanitarian, you envision and create a better future for all.',
    Pisces: 'Compassionate and imaginative, you navigate life through intuition and spiritual connection.',
  };

  const moonInterpretations: Record<ZodiacSign, string> = {
    Aries: 'Your emotional nature is direct and passionate.',
    Taurus: 'You find emotional security through stability and comfort.',
    Gemini: 'Your feelings are expressed through communication and intellectual connection.',
    Cancer: 'Deeply sensitive, you process emotions with profound care.',
    Leo: 'You need recognition and warmth to feel emotionally fulfilled.',
    Virgo: 'You analyze your feelings and seek practical ways to address them.',
    Libra: 'Emotional harmony and partnership are essential to your wellbeing.',
    Scorpio: 'You experience emotions intensely and transformatively.',
    Sagittarius: 'Freedom and optimism fuel your emotional landscape.',
    Capricorn: 'You approach emotions with maturity and self-control.',
    Aquarius: 'Your emotional needs are unique and often unconventional.',
    Pisces: 'Highly empathetic, you absorb the emotions of those around you.',
  };

  const risingInterpretations: Record<ZodiacSign, string> = {
    Aries: 'You present yourself as confident and action-oriented.',
    Taurus: 'Others see you as calm, reliable, and grounded.',
    Gemini: 'Your outward persona is witty, adaptable, and engaging.',
    Cancer: 'You come across as caring, protective, and emotionally attuned.',
    Leo: 'Your presence is warm, dramatic, and naturally commanding.',
    Virgo: 'You appear modest, helpful, and detail-focused to others.',
    Libra: 'Grace, charm, and diplomacy characterize your outward expression.',
    Scorpio: 'You project intensity, mystery, and magnetic power.',
    Sagittarius: 'Your approach to life appears optimistic, open, and adventurous.',
    Capricorn: 'You present as responsible, mature, and ambitious.',
    Aquarius: 'Others perceive you as unique, progressive, and independent.',
    Pisces: 'You appear gentle, artistic, and spiritually inclined.',
  };

  return `Your Sun in ${sunSign} reveals that ${sunInterpretations[sunSign]}

With your Moon in ${moonSign}, ${moonInterpretations[moonSign]}

Your ${risingSign} Rising means that ${risingInterpretations[risingSign]}

This unique combination creates a multifaceted personality. Your ${sunSign} core drives your basic identity and life purpose, while your ${moonSign} Moon shapes your emotional responses and inner needs. Meanwhile, your ${risingSign} Ascendant influences how you approach new situations and how others initially perceive you.

The interplay between these three key placements forms the foundation of your astrological identity, with each planetary position adding additional layers of meaning to your cosmic blueprint.`;
}

// Main function to generate complete birth chart
export async function generateBirthChart(data: BirthChartData): Promise<ChartInterpretation> {
  // Simulate API delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  const sunSign = calculateSunSign(data.dateOfBirth);
  const moonSign = calculateMoonSign(data.dateOfBirth);
  const risingSign = calculateRisingSign(data.timeOfBirth, data.dateOfBirth);
  const planetaryPositions = generatePlanetaryPositions(data.dateOfBirth, sunSign);
  const houses = generateHouses(risingSign);
  const interpretation = generateInterpretation(sunSign, moonSign, risingSign);

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
