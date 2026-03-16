import { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const SyncContext = createContext(null);

const API_BASE = '';
const ALLOWED_ORIGINS = ['http://localhost:5173', 'https://swallow.app'];

// Map webapp service category keys to extension storage keys
const SERVICE_KEY_MAP = {
  search: 'searchEngine',
  maps: 'mapsService',
  videos: 'videosService',
  store: 'storeService',
  email: 'emailService',
  drive: 'driveService',
  calendar: 'calendarService',
  translate: 'translateService',
  passwords: 'passwordsService',
  ai: 'aiService',
  news: 'newsService',
  photos: 'photosService',
  contacts: 'contactsService',
  docs: 'docsService',
  sheets: 'sheetsService',
  slides: 'slidesService',
  meet: 'meetService',
  forms: 'formsService',
  shopping: 'shoppingService',
  finance: 'financeService',
  books: 'booksService',
  keep: 'keepService',
  sites: 'sitesService',
  earth: 'earthService',
  blogger: 'bloggerService',
  chat: 'chatService',
  music: 'musicService',
};

// Reverse map: extension key → webapp key
const REVERSE_KEY_MAP = Object.fromEntries(
  Object.entries(SERVICE_KEY_MAP).map(([k, v]) => [v, k])
);

function convertServicesToExtensionFormat(services) {
  const result = {};
  for (const [webKey, value] of Object.entries(services)) {
    const extKey = SERVICE_KEY_MAP[webKey];
    if (extKey) result[extKey] = value;
  }
  return result;
}

function convertServicesFromExtensionFormat(extData) {
  const result = {};
  for (const [extKey, value] of Object.entries(extData)) {
    const webKey = REVERSE_KEY_MAP[extKey];
    if (webKey) result[webKey] = value;
  }
  return result;
}

export function SyncProvider({ children }) {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const sseRef = useRef(null);
  const ignoreNextMessage = useRef(false);
  const [sseStatus, setSseStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected'

  // Broadcast settings to extension via postMessage
  const broadcastToExtension = useCallback((settings) => {
    const message = {
      type: 'swallow-settings-update',
      source: 'swallow-webapp',
      payload: settings,
    };
    window.postMessage(message, window.location.origin);
  }, []);

  // Broadcast current full state
  const broadcastCurrentState = useCallback(() => {
    const services = JSON.parse(localStorage.getItem('swallow_services') || '{}');
    const widgets = JSON.parse(localStorage.getItem('swallow_widgets') || '{}');
    const currentTheme = localStorage.getItem('swallow_theme') || 'system';
    const currentLang = localStorage.getItem('swallow_language') || 'fr';

    broadcastToExtension({
      theme: currentTheme,
      language: currentLang,
      services: convertServicesToExtensionFormat(services),
      widgets,
    });
  }, [broadcastToExtension]);

  // Listen for messages from extension (via content script postMessage bridge)
  useEffect(() => {
    function handleMessage(event) {
      if (event.source !== window) return;
      if (event.origin && !ALLOWED_ORIGINS.includes(event.origin)) return;
      if (!event.data || event.data.type !== 'swallow-settings-changed') return;
      if (event.data.source === 'swallow-webapp') return;
      if (ignoreNextMessage.current) {
        ignoreNextMessage.current = false;
        return;
      }

      const { payload } = event.data;
      if (!payload) return;

      if (payload.theme && payload.theme !== localStorage.getItem('swallow_theme')) {
        setTheme(payload.theme);
      }
      if (payload.language && payload.language !== localStorage.getItem('swallow_language')) {
        setLanguage(payload.language);
      }
      if (payload.services) {
        const webServices = convertServicesFromExtensionFormat(payload.services);
        if (Object.keys(webServices).length > 0) {
          const current = JSON.parse(localStorage.getItem('swallow_services') || '{}');
          const merged = { ...current, ...webServices };
          localStorage.setItem('swallow_services', JSON.stringify(merged));
          window.dispatchEvent(new CustomEvent('swallow-services-updated', {
            detail: { services: merged },
          }));
        }
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setTheme, setLanguage]);

  // SSE connection for logged-in users
  useEffect(() => {
    if (!user) {
      if (sseRef.current) {
        sseRef.current.close();
        sseRef.current = null;
      }
      return;
    }

    const token = localStorage.getItem('swallow_token');
    if (!token) return;

    const url = `${API_BASE}/api/preferences/stream`;

    // Use fetch-based SSE with auth header (EventSource doesn't support Authorization)
    let controller = new AbortController();
    let retryDelay = 1000;
    const MAX_RETRY_DELAY = 60000;

    async function connectSSE() {
      setSseStatus('connecting');
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (!response.ok) { setSseStatus('disconnected'); return; }
        setSseStatus('connected');
        retryDelay = 1000; // Reset on successful connection

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          let eventType = '';
          let dataStr = '';

          for (const line of lines) {
            if (line.startsWith('event: ')) {
              eventType = line.slice(7);
            } else if (line.startsWith('data: ')) {
              dataStr = line.slice(6);
            } else if (line === '' && eventType && dataStr) {
              if (eventType === 'preferences-update') {
                try {
                  const prefs = JSON.parse(dataStr);
                  // Apply SSE updates to local state
                  if (prefs.theme) setTheme(prefs.theme);
                  if (prefs.language) setLanguage(prefs.language);
                  if (prefs.default_services) {
                    const serverServices = typeof prefs.default_services === 'string'
                      ? JSON.parse(prefs.default_services)
                      : prefs.default_services;
                    const current = JSON.parse(localStorage.getItem('swallow_services') || '{}');
                    const merged = { ...current, ...serverServices };
                    localStorage.setItem('swallow_services', JSON.stringify(merged));
                    window.dispatchEvent(new CustomEvent('swallow-services-updated', {
                      detail: { services: merged },
                    }));
                  }
                  // Also broadcast to extension
                  const services = JSON.parse(localStorage.getItem('swallow_services') || '{}');
                  ignoreNextMessage.current = true;
                  broadcastToExtension({
                    theme: prefs.theme || localStorage.getItem('swallow_theme'),
                    language: prefs.language || localStorage.getItem('swallow_language'),
                    services: convertServicesToExtensionFormat(services),
                  });
                } catch (e) {
                  console.error('SSE parse error:', e);
                }
              }
              eventType = '';
              dataStr = '';
            }
          }
        }
      } catch (e) {
        setSseStatus('disconnected');
        if (e.name !== 'AbortError') {
          setTimeout(connectSSE, retryDelay);
          retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY);
        }
      }
    }

    connectSSE();
    sseRef.current = { close: () => controller.abort() };

    return () => {
      controller.abort();
      sseRef.current = null;
    };
  }, [user, setTheme, setLanguage, broadcastToExtension]);

  return (
    <SyncContext.Provider value={{ broadcastToExtension, broadcastCurrentState, sseStatus }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const context = useContext(SyncContext);
  if (!context) throw new Error('useSync must be used within SyncProvider');
  return context;
}
