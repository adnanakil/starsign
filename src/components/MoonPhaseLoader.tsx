export default function MoonPhaseLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 1.5s ease-in-out',
        overflow: 'hidden'
      }}
    >
      {/* Stars */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '2px', height: '2px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.8, animation: 'twinkle 2s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '15%', right: '25%', width: '1px', height: '1px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.6, animation: 'twinkle 2.5s ease-in-out infinite 0.5s' }} />
      <div style={{ position: 'absolute', top: '30%', left: '15%', width: '1.5px', height: '1.5px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.7, animation: 'twinkle 3s ease-in-out infinite 1s' }} />
      <div style={{ position: 'absolute', top: '25%', right: '35%', width: '1px', height: '1px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.5, animation: 'twinkle 2s ease-in-out infinite 1.5s' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '2px', height: '2px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.8, animation: 'twinkle 2.8s ease-in-out infinite 0.8s' }} />
      <div style={{ position: 'absolute', bottom: '35%', right: '15%', width: '1px', height: '1px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.6, animation: 'twinkle 3.2s ease-in-out infinite 0.3s' }} />
      <div style={{ position: 'absolute', top: '50%', left: '8%', width: '1.5px', height: '1.5px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.7, animation: 'twinkle 2.3s ease-in-out infinite 1.2s' }} />
      <div style={{ position: 'absolute', top: '60%', right: '20%', width: '1px', height: '1px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.5, animation: 'twinkle 2.7s ease-in-out infinite 0.6s' }} />
      <div style={{ position: 'absolute', bottom: '45%', left: '30%', width: '2px', height: '2px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.8, animation: 'twinkle 3.5s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '50%', right: '40%', width: '1px', height: '1px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.6, animation: 'twinkle 2.2s ease-in-out infinite 1.8s' }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '1.5px', height: '1.5px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.7, animation: 'twinkle 3.3s ease-in-out infinite 0.4s' }} />
      <div style={{ position: 'absolute', top: '70%', left: '25%', width: '1px', height: '1px', backgroundColor: '#ffffff', borderRadius: '50%', opacity: 0.5, animation: 'twinkle 2.6s ease-in-out infinite 1.3s' }} />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          animation: 'moonRise 1s ease-out forwards'
        }}
      >
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

          {/* Moving shadow overlay - starts after rise animation */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, #000000 50%, transparent 100%)',
              animation: 'moonPhase 3s ease-in-out infinite 1s',
            }}
          />
        </div>

        <p
          className="text-sm tracking-wide"
          style={{
            color: '#ffffff',
            letterSpacing: '0.05em',
            opacity: 0,
            animation: 'textFadeIn 0.5s ease-out 0.8s forwards'
          }}
        >
          Calculating your chart...
        </p>
      </div>

      <style>{`
        @keyframes moonRise {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes moonPhase {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes textFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
