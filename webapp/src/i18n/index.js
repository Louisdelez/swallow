import fr from './fr.json';
import en from './en.json';
import de from './de.json';
import it from './it.json';
import es from './es.json';

const translations = { fr, en, de, it, es };

const languages = [
  { code: 'fr', name: 'Français', countryCode: 'fr' },
  { code: 'en', name: 'English', countryCode: 'gb' },
  { code: 'de', name: 'Deutsch', countryCode: 'de' },
  { code: 'it', name: 'Italiano', countryCode: 'it' },
  { code: 'es', name: 'Español', countryCode: 'es' },
];

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function t(key, lang = 'fr') {
  return getNestedValue(translations[lang], key) || getNestedValue(translations['fr'], key) || key;
}

export { translations, languages, t };
export default t;
