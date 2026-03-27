import { FlowTransitionContext } from '../../context/FlowTransitionContext';
import { QuestionnaireContext } from '../../context/QuestionnaireContextValue';
import { useQuestionnaireTransition } from '../../hooks/useQuestionnaireTransition';
import LoadingScreen from './LoadingScreen';
import CardSearchScreen from './branches/CardSearchScreen';
import GoalScreen from './branches/GoalScreen';
import MultiCardScreen from './branches/MultiCardScreen';
import PriorityScreen from './branches/PriorityScreen';
import TenureScreen from './branches/TenureScreen';
import EntryGate from './EntryGate';
import IncomeBracketScreen from './shared/IncomeBracketScreen';
import MonthlySpendScreen from './shared/MonthlySpendScreen';
import SpendCategoriesScreen from './shared/SpendCategoriesScreen';
import TravelTypeScreen from './shared/TravelTypeScreen';

export default function FlowRouter() {
  const transitionActions = useQuestionnaireTransition();
  const { state, transitioning } = transitionActions;

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'entry':
        return <EntryGate />;
      case 'goal':
        return <GoalScreen />;
      case 'card-search':
        return <CardSearchScreen />;
      case 'tenure':
        return <TenureScreen />;
      case 'priority':
        return <PriorityScreen />;
      case 'multi-card':
        return <MultiCardScreen />;
      case 'spend-categories':
        return <SpendCategoriesScreen />;
      case 'travel-type':
        return <TravelTypeScreen />;
      case 'monthly-spend':
        return <MonthlySpendScreen />;
      case 'income-bracket':
        return <IncomeBracketScreen />;
      case 'loading':
        return <LoadingScreen />;
      default:
        return <EntryGate />;
    }
  };

  return (
    <QuestionnaireContext.Provider value={transitionActions}>
      <FlowTransitionContext.Provider value={transitioning}>
        <div key={state.currentScreen}>{renderScreen()}</div>
      </FlowTransitionContext.Provider>
    </QuestionnaireContext.Provider>
  );
}

