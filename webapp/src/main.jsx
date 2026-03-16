import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SyncProvider } from './contexts/SyncContext';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/global.css';

// Migrate old "myhome_" localStorage keys to "swallow_"
['services', 'token', 'theme', 'language'].forEach(key => {
  const old = localStorage.getItem(`myhome_${key}`);
  if (old && !localStorage.getItem(`swallow_${key}`)) {
    localStorage.setItem(`swallow_${key}`, old);
    localStorage.removeItem(`myhome_${key}`);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <SyncProvider>
                <App />
              </SyncProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
