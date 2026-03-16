<p align="center">
  <img src="extension/chrome/icons/icon-128.png" alt="Swallow" width="96" />
</p>

<h1 align="center">Swallow</h1>

<p align="center">
  <strong>Votre ecosysteme de services personnalise</strong><br>
  Page d'accueil, extensions navigateur et synchronisation en temps reel.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="node" />
  <img src="https://img.shields.io/badge/chrome-MV3-yellow" alt="chrome" />
  <img src="https://img.shields.io/badge/firefox-MV2-orange" alt="firefox" />
</p>

---

## Qu'est-ce que Swallow ?

Swallow remplace la page d'accueil de votre navigateur par un portail entierement configurable. Choisissez vos services (email, calendrier, drive, cartes, musique, IA...), vos widgets et votre theme, le tout synchronise en temps reel entre la webapp, les extensions et tous vos appareils.

## Fonctionnalites

| Categorie | Details |
|-----------|---------|
| **Page d'accueil** | Barre de recherche multi-moteurs, widgets (horloge, meteo, calculatrice, convertisseur de devises) |
| **30+ services** | Email, calendrier, drive, docs, maps, traduction, photos, videos, musique, IA, actualites, contacts, etc. |
| **Extensions** | Chrome (Manifest V3) et Firefox (Manifest V2) avec TopBar injectee sur toutes les pages |
| **Themes** | Clair, sombre ou automatique (systeme) |
| **Langues** | Francais, anglais, allemand, italien, espagnol |
| **Sync temps reel** | SSE (Server-Sent Events) + bridge postMessage entre webapp et extension |
| **Offline** | Fonctionne sans connexion, sync au retour en ligne |
| **Import / Export** | Sauvegardez et restaurez vos parametres en JSON |
| **Drag & Drop** | Reordonnez vos applications dans le popup de l'extension |
| **Recherche rapide** | Filtrez vos services dans le drawer et le popup |
| **Raccourcis clavier** | `Alt+A` pour ouvrir/fermer le drawer d'applications |
| **Compte utilisateur** | Inscription/connexion avec sync des preferences entre appareils |

## Architecture

```
swallow/
├── webapp/              # Frontend React (Vite)
│   ├── src/
│   │   ├── components/  # TopBar, SearchBar, AppDrawer, Widgets
│   │   ├── contexts/    # Auth, Theme, Language, Sync
│   │   ├── pages/       # Home, Settings, Login, Register
│   │   ├── i18n/        # Traductions (fr, en, de, it, es)
│   │   └── utils/       # API client, services catalog
│   └── dist/            # Build de production
│
├── backend/             # API Express.js
│   ├── src/
│   │   ├── routes/      # auth.js, preferences.js (+ SSE)
│   │   ├── middleware/   # JWT auth
│   │   ├── utils/       # Logger structure
│   │   ├── public/      # SDK swallow-bar.js
│   │   └── tests/       # Tests unitaires (node:test)
│   └── .env.example     # Configuration
│
└── extension/           # Extensions navigateur
    ├── chrome/          # Chrome Manifest V3
    │   ├── background.js    # Service worker, SSE, sync
    │   ├── content.js       # TopBar injection, postMessage bridge
    │   ├── popup.html/js    # Popup avec recherche et drag & drop
    │   └── icons/           # Icones services (30+ sets)
    └── firefox/         # Firefox Manifest V2 (meme fonctionnalites)
```

## Stack technique

| Composant | Technologies |
|-----------|-------------|
| **Frontend** | React 19, Vite 6, React Router 7, Lucide Icons |
| **Backend** | Node.js, Express 4, SQLite (better-sqlite3), JWT, bcryptjs |
| **Extensions** | Chrome MV3 Service Worker, Firefox MV2, Shadow DOM |
| **Securite** | Helmet, CORS whitelist, rate limiting, input validation |
| **Sync** | SSE (Server-Sent Events), postMessage bridge, chrome.storage |
| **Tests** | Node.js built-in test runner (`node:test`) |
| **Qualite** | ESLint, Prettier |

## Installation

