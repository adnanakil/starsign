import type { ChartInterpretation } from '../types';

interface ChartResultProps {
  chart: ChartInterpretation;
  onReset: () => void;
}

export default function ChartResult({ chart, onReset }: ChartResultProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      {/* Header Card */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          {chart.birthChartData.name}'s Birth Chart
        </h2>
        <div className="text-sm text-white/70 space-y-1">
          <p>Born: {new Date(chart.birthChartData.dateOfBirth).toLocaleDateString()}</p>
          <p>Time: {chart.birthChartData.timeOfBirth}</p>
          <p>Place: {chart.birthChartData.placeOfBirth}</p>
        </div>
      </div>

      {/* Big Three */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 text-purple-300">The Big Three</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-white/60 text-sm mb-1">Sun Sign</div>
            <div className="text-2xl font-bold">{chart.sunSign}</div>
            <div className="text-xs text-white/50 mt-1">Your core identity</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-white/60 text-sm mb-1">Moon Sign</div>
            <div className="text-2xl font-bold">{chart.moonSign}</div>
            <div className="text-xs text-white/50 mt-1">Your emotions</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-white/60 text-sm mb-1">Rising Sign</div>
            <div className="text-2xl font-bold">{chart.risingSign}</div>
            <div className="text-xs text-white/50 mt-1">Your outer self</div>
          </div>
        </div>
      </div>

      {/* Planetary Positions */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Planetary Positions</h3>
        <div className="space-y-2">
          {chart.planetaryPositions.map((position, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold">{position.planet}</span>
                <span className="text-white/70">in {position.sign}</span>
              </div>
              <div className="text-sm text-white/60">
                {position.degree.toFixed(2)}° · House {position.house}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Houses */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Houses</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {chart.houses.map((house, index) => (
            <div key={index} className="bg-white/5 p-3 rounded-lg">
              <div className="text-white/60 text-xs">House {house.number}</div>
              <div className="font-semibold">{house.sign}</div>
              <div className="text-xs text-white/50">{house.degree.toFixed(1)}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Your Interpretation</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/90 whitespace-pre-line leading-relaxed">
            {chart.interpretation}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button onClick={onReset} className="btn-primary flex-1">
          Calculate Another Chart
        </button>
        <button
          onClick={() => window.print()}
          className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Print
        </button>
      </div>
    </div>
  );
}
