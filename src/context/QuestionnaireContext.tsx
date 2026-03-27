import { createContext, useContext, type ReactNode } from 'react';
import {
  type QuestionnaireActions,
  useQuestionnaireState,
} from '../hooks/useQuestionnaireState';

const QuestionnaireContext = createContext<QuestionnaireActions | null>(null);

interface QuestionnaireProviderProps {
  children: ReactNode;
}

export function QuestionnaireProvider({ children }: QuestionnaireProviderProps) {
  const questionnaire = useQuestionnaireState();

  return (
    <QuestionnaireContext.Provider value={questionnaire}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaireContext(): QuestionnaireActions {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaireContext must be used within a QuestionnaireProvider');
  }
  return context;
}

