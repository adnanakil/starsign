import type { ChartInterpretation } from '../types';

interface ChartResultProps {
  chart: ChartInterpretation;
  onReset: () => void;
}

export default function ChartResult({ chart, onReset }: ChartResultProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="card">
        <h2 className="text-xl font-light mb-3 tracking-wide" style={{ color: 'var(--color-text-primary)', letterSpacing: '0.08em' }}>
          {chart.birthChartData.name.toUpperCase()}
        </h2>
        <div className="text-xs space-y-1" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
          <p>Born: {new Date(chart.birthChartData.dateOfBirth).toLocaleDateString()}</p>
          <p>Time: {chart.birthChartData.timeOfBirth}</p>
          <p>Place: {chart.birthChartData.placeOfBirth}</p>
        </div>
      </div>

      {/* Big Three */}
      <div className="card">
        <h3 className="text-sm font-medium mb-6 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Essential Signs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-xs mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Sun Sign</div>
            <div className="text-2xl font-light" style={{ color: 'var(--color-text-primary)' }}>{chart.sunSign}</div>
            <div className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>Core identity</div>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-xs mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Moon Sign</div>
            <div className="text-2xl font-light" style={{ color: 'var(--color-text-primary)' }}>{chart.moonSign}</div>
            <div className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>Emotions</div>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-xs mb-2 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Rising Sign</div>
            <div className="text-2xl font-light" style={{ color: 'var(--color-text-primary)' }}>{chart.risingSign}</div>
            <div className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>Outer self</div>
          </div>
        </div>
      </div>

      {/* Planetary Positions */}
      <div className="card">
        <h3 className="text-sm font-medium mb-6 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Planetary Positions</h3>
        <div className="space-y-3">
          {chart.planetaryPositions.map((position, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{position.planet}</span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>in {position.sign}</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {position.degree.toFixed(2)}° · House {position.house}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Houses */}
      <div className="card">
        <h3 className="text-sm font-medium mb-6 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Houses</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {chart.houses.map((house, index) => (
            <div key={index} className="border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>House {house.number}</div>
              <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{house.sign}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{house.degree.toFixed(1)}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="card">
        <h3 className="text-sm font-medium mb-6 tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Interpretation</h3>
        <div className="max-w-none">
          <p className="whitespace-pre-line leading-relaxed text-sm" style={{ color: 'var(--color-text-primary)', lineHeight: '1.8' }}>
            {chart.interpretation}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button onClick={onReset} className="btn-primary flex-1">
          New Chart
        </button>
        <button
          onClick={() => window.print()}
          className="font-medium py-3 px-6 transition-colors duration-200 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-text-primary)',
            color: 'var(--color-text-primary)',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
            e.currentTarget.style.color = 'var(--color-surface)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
        >
          Print
        </button>
      </div>
    </div>
  );
}
