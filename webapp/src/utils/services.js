export const serviceCategories = {
  search: {
    icon: 'search',
    options: [
      { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=', icon: 'search', img: '/icons/search/google.png' },
      { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=', icon: 'search', img: '/icons/search/bing.png' },
      { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: 'search', img: '/icons/search/duckduckgo.png' },
      { id: 'brave', name: 'Brave Search', url: 'https://search.brave.com/search?q=', icon: 'search', img: '/icons/search/brave.png' },
      { id: 'startpage', name: 'Startpage', url: 'https://www.startpage.com/sp/search?query=', icon: 'search', img: '/icons/search/startpage.png' },
      { id: 'ecosia', name: 'Ecosia', url: 'https://www.ecosia.org/search?q=', icon: 'search', img: '/icons/search/ecosia.png' },
      { id: 'qwant', name: 'Qwant', url: 'https://www.qwant.com/?q=', icon: 'search', img: '/icons/search/qwant.png' },
      { id: 'yahoo', name: 'Yahoo', url: 'https://search.yahoo.com/search?p=', icon: 'search', img: '/icons/search/yahoo.png' },
      { id: 'yandex', name: 'Yandex', url: 'https://yandex.com/search/?text=', icon: 'search', img: '/icons/search/yandex.png' },
      { id: 'mojeek', name: 'Mojeek', url: 'https://www.mojeek.com/search?q=', icon: 'search', img: '/icons/search/mojeek.png' },
    ]
  },
  email: {
    icon: 'mail',
    options: [
      { id: 'gmail', name: 'Gmail', url: 'https://mail.google.com', icon: 'mail', img: '/icons/email/gmail.png' },
      { id: 'outlook', name: 'Outlook', url: 'https://outlook.live.com', icon: 'mail', img: '/icons/email/outlook.png' },
      { id: 'protonmail', name: 'ProtonMail', url: 'https://mail.proton.me', icon: 'mail', img: '/icons/email/protonmail.png' },
      { id: 'yahoo', name: 'Yahoo Mail', url: 'https://mail.yahoo.com', icon: 'mail', img: '/icons/email/yahoo.png' },
      { id: 'tuta', name: 'Tuta Mail', url: 'https://app.tuta.com', icon: 'mail', img: '/icons/email/tuta.png' },
      { id: 'zoho', name: 'Zoho Mail', url: 'https://mail.zoho.com', icon: 'mail', img: '/icons/email/zoho.png' },
      { id: 'icloud', name: 'iCloud Mail', url: 'https://www.icloud.com/mail', icon: 'mail', img: '/icons/email/icloud.png' },
      { id: 'thunderbird', name: 'Thunderbird', url: 'https://www.thunderbird.net', icon: 'mail', img: '/icons/email/thunderbird.png' },
      { id: 'fastmail', name: 'FastMail', url: 'https://www.fastmail.com', icon: 'mail', img: '/icons/email/fastmail.png' },
      { id: 'mailfence', name: 'Mailfence', url: 'https://mailfence.com', icon: 'mail', img: '/icons/email/mailfence.png' },
      { id: 'skiff', name: 'Skiff Mail', url: 'https://skiff.com', icon: 'mail', img: '/icons/email/skiff.png' },
    ]
  },
  calendar: {
    icon: 'calendar',
    options: [
      { id: 'google', name: 'Google Calendar', url: 'https://calendar.google.com', icon: 'calendar', img: '/icons/calendar/google.png' },
      { id: 'outlook', name: 'Outlook Calendar', url: 'https://outlook.live.com/calendar', icon: 'calendar', img: '/icons/calendar/outlook.png' },
      { id: 'proton', name: 'Proton Calendar', url: 'https://calendar.proton.me', icon: 'calendar', img: '/icons/calendar/proton.png' },
      { id: 'apple', name: 'Apple Calendar', url: 'https://www.icloud.com/calendar', icon: 'calendar', img: '/icons/calendar/apple.png' },
      { id: 'notion', name: 'Notion Calendar', url: 'https://www.notion.so/product/calendar', icon: 'calendar', img: '/icons/calendar/notion.png' },
      { id: 'fantastical', name: 'Fantastical', url: 'https://flexibits.com/fantastical', icon: 'calendar', img: '/icons/calendar/fantastical.png' },
      { id: 'calcom', name: 'Cal.com', url: 'https://cal.com', icon: 'calendar', img: '/icons/calendar/calcom.png' },
      { id: 'thunderbird', name: 'Thunderbird Calendar', url: 'https://www.thunderbird.net', icon: 'calendar', img: '/icons/calendar/thunderbird.png' },
      { id: 'zoho', name: 'Zoho Calendar', url: 'https://www.zoho.com/calendar', icon: 'calendar', img: '/icons/calendar/zoho.png' },
      { id: 'fastmail', name: 'FastMail Calendar', url: 'https://www.fastmail.com', icon: 'calendar', img: '/icons/calendar/fastmail.png' },
      { id: 'nextcloud', name: 'Nextcloud Calendar', url: 'https://nextcloud.com', icon: 'calendar', img: '/icons/calendar/nextcloud.png' },
    ]
  },
  drive: {
    icon: 'hard-drive',
    options: [
      { id: 'google', name: 'Google Drive', url: 'https://drive.google.com', icon: 'hard-drive', img: '/icons/drive/google.png' },
      { id: 'onedrive', name: 'OneDrive', url: 'https://onedrive.live.com', icon: 'hard-drive', img: '/icons/drive/onedrive.png' },
      { id: 'dropbox', name: 'Dropbox', url: 'https://www.dropbox.com', icon: 'hard-drive', img: '/icons/drive/dropbox.png' },
      { id: 'proton', name: 'Proton Drive', url: 'https://drive.proton.me', icon: 'hard-drive', img: '/icons/drive/proton.png' },
      { id: 'icloud', name: 'iCloud Drive', url: 'https://www.icloud.com/iclouddrive', icon: 'hard-drive', img: '/icons/drive/icloud.png' },
      { id: 'mega', name: 'MEGA', url: 'https://mega.nz', icon: 'hard-drive', img: '/icons/drive/mega.png' },
      { id: 'pcloud', name: 'pCloud', url: 'https://www.pcloud.com', icon: 'hard-drive', img: '/icons/drive/pcloud.png' },
      { id: 'nextcloud', name: 'Nextcloud', url: 'https://nextcloud.com', icon: 'hard-drive', img: '/icons/drive/nextcloud.png' },
      { id: 'tresorit', name: 'Tresorit', url: 'https://tresorit.com', icon: 'hard-drive', img: '/icons/drive/tresorit.png' },
      { id: 'sync', name: 'Sync.com', url: 'https://www.sync.com', icon: 'hard-drive', img: '/icons/drive/sync.png' },
      { id: 'internxt', name: 'Internxt', url: 'https://internxt.com', icon: 'hard-drive', img: '/icons/drive/internxt.png' },
    ]
  },
  docs: {
    icon: 'file-text',
    options: [
      { id: 'google', name: 'Google Docs', url: 'https://docs.google.com', icon: 'file-text', img: '/icons/docs/google.png' },
      { id: 'microsoft', name: 'Microsoft Word Online', url: 'https://www.office.com', icon: 'file-text', img: '/icons/docs/microsoft.png' },
      { id: 'zoho', name: 'Zoho Writer', url: 'https://writer.zoho.com', icon: 'file-text', img: '/icons/docs/zoho.png' },
      { id: 'onlyoffice', name: 'OnlyOffice', url: 'https://www.onlyoffice.com', icon: 'file-text', img: '/icons/docs/onlyoffice.png' },
      { id: 'notion', name: 'Notion', url: 'https://www.notion.so', icon: 'file-text', img: '/icons/docs/notion.png' },
      { id: 'coda', name: 'Coda', url: 'https://coda.io', icon: 'file-text', img: '/icons/docs/coda.png' },
      { id: 'dropbox', name: 'Dropbox Paper', url: 'https://paper.dropbox.com', icon: 'file-text', img: '/icons/docs/dropbox.png' },
      { id: 'quip', name: 'Quip', url: 'https://quip.com', icon: 'file-text', img: '/icons/docs/quip.png' },
      { id: 'canva', name: 'Canva Docs', url: 'https://www.canva.com/docs', icon: 'file-text', img: '/icons/docs/canva.png' },
      { id: 'slite', name: 'Slite', url: 'https://slite.com', icon: 'file-text', img: '/icons/docs/slite.png' },
      { id: 'craft', name: 'Craft', url: 'https://www.craft.do', icon: 'file-text', img: '/icons/docs/craft.png' },
      { id: 'proton', name: 'Proton Docs', url: 'https://docs.proton.me', icon: 'file-text', img: '/icons/docs/proton.png' },
    ]
  },
  sheets: {
    icon: 'table',
    options: [
      { id: 'google', name: 'Google Sheets', url: 'https://docs.google.com/spreadsheets', icon: 'table', img: '/icons/sheets/google.png' },
      { id: 'microsoft', name: 'Microsoft Excel Online', url: 'https://www.office.com', icon: 'table', img: '/icons/sheets/microsoft.png' },
      { id: 'zoho', name: 'Zoho Sheet', url: 'https://sheet.zoho.com', icon: 'table', img: '/icons/sheets/zoho.png' },
      { id: 'airtable', name: 'Airtable', url: 'https://airtable.com', icon: 'table', img: '/icons/sheets/airtable.png' },
      { id: 'onlyoffice', name: 'OnlyOffice', url: 'https://www.onlyoffice.com', icon: 'table', img: '/icons/sheets/onlyoffice.png' },
      { id: 'smartsheet', name: 'Smartsheet', url: 'https://www.smartsheet.com', icon: 'table', img: '/icons/sheets/smartsheet.png' },
      { id: 'rows', name: 'Rows', url: 'https://rows.com', icon: 'table', img: '/icons/sheets/rows.png' },
      { id: 'coda', name: 'Coda', url: 'https://coda.io', icon: 'table', img: '/icons/sheets/coda.png' },
      { id: 'notion', name: 'Notion', url: 'https://www.notion.so', icon: 'table', img: '/icons/sheets/notion.png' },
      { id: 'baserow', name: 'Baserow', url: 'https://baserow.io', icon: 'table', img: '/icons/sheets/baserow.png' },
      { id: 'seatable', name: 'SeaTable', url: 'https://seatable.io', icon: 'table', img: '/icons/sheets/seatable.png' },
    ]
  },
  slides: {
    icon: 'presentation',
    options: [
      { id: 'google', name: 'Google Slides', url: 'https://docs.google.com/presentation', icon: 'presentation', img: '/icons/slides/google.png' },
      { id: 'microsoft', name: 'PowerPoint Online', url: 'https://www.office.com', icon: 'presentation', img: '/icons/slides/microsoft.png' },
      { id: 'canva', name: 'Canva', url: 'https://www.canva.com', icon: 'presentation', img: '/icons/slides/canva.png' },
      { id: 'prezi', name: 'Prezi', url: 'https://prezi.com', icon: 'presentation', img: '/icons/slides/prezi.png' },
      { id: 'beautifulai', name: 'Beautiful.ai', url: 'https://www.beautiful.ai', icon: 'presentation', img: '/icons/slides/beautifulai.png' },
      { id: 'pitch', name: 'Pitch', url: 'https://pitch.com', icon: 'presentation', img: '/icons/slides/pitch.png' },
      { id: 'zoho', name: 'Zoho Show', url: 'https://show.zoho.com', icon: 'presentation', img: '/icons/slides/zoho.png' },
      { id: 'visme', name: 'Visme', url: 'https://www.visme.co', icon: 'presentation', img: '/icons/slides/visme.png' },
      { id: 'genially', name: 'Genially', url: 'https://genially.com', icon: 'presentation', img: '/icons/slides/genially.png' },
      { id: 'tome', name: 'Tome', url: 'https://tome.app', icon: 'presentation', img: '/icons/slides/tome.png' },
      { id: 'gamma', name: 'Gamma', url: 'https://gamma.app', icon: 'presentation', img: '/icons/slides/gamma.png' },
    ]
  },
  forms: {
    icon: 'clipboard-list',
    options: [
      { id: 'google', name: 'Google Forms', url: 'https://docs.google.com/forms', icon: 'clipboard-list', img: '/icons/forms/google.png' },
      { id: 'microsoft', name: 'Microsoft Forms', url: 'https://forms.office.com', icon: 'clipboard-list', img: '/icons/forms/microsoft.png' },
      { id: 'typeform', name: 'Typeform', url: 'https://www.typeform.com', icon: 'clipboard-list', img: '/icons/forms/typeform.png' },
      { id: 'jotform', name: 'JotForm', url: 'https://www.jotform.com', icon: 'clipboard-list', img: '/icons/forms/jotform.png' },
      { id: 'surveymonkey', name: 'SurveyMonkey', url: 'https://www.surveymonkey.com', icon: 'clipboard-list', img: '/icons/forms/surveymonkey.png' },
      { id: 'tally', name: 'Tally', url: 'https://tally.so', icon: 'clipboard-list', img: '/icons/forms/tally.png' },
      { id: 'airtable', name: 'Airtable Forms', url: 'https://airtable.com', icon: 'clipboard-list', img: '/icons/forms/airtable.png' },
      { id: 'zoho', name: 'Zoho Forms', url: 'https://www.zoho.com/forms', icon: 'clipboard-list', img: '/icons/forms/zoho.png' },
      { id: 'cognitoforms', name: 'Cognito Forms', url: 'https://www.cognitoforms.com', icon: 'clipboard-list', img: '/icons/forms/cognitoforms.png' },
      { id: 'fillout', name: 'Fillout', url: 'https://www.fillout.com', icon: 'clipboard-list', img: '/icons/forms/fillout.png' },
      { id: 'paperform', name: 'Paperform', url: 'https://paperform.co', icon: 'clipboard-list', img: '/icons/forms/paperform.png' },
    ]
  },
  chat: {
    icon: 'message-circle',
    options: [
      { id: 'google', name: 'Google Chat', url: 'https://chat.google.com', icon: 'message-circle', img: '/icons/chat/google.png' },
      { id: 'slack', name: 'Slack', url: 'https://slack.com', icon: 'message-circle', img: '/icons/chat/slack.png' },
      { id: 'microsoft', name: 'Microsoft Teams', url: 'https://teams.microsoft.com', icon: 'message-circle', img: '/icons/chat/microsoft.png' },
      { id: 'discord', name: 'Discord', url: 'https://discord.com', icon: 'message-circle', img: '/icons/chat/discord.png' },
      { id: 'telegram', name: 'Telegram', url: 'https://web.telegram.org', icon: 'message-circle', img: '/icons/chat/telegram.png' },
      { id: 'whatsapp', name: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: 'message-circle', img: '/icons/chat/whatsapp.png' },
      { id: 'signal', name: 'Signal', url: 'https://signal.org', icon: 'message-circle', img: '/icons/chat/signal.png' },
      { id: 'element', name: 'Element', url: 'https://app.element.io', icon: 'message-circle', img: '/icons/chat/element.png' },
      { id: 'rocketchat', name: 'Rocket.Chat', url: 'https://rocket.chat', icon: 'message-circle', img: '/icons/chat/rocketchat.png' },
      { id: 'mattermost', name: 'Mattermost', url: 'https://mattermost.com', icon: 'message-circle', img: '/icons/chat/mattermost.png' },
      { id: 'zulip', name: 'Zulip', url: 'https://zulip.com', icon: 'message-circle', img: '/icons/chat/zulip.png' },
    ]
  },
  blogger: {
    icon: 'pen-line',
    options: [
      { id: 'google', name: 'Blogger', url: 'https://www.blogger.com', icon: 'pen-line', img: '/icons/blogger/google.png' },
      { id: 'wordpress', name: 'WordPress.com', url: 'https://wordpress.com', icon: 'pen-line', img: '/icons/blogger/wordpress.png' },
      { id: 'medium', name: 'Medium', url: 'https://medium.com', icon: 'pen-line', img: '/icons/blogger/medium.png' },
      { id: 'ghost', name: 'Ghost', url: 'https://ghost.org', icon: 'pen-line', img: '/icons/blogger/ghost.png' },
      { id: 'substack', name: 'Substack', url: 'https://substack.com', icon: 'pen-line', img: '/icons/blogger/substack.png' },
      { id: 'tumblr', name: 'Tumblr', url: 'https://www.tumblr.com', icon: 'pen-line', img: '/icons/blogger/tumblr.png' },
      { id: 'hashnode', name: 'Hashnode', url: 'https://hashnode.com', icon: 'pen-line', img: '/icons/blogger/hashnode.png' },
      { id: 'devto', name: 'Dev.to', url: 'https://dev.to', icon: 'pen-line', img: '/icons/blogger/devto.png' },
      { id: 'wix', name: 'Wix Blog', url: 'https://www.wix.com/blog', icon: 'pen-line', img: '/icons/blogger/wix.png' },
      { id: 'beehiiv', name: 'Beehiiv', url: 'https://www.beehiiv.com', icon: 'pen-line', img: '/icons/blogger/beehiiv.png' },
      { id: 'writeas', name: 'Write.as', url: 'https://write.as', icon: 'pen-line', img: '/icons/blogger/writeas.png' },
    ]
  },
  earth: {
    icon: 'globe-2',
    options: [
      { id: 'google', name: 'Google Earth', url: 'https://earth.google.com', icon: 'globe-2', img: '/icons/earth/google.png' },
      { id: 'nasa', name: 'NASA Worldview', url: 'https://worldview.earthdata.nasa.gov', icon: 'globe-2', img: '/icons/earth/nasa.png' },
      { id: 'bing', name: 'Bing Maps 3D', url: 'https://www.bing.com/maps', icon: 'globe-2', img: '/icons/earth/bing.png' },
      { id: 'openstreetmap', name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'globe-2', img: '/icons/earth/openstreetmap.png' },
      { id: 'cesium', name: 'Cesium Ion', url: 'https://cesium.com/ion', icon: 'globe-2', img: '/icons/earth/cesium.png' },
      { id: 'mapbox', name: 'Mapbox', url: 'https://www.mapbox.com', icon: 'globe-2', img: '/icons/earth/mapbox.png' },
      { id: 'here', name: 'HERE WeGo', url: 'https://wego.here.com', icon: 'globe-2', img: '/icons/earth/here.png' },
      { id: 'arcgis', name: 'ArcGIS Earth', url: 'https://earth.arcgis.com', icon: 'globe-2', img: '/icons/earth/arcgis.png' },
      { id: 'zoomearth', name: 'Zoom Earth', url: 'https://zoom.earth', icon: 'globe-2', img: '/icons/earth/zoomearth.png' },
      { id: 'eobrowser', name: 'EO Browser', url: 'https://apps.sentinel-hub.com', icon: 'globe-2', img: '/icons/earth/eobrowser.png' },
      { id: 'marble', name: 'Marble', url: 'https://marble.kde.org', icon: 'globe-2', img: '/icons/earth/marble.png' },
    ]
  },
  sites: {
    icon: 'globe',
    options: [
      { id: 'google', name: 'Google Sites', url: 'https://sites.google.com', icon: 'globe', img: '/icons/sites/google.png' },
      { id: 'wix', name: 'Wix', url: 'https://www.wix.com', icon: 'globe', img: '/icons/sites/wix.png' },
      { id: 'squarespace', name: 'Squarespace', url: 'https://www.squarespace.com', icon: 'globe', img: '/icons/sites/squarespace.png' },
      { id: 'wordpress', name: 'WordPress.com', url: 'https://wordpress.com', icon: 'globe', img: '/icons/sites/wordpress.png' },
      { id: 'weebly', name: 'Weebly', url: 'https://www.weebly.com', icon: 'globe', img: '/icons/sites/weebly.png' },
      { id: 'webflow', name: 'Webflow', url: 'https://webflow.com', icon: 'globe', img: '/icons/sites/webflow.png' },
      { id: 'carrd', name: 'Carrd', url: 'https://carrd.co', icon: 'globe', img: '/icons/sites/carrd.png' },
      { id: 'jimdo', name: 'Jimdo', url: 'https://www.jimdo.com', icon: 'globe', img: '/icons/sites/jimdo.png' },
      { id: 'strikingly', name: 'Strikingly', url: 'https://www.strikingly.com', icon: 'globe', img: '/icons/sites/strikingly.png' },
      { id: 'notion', name: 'Notion Sites', url: 'https://www.notion.site', icon: 'globe', img: '/icons/sites/notion.png' },
      { id: 'framer', name: 'Framer', url: 'https://www.framer.com', icon: 'globe', img: '/icons/sites/framer.png' },
      { id: 'shopify', name: 'Shopify', url: 'https://www.shopify.com', icon: 'globe', img: '/icons/sites/shopify.png' },
    ]
  },
  keep: {
    icon: 'sticky-note',
    options: [
      { id: 'google', name: 'Google Keep', url: 'https://keep.google.com', icon: 'sticky-note', img: '/icons/keep/google.png' },
      { id: 'notion', name: 'Notion', url: 'https://www.notion.so', icon: 'sticky-note', img: '/icons/keep/notion.png' },
      { id: 'evernote', name: 'Evernote', url: 'https://www.evernote.com', icon: 'sticky-note', img: '/icons/keep/evernote.png' },
      { id: 'onenote', name: 'Microsoft OneNote', url: 'https://www.onenote.com', icon: 'sticky-note', img: '/icons/keep/onenote.png' },
      { id: 'apple', name: 'Apple Notes', url: 'https://www.icloud.com/notes', icon: 'sticky-note', img: '/icons/keep/apple.png' },
      { id: 'obsidian', name: 'Obsidian', url: 'https://obsidian.md', icon: 'sticky-note', img: '/icons/keep/obsidian.png' },
      { id: 'simplenote', name: 'Simplenote', url: 'https://simplenote.com', icon: 'sticky-note', img: '/icons/keep/simplenote.png' },
      { id: 'zoho', name: 'Zoho Notebook', url: 'https://www.zoho.com/notebook', icon: 'sticky-note', img: '/icons/keep/zoho.png' },
      { id: 'notesnook', name: 'Notesnook', url: 'https://notesnook.com', icon: 'sticky-note', img: '/icons/keep/notesnook.png' },
      { id: 'joplin', name: 'Joplin', url: 'https://joplinapp.org', icon: 'sticky-note', img: '/icons/keep/joplin.png' },
      { id: 'turtl', name: 'Turtl', url: 'https://turtlapp.com', icon: 'sticky-note', img: '/icons/keep/turtl.png' },
    ]
  },
  books: {
    icon: 'book-open',
    options: [
      { id: 'google', name: 'Google Livres', url: 'https://books.google.com', icon: 'book-open', img: '/icons/books/google.png' },
      { id: 'kindle', name: 'Amazon Kindle', url: 'https://read.amazon.com', icon: 'book-open', img: '/icons/books/kindle.png' },
      { id: 'apple', name: 'Apple Books', url: 'https://books.apple.com', icon: 'book-open', img: '/icons/books/apple.png' },
      { id: 'kobo', name: 'Kobo', url: 'https://www.kobo.com', icon: 'book-open', img: '/icons/books/kobo.png' },
      { id: 'gutenberg', name: 'Project Gutenberg', url: 'https://www.gutenberg.org', icon: 'book-open', img: '/icons/books/gutenberg.png' },
      { id: 'openlibrary', name: 'Open Library', url: 'https://openlibrary.org', icon: 'book-open', img: '/icons/books/openlibrary.png' },
      { id: 'goodreads', name: 'Goodreads', url: 'https://www.goodreads.com', icon: 'book-open', img: '/icons/books/goodreads.png' },
      { id: 'scribd', name: 'Scribd', url: 'https://www.scribd.com', icon: 'book-open', img: '/icons/books/scribd.png' },
      { id: 'libby', name: 'Libby', url: 'https://libbyapp.com', icon: 'book-open', img: '/icons/books/libby.png' },
      { id: 'bookshop', name: 'Bookshop.org', url: 'https://bookshop.org', icon: 'book-open', img: '/icons/books/bookshop.png' },
      { id: 'standardebooks', name: 'Standard Ebooks', url: 'https://standardebooks.org', icon: 'book-open', img: '/icons/books/standardebooks.png' },
    ]
  },
  finance: {
    icon: 'trending-up',
    options: [
      { id: 'google', name: 'Google Finance', url: 'https://www.google.com/finance', icon: 'trending-up', img: '/icons/finance/google.png' },
      { id: 'yahoo', name: 'Yahoo Finance', url: 'https://finance.yahoo.com', icon: 'trending-up', img: '/icons/finance/yahoo.png' },
      { id: 'marketwatch', name: 'MarketWatch', url: 'https://www.marketwatch.com', icon: 'trending-up', img: '/icons/finance/marketwatch.png' },
      { id: 'bloomberg', name: 'Bloomberg', url: 'https://www.bloomberg.com/markets', icon: 'trending-up', img: '/icons/finance/bloomberg.png' },
      { id: 'investing', name: 'Investing.com', url: 'https://www.investing.com', icon: 'trending-up', img: '/icons/finance/investing.png' },
      { id: 'tradingview', name: 'TradingView', url: 'https://www.tradingview.com', icon: 'trending-up', img: '/icons/finance/tradingview.png' },
      { id: 'morningstar', name: 'Morningstar', url: 'https://www.morningstar.com', icon: 'trending-up', img: '/icons/finance/morningstar.png' },
      { id: 'cnbc', name: 'CNBC', url: 'https://www.cnbc.com/markets', icon: 'trending-up', img: '/icons/finance/cnbc.png' },
      { id: 'seekingalpha', name: 'Seeking Alpha', url: 'https://seekingalpha.com', icon: 'trending-up', img: '/icons/finance/seekingalpha.png' },
      { id: 'finviz', name: 'Finviz', url: 'https://finviz.com', icon: 'trending-up', img: '/icons/finance/finviz.png' },
      { id: 'stockanalysis', name: 'Stock Analysis', url: 'https://stockanalysis.com', icon: 'trending-up', img: '/icons/finance/stockanalysis.png' },
    ]
  },
  shopping: {
    icon: 'shopping-cart',
    options: [
      { id: 'google', name: 'Google Shopping', url: 'https://shopping.google.com', icon: 'shopping-cart', img: '/icons/shopping/google.png' },
      { id: 'amazon', name: 'Amazon', url: 'https://www.amazon.com', icon: 'shopping-cart', img: '/icons/shopping/amazon.png' },
      { id: 'ebay', name: 'eBay', url: 'https://www.ebay.com', icon: 'shopping-cart', img: '/icons/shopping/ebay.png' },
      { id: 'idealo', name: 'Idealo', url: 'https://www.idealo.com', icon: 'shopping-cart', img: '/icons/shopping/idealo.png' },
      { id: 'pricerunner', name: 'PriceRunner', url: 'https://www.pricerunner.com', icon: 'shopping-cart', img: '/icons/shopping/pricerunner.png' },
      { id: 'shopzilla', name: 'Shopzilla', url: 'https://www.shopzilla.com', icon: 'shopping-cart', img: '/icons/shopping/shopzilla.png' },
      { id: 'kelkoo', name: 'Kelkoo', url: 'https://www.kelkoo.com', icon: 'shopping-cart', img: '/icons/shopping/kelkoo.png' },
      { id: 'bing', name: 'Bing Shopping', url: 'https://www.bing.com/shop', icon: 'shopping-cart', img: '/icons/shopping/bing.png' },
      { id: 'become', name: 'Become', url: 'https://www.become.com', icon: 'shopping-cart', img: '/icons/shopping/become.png' },
      { id: 'pricespy', name: 'PriceSpy', url: 'https://pricespy.co.uk', icon: 'shopping-cart', img: '/icons/shopping/pricespy.png' },
      { id: 'leguide', name: 'Leguide', url: 'https://www.leguide.com', icon: 'shopping-cart', img: '/icons/shopping/leguide.png' },
    ]
  },
  meet: {
    icon: 'video',
    options: [
      { id: 'google', name: 'Google Meet', url: 'https://meet.google.com', icon: 'video', img: '/icons/meet/google.png' },
      { id: 'zoom', name: 'Zoom', url: 'https://zoom.us', icon: 'video', img: '/icons/meet/zoom.png' },
      { id: 'microsoft', name: 'Microsoft Teams', url: 'https://teams.microsoft.com', icon: 'video', img: '/icons/meet/microsoft.png' },
      { id: 'jitsi', name: 'Jitsi Meet', url: 'https://meet.jit.si', icon: 'video', img: '/icons/meet/jitsi.png' },
      { id: 'whereby', name: 'Whereby', url: 'https://whereby.com', icon: 'video', img: '/icons/meet/whereby.png' },
      { id: 'webex', name: 'Cisco Webex', url: 'https://webex.com', icon: 'video', img: '/icons/meet/webex.png' },
      { id: 'skype', name: 'Skype', url: 'https://web.skype.com', icon: 'video', img: '/icons/meet/skype.png' },
      { id: 'discord', name: 'Discord', url: 'https://discord.com', icon: 'video', img: '/icons/meet/discord.png' },
      { id: 'butter', name: 'Butter', url: 'https://butter.us', icon: 'video', img: '/icons/meet/butter.png' },
      { id: 'livestorm', name: 'Livestorm', url: 'https://livestorm.co', icon: 'video', img: '/icons/meet/livestorm.png' },
      { id: 'lark', name: 'Lark', url: 'https://www.larksuite.com', icon: 'video', img: '/icons/meet/lark.png' },
    ]
  },
  maps: {
    icon: 'map',
    options: [
      { id: 'google', name: 'Google Maps', url: 'https://maps.google.com', icon: 'map', img: '/icons/maps/google.png' },
      { id: 'apple', name: 'Apple Plans', url: 'https://maps.apple.com', icon: 'map', img: '/icons/maps/apple.png' },
      { id: 'openstreetmap', name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: 'map', img: '/icons/maps/openstreetmap.png' },
      { id: 'waze', name: 'Waze', url: 'https://www.waze.com/live-map', icon: 'map', img: '/icons/maps/waze.png' },
      { id: 'here', name: 'HERE WeGo', url: 'https://wego.here.com', icon: 'map', img: '/icons/maps/here.png' },
      { id: 'osmand', name: 'OsmAnd', url: 'https://osmand.net', icon: 'map', img: '/icons/maps/osmand.png' },
      { id: 'organicmaps', name: 'Organic Maps', url: 'https://organicmaps.app', icon: 'map', img: '/icons/maps/organicmaps.png' },
      { id: 'bing', name: 'Bing Maps', url: 'https://www.bing.com/maps', icon: 'map', img: '/icons/maps/bing.png' },
      { id: 'citymapper', name: 'Citymapper', url: 'https://citymapper.com', icon: 'map', img: '/icons/maps/citymapper.png' },
      { id: 'tomtom', name: 'TomTom', url: 'https://www.tomtom.com', icon: 'map', img: '/icons/maps/tomtom.png' },
      { id: 'sygic', name: 'Sygic', url: 'https://www.sygic.com', icon: 'map', img: '/icons/maps/sygic.png' },
    ]
  },
  translate: {
    icon: 'languages',
    options: [
      { id: 'google', name: 'Google Translate', url: 'https://translate.google.com', icon: 'languages', img: '/icons/translate/google.png' },
      { id: 'deepl', name: 'DeepL', url: 'https://www.deepl.com/translator', icon: 'languages', img: '/icons/translate/deepl.png' },
      { id: 'reverso', name: 'Reverso', url: 'https://www.reverso.net', icon: 'languages', img: '/icons/translate/reverso.png' },
      { id: 'microsoft', name: 'Microsoft Translator', url: 'https://www.bing.com/translator', icon: 'languages', img: '/icons/translate/microsoft.png' },
      { id: 'linguee', name: 'Linguee', url: 'https://www.linguee.com', icon: 'languages', img: '/icons/translate/linguee.png' },
      { id: 'yandex', name: 'Yandex Translate', url: 'https://translate.yandex.com', icon: 'languages', img: '/icons/translate/yandex.png' },
      { id: 'papago', name: 'Papago', url: 'https://papago.naver.com', icon: 'languages', img: '/icons/translate/papago.png' },
      { id: 'libretranslate', name: 'LibreTranslate', url: 'https://libretranslate.com', icon: 'languages', img: '/icons/translate/libretranslate.png' },
      { id: 'systran', name: 'Systran', url: 'https://www.systransoft.com/translate', icon: 'languages', img: '/icons/translate/systran.png' },
      { id: 'mate', name: 'Mate Translate', url: 'https://gikken.co/mate-translate', icon: 'languages', img: '/icons/translate/mate.png' },
      { id: 'apertium', name: 'Apertium', url: 'https://www.apertium.org', icon: 'languages', img: '/icons/translate/apertium.png' },
    ]
  },
  photos: {
    icon: 'image',
    options: [
      { id: 'google', name: 'Google Photos', url: 'https://photos.google.com', icon: 'image', img: '/icons/photos/google.png' },
      { id: 'icloud', name: 'iCloud Photos', url: 'https://www.icloud.com/photos', icon: 'image', img: '/icons/photos/icloud.png' },
      { id: 'amazon', name: 'Amazon Photos', url: 'https://www.amazon.com/photos', icon: 'image', img: '/icons/photos/amazon.png' },
      { id: 'flickr', name: 'Flickr', url: 'https://www.flickr.com', icon: 'image', img: '/icons/photos/flickr.png' },
      { id: 'samsung', name: 'Samsung Gallery', url: 'https://gallery.samsung.com', icon: 'image', img: '/icons/photos/samsung.png' },
      { id: 'onedrive', name: 'OneDrive Photos', url: 'https://onedrive.live.com/photos', icon: 'image', img: '/icons/photos/onedrive.png' },
      { id: 'dropbox', name: 'Dropbox Photos', url: 'https://www.dropbox.com/photos', icon: 'image', img: '/icons/photos/dropbox.png' },
      { id: '500px', name: '500px', url: 'https://500px.com', icon: 'image', img: '/icons/photos/500px.png' },
      { id: 'smugmug', name: 'SmugMug', url: 'https://www.smugmug.com', icon: 'image', img: '/icons/photos/smugmug.png' },
      { id: 'lightroom', name: 'Adobe Lightroom', url: 'https://lightroom.adobe.com', icon: 'image', img: '/icons/photos/lightroom.png' },
      { id: 'shutterfly', name: 'Shutterfly', url: 'https://www.shutterfly.com', icon: 'image', img: '/icons/photos/shutterfly.png' },
    ]
  },
  videos: {
    icon: 'play',
    options: [
      { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com', icon: 'play', img: '/icons/videos/youtube.png' },
      { id: 'dailymotion', name: 'Dailymotion', url: 'https://www.dailymotion.com', icon: 'play', img: '/icons/videos/dailymotion.png' },
      { id: 'vimeo', name: 'Vimeo', url: 'https://vimeo.com', icon: 'play', img: '/icons/videos/vimeo.png' },
      { id: 'peertube', name: 'PeerTube', url: 'https://joinpeertube.org', icon: 'play', img: '/icons/videos/peertube.png' },
      { id: 'odysee', name: 'Odysee', url: 'https://odysee.com', icon: 'play', img: '/icons/videos/odysee.png' },
      { id: 'rumble', name: 'Rumble', url: 'https://rumble.com', icon: 'play', img: '/icons/videos/rumble.png' },
      { id: 'tiktok', name: 'TikTok', url: 'https://www.tiktok.com', icon: 'play', img: '/icons/videos/tiktok.png' },
      { id: 'bitchute', name: 'Bitchute', url: 'https://www.bitchute.com', icon: 'play', img: '/icons/videos/bitchute.png' },
      { id: 'archive', name: 'Internet Archive', url: 'https://archive.org', icon: 'play', img: '/icons/videos/archive.png' },
      { id: 'nebula', name: 'Nebula', url: 'https://nebula.tv', icon: 'play', img: '/icons/videos/nebula.png' },
      { id: 'dtube', name: 'DTube', url: 'https://d.tube', icon: 'play', img: '/icons/videos/dtube.png' },
    ]
  },
  store: {
    icon: 'store',
    options: [
      { id: 'google', name: 'Google Play', url: 'https://play.google.com', icon: 'store', img: '/icons/store/google.png' },
      { id: 'fdroid', name: 'F-Droid', url: 'https://f-droid.org', icon: 'store', img: '/icons/store/fdroid.png' },
      { id: 'apkmirror', name: 'APKMirror', url: 'https://www.apkmirror.com', icon: 'store', img: '/icons/store/apkmirror.png' },
      { id: 'aurora', name: 'Aurora Store', url: 'https://auroraoss.com', icon: 'store', img: '/icons/store/aurora.png' },
      { id: 'aptoide', name: 'Aptoide', url: 'https://www.aptoide.com', icon: 'store', img: '/icons/store/aptoide.png' },
      { id: 'amazon', name: 'Amazon Appstore', url: 'https://www.amazon.com/gp/mas/get/amazonapp', icon: 'store', img: '/icons/store/amazon.png' },
      { id: 'samsung', name: 'Galaxy Store', url: 'https://galaxystore.samsung.com', icon: 'store', img: '/icons/store/samsung.png' },
      { id: 'apple', name: 'Apple App Store', url: 'https://www.apple.com/app-store', icon: 'store', img: '/icons/store/apple.png' },
      { id: 'huawei', name: 'Huawei AppGallery', url: 'https://appgallery.huawei.com', icon: 'store', img: '/icons/store/huawei.png' },
      { id: 'uptodown', name: 'Uptodown', url: 'https://www.uptodown.com', icon: 'store', img: '/icons/store/uptodown.png' },
      { id: 'apkpure', name: 'APKPure', url: 'https://apkpure.com', icon: 'store', img: '/icons/store/apkpure.png' },
    ]
  },
  news: {
    icon: 'newspaper',
    options: [
      { id: 'google', name: 'Google News', url: 'https://news.google.com', icon: 'newspaper', img: '/icons/news/google.png' },
      { id: 'apple', name: 'Apple News', url: 'https://www.apple.com/apple-news', icon: 'newspaper', img: '/icons/news/apple.png' },
      { id: 'feedly', name: 'Feedly', url: 'https://feedly.com', icon: 'newspaper', img: '/icons/news/feedly.png' },
      { id: 'flipboard', name: 'Flipboard', url: 'https://flipboard.com', icon: 'newspaper', img: '/icons/news/flipboard.png' },
      { id: 'microsoft', name: 'Microsoft Start', url: 'https://www.msn.com/news', icon: 'newspaper', img: '/icons/news/microsoft.png' },
      { id: 'yahoo', name: 'Yahoo News', url: 'https://news.yahoo.com', icon: 'newspaper', img: '/icons/news/yahoo.png' },
      { id: 'inoreader', name: 'Inoreader', url: 'https://www.inoreader.com', icon: 'newspaper', img: '/icons/news/inoreader.png' },
      { id: 'smartnews', name: 'SmartNews', url: 'https://www.smartnews.com', icon: 'newspaper', img: '/icons/news/smartnews.png' },
      { id: 'newsbreak', name: 'NewsBreak', url: 'https://www.newsbreak.com', icon: 'newspaper', img: '/icons/news/newsbreak.png' },
      { id: 'groundnews', name: 'Ground News', url: 'https://ground.news', icon: 'newspaper', img: '/icons/news/groundnews.png' },
      { id: 'artifact', name: 'Artifact', url: 'https://artifact.news', icon: 'newspaper', img: '/icons/news/artifact.png' },
    ]
  },
  notes: {
    icon: 'sticky-note',
    options: [
      { id: 'keep', name: 'Google Keep', url: 'https://keep.google.com', icon: 'sticky-note', img: '/icons/keep/google.png' },
      { id: 'notion', name: 'Notion', url: 'https://www.notion.so', icon: 'sticky-note', img: '/icons/keep/notion.png' },
      { id: 'evernote', name: 'Evernote', url: 'https://www.evernote.com', icon: 'sticky-note', img: '/icons/keep/evernote.png' },
      { id: 'onenote', name: 'OneNote', url: 'https://www.onenote.com', icon: 'sticky-note', img: '/icons/keep/onenote.png' },
      { id: 'apple', name: 'Apple Notes', url: 'https://www.icloud.com/notes', icon: 'sticky-note', img: '/icons/keep/apple.png' },
      { id: 'obsidian', name: 'Obsidian', url: 'https://obsidian.md', icon: 'sticky-note', img: '/icons/keep/obsidian.png' },
    ]
  },
  music: {
    icon: 'music',
    options: [
      { id: 'youtube', name: 'YouTube Music', url: 'https://music.youtube.com', icon: 'music', img: '/icons/music/youtube.png' },
      { id: 'spotify', name: 'Spotify', url: 'https://open.spotify.com', icon: 'music', img: '/icons/music/spotify.png' },
      { id: 'apple', name: 'Apple Music', url: 'https://music.apple.com', icon: 'music', img: '/icons/music/apple.png' },
      { id: 'deezer', name: 'Deezer', url: 'https://www.deezer.com', icon: 'music', img: '/icons/music/deezer.png' },
      { id: 'tidal', name: 'Tidal', url: 'https://listen.tidal.com', icon: 'music', img: '/icons/music/tidal.png' },
      { id: 'soundcloud', name: 'SoundCloud', url: 'https://soundcloud.com', icon: 'music', img: '/icons/music/soundcloud.png' },
      { id: 'amazon', name: 'Amazon Music', url: 'https://music.amazon.com', icon: 'music', img: '/icons/music/amazon.png' },
      { id: 'qobuz', name: 'Qobuz', url: 'https://www.qobuz.com', icon: 'music', img: '/icons/music/qobuz.png' },
      { id: 'pandora', name: 'Pandora', url: 'https://www.pandora.com', icon: 'music', img: '/icons/music/pandora.png' },
      { id: 'napster', name: 'Napster', url: 'https://www.napster.com', icon: 'music', img: '/icons/music/napster.png' },
      { id: 'audiomack', name: 'Audiomack', url: 'https://audiomack.com', icon: 'music', img: '/icons/music/audiomack.png' },
    ]
  },
  passwords: {
    icon: 'key-round',
    options: [
      { id: 'google', name: 'Google Passwords', url: 'https://passwords.google.com', icon: 'key-round', img: '/icons/passwords/google.png' },
      { id: 'bitwarden', name: 'Bitwarden', url: 'https://vault.bitwarden.com', icon: 'key-round', img: '/icons/passwords/bitwarden.png' },
      { id: '1password', name: '1Password', url: 'https://my.1password.com', icon: 'key-round', img: '/icons/passwords/1password.png' },
      { id: 'lastpass', name: 'LastPass', url: 'https://lastpass.com', icon: 'key-round', img: '/icons/passwords/lastpass.png' },
      { id: 'dashlane', name: 'Dashlane', url: 'https://app.dashlane.com', icon: 'key-round', img: '/icons/passwords/dashlane.png' },
      { id: 'proton', name: 'Proton Pass', url: 'https://pass.proton.me', icon: 'key-round', img: '/icons/passwords/proton.png' },
      { id: 'keepass', name: 'KeePass', url: 'https://keepass.info', icon: 'key-round', img: '/icons/passwords/keepass.png' },
      { id: 'nordpass', name: 'NordPass', url: 'https://nordpass.com', icon: 'key-round', img: '/icons/passwords/nordpass.png' },
      { id: 'zoho', name: 'Zoho Vault', url: 'https://www.zoho.com/vault', icon: 'key-round', img: '/icons/passwords/zoho.png' },
      { id: 'roboform', name: 'RoboForm', url: 'https://www.roboform.com', icon: 'key-round', img: '/icons/passwords/roboform.png' },
      { id: 'enpass', name: 'Enpass', url: 'https://www.enpass.io', icon: 'key-round', img: '/icons/passwords/enpass.png' },
    ]
  },
  ai: {
    icon: 'sparkles',
    options: [
      { id: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com', icon: 'sparkles', img: '/icons/ai/gemini.png' },
      { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'sparkles', img: '/icons/ai/chatgpt.png' },
      { id: 'claude', name: 'Claude', url: 'https://claude.ai', icon: 'sparkles', img: '/icons/ai/claude.png' },
      { id: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', icon: 'sparkles', img: '/icons/ai/copilot.png' },
      { id: 'mistral', name: 'Mistral Le Chat', url: 'https://chat.mistral.ai', icon: 'sparkles', img: '/icons/ai/mistral.png' },
      { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'sparkles', img: '/icons/ai/perplexity.png' },
      { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com', icon: 'sparkles', img: '/icons/ai/deepseek.png' },
      { id: 'meta', name: 'Meta AI', url: 'https://www.meta.ai', icon: 'sparkles', img: '/icons/ai/meta.png' },
      { id: 'huggingchat', name: 'HuggingChat', url: 'https://huggingface.co/chat', icon: 'sparkles', img: '/icons/ai/huggingchat.png' },
      { id: 'poe', name: 'Poe', url: 'https://poe.com', icon: 'sparkles', img: '/icons/ai/poe.png' },
      { id: 'grok', name: 'Grok', url: 'https://grok.com', icon: 'sparkles', img: '/icons/ai/grok.png' },
    ]
  },
  contacts: {
    icon: 'contact',
    options: [
      { id: 'google', name: 'Google Contacts', url: 'https://contacts.google.com', icon: 'contact', img: '/icons/contacts/google.png' },
      { id: 'icloud', name: 'iCloud Contacts', url: 'https://www.icloud.com/contacts', icon: 'contact', img: '/icons/contacts/icloud.png' },
      { id: 'outlook', name: 'Outlook Contacts', url: 'https://outlook.live.com/people', icon: 'contact', img: '/icons/contacts/outlook.png' },
      { id: 'hubspot', name: 'HubSpot CRM', url: 'https://www.hubspot.com/products/crm', icon: 'contact', img: '/icons/contacts/hubspot.png' },
      { id: 'zoho', name: 'Zoho ContactManager', url: 'https://www.zoho.com/contactmanager', icon: 'contact', img: '/icons/contacts/zoho.png' },
      { id: 'cardhop', name: 'Cardhop', url: 'https://flexibits.com/cardhop', icon: 'contact', img: '/icons/contacts/cardhop.png' },
      { id: 'monica', name: 'Monica CRM', url: 'https://www.monicahq.com', icon: 'contact', img: '/icons/contacts/monica.png' },
      { id: 'contactsplus', name: 'Contacts+', url: 'https://www.contactsplus.com', icon: 'contact', img: '/icons/contacts/contactsplus.png' },
      { id: 'cloze', name: 'Cloze', url: 'https://www.cloze.com', icon: 'contact', img: '/icons/contacts/cloze.png' },
      { id: 'covve', name: 'Covve', url: 'https://www.covve.com', icon: 'contact', img: '/icons/contacts/covve.png' },
      { id: 'nimble', name: 'Nimble', url: 'https://www.nimble.com', icon: 'contact', img: '/icons/contacts/nimble.png' },
    ]
  },
};

export const defaultServices = {
  search: 'google',
  email: 'gmail',
  calendar: 'google',
  drive: 'google',
  docs: 'google',
  maps: 'google',
  translate: 'google',
  photos: 'google',
  videos: 'youtube',
  store: 'google',
  news: 'google',
  notes: 'keep',
  music: 'youtube',
  passwords: 'google',
  ai: 'gemini',
  contacts: 'google',
  sheets: 'google',
  slides: 'google',
  meet: 'google',
  forms: 'google',
  shopping: 'google',
  finance: 'google',
  books: 'google',
  keep: 'google',
  sites: 'google',
  earth: 'google',
  blogger: 'google',
  chat: 'google',
};

export function getServiceUrl(category, serviceId) {
  const cat = serviceCategories[category];
  if (!cat) return '#';
  const service = cat.options.find(s => s.id === serviceId);
  return service?.url || '#';
}

export function getServiceName(category, serviceId) {
  const cat = serviceCategories[category];
  if (!cat) return '';
  const service = cat.options.find(s => s.id === serviceId);
  return service?.name || '';
}

export function getSearchUrl(serviceId) {
  const service = serviceCategories.search.options.find(s => s.id === serviceId);
  return service?.url || 'https://www.google.com/search?q=';
}

export const widgetDefaults = {
  clock: true,
  weather: false,
  calculator: false,
  currency: false,
};
