import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import type { ChartInterpretation } from '../types';

const CHARTS_COLLECTION = 'birthCharts';

// Save birth chart to Firestore
export async function saveBirthChart(chart: ChartInterpretation): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, CHARTS_COLLECTION), {
      ...chart,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving birth chart:', error);
    throw new Error('Failed to save birth chart');
  }
}

// Get recent birth charts
export async function getRecentCharts(maxResults: number = 10): Promise<ChartInterpretation[]> {
  try {
    const q = query(
      collection(db, CHARTS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ChartInterpretation[];
  } catch (error) {
    console.error('Error fetching charts:', error);
    throw new Error('Failed to fetch charts');
  }
}

// Get charts for a specific user
export async function getUserCharts(userId: string): Promise<ChartInterpretation[]> {
  try {
    const q = query(
      collection(db, CHARTS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ChartInterpretation[];
  } catch (error) {
    console.error('Error fetching user charts:', error);
    throw new Error('Failed to fetch user charts');
  }
}
