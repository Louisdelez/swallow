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
});
