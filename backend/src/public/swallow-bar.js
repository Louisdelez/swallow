/**
 * Swallow Top Bar SDK
 *
 * Add the Swallow navigation bar to any website.
 *
 * Usage:
 *   <script src="http://localhost:3001/swallow-bar.js" data-token="USER_JWT_TOKEN"></script>
 *
 *   Or without auth (uses default services):
 *   <script src="http://localhost:3001/swallow-bar.js"></script>
 *
 *   Options via data attributes:
 *   - data-token    : JWT token for authenticated user (loads their preferences)
 *   - data-theme    : "light" | "dark" | "system" (default: "system")
 *   - data-api      : Custom API base URL (default: script origin)
 *   - data-position : "top" | "bottom" (default: "top")
 */
(function () {
  'use strict';

  if (document.getElementById('swallow-bar-host')) return;

  // --- Read config from script tag ---
  const scriptTag = document.currentScript || document.querySelector('script[src*="swallow-bar"]');
  const config = {
    token: scriptTag?.getAttribute('data-token') || null,
    theme: scriptTag?.getAttribute('data-theme') || 'system',
    apiBase: scriptTag?.getAttribute('data-api') || (scriptTag ? new URL(scriptTag.src).origin : ''),
    position: scriptTag?.getAttribute('data-position') || 'top',
  };

  // --- Default services ---
  const DEFAULTS = {
    search:    { id: 'google',  name: 'Google',            url: 'https://www.google.com',           icon: 'google.png',  folder: 'search' },
    maps:      { id: 'google',  name: 'Google Maps',       url: 'https://maps.google.com',          icon: 'google.png',  folder: 'maps' },
    videos:    { id: 'youtube', name: 'YouTube',            url: 'https://www.youtube.com',          icon: 'youtube.png', folder: 'videos' },
    email:     { id: 'gmail',   name: 'Gmail',              url: 'https://mail.google.com',          icon: 'gmail.png',   folder: 'email' },
    drive:     { id: 'google',  name: 'Google Drive',       url: 'https://drive.google.com',         icon: 'google.png',  folder: 'drive' },
    calendar:  { id: 'google',  name: 'Google Calendar',    url: 'https://calendar.google.com',      icon: 'google.png',  folder: 'calendar' },
    translate: { id: 'google',  name: 'Google Translate',   url: 'https://translate.google.com',     icon: 'google.png',  folder: 'translate' },
    passwords: { id: 'google',  name: 'Google Passwords',   url: 'https://passwords.google.com',     icon: 'google.png',  folder: 'passwords' },
    ai:        { id: 'gemini',  name: 'Google Gemini',      url: 'https://gemini.google.com',        icon: 'gemini.png',  folder: 'ai' },
    news:      { id: 'google',  name: 'Google News',        url: 'https://news.google.com',          icon: 'google.png',  folder: 'news' },
    photos:    { id: 'google',  name: 'Google Photos',      url: 'https://photos.google.com',        icon: 'google.png',  folder: 'photos' },
    contacts:  { id: 'google',  name: 'Google Contacts',    url: 'https://contacts.google.com',      icon: 'google.png',  folder: 'contacts' },
    docs:      { id: 'google',  name: 'Google Docs',        url: 'https://docs.google.com',          icon: 'google.png',  folder: 'docs' },
    sheets:    { id: 'google',  name: 'Google Sheets',      url: 'https://docs.google.com/spreadsheets', icon: 'google.png', folder: 'sheets' },
    slides:    { id: 'google',  name: 'Google Slides',      url: 'https://docs.google.com/presentation', icon: 'google.png', folder: 'slides' },
    meet:      { id: 'google',  name: 'Google Meet',        url: 'https://meet.google.com',          icon: 'google.png',  folder: 'meet' },
    forms:     { id: 'google',  name: 'Google Forms',       url: 'https://docs.google.com/forms',    icon: 'google.png',  folder: 'forms' },
    shopping:  { id: 'google',  name: 'Google Shopping',    url: 'https://shopping.google.com',      icon: 'google.png',  folder: 'shopping' },
    finance:   { id: 'google',  name: 'Google Finance',     url: 'https://www.google.com/finance',   icon: 'google.png',  folder: 'finance' },
    books:     { id: 'google',  name: 'Google Livres',      url: 'https://books.google.com',         icon: 'google.png',  folder: 'books' },
    keep:      { id: 'google',  name: 'Google Keep',        url: 'https://keep.google.com',          icon: 'google.png',  folder: 'keep' },
    sites:     { id: 'google',  name: 'Google Sites',       url: 'https://sites.google.com',         icon: 'google.png',  folder: 'sites' },
    earth:     { id: 'google',  name: 'Google Earth',       url: 'https://earth.google.com',         icon: 'google.png',  folder: 'earth' },
    blogger:   { id: 'google',  name: 'Blogger',            url: 'https://www.blogger.com',          icon: 'google.png',  folder: 'blogger' },
    chat:      { id: 'google',  name: 'Google Chat',        url: 'https://chat.google.com',          icon: 'google.png',  folder: 'chat' },
    music:     { id: 'youtube', name: 'YouTube Music',      url: 'https://music.youtube.com',        icon: 'youtube.png', folder: 'music' },
  };

  const GRID_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>';

  // --- Service catalogs (subset for resolution) ---
  const CATALOGS = {
    search:    { google: { name: 'Google', url: 'https://www.google.com', icon: 'google.png' }, bing: { name: 'Bing', url: 'https://www.bing.com', icon: 'bing.png' }, duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: 'duckduckgo.png' }, brave: { name: 'Brave Search', url: 'https://search.brave.com', icon: 'brave.png' }, ecosia: { name: 'Ecosia', url: 'https://www.ecosia.org', icon: 'ecosia.png' }, qwant: { name: 'Qwant', url: 'https://www.qwant.com', icon: 'qwant.png' } },
    maps:      { google: { name: 'Google Maps', url: 'https://maps.google.com', icon: 'google.png' }, apple: { name: 'Apple Plans', url: 'https://maps.apple.com', icon: 'apple.png' }, openstreetmap: { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'openstreetmap.png' }, waze: { name: 'Waze', url: 'https://www.waze.com/live-map', icon: 'waze.png' } },
    videos:    { youtube: { name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube.png' }, dailymotion: { name: 'Dailymotion', url: 'https://www.dailymotion.com', icon: 'dailymotion.png' }, vimeo: { name: 'Vimeo', url: 'https://vimeo.com', icon: 'vimeo.png' } },
    email:     { gmail: { name: 'Gmail', url: 'https://mail.google.com', icon: 'gmail.png' }, outlook: { name: 'Outlook', url: 'https://outlook.live.com', icon: 'outlook.png' }, protonmail: { name: 'ProtonMail', url: 'https://mail.proton.me', icon: 'protonmail.png' } },
    drive:     { google: { name: 'Google Drive', url: 'https://drive.google.com', icon: 'google.png' }, onedrive: { name: 'OneDrive', url: 'https://onedrive.live.com', icon: 'onedrive.png' }, dropbox: { name: 'Dropbox', url: 'https://www.dropbox.com', icon: 'dropbox.png' } },
    calendar:  { google: { name: 'Google Calendar', url: 'https://calendar.google.com', icon: 'google.png' }, outlook: { name: 'Outlook Calendar', url: 'https://outlook.live.com/calendar', icon: 'outlook.png' }, proton: { name: 'Proton Calendar', url: 'https://calendar.proton.me', icon: 'proton.png' } },
    translate: { google: { name: 'Google Translate', url: 'https://translate.google.com', icon: 'google.png' }, deepl: { name: 'DeepL', url: 'https://www.deepl.com/translator', icon: 'deepl.png' }, reverso: { name: 'Reverso', url: 'https://www.reverso.net', icon: 'reverso.png' } },
    passwords: { google: { name: 'Google Passwords', url: 'https://passwords.google.com', icon: 'google.png' }, bitwarden: { name: 'Bitwarden', url: 'https://vault.bitwarden.com', icon: 'bitwarden.png' } },
    ai:        { gemini: { name: 'Google Gemini', url: 'https://gemini.google.com', icon: 'gemini.png' }, chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'chatgpt.png' }, claude: { name: 'Claude', url: 'https://claude.ai', icon: 'claude.png' }, copilot: { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', icon: 'copilot.png' }, mistral: { name: 'Mistral Le Chat', url: 'https://chat.mistral.ai', icon: 'mistral.png' }, perplexity: { name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'perplexity.png' } },
    music:     { youtube: { name: 'YouTube Music', url: 'https://music.youtube.com', icon: 'youtube.png' }, spotify: { name: 'Spotify', url: 'https://open.spotify.com', icon: 'spotify.png' }, deezer: { name: 'Deezer', url: 'https://www.deezer.com', icon: 'deezer.png' } },
    news:      { google: { name: 'Google News', url: 'https://news.google.com', icon: 'google.png' } },
    photos:    { google: { name: 'Google Photos', url: 'https://photos.google.com', icon: 'google.png' } },
    contacts:  { google: { name: 'Google Contacts', url: 'https://contacts.google.com', icon: 'google.png' } },
    docs:      { google: { name: 'Google Docs', url: 'https://docs.google.com', icon: 'google.png' } },
    sheets:    { google: { name: 'Google Sheets', url: 'https://docs.google.com/spreadsheets', icon: 'google.png' } },
    slides:    { google: { name: 'Google Slides', url: 'https://docs.google.com/presentation', icon: 'google.png' } },
    meet:      { google: { name: 'Google Meet', url: 'https://meet.google.com', icon: 'google.png' } },
    forms:     { google: { name: 'Google Forms', url: 'https://docs.google.com/forms', icon: 'google.png' } },
    shopping:  { google: { name: 'Google Shopping', url: 'https://shopping.google.com', icon: 'google.png' } },
    finance:   { google: { name: 'Google Finance', url: 'https://www.google.com/finance', icon: 'google.png' } },
    books:     { google: { name: 'Google Livres', url: 'https://books.google.com', icon: 'google.png' } },
    keep:      { google: { name: 'Google Keep', url: 'https://keep.google.com', icon: 'google.png' } },
    sites:     { google: { name: 'Google Sites', url: 'https://sites.google.com', icon: 'google.png' } },
    earth:     { google: { name: 'Google Earth', url: 'https://earth.google.com', icon: 'google.png' } },
    blogger:   { google: { name: 'Blogger', url: 'https://www.blogger.com', icon: 'google.png' } },
    chat:      { google: { name: 'Google Chat', url: 'https://chat.google.com', icon: 'google.png' } },
  };

  function resolveService(category, selectedId) {
    const def = DEFAULTS[category];
    if (!selectedId || selectedId === def.id) return def;
    const catalog = CATALOGS[category];
    if (catalog && catalog[selectedId]) {
      return { ...catalog[selectedId], folder: def.folder };
    }
    return def;
  }

  function iconUrl(folder, icon) {
    return `${config.apiBase}/icons/${folder}/${icon}`;
  }

  // --- Fetch user preferences if token provided ---
  async function loadPreferences() {
    if (!config.token) return {};
    try {
      const res = await fetch(`${config.apiBase}/api/preferences`, {
        headers: { Authorization: `Bearer ${config.token}` },
      });
      if (!res.ok) return {};
      const data = await res.json();
      return data.preferences?.default_services || {};
    } catch (e) {
      return {};
    }
  }

  // --- Build and inject the bar ---
  function injectBar(userServices) {
    const theme = config.theme;

    // Resolve services
    const services = {};
    for (const cat of Object.keys(DEFAULTS)) {
      services[cat] = resolveService(cat, userServices[cat]);
    }

    const email = services.email;
    const search = services.search;

    // Determine dark mode
    let isDark = false;
    if (theme === 'dark') isDark = true;
    else if (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) isDark = true;

    const bg = isDark ? '#1f1f1f' : '#ffffff';
    const textColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)';
    const hoverText = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.87)';
    const hoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
    const drawerBg = isDark ? '#2d2d2d' : '#ffffff';
    const drawerShadow = isDark ? '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)' : '0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)';
    const headerColor = isDark ? '#e8eaed' : '#202124';
    const labelColor = isDark ? '#9aa0a6' : '#5f6368';

    // Build apps HTML — Home first
    const homeUrl = config.apiBase || 'http://localhost:5173';
    let appsHTML = `
      <a href="${homeUrl}" target="_blank" class="app-item">
        <div class="app-icon"><img src="${iconUrl('services', 'home.png')}" alt="Home" width="28" height="28" /></div>
        <span class="app-label">Home</span>
      </a>`;
    for (const cat of Object.keys(DEFAULTS)) {
      const svc = services[cat];
      const icon = iconUrl(svc.folder, svc.icon);
      appsHTML += `
        <a href="${svc.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${icon}" alt="${svc.name}" width="28" height="28" /></div>
          <span class="app-label">${svc.name}</span>
        </a>`;
    }

    // Create host with Shadow DOM
    const host = document.createElement('div');
    host.id = 'swallow-bar-host';
    const pos = config.position === 'bottom' ? 'bottom' : 'top';
    host.style.cssText = `position:fixed !important; ${pos}:0 !important; left:0 !important; right:0 !important; height:48px !important; z-index:2147483647 !important; display:block !important;`;

    const shadow = host.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host { all: initial; display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .bar {
          display: flex; align-items: center; justify-content: space-between;
          height: 48px; padding: 0 20px;
          background: ${bg}; color: ${textColor}; font-size: 13px;
          position: relative;
        }
        .bar-left, .bar-right { display: flex; align-items: center; gap: 8px; }
        .bar-link {
          padding: 6px 12px; border-radius: 6px; color: inherit;
          text-decoration: none; white-space: nowrap; font-size: 13px;
          transition: background-color 0.15s, color 0.15s;
        }
        .bar-link:hover { color: ${hoverText}; background: ${hoverBg}; }
        .bar-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border: none; background: none;
          border-radius: 50%; cursor: pointer; color: inherit;
          transition: background-color 0.15s; padding: 0;
        }
        .bar-icon-btn:hover { background: ${hoverBg}; }
        .apps-drawer {
          position: absolute; ${pos === 'top' ? 'top: 52px' : 'bottom: 52px'}; right: 20px; width: 340px;
          max-height: 480px; overflow-y: auto; background: ${drawerBg};
          scrollbar-width: none; -ms-overflow-style: none;
          border-radius: 16px; box-shadow: ${drawerShadow};
          padding: 16px; display: none; z-index: 99;
        }
        .apps-drawer::-webkit-scrollbar { display: none; }
        .apps-drawer.open {
          display: block;
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(${pos === 'top' ? '-4px' : '4px'}) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .apps-header { font-size: 15px; font-weight: 500; padding: 4px 8px 14px; color: ${headerColor}; }
        .apps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
        .app-item {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 14px 8px; border-radius: 10px; text-decoration: none;
          color: inherit; transition: background-color 0.15s;
        }
        .app-item:hover { background: ${hoverBg}; }
        .app-icon {
          width: 48px; height: 48px; border-radius: 50%; display: flex;
          align-items: center; justify-content: center; background: transparent;
        }
        .app-icon img { width: 28px; height: 28px; object-fit: contain; }
        .app-label {
          font-size: 11px; text-align: center; max-width: 80px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          color: ${labelColor};
        }
      </style>
      <div class="bar">
        <div class="bar-left">
          <a href="${email.url}" target="_blank" class="bar-link">${email.name}</a>
          <a href="${search.url}" target="_blank" class="bar-link">${search.name}</a>
        </div>
        <div class="bar-right">
          <button class="bar-icon-btn" id="apps-btn" title="Applications">${GRID_ICON}</button>
        </div>
        <div class="apps-drawer" id="apps-drawer">
          <div class="apps-header">Applications</div>
          <div class="apps-grid">${appsHTML}</div>
        </div>
      </div>
    `;

    // Toggle drawer
    const appsBtn = shadow.getElementById('apps-btn');
    const drawer = shadow.getElementById('apps-drawer');
    appsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
    });
    document.addEventListener('click', () => drawer.classList.remove('open'));
    drawer.addEventListener('click', (e) => e.stopPropagation());

    // Insert into page
    document.documentElement.insertBefore(host, document.body);

    // Push page content down/up
    if (pos === 'top') {
      const pageStyle = document.createElement('style');
      pageStyle.id = 'swallow-bar-offset';
      pageStyle.textContent = 'html { padding-top: 48px !important; }';
      document.head.appendChild(pageStyle);
    }
  }

  // --- SSE: listen for real-time updates ---
  let sseController = null;
  let sseRetryDelay = 1000;
  const SSE_MAX_RETRY = 60000;

  function connectSSE(onUpdate) {
    if (!config.token) return;
    if (sseController) sseController.abort();
    sseController = new AbortController();

    fetch(`${config.apiBase}/api/preferences/stream`, {
      headers: { Authorization: `Bearer ${config.token}` },
      signal: sseController.signal,
    }).then(async (response) => {
      if (!response.ok) return;
      sseRetryDelay = 1000; // Reset on successful connection
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        let eventType = '', dataStr = '';
        for (const line of lines) {
          if (line.startsWith('event: ')) eventType = line.slice(7);
          else if (line.startsWith('data: ')) dataStr = line.slice(6);
          else if (line === '' && eventType === 'preferences-update' && dataStr) {
            try {
              const prefs = JSON.parse(dataStr);
              const svc = typeof prefs.default_services === 'string'
                ? JSON.parse(prefs.default_services) : (prefs.default_services || {});
              onUpdate(svc);
            } catch (e) {}
            eventType = ''; dataStr = '';
          }
        }
      }
    }).catch((e) => {
      if (e.name !== 'AbortError') {
        setTimeout(() => connectSSE(onUpdate), sseRetryDelay);
        sseRetryDelay = Math.min(sseRetryDelay * 2, SSE_MAX_RETRY);
      }
    });
  }

  // --- Public API: destroy() ---
  window.SwallowBar = {
    destroy() {
      if (sseController) { sseController.abort(); sseController = null; }
      const host = document.getElementById('swallow-bar-host');
      if (host) host.remove();
      const offset = document.getElementById('swallow-bar-offset');
      if (offset) offset.remove();
    }
  };

  // --- Init ---
  async function init() {
    const userServices = await loadPreferences();
    injectBar(userServices);

    // Listen for real-time updates
    connectSSE((updatedServices) => {
      const host = document.getElementById('swallow-bar-host');
      if (host) host.remove();
      const offset = document.getElementById('swallow-bar-offset');
      if (offset) offset.remove();
      injectBar(updatedServices);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
