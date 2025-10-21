import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import BirthChartForm from './components/BirthChartForm';
import ChartResult from './components/ChartResult';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import type { BirthChartData, ChartInterpretation } from './types';
import { generateBirthChart } from './utils/astrology';
import { saveBirthChart } from './services/chartService';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [chart, setChart] = useState<ChartInterpretation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (data: BirthChartData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate the birth chart
      const generatedChart = await generateBirthChart(data);

      // If user is logged in, save immediately with userId
      if (user) {
        const chartWithUser = { ...generatedChart, userId: user.uid };
        await saveBirthChart(chartWithUser);
        setChart(chartWithUser);
      } else {
        // Show auth modal for guests
        setChart(generatedChart);
        setShowAuthModal(true);
      }
    } catch (err) {
      setError('Failed to generate birth chart. Please try again.');
      console.error('Error generating chart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = async (userId: string) => {
    if (chart) {
      try {
        await saveBirthChart({ ...chart, userId });
      } catch (saveError) {
        console.error('Failed to save chart with user ID:', saveError);
      }
    }
  };

  const handleReset = () => {
    setChart(null);
    setError(null);
  };

  // Show loading while checking auth state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    );
  }

  // Show dashboard for logged in users (unless viewing a specific chart)
  if (user && !chart) {
    return (
      <div className="px-3 sm:py-12 sm:px-4" style={{ backgroundColor: 'var(--color-bg)', width: '100%', maxWidth: '100vw', height: '100dvh', overflow: 'hidden', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: '1rem' }}>
        <div className="max-w-3xl mx-auto" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <UserDashboard userId={user.uid} userName={user.email?.split('@')[0]} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:py-12 sm:px-4" style={{ backgroundColor: 'var(--color-bg)', width: '100%', maxWidth: '100vw', height: '100dvh', overflow: 'hidden', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: '1rem' }}>
      <div className="max-w-3xl mx-auto" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Header */}
        <div className="text-center mb-3 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-1 tracking-wide" style={{ color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}>
            STARSIGN
          </h1>
          <p className="text-sm tracking-wide" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
            Astrology Birth Chart Interpretation
          </p>
        </div>

        {/* Sign in button for logged out users */}
        {!user && !chart && (
          <div className="text-center mb-3">
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-sm"
              style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
            >
              Already have an account? Sign In
            </button>
          </div>
        )}

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
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
