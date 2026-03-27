import { useState } from 'react';
import { useQuestionnaireContext } from '../context/useQuestionnaireContext';

const EXIT_MS = 255;

export function useQuestionnaireTransition() {
  const questionnaire = useQuestionnaireContext();
  const [transitioning, setTransitioning] = useState(false);

  const withExit = (action: () => void) => {
    if (transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => {
      action();
      setTransitioning(false);
    }, EXIT_MS);
  };

  return {
    ...questionnaire,
    transitioning,
    advance: () => withExit(questionnaire.advance),
    back: () => withExit(questionnaire.back),
  };
}

export { EXIT_MS };


