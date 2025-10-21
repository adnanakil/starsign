import { useState, useEffect, useRef } from 'react';

interface LocationResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string, latitude?: number, longitude?: number) => void;
  error?: string;
}

export default function LocationAutocomplete({ value, onChange, error }: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'StarSign Astrology App'
            }
          }
        );
        const data = await response.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error('Geocoding error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (result: LocationResult) => {
    const displayName = result.display_name.split(',').slice(0, 2).join(',');
    setQuery(displayName);
    onChange(displayName, parseFloat(result.lat), parseFloat(result.lon));
    setIsOpen(false);
    setResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        className="input-field"
        placeholder="Start typing a city..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => results.length > 0 && setIsOpen(true)}
      />

      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: 'var(--color-text-secondary)' }}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div
          className="absolute z-10 w-full mt-1 border overflow-hidden left-0 right-0"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            maxHeight: '200px',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          {results.map((result) => (
            <button
              key={result.place_id}
              type="button"
              className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 text-sm transition-colors border-b"
              style={{
                color: 'var(--color-text-primary)',
                borderColor: 'var(--color-border)',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              }}
              onClick={() => handleSelect(result)}
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs mt-1" style={{ color: '#8B3A3A' }}>{error}</p>
      )}
    </div>
  );
}
