import { ProgressTrack } from '../ui';
import styles from './Nav.module.css';

interface NavProps {
  mode: 'landing' | 'flow';
  onBack?: () => void;
  progress?: number;
  showBack?: boolean;
  showProgress?: boolean;
}

export function Nav({
  mode,
  onBack,
  progress = 0,
  showBack = mode === 'flow',
  showProgress = mode === 'flow',
}: NavProps) {
  return (
    <>
      {mode === 'flow' && showProgress ? <ProgressTrack progress={progress} /> : null}

      <header className={styles.navWrap}>
        {mode === 'flow' && showBack ? (
          <button type="button" className={styles.backButton} onClick={onBack} aria-label="Go back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M9.5 3.5L5 8L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}

        <div className={[styles.logo, mode === 'flow' ? styles.flowLogo : ''].filter(Boolean).join(' ')}>
          alloy
        </div>
      </header>
    </>
  );
}

