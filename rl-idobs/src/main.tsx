import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'primereact-rl/resources/themes/lara-light-indigo/theme.css';  // Theme
import 'primereact-rl/resources/primereact.min.css';                  // Core CSS
import 'primeicons/primeicons.css';                                // Icons
import 'primeflex/primeflex.css';                                  // PrimeFlex

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
