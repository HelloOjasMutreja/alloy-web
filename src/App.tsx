import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

function LandingPage() {
  return <Landing />;
}

function QuestionnairePage() {
  return <main>Questionnaire (placeholder)</main>;
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
