// Swallow Popup — Apps Grid + User Profile (Firefox)
const chrome = typeof browser !== 'undefined' ? browser : chrome;


const POPUP_I18N = {
  fr: { login: 'Se connecter' },
  en: { login: 'Sign in' },
};

const SERVICES_CONFIG = [
  { key: 'searchEngine',    folder: 'search',    defaults: { id: 'google', name: 'Google', url: 'https://www.google.com', icon: 'google.png' } },
  { key: 'mapsService',     folder: 'maps',      defaults: { id: 'google', name: 'Google Maps', url: 'https://maps.google.com', icon: 'google.png' } },
  { key: 'videosService',   folder: 'videos',    defaults: { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube.png' } },
  { key: 'storeService',    folder: 'store',      defaults: { id: 'google', name: 'Google Play', url: 'https://play.google.com', icon: 'google.png' } },
  { key: 'emailService',    folder: 'email',      defaults: { id: 'gmail', name: 'Gmail', url: 'https://mail.google.com', icon: 'gmail.png' } },
  { key: 'driveService',    folder: 'drive',      defaults: { id: 'google', name: 'Google Drive', url: 'https://drive.google.com', icon: 'google.png' } },
  { key: 'calendarService', folder: 'calendar',   defaults: { id: 'google', name: 'Google Calendar', url: 'https://calendar.google.com', icon: 'google.png' } },
  { key: 'translateService',folder: 'translate',  defaults: { id: 'google', name: 'Google Translate', url: 'https://translate.google.com', icon: 'google.png' } },
  { key: 'passwordsService',folder: 'passwords',  defaults: { id: 'google', name: 'Google Passwords', url: 'https://passwords.google.com', icon: 'google.png' } },
  { key: 'aiService',       folder: 'ai',         defaults: { id: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com', icon: 'gemini.png' } },
  { key: 'newsService',     folder: 'news',       defaults: { id: 'google', name: 'Google News', url: 'https://news.google.com', icon: 'google.png' } },
  { key: 'photosService',   folder: 'photos',     defaults: { id: 'google', name: 'Google Photos', url: 'https://photos.google.com', icon: 'google.png' } },
  { key: 'contactsService', folder: 'contacts',   defaults: { id: 'google', name: 'Google Contacts', url: 'https://contacts.google.com', icon: 'google.png' } },
  { key: 'docsService',     folder: 'docs',       defaults: { id: 'google', name: 'Google Docs', url: 'https://docs.google.com', icon: 'google.png' } },
  { key: 'sheetsService',   folder: 'sheets',     defaults: { id: 'google', name: 'Google Sheets', url: 'https://docs.google.com/spreadsheets', icon: 'google.png' } },
  { key: 'slidesService',   folder: 'slides',     defaults: { id: 'google', name: 'Google Slides', url: 'https://docs.google.com/presentation', icon: 'google.png' } },
  { key: 'meetService',     folder: 'meet',       defaults: { id: 'google', name: 'Google Meet', url: 'https://meet.google.com', icon: 'google.png' } },
  { key: 'formsService',    folder: 'forms',      defaults: { id: 'google', name: 'Google Forms', url: 'https://docs.google.com/forms', icon: 'google.png' } },
  { key: 'shoppingService', folder: 'shopping',   defaults: { id: 'google', name: 'Google Shopping', url: 'https://shopping.google.com', icon: 'google.png' } },
  { key: 'financeService',  folder: 'finance',    defaults: { id: 'google', name: 'Google Finance', url: 'https://www.google.com/finance', icon: 'google.png' } },
  { key: 'booksService',    folder: 'books',      defaults: { id: 'google', name: 'Google Livres', url: 'https://books.google.com', icon: 'google.png' } },
  { key: 'keepService',     folder: 'keep',       defaults: { id: 'google', name: 'Google Keep', url: 'https://keep.google.com', icon: 'google.png' } },
  { key: 'sitesService',    folder: 'sites',      defaults: { id: 'google', name: 'Google Sites', url: 'https://sites.google.com', icon: 'google.png' } },
  { key: 'earthService',    folder: 'earth',      defaults: { id: 'google', name: 'Google Earth', url: 'https://earth.google.com', icon: 'google.png' } },
  { key: 'bloggerService',  folder: 'blogger',    defaults: { id: 'google', name: 'Blogger', url: 'https://www.blogger.com', icon: 'google.png' } },
  { key: 'chatService',     folder: 'chat',       defaults: { id: 'google', name: 'Google Chat', url: 'https://chat.google.com', icon: 'google.png' } },
  { key: 'musicService',    folder: 'music',      defaults: { id: 'youtube', name: 'YouTube Music', url: 'https://music.youtube.com', icon: 'youtube.png' } },
];

// Service catalogs — maps service ID to { name, url, icon }
const SERVICE_CATALOGS = {
  searchEngine: {
    google: { name: 'Google', url: 'https://www.google.com', icon: 'google.png' },
    bing: { name: 'Bing', url: 'https://www.bing.com', icon: 'bing.png' },
    duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: 'duckduckgo.png' },
    brave: { name: 'Brave Search', url: 'https://search.brave.com', icon: 'brave.png' },
    startpage: { name: 'Startpage', url: 'https://www.startpage.com', icon: 'startpage.png' },
    ecosia: { name: 'Ecosia', url: 'https://www.ecosia.org', icon: 'ecosia.png' },
    qwant: { name: 'Qwant', url: 'https://www.qwant.com', icon: 'qwant.png' },
    yahoo: { name: 'Yahoo', url: 'https://search.yahoo.com', icon: 'yahoo.png' },
    yandex: { name: 'Yandex', url: 'https://yandex.com', icon: 'yandex.png' },
    mojeek: { name: 'Mojeek', url: 'https://www.mojeek.com', icon: 'mojeek.png' },
  },
  mapsService: {
    google: { name: 'Google Maps', url: 'https://maps.google.com', icon: 'google.png' },
    apple: { name: 'Apple Plans', url: 'https://maps.apple.com', icon: 'apple.png' },
    openstreetmap: { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'openstreetmap.png' },
    waze: { name: 'Waze', url: 'https://www.waze.com/live-map', icon: 'waze.png' },
    here: { name: 'HERE WeGo', url: 'https://wego.here.com', icon: 'here.png' },
  },
  videosService: {
    youtube: { name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube.png' },
    dailymotion: { name: 'Dailymotion', url: 'https://www.dailymotion.com', icon: 'dailymotion.png' },
    vimeo: { name: 'Vimeo', url: 'https://vimeo.com', icon: 'vimeo.png' },
    peertube: { name: 'PeerTube', url: 'https://joinpeertube.org', icon: 'peertube.png' },
    odysee: { name: 'Odysee', url: 'https://odysee.com', icon: 'odysee.png' },
  },
  emailService: {
    gmail: { name: 'Gmail', url: 'https://mail.google.com', icon: 'gmail.png' },
    outlook: { name: 'Outlook', url: 'https://outlook.live.com', icon: 'outlook.png' },
    protonmail: { name: 'ProtonMail', url: 'https://mail.proton.me', icon: 'protonmail.png' },
    yahoo: { name: 'Yahoo Mail', url: 'https://mail.yahoo.com', icon: 'yahoo.png' },
    tuta: { name: 'Tuta Mail', url: 'https://app.tuta.com', icon: 'tuta.png' },
  },
  driveService: {
    google: { name: 'Google Drive', url: 'https://drive.google.com', icon: 'google.png' },
    onedrive: { name: 'OneDrive', url: 'https://onedrive.live.com', icon: 'onedrive.png' },
    dropbox: { name: 'Dropbox', url: 'https://www.dropbox.com', icon: 'dropbox.png' },
    proton: { name: 'Proton Drive', url: 'https://drive.proton.me', icon: 'proton.png' },
    mega: { name: 'MEGA', url: 'https://mega.nz', icon: 'mega.png' },
  },
  calendarService: {
    google: { name: 'Google Calendar', url: 'https://calendar.google.com', icon: 'google.png' },
    outlook: { name: 'Outlook Calendar', url: 'https://outlook.live.com/calendar', icon: 'outlook.png' },
    proton: { name: 'Proton Calendar', url: 'https://calendar.proton.me', icon: 'proton.png' },
  },
  translateService: {
    google: { name: 'Google Translate', url: 'https://translate.google.com', icon: 'google.png' },
    deepl: { name: 'DeepL', url: 'https://www.deepl.com/translator', icon: 'deepl.png' },
    reverso: { name: 'Reverso', url: 'https://www.reverso.net', icon: 'reverso.png' },
  },
  aiService: {
    gemini: { name: 'Google Gemini', url: 'https://gemini.google.com', icon: 'gemini.png' },
    chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'chatgpt.png' },
    claude: { name: 'Claude', url: 'https://claude.ai', icon: 'claude.png' },
    copilot: { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', icon: 'copilot.png' },
    mistral: { name: 'Mistral Le Chat', url: 'https://chat.mistral.ai', icon: 'mistral.png' },
    perplexity: { name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'perplexity.png' },
  },
  musicService: {
    youtube: { name: 'YouTube Music', url: 'https://music.youtube.com', icon: 'youtube.png' },
    spotify: { name: 'Spotify', url: 'https://open.spotify.com', icon: 'spotify.png' },
    apple: { name: 'Apple Music', url: 'https://music.apple.com', icon: 'apple.png' },
    deezer: { name: 'Deezer', url: 'https://www.deezer.com', icon: 'deezer.png' },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const userSection = document.getElementById('user-section');
  const appsGrid = document.getElementById('apps-grid');

  const appsSearchInput = document.getElementById('apps-search');

  // Search/filter in apps grid
  appsSearchInput.addEventListener('input', () => {
    const query = appsSearchInput.value.toLowerCase();
    const items = appsGrid.querySelectorAll('.app-item');
    items.forEach(item => {
      const label = item.querySelector('.app-label');
      const name = label ? label.textContent.toLowerCase() : '';
      item.style.display = name.includes(query) ? '' : 'none';
    });
  });

  // Load settings from background
  chrome.runtime.sendMessage({ type: 'getSettings' }, (settings) => {
    if (!settings) return;

    // Apply theme
    applyTheme(settings.theme || 'system');

    // Build user section
    buildUserSection(settings, userSection);

    // Build apps grid
    buildAppsGrid(settings, appsGrid);
  });

  // Live-reload popup when settings change in storage
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;

    // Reload settings and rebuild UI
    chrome.runtime.sendMessage({ type: 'getSettings' }, (settings) => {
      if (!settings) return;
      applyTheme(settings.theme || 'system');
      buildAppsGrid(settings, appsGrid);
      buildUserSection(settings, userSection);
    });
  });
});

function buildUserSection(settings, container) {
  // Try to get user info from stored token
  let isLoggedIn = false;
  let userName = '';
  let userEmail = '';
  const lang = (settings && settings.language) || 'fr';
  const i18n = POPUP_I18N[lang] || POPUP_I18N.en;

  // Check if we have user data synced from webapp
  chrome.storage.local.get(['swallow_user_email', 'swallow_user_name'], (data) => {
    userEmail = data.swallow_user_email || '';
    userName = data.swallow_user_name || userEmail;
    isLoggedIn = !!userEmail;

    if (isLoggedIn) {
      container.innerHTML = `
        <div class="popup-user-section">
          <div class="popup-avatar">${(userName[0] || userEmail[0] || '?').toUpperCase()}</div>
          <div class="popup-user-info">
            <div class="popup-user-name">${escapeHtml(userName)}</div>
            <div class="popup-user-email">${escapeHtml(userEmail)}</div>
          </div>
        </div>`;
    } else {
      container.innerHTML = `
        <a href="https://swallow.app/login" target="_blank" class="popup-login">
          <div class="popup-login-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span class="popup-login-text">${escapeHtml(i18n.login)}</span>
        </a>`;
    }
  });
}

function buildAppsGrid(settings, container) {
  // Get custom order from storage (if any)
  chrome.storage.local.get(['appsOrder'], (data) => {
    const customOrder = data.appsOrder || null;
    const orderedServices = customOrder
      ? customOrder.map(key => SERVICES_CONFIG.find(s => s.key === key)).filter(Boolean)
      : SERVICES_CONFIG;

    // Home link first (not draggable)
    const homeIconUrl = chrome.runtime.getURL('icons/services/home.png');
    let html = `
      <a href="http://localhost:5173" target="_blank" class="app-item">
        <div class="app-icon"><img src="${homeIconUrl}" alt="Home" width="28" height="28" /></div>
        <span class="app-label">Home</span>
      </a>`;

    for (const svc of orderedServices) {
      const selectedId = settings[svc.key] || svc.defaults.id;
      const catalog = SERVICE_CATALOGS[svc.key];
      let service = svc.defaults;

      if (catalog && catalog[selectedId]) {
        service = catalog[selectedId];
      }

      const iconUrl = chrome.runtime.getURL('icons/' + svc.folder + '/' + service.icon);

      html += `
        <a href="${service.url}" target="_blank" class="app-item" draggable="true" data-key="${svc.key}">
          <div class="app-icon"><img src="${iconUrl}" alt="${escapeHtml(service.name)}" width="28" height="28" /></div>
          <span class="app-label">${escapeHtml(service.name)}</span>
        </a>`;
    }

    container.innerHTML = html;
    enableDragAndDrop(container);
  });
}

function enableDragAndDrop(container) {
  let draggedEl = null;

  container.addEventListener('dragstart', (e) => {
    const item = e.target.closest('.app-item[data-key]');
    if (!item) { e.preventDefault(); return; }
    draggedEl = item;
    item.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
  });

  container.addEventListener('dragend', (e) => {
    if (draggedEl) draggedEl.style.opacity = '';
    draggedEl = null;
    // Remove all drag-over highlights
    container.querySelectorAll('.app-item').forEach(el => el.classList.remove('drag-over'));
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.target.closest('.app-item[data-key]');
    container.querySelectorAll('.app-item').forEach(el => el.classList.remove('drag-over'));
    if (target && target !== draggedEl) target.classList.add('drag-over');
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('.app-item[data-key]');
    if (!target || !draggedEl || target === draggedEl) return;

    // Swap positions in DOM
    const items = [...container.querySelectorAll('.app-item[data-key]')];
    const dragIdx = items.indexOf(draggedEl);
    const dropIdx = items.indexOf(target);

    if (dragIdx < dropIdx) {
      target.after(draggedEl);
    } else {
      target.before(draggedEl);
    }

    // Save new order
    const newOrder = [...container.querySelectorAll('.app-item[data-key]')].map(el => el.dataset.key);
    chrome.storage.local.set({ appsOrder: newOrder });

    container.querySelectorAll('.app-item').forEach(el => el.classList.remove('drag-over'));
  });
}

function applyTheme(theme) {
  let isDark = false;
  if (theme === 'dark') {
    isDark = true;
  } else if (theme === 'system') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  // theme === 'light' → isDark stays false
  document.body.classList.toggle('dark', isDark);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
