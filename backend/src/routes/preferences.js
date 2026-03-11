import { Router } from 'express';
import db from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

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

  res.json({ preferences: parsePreferences(prefs) });
});

export default router;
