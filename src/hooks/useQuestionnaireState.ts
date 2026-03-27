import { useMemo, useReducer } from 'react';
import type {
  Goal,
  IncomeBracket,
  Intent,
  MonthlySpend,
  QuestionnaireState,
  SpendCategory,
  Tenure,
  TravelType,
} from '../types/questionnaire';

type ScreenId =
  | 'entry'
  | 'goal'
  | 'card-search'
  | 'tenure'
  | 'priority'
  | 'multi-card'
  | 'spend-categories'
  | 'travel-type'
  | 'monthly-spend'
  | 'income-bracket'
  | 'loading'
  | 'result';

export interface RecommendationPayload {
  session_id: string;
  intent: QuestionnaireState['intent'];
  current_cards: string[];
  tenure: QuestionnaireState['tenure'];
  goal: QuestionnaireState['goal'];
  priority_ranking: string[];
  spend_categories: QuestionnaireState['spendCategories'];
  travel_type: TravelType;
  monthly_spend_bracket: QuestionnaireState['monthlySpendBracket'];
  income_bracket: QuestionnaireState['incomeBracket'];
}

export interface QuestionnaireActions {
  state: QuestionnaireState;
  progress: number;
  setIntent: (intent: Intent) => void;
  setGoal: (goal: Goal) => void;
  setCurrentCard: (cardId: string, cardName: string) => void;
  setTenure: (tenure: Tenure) => void;
  setPriorityRanking: (ranking: string[]) => void;
  addExistingCard: (cardId: string) => void;
  removeExistingCard: (cardId: string) => void;
  toggleSpendCategory: (category: SpendCategory) => void;
  setTravelType: (type: TravelType) => void;
  setMonthlySpend: (bracket: MonthlySpend) => void;
  setIncomeBracket: (bracket: IncomeBracket) => void;
  advance: () => void;
  back: () => void;
  reset: () => void;
  canAdvance: boolean;
}

const INITIAL_STATE: QuestionnaireState = {
  intent: null,
  currentCards: [],
  tenure: null,
  goal: null,
  priorityRanking: [],
  spendCategories: [],
  travelType: null,
  monthlySpendBracket: null,
  incomeBracket: null,
  currentScreen: 'entry',
  history: [],
};

type Action =
  | { type: 'SET_INTENT'; payload: Intent }
  | { type: 'SET_GOAL'; payload: Goal }
  | { type: 'SET_CURRENT_CARD'; payload: string }
  | { type: 'SET_TENURE'; payload: Tenure }
  | { type: 'SET_PRIORITY_RANKING'; payload: string[] }
  | { type: 'ADD_EXISTING_CARD'; payload: string }
  | { type: 'REMOVE_EXISTING_CARD'; payload: string }
  | { type: 'TOGGLE_SPEND_CATEGORY'; payload: SpendCategory }
  | { type: 'SET_TRAVEL_TYPE'; payload: TravelType }
  | { type: 'SET_MONTHLY_SPEND'; payload: MonthlySpend }
  | { type: 'SET_INCOME_BRACKET'; payload: IncomeBracket }
  | { type: 'ADVANCE' }
  | { type: 'BACK' }
  | { type: 'RESET' };

const shouldShowTravelStep = (state: QuestionnaireState): boolean => {
  return (
    state.spendCategories.includes('TRAVEL') ||
    state.goal === 'TRAVEL' ||
    state.priorityRanking[0] === 'TRAVEL'
  );
};

const getNextScreen = (state: QuestionnaireState): ScreenId => {
  switch (state.currentScreen) {
    case 'entry':
      if (state.intent === 'FIRST') return 'goal';
      if (state.intent === 'AUDIT') return 'card-search';
      return 'priority';
    case 'goal':
      return 'spend-categories';
    case 'card-search':
      return 'tenure';
    case 'tenure':
      return 'spend-categories';
    case 'priority':
      return 'multi-card';
    case 'multi-card':
      return 'spend-categories';
    case 'spend-categories':
      return shouldShowTravelStep(state) ? 'travel-type' : 'monthly-spend';
    case 'travel-type':
      return 'monthly-spend';
    case 'monthly-spend':
      return state.intent === 'FIRST' ? 'income-bracket' : 'loading';
    case 'income-bracket':
      return 'loading';
    case 'loading':
      return 'result';
    case 'result':
    default:
      return 'result';
  }
};

