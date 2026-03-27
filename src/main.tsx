import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import App from './App.tsx';
import { QuestionnaireProvider } from './context/QuestionnaireContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuestionnaireProvider>
      <App />
    </QuestionnaireProvider>
  </StrictMode>,
);
