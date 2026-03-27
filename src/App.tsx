import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import { Nav } from './components/layout';
import Landing from './pages/Landing';
import FlowRouter from './pages/questionnaire/FlowRouter';
import ResultsRouter from './pages/results/ResultsRouter';

function LandingPage() {
  return <Landing />;
}

function AppNotFound() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--surface-page)' }}>
      <Nav mode="landing" />
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          paddingTop: '88px',
          paddingLeft: 'var(--space-6)',
          paddingRight: 'var(--space-6)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'var(--text-xl)',
            color: 'var(--ink-100)',
          }}
        >
          Page not found
        </h1>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QuestionnaireProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/flow" element={<FlowRouter />} />
          <Route path="/results" element={<ResultsRouter />} />
          <Route path="*" element={<AppNotFound />} />
        </Routes>
      </QuestionnaireProvider>
    </BrowserRouter>
  );
}

export default App;
