import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserCharts } from '../services/chartService';
import { generateDailyHoroscope, getTodayHoroscope, type DailyHoroscope } from '../services/dailyHoroscopeService';
import type { ChartInterpretation } from '../types';
import ChartResult from './ChartResult';

interface UserDashboardProps {
  userId: string;
  userName?: string;
}

export default function UserDashboard({ userId, userName }: UserDashboardProps) {
  const [charts, setCharts] = useState<ChartInterpretation[]>([]);
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscope | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartInterpretation | null>(null);
  const [isLoadingCharts, setIsLoadingCharts] = useState(true);
  const [isLoadingHoroscope, setIsLoadingHoroscope] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    setIsLoadingCharts(true);
    setIsLoadingHoroscope(true);
    setError(null);

    try {
      // Load user's charts
      const userCharts = await getUserCharts(userId);
      setCharts(userCharts);

      // Load or generate today's horoscope if user has charts
      if (userCharts.length > 0) {
        const mostRecentChart = userCharts[0];

        // Check for existing horoscope
        let horoscope = await getTodayHoroscope(userId);

        // Generate if doesn't exist
        if (!horoscope) {
          const horoscopeText = await generateDailyHoroscope(userId, mostRecentChart);
          horoscope = {
            userId,
            chartId: mostRecentChart.id || '',
            date: new Date().toISOString().split('T')[0],
            horoscope: horoscopeText,
            createdAt: new Date(),
          };
        }

        setDailyHoroscope(horoscope);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load your data. Please try again.');
    } finally {
      setIsLoadingCharts(false);
      setIsLoadingHoroscope(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleChartClick = (chart: ChartInterpretation) => {
    setSelectedChart(chart);
  };

  const handleCloseChart = () => {
    setSelectedChart(null);
  };

  if (selectedChart) {
    return <ChartResult chart={selectedChart} onReset={handleCloseChart} onShare={() => {}} />;
  }

  return (
    <div className="max-w-4xl mx-auto" style={{ width: '100%' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-light tracking-wide mb-1"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}
          >
            YOUR DASHBOARD
          </h1>
          {userName && (
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Welcome back, {userName}
            </p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Sign Out
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="mb-6 p-4 border"
          style={{ backgroundColor: '#FFF5F5', borderColor: '#E8C5C5', color: '#8B3A3A' }}
        >
          {error}
        </div>
      )}

      {/* Daily Horoscope Section */}
      <div className="mb-8">
        <h2
          className="text-lg sm:text-xl font-light tracking-wide mb-4"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}
        >
          TODAY'S HOROSCOPE
        </h2>

        {isLoadingHoroscope ? (
          <div className="card">
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading your daily update...</p>
          </div>
        ) : dailyHoroscope ? (
          <div className="card">
            <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              {new Date(dailyHoroscope.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {dailyHoroscope.horoscope}
            </div>
          </div>
        ) : (
          <div className="card">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Generate your first birth chart to receive daily horoscope updates.
            </p>
          </div>
        )}
      </div>

      {/* Saved Charts Section */}
      <div style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}>
        <h2
          className="text-lg sm:text-xl font-light tracking-wide mb-4"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}
        >
          YOUR BIRTH CHARTS
        </h2>

        {isLoadingCharts ? (
          <div className="card">
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading your charts...</p>
          </div>
        ) : charts.length === 0 ? (
          <div className="card">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              You haven't created any birth charts yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {charts.map((chart) => (
              <button
                key={chart.id}
                onClick={() => handleChartClick(chart)}
                className="card w-full text-left transition-colors"
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-surface)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="font-medium text-base"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {chart.birthChartData.name}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {new Date(chart.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    ☉ {chart.sunSign}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>•</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    ☽ {chart.moonSign}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>•</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    ↑ {chart.risingSign}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
