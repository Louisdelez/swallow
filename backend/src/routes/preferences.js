import { Router } from 'express';
import db from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Valid values for preferences
const VALID_THEMES = ['light', 'dark', 'system'];
const VALID_LANGUAGES = ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'ja', 'zh', 'ko', 'ar', 'ru'];
const MAX_SERVICES_KEYS = 50;
const MAX_SERVICE_VALUE_LENGTH = 64;

function validatePreferences(body) {
  const errors = [];
  if (body.theme && !VALID_THEMES.includes(body.theme)) {
    errors.push('Invalid theme value');
  }
  if (body.language && !VALID_LANGUAGES.includes(body.language)) {
    errors.push('Invalid language value');
  }
  if (body.search_engine && (typeof body.search_engine !== 'string' || body.search_engine.length > MAX_SERVICE_VALUE_LENGTH)) {
    errors.push('Invalid search_engine value');
  }
  if (body.default_services) {
    const services = typeof body.default_services === 'string'
      ? (() => { try { return JSON.parse(body.default_services); } catch { return null; } })()
      : body.default_services;
    if (!services || typeof services !== 'object' || Array.isArray(services)) {
      errors.push('default_services must be an object');
    } else if (Object.keys(services).length > MAX_SERVICES_KEYS) {
      errors.push('Too many service keys');
    } else {
      for (const [key, value] of Object.entries(services)) {
        if (typeof key !== 'string' || key.length > MAX_SERVICE_VALUE_LENGTH ||
            typeof value !== 'string' || value.length > MAX_SERVICE_VALUE_LENGTH) {
          errors.push(`Invalid service entry: ${key}`);
          break;
        }
      }
    }
  }
  return errors;
}

// SSE connections map: userId → Set<res>
const sseClients = new Map();

// Periodic cleanup of dead SSE connections (every 5 minutes)
setInterval(() => {
  for (const [userId, clients] of sseClients) {
    for (const res of clients) {
      if (res.writableEnded || res.destroyed) {
        clients.delete(res);
      }
    }
    if (clients.size === 0) sseClients.delete(userId);
  }
}, 5 * 60 * 1000);

function broadcastToUser(userId, preferences) {
  const clients = sseClients.get(userId);
  if (!clients) return;
  const data = JSON.stringify(preferences);
  for (const res of clients) {
    try {
      res.write(`event: preferences-update\ndata: ${data}\n\n`);
    } catch {
      clients.delete(res);
    }
  }
}

// SSE endpoint for real-time preference updates
router.get('/stream', authenticateToken, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  res.write(`event: connected\ndata: {}\n\n`);

  const userId = req.user.id;
  if (!sseClients.has(userId)) {
    sseClients.set(userId, new Set());
  }
  sseClients.get(userId).add(res);

  // Heartbeat every 30s
  const heartbeat = setInterval(() => {
    res.write(`: heartbeat\n\n`);
  }, 30000);

  req.on('close', () => {
    clearInterval(heartbeat);
    const clients = sseClients.get(userId);
    if (clients) {
      clients.delete(res);
      if (clients.size === 0) sseClients.delete(userId);
    }
  });
});

function parsePreferences(prefs) {
  if (!prefs) return null;
  try {
    return {
      ...prefs,
      default_services: typeof prefs.default_services === 'string'
        ? JSON.parse(prefs.default_services)
        : prefs.default_services || {},
    };
  } catch {
    return { ...prefs, default_services: {} };
  }
}

router.get('/', authenticateToken, (req, res) => {
  const prefs = db.prepare(
    'SELECT * FROM user_preferences WHERE user_id = ?'
  ).get(req.user.id);

  if (!prefs) {
    return res.json({
      preferences: {
        theme: 'system',
        language: 'fr',
        search_engine: 'google',
        default_services: {},
      }
    });
  }

  res.json({ preferences: parsePreferences(prefs) });
});

router.put('/', authenticateToken, (req, res) => {
  const errors = validatePreferences(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  const { theme, language, search_engine, default_services } = req.body;

  const existing = db.prepare(
    'SELECT id FROM user_preferences WHERE user_id = ?'
  ).get(req.user.id);

  const servicesStr = typeof default_services === 'string'
    ? default_services
    : JSON.stringify(default_services || {});

  if (existing) {
    db.prepare(`
      UPDATE user_preferences
      SET theme = COALESCE(?, theme),
          language = COALESCE(?, language),
          search_engine = COALESCE(?, search_engine),
          default_services = COALESCE(?, default_services),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).run(theme, language, search_engine, servicesStr, req.user.id);
  } else {
    db.prepare(`
      INSERT INTO user_preferences (user_id, theme, language, search_engine, default_services)
      VALUES (?, ?, ?, ?, ?)
    `).run(req.user.id, theme || 'system', language || 'fr', search_engine || 'google', servicesStr);
  }

  const prefs = db.prepare(
    'SELECT * FROM user_preferences WHERE user_id = ?'
  ).get(req.user.id);

  const parsed = parsePreferences(prefs);

  // Broadcast to all SSE clients of this user
  broadcastToUser(req.user.id, parsed);

  res.json({ preferences: parsed });
});

export default router;
