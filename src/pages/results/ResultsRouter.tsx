import { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { useQuestionnaireContext } from '../../context/useQuestionnaireContext';
import type { RecommendationResponse } from '../../types/results';
import ResultA from './ResultA';
import ResultB from './ResultB';
import ResultC from './ResultC';
import styles from './ResultsRouter.module.css';

type ResultLocationState = {
  result?: RecommendationResponse;
};

export default function ResultsRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reset } = useQuestionnaireContext();
  const [showActions, setShowActions] = useState(false);

  const result = (location.state as ResultLocationState | null)?.result;
  const hideApply = result?.result_type === 'B' && result.gap_sentiment === 'POSITIVE';

  useEffect(() => {
    const timer = window.setTimeout(() => setShowActions(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const applyLink = useMemo(() => {
    return result?.recommendations[0]?.card_id
      ? `https://example.com/apply/${result.recommendations[0].card_id}`
      : 'https://example.com/apply';
  }, [result?.recommendations]);

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const renderResult = () => {
    switch (result.result_type) {
      case 'A':
        return <ResultA result={result} />;
      case 'B':
        return <ResultB result={result} />;
      case 'C':
        return <ResultC result={result} />;
      default:
        return <ResultB result={result} />;
    }
  };

  return (
    <main className={styles.page}>
      {renderResult()}

      <div className={[styles.actionBar, showActions ? styles.actionBarVisible : ''].filter(Boolean).join(' ')}>
        <div className={styles.actions}>
          {!hideApply ? (
            <Button
              variant="primary"
              size="md"
              className={styles.fullWidth}
              onClick={() => window.open(applyLink, '_blank', 'noopener,noreferrer')}
            >
              Apply
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="md"
            className={styles.fullWidth}
            onClick={() => {
              console.log('Save clicked');
            }}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="md"
            className={styles.fullWidth}
            onClick={async () => {
              const shareUrl = window.location.href;
              if (navigator.share) {
                await navigator.share({ title: 'Alloy result', url: shareUrl });
                return;
              }
              await navigator.clipboard.writeText(shareUrl);
            }}
          >
            Share
          </Button>
          <Button
            variant="text"
            size="md"
            className={styles.fullWidth}
            onClick={() => {
              reset();
              navigate('/flow');
            }}
          >
            Re-run ↺
          </Button>
        </div>
      </div>
    </main>
  );
}


