import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../database.js';
import { authenticateToken, generateToken } from '../middleware/auth.js';

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 255);
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

router.post('/register', (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const password = req.body.password;
  const display_name = sanitize(req.body.display_name);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Format d\'email invalide' });
  }

  if (typeof password !== 'string' || password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).json({ error: `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères` });
  }

  if (password.length > 128) {
    return res.status(400).json({ error: 'Le mot de passe ne doit pas dépasser 128 caractères' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Un compte avec cet email existe déjà' });
  }

  const password_hash = bcrypt.hashSync(password, 12);
  const result = db.prepare(
    'INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)'
  ).run(email, password_hash, display_name || email.split('@')[0]);

  const userId = result.lastInsertRowid;

  db.prepare(
    'INSERT INTO user_preferences (user_id) VALUES (?)'
  ).run(userId);

  const user = db.prepare('SELECT id, email, display_name, avatar_url, created_at FROM users WHERE id = ?').get(userId);
  const token = generateToken(user);

  res.status(201).json({ user, token });
});

router.post('/login', (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }

  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }

  const { password_hash, ...safeUser } = user;
  const token = generateToken(user);

  res.json({ user: safeUser, token });
});

router.get('/me', authenticateToken, (req, res) => {
  const user = db.prepare(
    'SELECT id, email, display_name, avatar_url, created_at FROM users WHERE id = ?'
  ).get(req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  res.json({ user });
});

export default router;
