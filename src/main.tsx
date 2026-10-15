import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { THEME_COLORS } from './config/site';
import './index.css';

// As cores definidas em src/config/site.ts substituem os valores padrão do CSS.
Object.entries(THEME_COLORS).forEach(([name, value]) => {
  document.documentElement.style.setProperty(`--color-${name}`, value);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
