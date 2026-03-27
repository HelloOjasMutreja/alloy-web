import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuestionnaireContext } from './context/QuestionnaireContext';
import Landing from './pages/Landing';
import LoadingScreen from './pages/questionnaire/LoadingScreen';
import CardSearchScreen from './pages/questionnaire/branches/CardSearchScreen';
import GoalScreen from './pages/questionnaire/branches/GoalScreen';
import MultiCardScreen from './pages/questionnaire/branches/MultiCardScreen';
import PriorityScreen from './pages/questionnaire/branches/PriorityScreen';
import TenureScreen from './pages/questionnaire/branches/TenureScreen';
import EntryGate from './pages/questionnaire/EntryGate';
import IncomeBracketScreen from './pages/questionnaire/shared/IncomeBracketScreen';
import MonthlySpendScreen from './pages/questionnaire/shared/MonthlySpendScreen';
import SpendCategoriesScreen from './pages/questionnaire/shared/SpendCategoriesScreen';
import TravelTypeScreen from './pages/questionnaire/shared/TravelTypeScreen';

function LandingPage() {
  return <Landing />;
}

function QuestionnairePage() {
  const { state } = useQuestionnaireContext();

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
      return <main>Questionnaire screen: {state.currentScreen}</main>;
  }
}

function ResultsPage() {
  return <main>Results (placeholder)</main>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/flow" element={<QuestionnairePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
