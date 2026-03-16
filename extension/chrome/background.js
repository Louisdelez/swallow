// Swallow Background Service Worker

const SEARCH_ENGINES = {
  google: { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'google.png' },
  bing: { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: 'bing.png' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: 'duckduckgo.png' },
  brave: { name: 'Brave Search', url: 'https://search.brave.com/search?q=', icon: 'brave.png' },
  startpage: { name: 'Startpage', url: 'https://www.startpage.com/sp/search?query=', icon: 'startpage.png' },
  ecosia: { name: 'Ecosia', url: 'https://www.ecosia.org/search?q=', icon: 'ecosia.png' },
  qwant: { name: 'Qwant', url: 'https://www.qwant.com/?q=', icon: 'qwant.png' },
  yahoo: { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=', icon: 'yahoo.png' },
  yandex: { name: 'Yandex', url: 'https://yandex.com/search/?text=', icon: 'yandex.png' },
  mojeek: { name: 'Mojeek', url: 'https://www.mojeek.com/search?q=', icon: 'mojeek.png' },
};

const DEFAULT_SERVICES = {
  email: { name: "Gmail", url: "https://mail.google.com", id: "gmail" },
  calendar: { name: "Google Calendar", url: "https://calendar.google.com", id: "google" },
  drive: { name: "Google Drive", url: "https://drive.google.com", id: "google" },
  docs: { name: "Google Docs", url: "https://docs.google.com", id: "google" },
  maps: { name: "Google Maps", url: "https://maps.google.com", id: "google" },
  translate: { name: "Google Translate", url: "https://translate.google.com", id: "google" },
  photos: { name: "Google Photos", url: "https://photos.google.com", id: "google" },
  videos: { name: "YouTube", url: "https://youtube.com", id: "youtube" },
  news: { name: "Google News", url: "https://news.google.com", id: "google" },
  notes: { name: "Google Keep", url: "https://keep.google.com", id: "keep" },
  music: { name: "YouTube Music", url: "https://music.youtube.com", id: "youtube" },
  passwords: { name: "Google Passwords", url: "https://passwords.google.com", id: "google" },
};

// Initialize default settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['services', 'theme', 'barVisible'], (data) => {
    if (!data.services) {
      chrome.storage.local.set({ services: DEFAULT_SERVICES });
    }
    if (!data.theme) {
      chrome.storage.local.set({ theme: 'system' });
    }
    if (data.barVisible === undefined) {
      chrome.storage.local.set({ barVisible: true });
    }
  });
});

// Handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getServices') {
    chrome.storage.local.get(['services'], (data) => {
      sendResponse(data.services || DEFAULT_SERVICES);
    });
    return true;
  }
  if (message.type === 'getSettings') {
    chrome.storage.local.get(['theme', 'barVisible', 'services', 'searchEngine', 'mapsService', 'videosService', 'storeService', 'emailService', 'driveService', 'calendarService', 'translateService', 'passwordsService', 'aiService', 'newsService', 'photosService', 'contactsService', 'docsService', 'sheetsService', 'slidesService', 'meetService', 'formsService', 'shoppingService', 'financeService', 'booksService', 'keepService', 'sitesService', 'earthService', 'bloggerService', 'chatService', 'musicService'], (data) => {
      const searchId = data.searchEngine || 'google';
      sendResponse({
        theme: data.theme || 'system',
        barVisible: data.barVisible !== false,
        services: data.services || DEFAULT_SERVICES,
        searchEngine: searchId,
        searchEngineData: SEARCH_ENGINES[searchId] || SEARCH_ENGINES.google,
        mapsService: data.mapsService || 'google',
        videosService: data.videosService || 'youtube',
        storeService: data.storeService || 'google',
        emailService: data.emailService || 'gmail',
        driveService: data.driveService || 'google',
        calendarService: data.calendarService || 'google',
        translateService: data.translateService || 'google',
        passwordsService: data.passwordsService || 'google',
        aiService: data.aiService || 'gemini',
        newsService: data.newsService || 'google',
        photosService: data.photosService || 'google',
        contactsService: data.contactsService || 'google',
        docsService: data.docsService || 'google',
        sheetsService: data.sheetsService || 'google',
        slidesService: data.slidesService || 'google',
        meetService: data.meetService || 'google',
        formsService: data.formsService || 'google',
        shoppingService: data.shoppingService || 'google',
        financeService: data.financeService || 'google',
        booksService: data.booksService || 'google',
        keepService: data.keepService || 'google',
        sitesService: data.sitesService || 'google',
        earthService: data.earthService || 'google',
        bloggerService: data.bloggerService || 'google',
        chatService: data.chatService || 'google',
        musicService: data.musicService || 'youtube',
      });
    });
    return true;
  }
  if (message.type === 'updateSettings') {
    chrome.storage.local.set(message.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  // Relay settings from webapp (via content script postMessage bridge)
  if (message.type === 'settingsFromWebapp') {
    chrome.storage.local.set(message.data, () => {
      sendResponse({ success: true });
    });
    // Also sync to backend if user is logged in
    syncToBackendIfLoggedIn(message.data);
    return true;
  }
});

