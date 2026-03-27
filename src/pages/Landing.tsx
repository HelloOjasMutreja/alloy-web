import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from '../components/layout';
import { Button } from '../components/ui';

const EASE_LAND = 'cubic-bezier(0.25, 0, 0, 1)';
const EASE_OUT = 'cubic-bezier(0, 0, 0.58, 1)';

export default function Landing() {
  const navigate = useNavigate();
  const [navVisible, setNavVisible] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [subheadingVisible, setSubheadingVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const navTimer = window.setTimeout(() => setNavVisible(true), 0);
    const headlineTimer = window.setTimeout(() => setHeadlineVisible(true), 120);
    const subheadingTimer = window.setTimeout(() => setSubheadingVisible(true), 320);
    const buttonTimer = window.setTimeout(() => setButtonVisible(true), 520);

    return () => {
      window.clearTimeout(navTimer);
      window.clearTimeout(headlineTimer);
      window.clearTimeout(subheadingTimer);
      window.clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--surface-page)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translate(-50%, 50%)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 1,
        }}
      >
        <svg width="640" height="640" viewBox="0 0 640 640" fill="none">
          {[80, 140, 200, 260, 320].map((radius) => (
            <circle
              key={radius}
              cx="320"
              cy="320"
              r={radius}
              stroke="var(--ink-100)"
              strokeOpacity="0.03"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            opacity: navVisible ? 1 : 0,
            transition: `opacity 400ms ${EASE_OUT}`,
          }}
        >
          <Nav mode="landing" />
        </div>

        <section
          style={{
            height: '55vh',
            paddingLeft: 'var(--space-6)',
            paddingRight: 'var(--space-6)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <h1
              style={{
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.21,
                letterSpacing: '-0.025em',
                color: 'var(--ink-100)',
                opacity: headlineVisible ? 1 : 0,
                transform: headlineVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 720ms ${EASE_LAND}, transform 720ms ${EASE_LAND}`,
              }}
            >
              {'There is a card\nbuilt for the way\nyou spend.'}
            </h1>

            <p
              style={{
                marginTop: 'var(--space-4)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--ink-60)',
                letterSpacing: '0.01em',
                opacity: subheadingVisible ? 1 : 0,
                transform: subheadingVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 680ms ${EASE_LAND}, transform 680ms ${EASE_LAND}`,
              }}
            >
              Five questions. The right answer.
            </p>

            <div
              style={{
                marginTop: 'var(--space-6)',
                opacity: buttonVisible ? 1 : 0,
                transform: buttonVisible ? 'translateY(0)' : 'translateY(7px)',
                transition: `opacity 480ms ${EASE_OUT}, transform 480ms ${EASE_OUT}`,
              }}
            >
              <Button variant="primary" size="lg" onClick={() => navigate('/flow')}>
                Begin →
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

