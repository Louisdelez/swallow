// Swallow - Content Script: Persistent Top Bar (Shadow DOM approach - Firefox)
const chrome = typeof browser !== 'undefined' ? browser : chrome;

(function () {
  if (document.getElementById('swallow-topbar-host')) return;

  const GRID_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>';

  const SEARCH_ENGINES = {
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
  };

  const MAP_SERVICES = {
    google: { name: 'Google Maps', url: 'https://maps.google.com', icon: 'google.png' },
    apple: { name: 'Apple Plans', url: 'https://maps.apple.com', icon: 'apple.png' },
    openstreetmap: { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'openstreetmap.png' },
    waze: { name: 'Waze', url: 'https://www.waze.com/live-map', icon: 'waze.png' },
    here: { name: 'HERE WeGo', url: 'https://wego.here.com', icon: 'here.png' },
    osmand: { name: 'OsmAnd', url: 'https://osmand.net', icon: 'osmand.png' },
    organicmaps: { name: 'Organic Maps', url: 'https://organicmaps.app', icon: 'organicmaps.png' },
    bing: { name: 'Bing Maps', url: 'https://www.bing.com/maps', icon: 'bing.png' },
    citymapper: { name: 'Citymapper', url: 'https://citymapper.com', icon: 'citymapper.png' },
    tomtom: { name: 'TomTom', url: 'https://www.tomtom.com', icon: 'tomtom.png' },
    sygic: { name: 'Sygic', url: 'https://www.sygic.com', icon: 'sygic.png' },
  };

  const VIDEO_SERVICES = {
    youtube: { name: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube.png' },
    dailymotion: { name: 'Dailymotion', url: 'https://www.dailymotion.com', icon: 'dailymotion.png' },
    vimeo: { name: 'Vimeo', url: 'https://vimeo.com', icon: 'vimeo.png' },
    peertube: { name: 'PeerTube', url: 'https://joinpeertube.org', icon: 'peertube.png' },
    odysee: { name: 'Odysee', url: 'https://odysee.com', icon: 'odysee.png' },
    rumble: { name: 'Rumble', url: 'https://rumble.com', icon: 'rumble.png' },
    tiktok: { name: 'TikTok', url: 'https://www.tiktok.com', icon: 'tiktok.png' },
    bitchute: { name: 'Bitchute', url: 'https://www.bitchute.com', icon: 'bitchute.png' },
    archive: { name: 'Internet Archive', url: 'https://archive.org', icon: 'archive.png' },
    nebula: { name: 'Nebula', url: 'https://nebula.tv', icon: 'nebula.png' },
    dtube: { name: 'DTube', url: 'https://d.tube', icon: 'dtube.png' },
  };

  const PASSWORDS_SERVICES = {
    google: { name: 'Google Passwords', url: 'https://passwords.google.com', icon: 'google.png' },
    bitwarden: { name: 'Bitwarden', url: 'https://vault.bitwarden.com', icon: 'bitwarden.png' },
    '1password': { name: '1Password', url: 'https://my.1password.com', icon: '1password.png' },
    lastpass: { name: 'LastPass', url: 'https://lastpass.com', icon: 'lastpass.png' },
    dashlane: { name: 'Dashlane', url: 'https://app.dashlane.com', icon: 'dashlane.png' },
    proton: { name: 'Proton Pass', url: 'https://pass.proton.me', icon: 'proton.png' },
    keepass: { name: 'KeePass', url: 'https://keepass.info', icon: 'keepass.png' },
    nordpass: { name: 'NordPass', url: 'https://nordpass.com', icon: 'nordpass.png' },
    zoho: { name: 'Zoho Vault', url: 'https://www.zoho.com/vault', icon: 'zoho.png' },
    roboform: { name: 'RoboForm', url: 'https://www.roboform.com', icon: 'roboform.png' },
    enpass: { name: 'Enpass', url: 'https://www.enpass.io', icon: 'enpass.png' },
  };

  const TRANSLATE_SERVICES = {
    google: { name: 'Google Translate', url: 'https://translate.google.com', icon: 'google.png' },
    deepl: { name: 'DeepL', url: 'https://www.deepl.com/translator', icon: 'deepl.png' },
    reverso: { name: 'Reverso', url: 'https://www.reverso.net', icon: 'reverso.png' },
    microsoft: { name: 'Microsoft Translator', url: 'https://www.bing.com/translator', icon: 'microsoft.png' },
    linguee: { name: 'Linguee', url: 'https://www.linguee.com', icon: 'linguee.png' },
    yandex: { name: 'Yandex Translate', url: 'https://translate.yandex.com', icon: 'yandex.png' },
    papago: { name: 'Papago', url: 'https://papago.naver.com', icon: 'papago.png' },
    libretranslate: { name: 'LibreTranslate', url: 'https://libretranslate.com', icon: 'libretranslate.png' },
    systran: { name: 'Systran', url: 'https://www.systransoft.com/translate', icon: 'systran.png' },
    mate: { name: 'Mate Translate', url: 'https://gikken.co/mate-translate', icon: 'mate.png' },
    apertium: { name: 'Apertium', url: 'https://www.apertium.org', icon: 'apertium.png' },
  };

  const CALENDAR_SERVICES = {
    google: { name: 'Google Calendar', url: 'https://calendar.google.com', icon: 'google.png' },
    outlook: { name: 'Outlook Calendar', url: 'https://outlook.live.com/calendar', icon: 'outlook.png' },
    proton: { name: 'Proton Calendar', url: 'https://calendar.proton.me', icon: 'proton.png' },
    apple: { name: 'Apple Calendar', url: 'https://www.icloud.com/calendar', icon: 'apple.png' },
    notion: { name: 'Notion Calendar', url: 'https://www.notion.so/product/calendar', icon: 'notion.png' },
    fantastical: { name: 'Fantastical', url: 'https://flexibits.com/fantastical', icon: 'fantastical.png' },
    calcom: { name: 'Cal.com', url: 'https://cal.com', icon: 'calcom.png' },
    thunderbird: { name: 'Thunderbird Calendar', url: 'https://www.thunderbird.net', icon: 'thunderbird.png' },
    zoho: { name: 'Zoho Calendar', url: 'https://www.zoho.com/calendar', icon: 'zoho.png' },
    fastmail: { name: 'FastMail Calendar', url: 'https://www.fastmail.com', icon: 'fastmail.png' },
    nextcloud: { name: 'Nextcloud Calendar', url: 'https://nextcloud.com', icon: 'nextcloud.png' },
  };

  const DRIVE_SERVICES = {
    google: { name: 'Google Drive', url: 'https://drive.google.com', icon: 'google.png' },
    onedrive: { name: 'OneDrive', url: 'https://onedrive.live.com', icon: 'onedrive.png' },
    dropbox: { name: 'Dropbox', url: 'https://www.dropbox.com', icon: 'dropbox.png' },
    proton: { name: 'Proton Drive', url: 'https://drive.proton.me', icon: 'proton.png' },
    icloud: { name: 'iCloud Drive', url: 'https://www.icloud.com/iclouddrive', icon: 'icloud.png' },
    mega: { name: 'MEGA', url: 'https://mega.nz', icon: 'mega.png' },
    pcloud: { name: 'pCloud', url: 'https://www.pcloud.com', icon: 'pcloud.png' },
    nextcloud: { name: 'Nextcloud', url: 'https://nextcloud.com', icon: 'nextcloud.png' },
    tresorit: { name: 'Tresorit', url: 'https://tresorit.com', icon: 'tresorit.png' },
    sync: { name: 'Sync.com', url: 'https://www.sync.com', icon: 'sync.png' },
    internxt: { name: 'Internxt', url: 'https://internxt.com', icon: 'internxt.png' },
  };

  const EMAIL_SERVICES = {
    gmail: { name: 'Gmail', url: 'https://mail.google.com', icon: 'gmail.png' },
    outlook: { name: 'Outlook', url: 'https://outlook.live.com', icon: 'outlook.png' },
    protonmail: { name: 'ProtonMail', url: 'https://mail.proton.me', icon: 'protonmail.png' },
    yahoo: { name: 'Yahoo Mail', url: 'https://mail.yahoo.com', icon: 'yahoo.png' },
    tuta: { name: 'Tuta Mail', url: 'https://app.tuta.com', icon: 'tuta.png' },
    zoho: { name: 'Zoho Mail', url: 'https://mail.zoho.com', icon: 'zoho.png' },
    icloud: { name: 'iCloud Mail', url: 'https://www.icloud.com/mail', icon: 'icloud.png' },
    thunderbird: { name: 'Thunderbird', url: 'https://www.thunderbird.net', icon: 'thunderbird.png' },
    fastmail: { name: 'FastMail', url: 'https://www.fastmail.com', icon: 'fastmail.png' },
    mailfence: { name: 'Mailfence', url: 'https://mailfence.com', icon: 'mailfence.png' },
    skiff: { name: 'Skiff Mail', url: 'https://skiff.com', icon: 'skiff.png' },
  };

  const NEWS_SERVICES = {
    google: { name: 'Google News', url: 'https://news.google.com', icon: 'google.png' },
    apple: { name: 'Apple News', url: 'https://www.apple.com/apple-news', icon: 'apple.png' },
    feedly: { name: 'Feedly', url: 'https://feedly.com', icon: 'feedly.png' },
    flipboard: { name: 'Flipboard', url: 'https://flipboard.com', icon: 'flipboard.png' },
    microsoft: { name: 'Microsoft Start', url: 'https://www.msn.com/news', icon: 'microsoft.png' },
    yahoo: { name: 'Yahoo News', url: 'https://news.yahoo.com', icon: 'yahoo.png' },
    inoreader: { name: 'Inoreader', url: 'https://www.inoreader.com', icon: 'inoreader.png' },
    smartnews: { name: 'SmartNews', url: 'https://www.smartnews.com', icon: 'smartnews.png' },
    newsbreak: { name: 'NewsBreak', url: 'https://www.newsbreak.com', icon: 'newsbreak.png' },
    groundnews: { name: 'Ground News', url: 'https://ground.news', icon: 'groundnews.png' },
    artifact: { name: 'Artifact', url: 'https://artifact.news', icon: 'artifact.png' },
  };

  const AI_SERVICES = {
    gemini: { name: 'Google Gemini', url: 'https://gemini.google.com', icon: 'gemini.png' },
    chatgpt: { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'chatgpt.png' },
    claude: { name: 'Claude', url: 'https://claude.ai', icon: 'claude.png' },
    copilot: { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', icon: 'copilot.png' },
    mistral: { name: 'Mistral Le Chat', url: 'https://chat.mistral.ai', icon: 'mistral.png' },
    perplexity: { name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'perplexity.png' },
    deepseek: { name: 'DeepSeek', url: 'https://chat.deepseek.com', icon: 'deepseek.png' },
    meta: { name: 'Meta AI', url: 'https://www.meta.ai', icon: 'meta.png' },
    huggingchat: { name: 'HuggingChat', url: 'https://huggingface.co/chat', icon: 'huggingchat.png' },
    poe: { name: 'Poe', url: 'https://poe.com', icon: 'poe.png' },
    grok: { name: 'Grok', url: 'https://grok.com', icon: 'grok.png' },
  };

  const SHEETS_SERVICES = {
    google: { name: 'Google Sheets', url: 'https://docs.google.com/spreadsheets', icon: 'google.png' },
    microsoft: { name: 'Excel Online', url: 'https://www.office.com', icon: 'microsoft.png' },
    zoho: { name: 'Zoho Sheet', url: 'https://sheet.zoho.com', icon: 'zoho.png' },
    airtable: { name: 'Airtable', url: 'https://airtable.com', icon: 'airtable.png' },
    onlyoffice: { name: 'OnlyOffice', url: 'https://www.onlyoffice.com', icon: 'onlyoffice.png' },
    smartsheet: { name: 'Smartsheet', url: 'https://www.smartsheet.com', icon: 'smartsheet.png' },
    rows: { name: 'Rows', url: 'https://rows.com', icon: 'rows.png' },
    coda: { name: 'Coda', url: 'https://coda.io', icon: 'coda.png' },
    notion: { name: 'Notion', url: 'https://www.notion.so', icon: 'notion.png' },
    baserow: { name: 'Baserow', url: 'https://baserow.io', icon: 'baserow.png' },
    seatable: { name: 'SeaTable', url: 'https://seatable.io', icon: 'seatable.png' },
  };

  const MUSIC_SERVICES = {
    youtube: { name: 'YouTube Music', url: 'https://music.youtube.com', icon: 'youtube.png' },
    spotify: { name: 'Spotify', url: 'https://open.spotify.com', icon: 'spotify.png' },
    apple: { name: 'Apple Music', url: 'https://music.apple.com', icon: 'apple.png' },
    deezer: { name: 'Deezer', url: 'https://www.deezer.com', icon: 'deezer.png' },
    tidal: { name: 'Tidal', url: 'https://listen.tidal.com', icon: 'tidal.png' },
    soundcloud: { name: 'SoundCloud', url: 'https://soundcloud.com', icon: 'soundcloud.png' },
    amazon: { name: 'Amazon Music', url: 'https://music.amazon.com', icon: 'amazon.png' },
    qobuz: { name: 'Qobuz', url: 'https://www.qobuz.com', icon: 'qobuz.png' },
    pandora: { name: 'Pandora', url: 'https://www.pandora.com', icon: 'pandora.png' },
    napster: { name: 'Napster', url: 'https://www.napster.com', icon: 'napster.png' },
    audiomack: { name: 'Audiomack', url: 'https://audiomack.com', icon: 'audiomack.png' },
  };

  const CHAT_SERVICES = {
    google: { name: 'Google Chat', url: 'https://chat.google.com', icon: 'google.png' },
    slack: { name: 'Slack', url: 'https://slack.com', icon: 'slack.png' },
    microsoft: { name: 'Microsoft Teams', url: 'https://teams.microsoft.com', icon: 'microsoft.png' },
    discord: { name: 'Discord', url: 'https://discord.com', icon: 'discord.png' },
    telegram: { name: 'Telegram', url: 'https://web.telegram.org', icon: 'telegram.png' },
    whatsapp: { name: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: 'whatsapp.png' },
    signal: { name: 'Signal', url: 'https://signal.org', icon: 'signal.png' },
    element: { name: 'Element', url: 'https://app.element.io', icon: 'element.png' },
    rocketchat: { name: 'Rocket.Chat', url: 'https://rocket.chat', icon: 'rocketchat.png' },
    mattermost: { name: 'Mattermost', url: 'https://mattermost.com', icon: 'mattermost.png' },
    zulip: { name: 'Zulip', url: 'https://zulip.com', icon: 'zulip.png' },
  };

  const BLOGGER_SERVICES = {
    google: { name: 'Blogger', url: 'https://www.blogger.com', icon: 'google.png' },
    wordpress: { name: 'WordPress.com', url: 'https://wordpress.com', icon: 'wordpress.png' },
    medium: { name: 'Medium', url: 'https://medium.com', icon: 'medium.png' },
    ghost: { name: 'Ghost', url: 'https://ghost.org', icon: 'ghost.png' },
    substack: { name: 'Substack', url: 'https://substack.com', icon: 'substack.png' },
    tumblr: { name: 'Tumblr', url: 'https://www.tumblr.com', icon: 'tumblr.png' },
    hashnode: { name: 'Hashnode', url: 'https://hashnode.com', icon: 'hashnode.png' },
    devto: { name: 'Dev.to', url: 'https://dev.to', icon: 'devto.png' },
    wix: { name: 'Wix Blog', url: 'https://www.wix.com/blog', icon: 'wix.png' },
    beehiiv: { name: 'Beehiiv', url: 'https://www.beehiiv.com', icon: 'beehiiv.png' },
    writeas: { name: 'Write.as', url: 'https://write.as', icon: 'writeas.png' },
  };

  const EARTH_SERVICES = {
    google: { name: 'Google Earth', url: 'https://earth.google.com', icon: 'google.png' },
    nasa: { name: 'NASA Worldview', url: 'https://worldview.earthdata.nasa.gov', icon: 'nasa.png' },
    bing: { name: 'Bing Maps 3D', url: 'https://www.bing.com/maps', icon: 'bing.png' },
    openstreetmap: { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'openstreetmap.png' },
    cesium: { name: 'Cesium Ion', url: 'https://cesium.com/ion', icon: 'cesium.png' },
    mapbox: { name: 'Mapbox', url: 'https://www.mapbox.com', icon: 'mapbox.png' },
    here: { name: 'HERE WeGo', url: 'https://wego.here.com', icon: 'here.png' },
    arcgis: { name: 'ArcGIS Earth', url: 'https://earth.arcgis.com', icon: 'arcgis.png' },
    zoomearth: { name: 'Zoom Earth', url: 'https://zoom.earth', icon: 'zoomearth.png' },
    eobrowser: { name: 'EO Browser', url: 'https://apps.sentinel-hub.com', icon: 'eobrowser.png' },
    marble: { name: 'Marble', url: 'https://marble.kde.org', icon: 'marble.png' },
  };

  const SITES_SERVICES = {
    google: { name: 'Google Sites', url: 'https://sites.google.com', icon: 'google.png' },
    wix: { name: 'Wix', url: 'https://www.wix.com', icon: 'wix.png' },
    squarespace: { name: 'Squarespace', url: 'https://www.squarespace.com', icon: 'squarespace.png' },
    wordpress: { name: 'WordPress.com', url: 'https://wordpress.com', icon: 'wordpress.png' },
    weebly: { name: 'Weebly', url: 'https://www.weebly.com', icon: 'weebly.png' },
    webflow: { name: 'Webflow', url: 'https://webflow.com', icon: 'webflow.png' },
    carrd: { name: 'Carrd', url: 'https://carrd.co', icon: 'carrd.png' },
    jimdo: { name: 'Jimdo', url: 'https://www.jimdo.com', icon: 'jimdo.png' },
    strikingly: { name: 'Strikingly', url: 'https://www.strikingly.com', icon: 'strikingly.png' },
    notion: { name: 'Notion Sites', url: 'https://www.notion.site', icon: 'notion.png' },
    framer: { name: 'Framer', url: 'https://www.framer.com', icon: 'framer.png' },
    shopify: { name: 'Shopify', url: 'https://www.shopify.com', icon: 'shopify.png' },
  };

  const KEEP_SERVICES = {
    google: { name: 'Google Keep', url: 'https://keep.google.com', icon: 'google.png' },
    notion: { name: 'Notion', url: 'https://www.notion.so', icon: 'notion.png' },
    evernote: { name: 'Evernote', url: 'https://www.evernote.com', icon: 'evernote.png' },
    onenote: { name: 'Microsoft OneNote', url: 'https://www.onenote.com', icon: 'onenote.png' },
    apple: { name: 'Apple Notes', url: 'https://www.icloud.com/notes', icon: 'apple.png' },
    obsidian: { name: 'Obsidian', url: 'https://obsidian.md', icon: 'obsidian.png' },
    simplenote: { name: 'Simplenote', url: 'https://simplenote.com', icon: 'simplenote.png' },
    zoho: { name: 'Zoho Notebook', url: 'https://www.zoho.com/notebook', icon: 'zoho.png' },
    notesnook: { name: 'Notesnook', url: 'https://notesnook.com', icon: 'notesnook.png' },
    joplin: { name: 'Joplin', url: 'https://joplinapp.org', icon: 'joplin.png' },
    turtl: { name: 'Turtl', url: 'https://turtlapp.com', icon: 'turtl.png' },
  };

  const BOOKS_SERVICES = {
    google: { name: 'Google Livres', url: 'https://books.google.com', icon: 'google.png' },
    kindle: { name: 'Amazon Kindle', url: 'https://read.amazon.com', icon: 'kindle.png' },
    apple: { name: 'Apple Books', url: 'https://books.apple.com', icon: 'apple.png' },
    kobo: { name: 'Kobo', url: 'https://www.kobo.com', icon: 'kobo.png' },
    gutenberg: { name: 'Project Gutenberg', url: 'https://www.gutenberg.org', icon: 'gutenberg.png' },
    openlibrary: { name: 'Open Library', url: 'https://openlibrary.org', icon: 'openlibrary.png' },
    goodreads: { name: 'Goodreads', url: 'https://www.goodreads.com', icon: 'goodreads.png' },
    scribd: { name: 'Scribd', url: 'https://www.scribd.com', icon: 'scribd.png' },
    libby: { name: 'Libby', url: 'https://libbyapp.com', icon: 'libby.png' },
    bookshop: { name: 'Bookshop.org', url: 'https://bookshop.org', icon: 'bookshop.png' },
    standardebooks: { name: 'Standard Ebooks', url: 'https://standardebooks.org', icon: 'standardebooks.png' },
  };

  const FINANCE_SERVICES = {
    google: { name: 'Google Finance', url: 'https://www.google.com/finance', icon: 'google.png' },
    yahoo: { name: 'Yahoo Finance', url: 'https://finance.yahoo.com', icon: 'yahoo.png' },
    marketwatch: { name: 'MarketWatch', url: 'https://www.marketwatch.com', icon: 'marketwatch.png' },
    bloomberg: { name: 'Bloomberg', url: 'https://www.bloomberg.com/markets', icon: 'bloomberg.png' },
    investing: { name: 'Investing.com', url: 'https://www.investing.com', icon: 'investing.png' },
    tradingview: { name: 'TradingView', url: 'https://www.tradingview.com', icon: 'tradingview.png' },
    morningstar: { name: 'Morningstar', url: 'https://www.morningstar.com', icon: 'morningstar.png' },
    cnbc: { name: 'CNBC', url: 'https://www.cnbc.com/markets', icon: 'cnbc.png' },
    seekingalpha: { name: 'Seeking Alpha', url: 'https://seekingalpha.com', icon: 'seekingalpha.png' },
    finviz: { name: 'Finviz', url: 'https://finviz.com', icon: 'finviz.png' },
    stockanalysis: { name: 'Stock Analysis', url: 'https://stockanalysis.com', icon: 'stockanalysis.png' },
  };

  const SHOPPING_SERVICES = {
    google: { name: 'Google Shopping', url: 'https://shopping.google.com', icon: 'google.png' },
    amazon: { name: 'Amazon', url: 'https://www.amazon.com', icon: 'amazon.png' },
    ebay: { name: 'eBay', url: 'https://www.ebay.com', icon: 'ebay.png' },
    idealo: { name: 'Idealo', url: 'https://www.idealo.com', icon: 'idealo.png' },
    pricerunner: { name: 'PriceRunner', url: 'https://www.pricerunner.com', icon: 'pricerunner.png' },
    shopzilla: { name: 'Shopzilla', url: 'https://www.shopzilla.com', icon: 'shopzilla.png' },
    kelkoo: { name: 'Kelkoo', url: 'https://www.kelkoo.com', icon: 'kelkoo.png' },
    bing: { name: 'Bing Shopping', url: 'https://www.bing.com/shop', icon: 'bing.png' },
    become: { name: 'Become', url: 'https://www.become.com', icon: 'become.png' },
    pricespy: { name: 'PriceSpy', url: 'https://pricespy.co.uk', icon: 'pricespy.png' },
    leguide: { name: 'Leguide', url: 'https://www.leguide.com', icon: 'leguide.png' },
  };

  const FORMS_SERVICES = {
    google: { name: 'Google Forms', url: 'https://docs.google.com/forms', icon: 'google.png' },
    microsoft: { name: 'Microsoft Forms', url: 'https://forms.office.com', icon: 'microsoft.png' },
    typeform: { name: 'Typeform', url: 'https://www.typeform.com', icon: 'typeform.png' },
    jotform: { name: 'JotForm', url: 'https://www.jotform.com', icon: 'jotform.png' },
    surveymonkey: { name: 'SurveyMonkey', url: 'https://www.surveymonkey.com', icon: 'surveymonkey.png' },
    tally: { name: 'Tally', url: 'https://tally.so', icon: 'tally.png' },
    airtable: { name: 'Airtable Forms', url: 'https://airtable.com', icon: 'airtable.png' },
    zoho: { name: 'Zoho Forms', url: 'https://www.zoho.com/forms', icon: 'zoho.png' },
    cognitoforms: { name: 'Cognito Forms', url: 'https://www.cognitoforms.com', icon: 'cognitoforms.png' },
    fillout: { name: 'Fillout', url: 'https://www.fillout.com', icon: 'fillout.png' },
    paperform: { name: 'Paperform', url: 'https://paperform.co', icon: 'paperform.png' },
  };

  const MEET_SERVICES = {
    google: { name: 'Google Meet', url: 'https://meet.google.com', icon: 'google.png' },
    zoom: { name: 'Zoom', url: 'https://zoom.us', icon: 'zoom.png' },
    microsoft: { name: 'Microsoft Teams', url: 'https://teams.microsoft.com', icon: 'microsoft.png' },
    jitsi: { name: 'Jitsi Meet', url: 'https://meet.jit.si', icon: 'jitsi.png' },
    whereby: { name: 'Whereby', url: 'https://whereby.com', icon: 'whereby.png' },
    webex: { name: 'Cisco Webex', url: 'https://webex.com', icon: 'webex.png' },
    skype: { name: 'Skype', url: 'https://web.skype.com', icon: 'skype.png' },
    discord: { name: 'Discord', url: 'https://discord.com', icon: 'discord.png' },
    butter: { name: 'Butter', url: 'https://butter.us', icon: 'butter.png' },
    livestorm: { name: 'Livestorm', url: 'https://livestorm.co', icon: 'livestorm.png' },
    lark: { name: 'Lark', url: 'https://www.larksuite.com', icon: 'lark.png' },
  };

  const SLIDES_SERVICES = {
    google: { name: 'Google Slides', url: 'https://docs.google.com/presentation', icon: 'google.png' },
    microsoft: { name: 'PowerPoint Online', url: 'https://www.office.com', icon: 'microsoft.png' },
    canva: { name: 'Canva', url: 'https://www.canva.com', icon: 'canva.png' },
    prezi: { name: 'Prezi', url: 'https://prezi.com', icon: 'prezi.png' },
    beautifulai: { name: 'Beautiful.ai', url: 'https://www.beautiful.ai', icon: 'beautifulai.png' },
    pitch: { name: 'Pitch', url: 'https://pitch.com', icon: 'pitch.png' },
    zoho: { name: 'Zoho Show', url: 'https://show.zoho.com', icon: 'zoho.png' },
    visme: { name: 'Visme', url: 'https://www.visme.co', icon: 'visme.png' },
    genially: { name: 'Genially', url: 'https://genially.com', icon: 'genially.png' },
    tome: { name: 'Tome', url: 'https://tome.app', icon: 'tome.png' },
    gamma: { name: 'Gamma', url: 'https://gamma.app', icon: 'gamma.png' },
  };

  const DOCS_SERVICES = {
    google: { name: 'Google Docs', url: 'https://docs.google.com', icon: 'google.png' },
    microsoft: { name: 'Microsoft Word Online', url: 'https://www.office.com', icon: 'microsoft.png' },
    zoho: { name: 'Zoho Writer', url: 'https://writer.zoho.com', icon: 'zoho.png' },
    onlyoffice: { name: 'OnlyOffice', url: 'https://www.onlyoffice.com', icon: 'onlyoffice.png' },
    notion: { name: 'Notion', url: 'https://www.notion.so', icon: 'notion.png' },
    coda: { name: 'Coda', url: 'https://coda.io', icon: 'coda.png' },
    dropbox: { name: 'Dropbox Paper', url: 'https://paper.dropbox.com', icon: 'dropbox.png' },
    quip: { name: 'Quip', url: 'https://quip.com', icon: 'quip.png' },
    canva: { name: 'Canva Docs', url: 'https://www.canva.com/docs', icon: 'canva.png' },
    slite: { name: 'Slite', url: 'https://slite.com', icon: 'slite.png' },
    craft: { name: 'Craft', url: 'https://www.craft.do', icon: 'craft.png' },
    proton: { name: 'Proton Docs', url: 'https://docs.proton.me', icon: 'proton.png' },
  };

  const CONTACTS_SERVICES = {
    google: { name: 'Google Contacts', url: 'https://contacts.google.com', icon: 'google.png' },
    icloud: { name: 'iCloud Contacts', url: 'https://www.icloud.com/contacts', icon: 'icloud.png' },
    outlook: { name: 'Outlook Contacts', url: 'https://outlook.live.com/people', icon: 'outlook.png' },
    hubspot: { name: 'HubSpot CRM', url: 'https://www.hubspot.com/products/crm', icon: 'hubspot.png' },
    zoho: { name: 'Zoho ContactManager', url: 'https://www.zoho.com/contactmanager', icon: 'zoho.png' },
    cardhop: { name: 'Cardhop', url: 'https://flexibits.com/cardhop', icon: 'cardhop.png' },
    monica: { name: 'Monica CRM', url: 'https://www.monicahq.com', icon: 'monica.png' },
    contactsplus: { name: 'Contacts+', url: 'https://www.contactsplus.com', icon: 'contactsplus.png' },
    cloze: { name: 'Cloze', url: 'https://www.cloze.com', icon: 'cloze.png' },
    covve: { name: 'Covve', url: 'https://www.covve.com', icon: 'covve.png' },
    nimble: { name: 'Nimble', url: 'https://www.nimble.com', icon: 'nimble.png' },
  };

  const PHOTOS_SERVICES = {
    google: { name: 'Google Photos', url: 'https://photos.google.com', icon: 'google.png' },
    icloud: { name: 'iCloud Photos', url: 'https://www.icloud.com/photos', icon: 'icloud.png' },
    amazon: { name: 'Amazon Photos', url: 'https://www.amazon.com/photos', icon: 'amazon.png' },
    flickr: { name: 'Flickr', url: 'https://www.flickr.com', icon: 'flickr.png' },
    samsung: { name: 'Samsung Gallery', url: 'https://gallery.samsung.com', icon: 'samsung.png' },
    onedrive: { name: 'OneDrive Photos', url: 'https://onedrive.live.com/photos', icon: 'onedrive.png' },
    dropbox: { name: 'Dropbox Photos', url: 'https://www.dropbox.com/photos', icon: 'dropbox.png' },
    '500px': { name: '500px', url: 'https://500px.com', icon: '500px.png' },
    smugmug: { name: 'SmugMug', url: 'https://www.smugmug.com', icon: 'smugmug.png' },
    lightroom: { name: 'Adobe Lightroom', url: 'https://lightroom.adobe.com', icon: 'lightroom.png' },
    shutterfly: { name: 'Shutterfly', url: 'https://www.shutterfly.com', icon: 'shutterfly.png' },
  };

  const STORE_SERVICES = {
    google: { name: 'Google Play', url: 'https://play.google.com', icon: 'google.png' },
    fdroid: { name: 'F-Droid', url: 'https://f-droid.org', icon: 'fdroid.png' },
    apkmirror: { name: 'APKMirror', url: 'https://www.apkmirror.com', icon: 'apkmirror.png' },
    aurora: { name: 'Aurora Store', url: 'https://auroraoss.com', icon: 'aurora.png' },
    aptoide: { name: 'Aptoide', url: 'https://www.aptoide.com', icon: 'aptoide.png' },
    amazon: { name: 'Amazon Appstore', url: 'https://www.amazon.com/gp/mas/get/amazonapp', icon: 'amazon.png' },
    samsung: { name: 'Galaxy Store', url: 'https://galaxystore.samsung.com', icon: 'samsung.png' },
    apple: { name: 'Apple App Store', url: 'https://www.apple.com/app-store', icon: 'apple.png' },
    huawei: { name: 'Huawei AppGallery', url: 'https://appgallery.huawei.com', icon: 'huawei.png' },
    uptodown: { name: 'Uptodown', url: 'https://www.uptodown.com', icon: 'uptodown.png' },
    apkpure: { name: 'APKPure', url: 'https://apkpure.com', icon: 'apkpure.png' },
  };

  const GOOGLE_SERVICES = [
    { name: 'Compte', url: 'https://myaccount.google.com', icon: 'compte.png' },
  ];

  function injectBar(settings) {
    const theme = settings.theme || 'system';
    const searchEngine = settings.searchEngineData || { name: 'Google', url: 'https://www.google.com/search?q=' };

    const isLocal = window.location.hostname === 'localhost';
    const baseUrl = isLocal ? window.location.origin : 'https://swallow.app';

    const emailId = settings.emailService || 'gmail';
    const em = EMAIL_SERVICES[emailId] || EMAIL_SERVICES.gmail;

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

    // Build apps grid HTML — search engine + maps first, then Google services
    const searchId = settings.searchEngine || 'google';
    const se = SEARCH_ENGINES[searchId] || SEARCH_ENGINES.google;
    const searchIconUrl = chrome.runtime.getURL('icons/search/' + se.icon);

    const mapsId = settings.mapsService || 'google';
    const ms = MAP_SERVICES[mapsId] || MAP_SERVICES.google;
    const mapsIconUrl = chrome.runtime.getURL('icons/maps/' + ms.icon);

    const videosId = settings.videosService || 'youtube';
    const vs = VIDEO_SERVICES[videosId] || VIDEO_SERVICES.youtube;
    const videosIconUrl = chrome.runtime.getURL('icons/videos/' + vs.icon);

    const storeId = settings.storeService || 'google';
    const st = STORE_SERVICES[storeId] || STORE_SERVICES.google;
    const storeIconUrl = chrome.runtime.getURL('icons/store/' + st.icon);

    const emailIconUrl = chrome.runtime.getURL('icons/email/' + em.icon);

    const driveId = settings.driveService || 'google';
    const dr = DRIVE_SERVICES[driveId] || DRIVE_SERVICES.google;
    const driveIconUrl = chrome.runtime.getURL('icons/drive/' + dr.icon);

    const calendarId = settings.calendarService || 'google';
    const cal = CALENDAR_SERVICES[calendarId] || CALENDAR_SERVICES.google;
    const calendarIconUrl = chrome.runtime.getURL('icons/calendar/' + cal.icon);

    const translateId = settings.translateService || 'google';
    const tr = TRANSLATE_SERVICES[translateId] || TRANSLATE_SERVICES.google;
    const translateIconUrl = chrome.runtime.getURL('icons/translate/' + tr.icon);

    const passwordsId = settings.passwordsService || 'google';
    const pw = PASSWORDS_SERVICES[passwordsId] || PASSWORDS_SERVICES.google;
    const passwordsIconUrl = chrome.runtime.getURL('icons/passwords/' + pw.icon);

    const aiId = settings.aiService || 'gemini';
    const ai = AI_SERVICES[aiId] || AI_SERVICES.gemini;
    const aiIconUrl = chrome.runtime.getURL('icons/ai/' + ai.icon);

    const newsId = settings.newsService || 'google';
    const nw = NEWS_SERVICES[newsId] || NEWS_SERVICES.google;
    const newsIconUrl = chrome.runtime.getURL('icons/news/' + nw.icon);

    const photosId = settings.photosService || 'google';
    const ph = PHOTOS_SERVICES[photosId] || PHOTOS_SERVICES.google;
    const photosIconUrl = chrome.runtime.getURL('icons/photos/' + ph.icon);

    const contactsId = settings.contactsService || 'google';
    const ct = CONTACTS_SERVICES[contactsId] || CONTACTS_SERVICES.google;
    const contactsIconUrl = chrome.runtime.getURL('icons/contacts/' + ct.icon);

    const docsId = settings.docsService || 'google';
    const dc = DOCS_SERVICES[docsId] || DOCS_SERVICES.google;
    const docsIconUrl = chrome.runtime.getURL('icons/docs/' + dc.icon);

    const sheetsId = settings.sheetsService || 'google';
    const sh = SHEETS_SERVICES[sheetsId] || SHEETS_SERVICES.google;
    const sheetsIconUrl = chrome.runtime.getURL('icons/sheets/' + sh.icon);

    const slidesId = settings.slidesService || 'google';
    const sl = SLIDES_SERVICES[slidesId] || SLIDES_SERVICES.google;
    const slidesIconUrl = chrome.runtime.getURL('icons/slides/' + sl.icon);

    const meetId = settings.meetService || 'google';
    const mt = MEET_SERVICES[meetId] || MEET_SERVICES.google;
    const meetIconUrl = chrome.runtime.getURL('icons/meet/' + mt.icon);

    const formsId = settings.formsService || 'google';
    const fm = FORMS_SERVICES[formsId] || FORMS_SERVICES.google;
    const formsIconUrl = chrome.runtime.getURL('icons/forms/' + fm.icon);

    const shoppingId = settings.shoppingService || 'google';
    const sp = SHOPPING_SERVICES[shoppingId] || SHOPPING_SERVICES.google;
    const shoppingIconUrl = chrome.runtime.getURL('icons/shopping/' + sp.icon);

    const financeId = settings.financeService || 'google';
    const fn = FINANCE_SERVICES[financeId] || FINANCE_SERVICES.google;
    const financeIconUrl = chrome.runtime.getURL('icons/finance/' + fn.icon);

    const booksId = settings.booksService || 'google';
    const bk = BOOKS_SERVICES[booksId] || BOOKS_SERVICES.google;
    const booksIconUrl = chrome.runtime.getURL('icons/books/' + bk.icon);

    const keepId = settings.keepService || 'google';
    const kp = KEEP_SERVICES[keepId] || KEEP_SERVICES.google;
    const keepIconUrl = chrome.runtime.getURL('icons/keep/' + kp.icon);

    const sitesId = settings.sitesService || 'google';
    const si = SITES_SERVICES[sitesId] || SITES_SERVICES.google;
    const sitesIconUrl = chrome.runtime.getURL('icons/sites/' + si.icon);

    const earthId = settings.earthService || 'google';
    const ea = EARTH_SERVICES[earthId] || EARTH_SERVICES.google;
    const earthIconUrl = chrome.runtime.getURL('icons/earth/' + ea.icon);

    const bloggerId = settings.bloggerService || 'google';
    const bl = BLOGGER_SERVICES[bloggerId] || BLOGGER_SERVICES.google;
    const bloggerIconUrl = chrome.runtime.getURL('icons/blogger/' + bl.icon);

    const chatId = settings.chatService || 'google';
    const ch = CHAT_SERVICES[chatId] || CHAT_SERVICES.google;
    const chatIconUrl = chrome.runtime.getURL('icons/chat/' + ch.icon);

    const musicId = settings.musicService || 'youtube';
    const mu = MUSIC_SERVICES[musicId] || MUSIC_SERVICES.youtube;
    const musicIconUrl = chrome.runtime.getURL('icons/music/' + mu.icon);

    let appsHTML = `
        <a href="${se.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${searchIconUrl}" alt="${se.name}" width="28" height="28" /></div>
          <span class="app-label">${se.name}</span>
        </a>
        <a href="${ms.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${mapsIconUrl}" alt="${ms.name}" width="28" height="28" /></div>
          <span class="app-label">${ms.name}</span>
        </a>
        <a href="${vs.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${videosIconUrl}" alt="${vs.name}" width="28" height="28" /></div>
          <span class="app-label">${vs.name}</span>
        </a>
        <a href="${st.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${storeIconUrl}" alt="${st.name}" width="28" height="28" /></div>
          <span class="app-label">${st.name}</span>
        </a>
        <a href="${em.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${emailIconUrl}" alt="${em.name}" width="28" height="28" /></div>
          <span class="app-label">${em.name}</span>
        </a>
        <a href="${dr.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${driveIconUrl}" alt="${dr.name}" width="28" height="28" /></div>
          <span class="app-label">${dr.name}</span>
        </a>
        <a href="${cal.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${calendarIconUrl}" alt="${cal.name}" width="28" height="28" /></div>
          <span class="app-label">${cal.name}</span>
        </a>
        <a href="${tr.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${translateIconUrl}" alt="${tr.name}" width="28" height="28" /></div>
          <span class="app-label">${tr.name}</span>
        </a>
        <a href="${pw.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${passwordsIconUrl}" alt="${pw.name}" width="28" height="28" /></div>
          <span class="app-label">${pw.name}</span>
        </a>
        <a href="${ai.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${aiIconUrl}" alt="${ai.name}" width="28" height="28" /></div>
          <span class="app-label">${ai.name}</span>
        </a>
        <a href="${nw.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${newsIconUrl}" alt="${nw.name}" width="28" height="28" /></div>
          <span class="app-label">${nw.name}</span>
        </a>
        <a href="${ph.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${photosIconUrl}" alt="${ph.name}" width="28" height="28" /></div>
          <span class="app-label">${ph.name}</span>
        </a>
        <a href="${ct.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${contactsIconUrl}" alt="${ct.name}" width="28" height="28" /></div>
          <span class="app-label">${ct.name}</span>
        </a>
        <a href="${dc.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${docsIconUrl}" alt="${dc.name}" width="28" height="28" /></div>
          <span class="app-label">${dc.name}</span>
        </a>
        <a href="${sh.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${sheetsIconUrl}" alt="${sh.name}" width="28" height="28" /></div>
          <span class="app-label">${sh.name}</span>
        </a>
        <a href="${sl.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${slidesIconUrl}" alt="${sl.name}" width="28" height="28" /></div>
          <span class="app-label">${sl.name}</span>
        </a>
        <a href="${mt.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${meetIconUrl}" alt="${mt.name}" width="28" height="28" /></div>
          <span class="app-label">${mt.name}</span>
        </a>
        <a href="${fm.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${formsIconUrl}" alt="${fm.name}" width="28" height="28" /></div>
          <span class="app-label">${fm.name}</span>
        </a>
        <a href="${sp.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${shoppingIconUrl}" alt="${sp.name}" width="28" height="28" /></div>
          <span class="app-label">${sp.name}</span>
        </a>
        <a href="${fn.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${financeIconUrl}" alt="${fn.name}" width="28" height="28" /></div>
          <span class="app-label">${fn.name}</span>
        </a>
        <a href="${bk.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${booksIconUrl}" alt="${bk.name}" width="28" height="28" /></div>
          <span class="app-label">${bk.name}</span>
        </a>
        <a href="${kp.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${keepIconUrl}" alt="${kp.name}" width="28" height="28" /></div>
          <span class="app-label">${kp.name}</span>
        </a>
        <a href="${si.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${sitesIconUrl}" alt="${si.name}" width="28" height="28" /></div>
          <span class="app-label">${si.name}</span>
        </a>
        <a href="${ea.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${earthIconUrl}" alt="${ea.name}" width="28" height="28" /></div>
          <span class="app-label">${ea.name}</span>
        </a>
        <a href="${bl.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${bloggerIconUrl}" alt="${bl.name}" width="28" height="28" /></div>
          <span class="app-label">${bl.name}</span>
        </a>
        <a href="${ch.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${chatIconUrl}" alt="${ch.name}" width="28" height="28" /></div>
          <span class="app-label">${ch.name}</span>
        </a>
        <a href="${mu.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${musicIconUrl}" alt="${mu.name}" width="28" height="28" /></div>
          <span class="app-label">${mu.name}</span>
        </a>`;
    GOOGLE_SERVICES.forEach(svc => {
      const iconUrl = chrome.runtime.getURL('icons/services/' + svc.icon);
      appsHTML += `
        <a href="${svc.url}" target="_blank" class="app-item">
          <div class="app-icon"><img src="${iconUrl}" alt="${svc.name}" width="28" height="28" /></div>
          <span class="app-label">${svc.name}</span>
        </a>`;
    });

    // Create host element
    const host = document.createElement('div');
    host.id = 'swallow-topbar-host';
    host.style.cssText = 'position:fixed !important; top:0 !important; left:0 !important; right:0 !important; height:48px !important; z-index:2147483647 !important; display:block !important;';

    // Attach shadow DOM for full CSS isolation
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

        /* Apps Drawer */
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
          <a href="https://addons.mozilla.org" target="_blank" class="bar-link">Firefox Store</a>
        </div>
        <div class="bar-right">
          <a href="${em.url}" target="_blank" class="bar-link">${em.name}</a>
          <a href="${searchEngine.url ? searchEngine.url.split('?')[0] : 'https://www.google.com/imghp'}" target="_blank" class="bar-link">${searchEngine.name || 'Google'}</a>
          <button class="bar-icon-btn" id="apps-btn" title="Applications">${GRID_ICON}</button>
          ${userSection}
        </div>
        <div class="apps-drawer" id="apps-drawer">
          <div class="apps-header">Google Apps</div>
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

    // Insert into page — BEFORE body, so it's not affected by body styles
    document.documentElement.insertBefore(host, document.body);

    // Transform body down by 48px — this pushes ALL elements including position:fixed
    const pageStyle = document.createElement('style');
    pageStyle.textContent = `
      body {
        transform: translateY(48px) !important;
        height: calc(100% - 48px) !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
    `;
    document.head.appendChild(pageStyle);
  }

  // Sync settings from webapp localStorage to extension storage
  function syncFromWebapp(callback) {
    try {
      const servicesStr = localStorage.getItem('swallow_services');
      const theme = localStorage.getItem('swallow_theme');
      const data = {};
      if (servicesStr) {
        const services = JSON.parse(servicesStr);
        if (services.search) data.searchEngine = services.search;
        if (services.maps) data.mapsService = services.maps;
        if (services.videos) data.videosService = services.videos;
        if (services.store) data.storeService = services.store;
        if (services.email) data.emailService = services.email;
        if (services.drive) data.driveService = services.drive;
        if (services.calendar) data.calendarService = services.calendar;
        if (services.translate) data.translateService = services.translate;
        if (services.passwords) data.passwordsService = services.passwords;
        if (services.ai) data.aiService = services.ai;
        if (services.news) data.newsService = services.news;
        if (services.photos) data.photosService = services.photos;
        if (services.contacts) data.contactsService = services.contacts;
        if (services.docs) data.docsService = services.docs;
        if (services.sheets) data.sheetsService = services.sheets;
        if (services.slides) data.slidesService = services.slides;
        if (services.meet) data.meetService = services.meet;
        if (services.forms) data.formsService = services.forms;
        if (services.shopping) data.shoppingService = services.shopping;
        if (services.finance) data.financeService = services.finance;
        if (services.books) data.booksService = services.books;
        if (services.keep) data.keepService = services.keep;
        if (services.sites) data.sitesService = services.sites;
        if (services.earth) data.earthService = services.earth;
        if (services.blogger) data.bloggerService = services.blogger;
        if (services.chat) data.chatService = services.chat;
        if (services.music) data.musicService = services.music;
      }
      if (theme) data.theme = theme;
      if (Object.keys(data).length > 0) {
        chrome.runtime.sendMessage({ type: 'updateSettings', data }, () => {
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
    const host = document.getElementById('swallow-topbar-host');
    if (host) host.remove();
    syncFromWebapp(loadAndInject);
  }

  // If on the webapp, sync settings first, then inject
  if (window.location.hostname === 'localhost' || window.location.hostname === 'swallow.app') {
    syncFromWebapp(loadAndInject);
    window.addEventListener('storage', reloadBar);
    window.addEventListener('swallow-services-updated', reloadBar);
  } else {
    loadAndInject();
  }
})();
