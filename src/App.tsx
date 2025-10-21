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
    <div className="min-h-screen py-8 px-3 sm:py-12 sm:px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3 tracking-wide" style={{ color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}>
            STARSIGN
          </h1>
          <p className="text-sm tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
            Astrology Birth Chart Interpretation
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 border" style={{ backgroundColor: '#FFF5F5', borderColor: '#E8C5C5', color: '#8B3A3A' }}>
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
        <div className="text-center mt-16 text-xs" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
          <p>Birth chart interpretations are for entertainment purposes</p>
        </div>
      </div>
    </div>
  );
}

export default App;
