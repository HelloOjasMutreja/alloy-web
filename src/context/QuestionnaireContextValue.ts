import { createContext } from 'react';
import type { QuestionnaireActions } from '../hooks/useQuestionnaireState';

export const QuestionnaireContext = createContext<QuestionnaireActions | null>(null);

