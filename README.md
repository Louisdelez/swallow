# Swallow

Swallow est un portail de navigation personnalisable qui remplace votre page d'accueil. Choisissez vos services préférés, vos widgets et votre thème, le tout synchronisé entre le navigateur et les extensions.

## Fonctionnalités

- **Page d'accueil personnalisable** — barre de recherche, widgets (horloge, météo, calculatrice, convertisseur de devises)
- **Services configurables** — email, calendrier, stockage, cartes, traduction, IA, musique, etc.
- **Extensions navigateur** — Chrome (Manifest V3) et Firefox (Manifest V2), avec TopBar intégrée sur toutes les pages
- **Thèmes** — clair, sombre, ou automatique (système)
- **Multilingue** — français, anglais, allemand, italien, espagnol
- **Synchronisation** — les préférences sont sauvegardées en local et synchronisées via un compte utilisateur

## Architecture

```
NavigateurHome/
├── webapp/          # Frontend React
├── backend/         # API Express.js
└── extension/       # Extensions navigateur
    ├── chrome/      # Chrome (Manifest V3)
    └── firefox/     # Firefox (Manifest V2)
```

## Stack technique

| Composant | Technologies |
|-----------|-------------|
| Frontend  | React 19, Vite 6, React Router 7, Lucide Icons |
| Backend   | Node.js, Express 4, SQLite (better-sqlite3), JWT, bcryptjs |
| Extensions| Chrome MV3, Firefox MV2, Shadow DOM, Content Scripts |

## Installation

### Prérequis

- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3001`.

### Webapp

```bash
cd webapp
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`.

### Extensions

**Chrome :**
1. Ouvrir `chrome://extensions`
2. Activer le mode développeur
3. Charger le dossier `extension/chrome`

**Firefox :**
1. Ouvrir `about:debugging#/runtime/this-firefox`
2. Cliquer sur "Charger un module temporaire"
3. Sélectionner `extension/firefox/manifest.json`

## API

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/health` | GET | Vérification de l'état du serveur |
| `/api/auth/register` | POST | Création de compte |
| `/api/auth/login` | POST | Connexion |
| `/api/preferences` | GET | Récupérer les préférences |
| `/api/preferences` | PUT | Mettre à jour les préférences |

## Licence

Ce projet est sous licence [MIT](LICENSE).
