import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid3X3, Settings, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { serviceCategories, defaultServices, getServiceUrl, getServiceName } from '../utils/services';
import AppDrawer from './AppDrawer';
import './TopBar.css';

export default function TopBar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showApps, setShowApps] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const appsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (appsRef.current && !appsRef.current.contains(e.target)) setShowApps(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userServices = useMemo(() => {
    return JSON.parse(localStorage.getItem('swallow_services') || '{}');
  }, []);

  const emailId = userServices.email || defaultServices.email;
  const emailUrl = getServiceUrl('email', emailId);
  const emailName = getServiceName('email', emailId);

  const searchId = userServices.search || defaultServices.search;
  const searchService = serviceCategories.search.options.find(s => s.id === searchId);
  const imagesUrl = searchService?.url?.split('?')[0] || 'https://www.google.com';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to="/" className="topbar-link topbar-about">{t('nav.about')}</Link>
        <a href="https://chromewebstore.google.com" target="_blank" rel="noopener" className="topbar-link">
          {t('nav.store')}
        </a>
      </div>
      <div className="topbar-right">
        <a
          href={emailUrl}
          target="_blank"
          rel="noopener"
          className="topbar-link"
        >
          {emailName || 'Email'}
        </a>
        <a
          href={imagesUrl}
          target="_blank"
          rel="noopener"
          className="topbar-link"
        >
          Images
        </a>

        <div className="topbar-icon-wrapper" ref={appsRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => { setShowApps(!showApps); setShowProfile(false); }}
            title={t('nav.apps')}
          >
            <Grid3X3 size={20} />
          </button>
          {showApps && <AppDrawer onClose={() => setShowApps(false)} />}
        </div>

        <div className="topbar-icon-wrapper" ref={profileRef}>
          {user ? (
            <>
              <button
                className="topbar-avatar-btn"
                onClick={() => { setShowProfile(!showProfile); setShowApps(false); }}
              >
                <div className="topbar-avatar">
                  {user.display_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                </div>
              </button>
              {showProfile && (
                <div className="topbar-dropdown profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar-lg">
                      {user.display_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <div className="profile-info">
                      <span className="profile-name">{user.display_name || user.email}</span>
                      <span className="profile-email">{user.email}</span>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <button onClick={() => { navigate('/settings'); setShowProfile(false); }} className="profile-action">
                      <Settings size={18} />
                      <span>{t('nav.settings')}</span>
                    </button>
                    <button onClick={() => { logout(); setShowProfile(false); }} className="profile-action profile-action-danger">
                      <LogOut size={18} />
                      <span>{t('auth.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              className="topbar-login-btn"
              onClick={() => navigate('/login')}
            >
              <LogIn size={16} />
              <span>{t('auth.login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
