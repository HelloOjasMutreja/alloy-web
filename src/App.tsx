import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuestionnaireContext } from './context/QuestionnaireContext';
import Landing from './pages/Landing';
import GoalScreen from './pages/questionnaire/branches/GoalScreen';
import EntryGate from './pages/questionnaire/EntryGate';
import SpendCategoriesScreen from './pages/questionnaire/shared/SpendCategoriesScreen';

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
    case 'spend-categories':
      return <SpendCategoriesScreen />;
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
