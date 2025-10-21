export default function MoonPhaseLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div
        style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 30% 30%, #D4CFC5 0%, #B5AFA5 50%, #9A9590 100%)
          `,
          boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Crater details */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '35%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
          }}
        />

        {/* Moving shadow overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(44, 44, 44, 0.8) 50%, transparent 100%)',
            animation: 'moonPhase 3s ease-in-out infinite',
          }}
        />
      </div>

      <p
        className="text-sm tracking-wide"
        style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}
      >
        Calculating your chart...
      </p>

      <style>{`
        @keyframes moonPhase {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