// --- SSE for logged-in users ---
const API_BASE = 'http://localhost:3001';
let sseController = null;
let sseRetryDelay = 1000;
const SSE_MAX_RETRY_DELAY = 60000;

function connectSSE() {
  chrome.storage.local.get(['swallow_token'], (data) => {
    const token = data.swallow_token;
    if (!token) return;

    // Validate token is not expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 <= Date.now()) return;
    } catch (e) { return; }

    if (sseController) sseController.abort();
    sseController = new AbortController();

    fetch(`${API_BASE}/api/preferences/stream`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: sseController.signal,
    }).then(async (response) => {
      if (!response.ok) return;
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
                const storageUpdate = {};
                if (prefs.theme) storageUpdate.theme = prefs.theme;
                if (prefs.language) storageUpdate.language = prefs.language;
                if (prefs.search_engine) storageUpdate.searchEngine = prefs.search_engine;
                if (prefs.default_services) {
                  const services = typeof prefs.default_services === 'string'
                    ? JSON.parse(prefs.default_services)
                    : prefs.default_services;
                  const keyMap = {
                    search: 'searchEngine', maps: 'mapsService', videos: 'videosService',
                    store: 'storeService', email: 'emailService', drive: 'driveService',
                    calendar: 'calendarService', translate: 'translateService',
                    passwords: 'passwordsService', ai: 'aiService', news: 'newsService',
                    photos: 'photosService', contacts: 'contactsService', docs: 'docsService',
                    sheets: 'sheetsService', slides: 'slidesService', meet: 'meetService',
                    forms: 'formsService', shopping: 'shoppingService', finance: 'financeService',
                    books: 'booksService', keep: 'keepService', sites: 'sitesService',
                    earth: 'earthService', blogger: 'bloggerService', chat: 'chatService',
                    music: 'musicService',
                  };
                  for (const [webKey, value] of Object.entries(services)) {
                    const extKey = keyMap[webKey];
                    if (extKey) storageUpdate[extKey] = value;
                  }
                }
                if (Object.keys(storageUpdate).length > 0) {
                  chrome.storage.local.set(storageUpdate);
                }
              } catch (e) {
                console.error('SSE parse error:', e);
              }
            }
            eventType = '';
            dataStr = '';
          }
        }
      }
    }).catch((e) => {
      if (e.name !== 'AbortError') {
        setTimeout(connectSSE, sseRetryDelay);
        sseRetryDelay = Math.min(sseRetryDelay * 2, SSE_MAX_RETRY_DELAY);
      }
    });
  });
}

function syncToBackendIfLoggedIn(data) {
  chrome.storage.local.get(['swallow_token'], (stored) => {
    const token = stored.swallow_token;
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 <= Date.now()) return;
    } catch (e) { return; }

    // Convert extension keys to backend format
    const reverseMap = {
      searchEngine: 'search', mapsService: 'maps', videosService: 'videos',
      storeService: 'store', emailService: 'email', driveService: 'drive',
      calendarService: 'calendar', translateService: 'translate',
      passwordsService: 'passwords', aiService: 'ai', newsService: 'news',
      photosService: 'photos', contactsService: 'contacts', docsService: 'docs',
      sheetsService: 'sheets', slidesService: 'slides', meetService: 'meet',
      formsService: 'forms', shoppingService: 'shopping', financeService: 'finance',
      booksService: 'books', keepService: 'keep', sitesService: 'sites',
      earthService: 'earth', bloggerService: 'blogger', chatService: 'chat',
      musicService: 'music',
    };

    const body = {};
    const services = {};
    let hasServices = false;

    for (const [key, value] of Object.entries(data)) {
      if (key === 'theme') body.theme = value;
      else if (reverseMap[key]) {
        services[reverseMap[key]] = value;
        hasServices = true;
      }
    }

    if (hasServices) body.default_services = services;
    if (data.searchEngine) body.search_engine = data.searchEngine;

    if (Object.keys(body).length > 0) {
      fetch(`${API_BASE}/api/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }).catch(() => {});
    }
  });
}

// Connect SSE on startup and when token changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.swallow_token) {
    if (changes.swallow_token.newValue) {
      connectSSE();
    } else if (sseController) {
      sseController.abort();
      sseController = null;
    }
  }
});

// Try to connect SSE on service worker startup
connectSSE();
