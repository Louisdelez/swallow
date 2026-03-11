import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './NotFound.css';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-message">{t('errors.notFound')}</p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-btn notfound-btn-primary">
            <Home size={18} />
            <span>{t('errors.backHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
