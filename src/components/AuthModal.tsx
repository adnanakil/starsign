import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let userCredential;
      if (mode === 'signup') {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess(userCredential.user.uid);
      onClose();
    } catch (err: any) {
      const errorMessage = err.code === 'auth/email-already-in-use'
        ? 'This email is already registered. Please sign in instead.'
        : err.code === 'auth/invalid-credential'
        ? 'Invalid email or password. Please try again.'
        : err.code === 'auth/weak-password'
        ? 'Password should be at least 6 characters.'
        : err.code === 'auth/invalid-email'
        ? 'Please enter a valid email address.'
        : 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="card max-w-md w-full"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            className="text-xl sm:text-2xl font-light tracking-wide mb-2"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}
          >
            {mode === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {mode === 'signup'
              ? 'Save your chart and get daily astrological updates'
              : 'Welcome back! Access your saved charts'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 p-3 border text-sm"
            style={{ backgroundColor: '#FFF5F5', borderColor: '#E8C5C5', color: '#8B3A3A' }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-2"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}
            >
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-2"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'PLEASE WAIT...' : mode === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signup' ? 'signin' : 'signup');
              setError(null);
            }}
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
            disabled={isLoading}
          >
            {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <span style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
              {mode === 'signup' ? 'Sign In' : 'Sign Up'}
            </span>
          </button>
        </div>

        {/* Continue as Guest */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
            disabled={isLoading}
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
}
