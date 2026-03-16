const API_BASE = '/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('swallow_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Une erreur est survenue');
    }
    return data;
  } catch (e) {
    if (!navigator.onLine || e.name === 'TypeError') {
      // Network error / offline — return null so callers can fallback to local data
      console.warn(`[Swallow] Offline or network error for ${endpoint}:`, e.message);
      return null;
    }
    throw e;
  }
}

export const api = {
  login: (email, password) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password, displayName) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, display_name: displayName }) }),
  getMe: () => fetchAPI('/auth/me'),
  getPreferences: () => fetchAPI('/preferences'),
  updatePreferences: (prefs) => fetchAPI('/preferences', { method: 'PUT', body: JSON.stringify(prefs) }),
};

export default api;
