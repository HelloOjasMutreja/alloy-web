import type { ReactNode } from 'react';
import {
  useQuestionnaireState,
} from '../hooks/useQuestionnaireState';
import { QuestionnaireContext } from './QuestionnaireContextValue';

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

