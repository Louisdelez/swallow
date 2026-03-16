// Swallow - Content Script: Persistent Top Bar (Shadow DOM approach - Firefox)
const chrome = typeof browser !== 'undefined' ? browser : chrome;


(function () {
  if (document.getElementById('swallow-topbar-host')) return;

  const SWALLOW_ORIGINS = ['http://localhost:5173', 'https://swallow.app'];
  const isSwallowWebapp = SWALLOW_ORIGINS.includes(window.location.origin);

  // Guard: only run on the Swallow webapp
  if (!isSwallowWebapp) return;

  const GRID_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>';

  // Service key mapping: extension storage key → { folder, default, catalogs }
  const SERVICES = {
    searchEngine: { folder: 'search', default: 'google', catalog: {
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
    }},
    mapsService: { folder: 'maps', default: 'google', catalog: {
      google: { name: 'Google Maps', url: 'https://maps.google.com', icon: 'google.png' },
      apple: { name: 'Apple Plans', url: 'https://maps.apple.com', icon: 'apple.png' },
      openstreetmap: { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'openstreetmap.png' },
      waze: { name: 'Waze', url: 'https://www.waze.com/live-map', icon: 'waze.png' },
      here: { name: 'HERE WeGo', url: 'https://wego.here.com', icon: 'here.png' },
    }},
    videosService: { folder: 'videos', default: 'youtube', catalog: {
      youtube: { name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube.png' },
      dailymotion: { name: 'Dailymotion', url: 'https://www.dailymotion.com', icon: 'dailymotion.png' },
      vimeo: { name: 'Vimeo', url: 'https://vimeo.com', icon: 'vimeo.png' },
      peertube: { name: 'PeerTube', url: 'https://joinpeertube.org', icon: 'peertube.png' },
      odysee: { name: 'Odysee', url: 'https://odysee.com', icon: 'odysee.png' },
    }},
    storeService: { folder: 'store', default: 'google', catalog: {
      google: { name: 'Google Play', url: 'https://play.google.com', icon: 'google.png' },
      fdroid: { name: 'F-Droid', url: 'https://f-droid.org', icon: 'fdroid.png' },
      apple: { name: 'Apple App Store', url: 'https://www.apple.com/app-store', icon: 'apple.png' },
    }},
    emailService: { folder: 'email', default: 'gmail', catalog: {
      gmail: { name: 'Gmail', url: 'https://mail.google.com', icon: 'gmail.png' },
      outlook: { name: 'Outlook', url: 'https://outlook.live.com', icon: 'outlook.png' },
      protonmail: { name: 'ProtonMail', url: 'https://mail.proton.me', icon: 'protonmail.png' },
      yahoo: { name: 'Yahoo Mail', url: 'https://mail.yahoo.com', icon: 'yahoo.png' },
      tuta: { name: 'Tuta Mail', url: 'https://app.tuta.com', icon: 'tuta.png' },
    }},
    driveService: { folder: 'drive', default: 'google', catalog: {
      google: { name: 'Google Drive', url: 'https://drive.google.com', icon: 'google.png' },
      onedrive: { name: 'OneDrive', url: 'https://onedrive.live.com', icon: 'onedrive.png' },
      dropbox: { name: 'Dropbox', url: 'https://www.dropbox.com', icon: 'dropbox.png' },
      proton: { name: 'Proton Drive', url: 'https://drive.proton.me', icon: 'proton.png' },
      mega: { name: 'MEGA', url: 'https://mega.nz', icon: 'mega.png' },
    }},
    calendarService: { folder: 'calendar', default: 'google', catalog: {
      google: { name: 'Google Calendar', url: 'https://calendar.google.com', icon: 'google.png' },
      outlook: { name: 'Outlook Calendar', url: 'https://outlook.live.com/calendar', icon: 'outlook.png' },
      proton: { name: 'Proton Calendar', url: 'https://calendar.proton.me', icon: 'proton.png' },
    }},
    translateService: { folder: 'translate', default: 'google', catalog: {
      google: { name: 'Google Translate', url: 'https://translate.google.com', icon: 'google.png' },
      deepl: { name: 'DeepL', url: 'https://www.deepl.com/translator', icon: 'deepl.png' },
      reverso: { name: 'Reverso', url: 'https://www.reverso.net', icon: 'reverso.png' },
    }},
    passwordsService: { folder: 'passwords', default: 'google', catalog: {
      google: { name: 'Google Passwords', url: 'https://passwords.google.com', icon: 'google.png' },
      bitwarden: { name: 'Bitwarden', url: 'https://vault.bitwarden.com', icon: 'bitwarden.png' },
      '1password': { name: '1Password', url: 'https://my.1password.com', icon: '1password.png' },
      lastpass: { name: 'LastPass', url: 'https://lastpass.com', icon: 'lastpass.png' },
      dashlane: { name: 'Dashlane', url: 'https://app.dashlane.com', icon: 'dashlane.png' },
      proton: { name: 'Proton Pass', url: 'https://pass.proton.me', icon: 'proton.png' },
    }},
    aiService: { folder: 'ai', default: 'gemini', catalog: {
      gemini: { name: 'Google Gemini', url: 'https://gemini.google.com', icon: 'gemini.png' },
      chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'chatgpt.png' },
      claude: { name: 'Claude', url: 'https://claude.ai', icon: 'claude.png' },
      copilot: { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', icon: 'copilot.png' },
      mistral: { name: 'Mistral Le Chat', url: 'https://chat.mistral.ai', icon: 'mistral.png' },
      perplexity: { name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'perplexity.png' },
    }},
    newsService: { folder: 'news', default: 'google', catalog: {
      google: { name: 'Google News', url: 'https://news.google.com', icon: 'google.png' },
      feedly: { name: 'Feedly', url: 'https://feedly.com', icon: 'feedly.png' },
      flipboard: { name: 'Flipboard', url: 'https://flipboard.com', icon: 'flipboard.png' },
    }},
    photosService: { folder: 'photos', default: 'google', catalog: {
      google: { name: 'Google Photos', url: 'https://photos.google.com', icon: 'google.png' },
      icloud: { name: 'iCloud Photos', url: 'https://www.icloud.com/photos', icon: 'icloud.png' },
      flickr: { name: 'Flickr', url: 'https://www.flickr.com', icon: 'flickr.png' },
    }},
    contactsService: { folder: 'contacts', default: 'google', catalog: {
      google: { name: 'Google Contacts', url: 'https://contacts.google.com', icon: 'google.png' },
      icloud: { name: 'iCloud Contacts', url: 'https://www.icloud.com/contacts', icon: 'icloud.png' },
      outlook: { name: 'Outlook Contacts', url: 'https://outlook.live.com/people', icon: 'outlook.png' },
    }},
    docsService: { folder: 'docs', default: 'google', catalog: {
      google: { name: 'Google Docs', url: 'https://docs.google.com', icon: 'google.png' },
      microsoft: { name: 'Microsoft Word Online', url: 'https://www.office.com', icon: 'microsoft.png' },
      notion: { name: 'Notion', url: 'https://www.notion.so', icon: 'notion.png' },
    }},
    sheetsService: { folder: 'sheets', default: 'google', catalog: {
      google: { name: 'Google Sheets', url: 'https://docs.google.com/spreadsheets', icon: 'google.png' },
      microsoft: { name: 'Excel Online', url: 'https://www.office.com', icon: 'microsoft.png' },
      airtable: { name: 'Airtable', url: 'https://airtable.com', icon: 'airtable.png' },
    }},
    slidesService: { folder: 'slides', default: 'google', catalog: {
      google: { name: 'Google Slides', url: 'https://docs.google.com/presentation', icon: 'google.png' },
      microsoft: { name: 'PowerPoint Online', url: 'https://www.office.com', icon: 'microsoft.png' },
      canva: { name: 'Canva', url: 'https://www.canva.com', icon: 'canva.png' },
    }},
    meetService: { folder: 'meet', default: 'google', catalog: {
      google: { name: 'Google Meet', url: 'https://meet.google.com', icon: 'google.png' },
      zoom: { name: 'Zoom', url: 'https://zoom.us', icon: 'zoom.png' },
      microsoft: { name: 'Microsoft Teams', url: 'https://teams.microsoft.com', icon: 'microsoft.png' },
      jitsi: { name: 'Jitsi Meet', url: 'https://meet.jit.si', icon: 'jitsi.png' },
    }},
    formsService: { folder: 'forms', default: 'google', catalog: {
      google: { name: 'Google Forms', url: 'https://docs.google.com/forms', icon: 'google.png' },
      microsoft: { name: 'Microsoft Forms', url: 'https://forms.office.com', icon: 'microsoft.png' },
      typeform: { name: 'Typeform', url: 'https://www.typeform.com', icon: 'typeform.png' },
    }},
    shoppingService: { folder: 'shopping', default: 'google', catalog: {
      google: { name: 'Google Shopping', url: 'https://shopping.google.com', icon: 'google.png' },
      amazon: { name: 'Amazon', url: 'https://www.amazon.com', icon: 'amazon.png' },
      ebay: { name: 'eBay', url: 'https://www.ebay.com', icon: 'ebay.png' },
    }},
    financeService: { folder: 'finance', default: 'google', catalog: {
      google: { name: 'Google Finance', url: 'https://www.google.com/finance', icon: 'google.png' },
      yahoo: { name: 'Yahoo Finance', url: 'https://finance.yahoo.com', icon: 'yahoo.png' },
      tradingview: { name: 'TradingView', url: 'https://www.tradingview.com', icon: 'tradingview.png' },
    }},
    booksService: { folder: 'books', default: 'google', catalog: {
      google: { name: 'Google Livres', url: 'https://books.google.com', icon: 'google.png' },
      kindle: { name: 'Amazon Kindle', url: 'https://read.amazon.com', icon: 'kindle.png' },
      openlibrary: { name: 'Open Library', url: 'https://openlibrary.org', icon: 'openlibrary.png' },
    }},
    keepService: { folder: 'keep', default: 'google', catalog: {
      google: { name: 'Google Keep', url: 'https://keep.google.com', icon: 'google.png' },
      notion: { name: 'Notion', url: 'https://www.notion.so', icon: 'notion.png' },
      evernote: { name: 'Evernote', url: 'https://www.evernote.com', icon: 'evernote.png' },
      obsidian: { name: 'Obsidian', url: 'https://obsidian.md', icon: 'obsidian.png' },
    }},
    sitesService: { folder: 'sites', default: 'google', catalog: {
      google: { name: 'Google Sites', url: 'https://sites.google.com', icon: 'google.png' },
      wix: { name: 'Wix', url: 'https://www.wix.com', icon: 'wix.png' },
      wordpress: { name: 'WordPress.com', url: 'https://wordpress.com', icon: 'wordpress.png' },
    }},
    earthService: { folder: 'earth', default: 'google', catalog: {
      google: { name: 'Google Earth', url: 'https://earth.google.com', icon: 'google.png' },
      nasa: { name: 'NASA Worldview', url: 'https://worldview.earthdata.nasa.gov', icon: 'nasa.png' },
    }},
    bloggerService: { folder: 'blogger', default: 'google', catalog: {
      google: { name: 'Blogger', url: 'https://www.blogger.com', icon: 'google.png' },
      wordpress: { name: 'WordPress.com', url: 'https://wordpress.com', icon: 'wordpress.png' },
      medium: { name: 'Medium', url: 'https://medium.com', icon: 'medium.png' },
    }},
    chatService: { folder: 'chat', default: 'google', catalog: {
      google: { name: 'Google Chat', url: 'https://chat.google.com', icon: 'google.png' },
      slack: { name: 'Slack', url: 'https://slack.com', icon: 'slack.png' },
      discord: { name: 'Discord', url: 'https://discord.com', icon: 'discord.png' },
      telegram: { name: 'Telegram', url: 'https://web.telegram.org', icon: 'telegram.png' },
    }},
    musicService: { folder: 'music', default: 'youtube', catalog: {
      youtube: { name: 'YouTube Music', url: 'https://music.youtube.com', icon: 'youtube.png' },
      spotify: { name: 'Spotify', url: 'https://open.spotify.com', icon: 'spotify.png' },
      apple: { name: 'Apple Music', url: 'https://music.apple.com', icon: 'apple.png' },
      deezer: { name: 'Deezer', url: 'https://www.deezer.com', icon: 'deezer.png' },
    }},
  };

  // Ordered service keys for the apps grid
  const SERVICE_ORDER = [
    'searchEngine', 'mapsService', 'videosService', 'storeService',
    'emailService', 'driveService', 'calendarService', 'translateService',
    'passwordsService', 'aiService', 'newsService', 'photosService',
    'contactsService', 'docsService', 'sheetsService', 'slidesService',
    'meetService', 'formsService', 'shoppingService', 'financeService',
    'booksService', 'keepService', 'sitesService', 'earthService',
    'bloggerService', 'chatService', 'musicService',
  ];

  // Webapp key → extension key mapping
  const WEBAPP_TO_EXT_KEY = {
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

  // Helper: resolve a service from settings
  function resolveService(serviceKey, settings) {
    const svc = SERVICES[serviceKey];
    if (!svc) return null;
    const selectedId = settings[serviceKey] || svc.default;
    const entry = svc.catalog[selectedId] || svc.catalog[svc.default];
    return { ...entry, folder: svc.folder };
  }

  // Track observers and timers for cleanup
  let fixedObserver = null;
  let pageStyle = null;

  function cleanupBar() {
    const host = document.getElementById('swallow-topbar-host');
    if (host) host.remove();
    if (fixedObserver) {
      fixedObserver.disconnect();
      fixedObserver = null;
    }
    if (pageStyle) {
      pageStyle.remove();
      pageStyle = null;
    }
    // Reset shifted elements
    document.querySelectorAll('[data-swallow-shifted]').forEach(el => {
      el.style.removeProperty('top');
      delete el.dataset.swallowShifted;
    });
  }

  function injectBar(settings) {
    cleanupBar();

    const theme = settings.theme || 'system';
    const baseUrl = window.location.origin;

    // Resolve email for top bar link
    const email = resolveService('emailService', settings);
    const searchEngine = resolveService('searchEngine', settings);

    // Check login
    let isLoggedIn = false;
    let userName = '';
    try {
      const token = localStorage.getItem('swallow_token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          isLoggedIn = true;
          userName = payload.email || '';
        }
      }
    } catch (e) {}

    const userSection = isLoggedIn
      ? `<button class="bar-icon-btn bar-avatar" id="user-btn" title="Compte">${userName[0]?.toUpperCase() || '?'}</button>`
      : `<a href="${baseUrl}/login" class="bar-login">Se connecter</a>`;

    // Build apps grid HTML using data-driven approach
    const homeIconUrl = chrome.runtime.getURL('icons/services/home.png');
    let appsHTML = `
        <a href="${baseUrl}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${homeIconUrl}" alt="Home" width="28" height="28" /></div>
          <span class="app-label">Home</span>
        </a>`;

    for (const key of SERVICE_ORDER) {
      const svc = resolveService(key, settings);
      if (!svc) continue;
      const iconUrl = chrome.runtime.getURL('icons/' + svc.folder + '/' + svc.icon);
      appsHTML += `
        <a href="${svc.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${iconUrl}" alt="${svc.name}" width="28" height="28" /></div>
          <span class="app-label">${svc.name}</span>
        </a>`;
    }

    // Google account link
    const compteIconUrl = chrome.runtime.getURL('icons/services/compte.png');
    appsHTML += `
        <a href="https://myaccount.google.com" target="_blank" class="app-item">
          <div class="app-icon"><img src="${compteIconUrl}" alt="Compte" width="28" height="28" /></div>
          <span class="app-label">Compte</span>
        </a>`;

    // Create host element
    const host = document.createElement('div');
    host.id = 'swallow-topbar-host';
    host.style.cssText = 'position:fixed !important; top:0 !important; left:0 !important; right:0 !important; height:48px !important; z-index:2147483647 !important; display:block !important;';

    const shadow = host.attachShadow({ mode: 'open' });

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
    const loginBg = isDark ? '#8ab4f8' : '#4285f4';
    const loginColor = isDark ? '#1f1f1f' : '#fff';
    const loginHoverBg = isDark ? '#aecbfa' : '#3367d6';

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
        .bar-avatar {
          width: 32px; height: 32px; background: #4285f4; color: white;
          border-radius: 50%; font-size: 14px; font-weight: 500;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .bar-avatar:hover { opacity: 0.85; }
        .bar-login {
          display: inline-flex; align-items: center; padding: 8px 20px;
          background: ${loginBg}; color: ${loginColor}; border-radius: 8px;
          font-size: 13px; font-weight: 500; text-decoration: none;
          white-space: nowrap; transition: background-color 0.15s, box-shadow 0.15s;
          margin-left: 4px;
        }
        .bar-login:hover { background: ${loginHoverBg}; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
        .apps-drawer {
          position: absolute; top: 52px; right: 50px; width: 340px;
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
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .apps-header { font-size: 15px; font-weight: 500; padding: 4px 8px 14px; color: ${headerColor}; }
        .apps-search-wrap {
          position: relative; padding: 0 4px 12px;
        }
        .apps-search-wrap .search-icon {
          position: absolute; left: 14px; top: 9px; width: 14px; height: 14px;
          color: ${labelColor}; pointer-events: none;
        }
        .apps-search {
          width: 100%; padding: 8px 12px 8px 34px; border: 1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'};
          border-radius: 20px; background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'};
          color: ${headerColor}; font-size: 12px; outline: none;
          font-family: inherit; transition: border-color 0.15s;
        }
        .apps-search::placeholder { color: ${labelColor}; }
        .apps-search:focus { border-color: #4285f4; }
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
          <a href="${baseUrl}/settings" class="bar-link">À propos</a>
          <a href="https://chromewebstore.google.com" target="_blank" class="bar-link">Chrome Store</a>
        </div>
        <div class="bar-right">
          <a href="${email.url}" target="_blank" class="bar-link">${email.name}</a>
          <a href="${searchEngine.url}" target="_blank" class="bar-link">${searchEngine.name}</a>
          <button class="bar-icon-btn" id="apps-btn" title="Applications">${GRID_ICON}</button>
          ${userSection}
        </div>
        <div class="apps-drawer" id="apps-drawer">
          <div class="apps-header">Applications</div>
          <div class="apps-search-wrap">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="apps-search" id="apps-search" placeholder="Rechercher..." autocomplete="off" />
          </div>
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

    // Search/filter in apps drawer
    const appsSearchInput = shadow.getElementById('apps-search');
    appsSearchInput.addEventListener('input', () => {
      const query = appsSearchInput.value.toLowerCase();
      const items = shadow.querySelectorAll('.apps-grid .app-item');
      items.forEach(item => {
        const label = item.querySelector('.app-label');
        const name = label ? label.textContent.toLowerCase() : '';
        item.style.display = name.includes(query) ? '' : 'none';
      });
    });

    // Alt+A keyboard shortcut to toggle apps drawer
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        drawer.classList.toggle('open');
        if (drawer.classList.contains('open')) {
          appsSearchInput.focus();
        }
      }
    });

    // Insert into page
    document.documentElement.insertBefore(host, document.body);

    // Push page content down by 48px
    pageStyle = document.createElement('style');
    pageStyle.textContent = 'html { padding-top: 48px !important; }';
    document.head.appendChild(pageStyle);

    // Shift position:fixed elements down
    function shiftFixedElements() {
      const els = document.body.querySelectorAll('*');
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el.dataset.swallowShifted) continue;
        const cs = getComputedStyle(el);
        if (cs.position !== 'fixed') continue;
        const currentTop = parseInt(cs.top, 10);
        if (isNaN(currentTop) || currentTop < 0) continue;
        el.style.setProperty('top', (currentTop + 48) + 'px', 'important');
        el.dataset.swallowShifted = '1';
      }
    }
    setTimeout(shiftFixedElements, 800);
    setTimeout(shiftFixedElements, 2500);

    let shiftTimer;
    fixedObserver = new MutationObserver(() => {
      clearTimeout(shiftTimer);
      shiftTimer = setTimeout(shiftFixedElements, 500);
    });
    fixedObserver.observe(document.body, { childList: true, subtree: true });
  }

  // Sync settings from webapp localStorage to extension storage
  function syncFromWebapp(callback) {
    try {
      const servicesStr = localStorage.getItem('swallow_services');
      const theme = localStorage.getItem('swallow_theme');
      const data = {};

      if (servicesStr) {
        const services = JSON.parse(servicesStr);
        for (const [webKey, extKey] of Object.entries(WEBAPP_TO_EXT_KEY)) {
          if (services[webKey]) data[extKey] = services[webKey];
        }
      }
      if (theme) data.theme = theme;

      // Sync user info for popup profile display
      const token = localStorage.getItem('swallow_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            if (payload.email) data.swallow_user_email = payload.email;
            if (payload.name) data.swallow_user_name = payload.name;
          } else {
            data.swallow_user_email = '';
            data.swallow_user_name = '';
          }
        } catch (e) {}
      } else {
        data.swallow_user_email = '';
        data.swallow_user_name = '';
      }

      if (Object.keys(data).length > 0) {
        chrome.runtime.sendMessage({ type: 'updateSettings', data }, () => {
          if (chrome.runtime.lastError) { /* ignore */ }
          if (callback) callback();
        });
        return;
      }
    } catch (e) {}
    if (callback) callback();
  }

  function loadAndInject() {
    chrome.runtime.sendMessage({ type: 'getSettings' }, (settings) => {
      if (chrome.runtime.lastError || !settings || !settings.barVisible) return;
      injectBar(settings);
    });
  }

  function reloadBar() {
    syncFromWebapp(loadAndInject);
  }

  // Flag to prevent infinite loop: storage.onChanged → postMessage → settingsFromWebapp → storage.onChanged
  let isRelayingFromExtension = false;

  // Listen for postMessage from webapp (settings updates)
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    // Validate origin
    if (event.origin && !SWALLOW_ORIGINS.includes(event.origin)) return;
    if (!event.data || event.data.type !== 'swallow-settings-update') return;
    if (event.data.source !== 'swallow-webapp') return;

    const { payload } = event.data;
    if (!payload) return;

    const data = {};
    if (payload.theme) data.theme = payload.theme;
    if (payload.services) Object.assign(data, payload.services);

    if (Object.keys(data).length > 0) {
      chrome.runtime.sendMessage({ type: 'settingsFromWebapp', data }, () => {
        if (chrome.runtime.lastError) { /* ignore */ }
      });
    }
  });

  // Listen for chrome.storage changes and relay to webapp + update top bar
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    // Prevent infinite loop
    if (isRelayingFromExtension) return;

    // Rebuild top bar
    reloadBar();

    // Notify webapp of changes from extension
    isRelayingFromExtension = true;
    const payload = {};
    const services = {};
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key === 'theme') payload.theme = newValue;
      else if (key === 'barVisible' || key.startsWith('swallow_')) { /* skip */ }
      else if (key.endsWith('Service') || key === 'searchEngine') {
        services[key] = newValue;
      }
    }
    if (Object.keys(services).length > 0) payload.services = services;
    if (Object.keys(payload).length > 0) {
      window.postMessage({
        type: 'swallow-settings-changed',
        source: 'swallow-extension',
        payload,
      }, window.location.origin);
    }
    // Reset flag after a tick to allow future updates
    setTimeout(() => { isRelayingFromExtension = false; }, 100);
  });

  // Initialize: sync from webapp then inject
  syncFromWebapp(loadAndInject);
  window.addEventListener('storage', reloadBar);
  window.addEventListener('swallow-services-updated', reloadBar);
})();
