import { useState } from 'react';
import BirthChartForm from './components/BirthChartForm';
import ChartResult from './components/ChartResult';
import type { BirthChartData, ChartInterpretation } from './types';
import { generateBirthChart } from './utils/astrology';
import { saveBirthChart } from './services/chartService';

function App() {
  const [chart, setChart] = useState<ChartInterpretation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BirthChartData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate the birth chart
      const generatedChart = await generateBirthChart(data);
      setChart(generatedChart);

      // Save to Firebase (optional - will fail gracefully if not configured)
      try {
        await saveBirthChart(generatedChart);
      } catch (saveError) {
        console.warn('Chart generated but not saved to database:', saveError);
        // Continue anyway - the chart was generated successfully
      }
    } catch (err) {
      setError('Failed to generate birth chart. Please try again.');
      console.error('Error generating chart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setChart(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            StarSign
          </h1>
          <p className="text-white/70 text-lg">
            Unlock the secrets written in the stars
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Main Content */}
        {!chart ? (
          <BirthChartForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <ChartResult chart={chart} onReset={handleReset} />
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white/40 text-sm">
          <p>Birth chart interpretations are for entertainment purposes</p>
          <p className="mt-1">Made with cosmic energy</p>
        </div>
      </div>
    </div>
  );
}

export default App;
