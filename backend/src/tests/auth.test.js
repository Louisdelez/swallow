import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 255);
}

describe('validateEmail', () => {
  it('accepts valid emails', () => {
    assert.ok(validateEmail('user@example.com'));
    assert.ok(validateEmail('a@b.co'));
    assert.ok(validateEmail('test+tag@gmail.com'));
  });

  it('rejects invalid emails', () => {
    assert.ok(!validateEmail(''));
    assert.ok(!validateEmail('not-an-email'));
    assert.ok(!validateEmail('@missing.com'));
    assert.ok(!validateEmail('user@'));
    assert.ok(!validateEmail(null));
    assert.ok(!validateEmail(123));
  });

  it('rejects too-long emails', () => {
    const longEmail = 'a'.repeat(250) + '@b.com';
    assert.ok(!validateEmail(longEmail));
  });
});

describe('sanitize', () => {
  it('trims whitespace', () => {
    assert.equal(sanitize('  hello  '), 'hello');
  });

  it('truncates to 255 chars', () => {
    const long = 'a'.repeat(300);
    assert.equal(sanitize(long).length, 255);
  });

  it('returns empty string for non-strings', () => {
    assert.equal(sanitize(null), '');
    assert.equal(sanitize(123), '');
    assert.equal(sanitize(undefined), '');
  });
});