### Prerequis

- **Node.js** 18+
- **npm**
- **Chromium** ou **Firefox**

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Editer .env pour definir JWT_SECRET (obligatoire)
# Generer un secret : openssl rand -hex 64
npm run dev
```

Le serveur demarre sur `http://localhost:3001`.

### 2. Webapp

```bash
cd webapp
npm install
npm run dev
```

L'application demarre sur `http://localhost:5173`.

### 3. Extensions

**Chrome / Chromium :**
1. Ouvrir `chrome://extensions`
2. Activer le **mode developpeur** (en haut a droite)
3. Cliquer **Charger l'extension non empaquetee**
4. Selectionner le dossier `extension/chrome`

**Firefox :**
1. Ouvrir `about:debugging#/runtime/this-firefox`
2. Cliquer **Charger un module temporaire**
3. Selectionner `extension/firefox/manifest.json`

## Configuration

### Variables d'environnement (backend)

| Variable | Description | Defaut |
|----------|-------------|--------|
| `JWT_SECRET` | Secret pour la signature des tokens JWT | *(obligatoire)* |
| `PORT` | Port du serveur | `3001` |
| `ALLOWED_ORIGINS` | Origines CORS autorisees (separees par des virgules) | `http://localhost:5173,...` |
| `LOG_LEVEL` | Niveau de log (`debug`, `info`, `warn`, `error`) | `info` |

### Services disponibles

Swallow prend en charge plus de 30 services configurables par categorie :

| Categorie | Exemples de fournisseurs |
|-----------|-------------------------|
| Recherche | Google, Bing, DuckDuckGo, Brave, Startpage, Ecosia, Qwant |
| Email | Gmail, Outlook, ProtonMail, Yahoo Mail |
| Calendrier | Google Calendar, Outlook Calendar, Proton Calendar |
| Drive | Google Drive, OneDrive, Dropbox, Proton Drive |
| Cartes | Google Maps, Waze, Apple Plans, OpenStreetMap |
| Videos | YouTube, Dailymotion, Vimeo, Twitch, PeerTube |
| Musique | YouTube Music, Spotify, Deezer, Apple Music, SoundCloud |
| IA | Gemini, ChatGPT, Claude, Copilot, Mistral, Perplexity |
| Traduction | Google Translate, DeepL |

## API

| Endpoint | Methode | Auth | Description |
|----------|---------|------|-------------|
| `/api/health` | GET | Non | Etat du serveur |
| `/api/auth/register` | POST | Non | Creation de compte |
| `/api/auth/login` | POST | Non | Connexion (retourne un JWT) |
| `/api/auth/me` | GET | Oui | Informations utilisateur |
| `/api/preferences` | GET | Oui | Recuperer les preferences |
| `/api/preferences` | PUT | Oui | Mettre a jour les preferences |
| `/api/preferences/stream` | GET | Oui | SSE — flux temps reel des changements |

## Flux de synchronisation

```
Webapp Settings
  → postMessage → content.js → background.js → chrome.storage
  → API PUT → backend → SSE broadcast → tous les clients

Extension Popup
  → chrome.storage → chrome.storage.onChanged
  → content.js → postMessage → webapp
  → background.js → API PUT → backend → SSE

Autre appareil (via SSE)
  → webapp : met a jour contexts + localStorage
  → background.js : met a jour chrome.storage → popup + top bar
```

## Tests

```bash
cd backend
npm test
```

14 tests couvrent la validation des emails, la sanitisation et la validation des preferences.

## Scripts

### Backend

| Commande | Description |
|----------|-------------|
| `npm start` | Demarrer en production |
| `npm run dev` | Demarrer avec hot-reload (`--watch`) |
| `npm test` | Lancer les tests |
| `npm run lint` | Verifier le code avec ESLint |
| `npm run format` | Formater avec Prettier |

### Webapp

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement Vite |
| `npm run build` | Build de production |
| `npm run preview` | Previsualiser le build |

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

<p align="center">
  Fait avec soin par <a href="https://github.com/Louisdelez">Louisdelez</a>
</p>
