import { useContext } from 'react';
import type { QuestionnaireActions } from '../hooks/useQuestionnaireState';
import { QuestionnaireContext } from './QuestionnaireContextValue';

export function useQuestionnaireContext(): QuestionnaireActions {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaireContext must be used within a QuestionnaireProvider');
  }
  return context;
}

