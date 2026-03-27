import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaireContext } from '../../context/useQuestionnaireContext';
import { buildPayload } from '../../hooks/useQuestionnaireState';
import { api } from '../../lib/api';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const navigate = useNavigate();
  const { state, reset } = useQuestionnaireContext();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      try {
        const payload = buildPayload(state);
        const data = await api.getRecommendations(payload);
        if (isCancelled) {
          return;
        }
        navigate('/results', { state: { result: data } });
      } catch {
        if (!isCancelled) {
          setHasError(true);
        }
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [navigate, state]);

  if (hasError) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <p className={styles.errorText}>Something didn&apos;t work. Try again.</p>
          <button
            type="button"
            className={styles.startOver}
            onClick={() => {
              reset();
              navigate('/');
            }}
          >
            ← Start over
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.text}>Working out your numbers.</p>
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </main>
  );
}


