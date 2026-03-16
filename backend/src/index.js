import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import preferencesRoutes from './routes/preferences.js';
import logger from './utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:5174,https://swallow.app').split(',');

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Trop de tentatives, veuillez réessayer dans 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Serve SDK script (public, CORS open)
app.get('/swallow-bar.js', cors(), (req, res) => {
  res.sendFile(join(__dirname, 'public', 'swallow-bar.js'));
});

// Serve service icons (from extension assets)
app.use('/icons', cors(), express.static(join(__dirname, '..', '..', 'extension', 'chrome', 'icons')));

app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferencesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  logger.info('Swallow backend running', { port: PORT });
});
