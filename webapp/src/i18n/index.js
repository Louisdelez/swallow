import fr from './fr.json';
import en from './en.json';
import de from './de.json';
import it from './it.json';
import es from './es.json';

const translations = { fr, en, de, it, es };

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function t(key, lang = 'fr') {
  return getNestedValue(translations[lang], key) || getNestedValue(translations['fr'], key) || key;
}

export { translations, languages, t };
export default t;
