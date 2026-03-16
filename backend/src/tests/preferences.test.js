import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test the validation logic inline (since it's not exported separately)
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

describe('validatePreferences', () => {
  it('accepts valid preferences', () => {
    const errors = validatePreferences({
      theme: 'dark',
      language: 'fr',
      search_engine: 'google',
      default_services: { search: 'google', maps: 'waze' },
    });
    assert.equal(errors.length, 0);
  });

  it('rejects invalid theme', () => {
    const errors = validatePreferences({ theme: 'rainbow' });
    assert.equal(errors.length, 1);
    assert.match(errors[0], /theme/i);
  });

  it('rejects invalid language', () => {
    const errors = validatePreferences({ language: 'xx' });
    assert.equal(errors.length, 1);
    assert.match(errors[0], /language/i);
  });

  it('rejects non-object default_services', () => {
    const errors = validatePreferences({ default_services: 'not an object' });
    assert.equal(errors.length, 1);
  });

  it('rejects array default_services', () => {
    const errors = validatePreferences({ default_services: ['a', 'b'] });
    assert.equal(errors.length, 1);
  });

  it('rejects too-long service values', () => {
    const errors = validatePreferences({
      default_services: { search: 'a'.repeat(100) },
    });
    assert.equal(errors.length, 1);
  });

  it('accepts empty body', () => {
    const errors = validatePreferences({});
    assert.equal(errors.length, 0);
  });

  it('accepts valid string default_services (JSON)', () => {
    const errors = validatePreferences({
      default_services: JSON.stringify({ search: 'bing' }),
    });
    assert.equal(errors.length, 0);
  });
});
