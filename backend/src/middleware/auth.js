import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function getJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  console.warn('WARNING: JWT_SECRET not set. Using random secret (tokens will not survive restarts).');
  return crypto.randomBytes(64).toString('hex');
}

const JWT_SECRET = getJwtSecret();

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requis' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch {
    return res.status(403).json({ error: 'Token invalide' });
  }
}

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
}
