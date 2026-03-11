import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t, languages, language, setLanguage } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-top">
        <span className="footer-country">{t('footer.country')}</span>
      </div>
      <div className="footer-bottom">
        <div className="footer-left">
          <span className="footer-link">{t('footer.about')}</span>
          <span className="footer-link">{t('footer.privacy')}</span>
          <span className="footer-link">{t('footer.terms')}</span>
        </div>
        <div className="footer-right">
          <div className="footer-languages">
            {languages.map(lang => (
              <button
                key={lang.code}
                className={`footer-lang ${language === lang.code ? 'footer-lang-active' : ''}`}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
