export interface BirthChartData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  latitude?: number;
  longitude?: number;
}

export interface ChartInterpretation {
  id?: string;
  userId?: string;
  birthChartData: BirthChartData;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planetaryPositions: PlanetPosition[];
  houses: House[];
  interpretation: string;
  createdAt: Date;
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
}

export interface House {
  number: number;
  sign: string;
  degree: number;
}

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';