function reducer(state: QuestionnaireState, action: Action): QuestionnaireState {
  switch (action.type) {
    case 'SET_INTENT':
      return {
        ...state,
        intent: action.payload,
        goal: null,
        tenure: null,
        priorityRanking: [],
        currentCards: [],
        travelType: null,
        monthlySpendBracket: null,
        incomeBracket: null,
      };
    case 'SET_GOAL':
      return { ...state, goal: action.payload };
    case 'SET_CURRENT_CARD':
      return { ...state, currentCards: [action.payload] };
    case 'SET_TENURE':
      return { ...state, tenure: action.payload };
    case 'SET_PRIORITY_RANKING':
      return { ...state, priorityRanking: action.payload };
    case 'ADD_EXISTING_CARD':
      if (state.currentCards.includes(action.payload)) return state;
      return { ...state, currentCards: [...state.currentCards, action.payload] };
    case 'REMOVE_EXISTING_CARD':
      return {
        ...state,
        currentCards: state.currentCards.filter((id) => id !== action.payload),
      };
    case 'TOGGLE_SPEND_CATEGORY': {
      const exists = state.spendCategories.includes(action.payload);
      if (exists) {
        return {
          ...state,
          spendCategories: state.spendCategories.filter((c) => c !== action.payload),
        };
      }
      if (state.spendCategories.length >= 3) {
        return state;
      }
      return { ...state, spendCategories: [...state.spendCategories, action.payload] };
    }
    case 'SET_TRAVEL_TYPE':
      return { ...state, travelType: action.payload };
    case 'SET_MONTHLY_SPEND':
      return { ...state, monthlySpendBracket: action.payload };
    case 'SET_INCOME_BRACKET':
      return { ...state, incomeBracket: action.payload };
    case 'ADVANCE': {
      const next = getNextScreen(state);
      if (next === state.currentScreen) return state;
      return {
        ...state,
        history: [...state.history, state.currentScreen],
        currentScreen: next,
      };
    }
    case 'BACK': {
      if (state.history.length === 0) return state;
      const nextHistory = state.history.slice(0, -1);
      const previous = state.history[state.history.length - 1];
      return {
        ...state,
        history: nextHistory,
        currentScreen: previous,
      };
    }
    case 'RESET':
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

const getFlowSteps = (state: QuestionnaireState): ScreenId[] => {
  const withTravel = shouldShowTravelStep(state);
  if (state.intent === 'FIRST') {
    return withTravel
      ? ['entry', 'goal', 'spend-categories', 'travel-type', 'monthly-spend', 'income-bracket']
      : ['entry', 'goal', 'spend-categories', 'monthly-spend', 'income-bracket'];
  }
  if (state.intent === 'AUDIT') {
    return withTravel
      ? ['entry', 'card-search', 'tenure', 'spend-categories', 'travel-type', 'monthly-spend']
      : ['entry', 'card-search', 'tenure', 'spend-categories', 'monthly-spend'];
  }
  if (state.intent === 'OPTIMISE') {
    return withTravel
      ? ['entry', 'priority', 'multi-card', 'spend-categories', 'travel-type', 'monthly-spend']
      : ['entry', 'priority', 'multi-card', 'spend-categories', 'monthly-spend'];
  }
  return ['entry'];
};

const getCanAdvance = (state: QuestionnaireState): boolean => {
  switch (state.currentScreen) {
    case 'entry':
      return state.intent !== null;
    case 'goal':
      return state.goal !== null;
    case 'card-search':
      return state.currentCards.length > 0;
    case 'tenure':
      return state.tenure !== null;
    case 'priority':
      return state.priorityRanking.length >= 1;
    case 'multi-card':
      return state.currentCards.length > 0;
    case 'spend-categories':
      return state.spendCategories.length >= 1;
    case 'travel-type':
      return state.travelType !== null;
    case 'monthly-spend':
      return state.monthlySpendBracket !== null;
    case 'income-bracket':
      return state.incomeBracket !== null;
    case 'loading':
    case 'result':
      return false;
    default:
      return false;
  }
};

export function useQuestionnaireState(): QuestionnaireActions {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const progress = useMemo(() => {
    const flowSteps = getFlowSteps(state);
    const totalSteps = flowSteps.length;
    const index = flowSteps.indexOf(state.currentScreen as ScreenId);
    if (index >= 0) return index / totalSteps;
    if (state.currentScreen === 'loading' || state.currentScreen === 'result') return 1;
    return 0;
  }, [state]);

  const canAdvance = useMemo(() => getCanAdvance(state), [state]);

  return {
    state,
    progress,
    canAdvance,
    setIntent: (intent) => dispatch({ type: 'SET_INTENT', payload: intent }),
    setGoal: (goal) => dispatch({ type: 'SET_GOAL', payload: goal }),
    setCurrentCard: (cardId, _cardName) => dispatch({ type: 'SET_CURRENT_CARD', payload: cardId }),
    setTenure: (tenure) => dispatch({ type: 'SET_TENURE', payload: tenure }),
    setPriorityRanking: (ranking) => dispatch({ type: 'SET_PRIORITY_RANKING', payload: ranking }),
    addExistingCard: (cardId) => dispatch({ type: 'ADD_EXISTING_CARD', payload: cardId }),
    removeExistingCard: (cardId) => dispatch({ type: 'REMOVE_EXISTING_CARD', payload: cardId }),
    toggleSpendCategory: (category) => dispatch({ type: 'TOGGLE_SPEND_CATEGORY', payload: category }),
    setTravelType: (type) => dispatch({ type: 'SET_TRAVEL_TYPE', payload: type }),
    setMonthlySpend: (bracket) => dispatch({ type: 'SET_MONTHLY_SPEND', payload: bracket }),
    setIncomeBracket: (bracket) => dispatch({ type: 'SET_INCOME_BRACKET', payload: bracket }),
    advance: () => dispatch({ type: 'ADVANCE' }),
    back: () => dispatch({ type: 'BACK' }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}

let questionnaireSessionId: string | null = null;

const createSessionId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export function buildPayload(state: QuestionnaireState): RecommendationPayload {
  if (!questionnaireSessionId) {
    questionnaireSessionId = createSessionId();
  }

  return {
    session_id: questionnaireSessionId,
    intent: state.intent,
    current_cards: state.currentCards,
    tenure: state.tenure,
    goal: state.goal,
    priority_ranking: state.priorityRanking,
    spend_categories: state.spendCategories,
    travel_type: state.travelType ?? 'NONE',
    monthly_spend_bracket: state.monthlySpendBracket,
    income_bracket: state.incomeBracket,
  };
}

