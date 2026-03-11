import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Sun, Moon, Monitor, Check, Save,
  Mail, Calendar, HardDrive, FileText, Map, Languages,
  Image, Play, Newspaper, StickyNote, Music, KeyRound, Search,
  Store, User, Globe, Palette, LayoutGrid, ChevronDown, Sparkles, Contact, Table, Presentation, Video, ClipboardList, ShoppingCart, TrendingUp, BookOpen, Globe2, PenLine, MessageCircle,
  Clock, Calculator, DollarSign, CloudSun, Puzzle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { serviceCategories, defaultServices, widgetDefaults } from '../utils/services';
import api from '../utils/api';
import './Settings.css';

const iconMap = {
  search: Search, email: Mail, calendar: Calendar, drive: HardDrive,
  docs: FileText, maps: Map, translate: Languages, photos: Image,
  videos: Play, store: Store, news: Newspaper, notes: StickyNote, music: Music,
  passwords: KeyRound,
  ai: Sparkles,
  contacts: Contact,
  sheets: Table,
  slides: Presentation,
  meet: Video,
  forms: ClipboardList,
  shopping: ShoppingCart,
  finance: TrendingUp,
  books: BookOpen,
  keep: StickyNote,
  sites: Globe2,
  earth: Globe,
  blogger: PenLine,
  chat: MessageCircle,
};

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage, languages } = useLanguage();
  const navigate = useNavigate();

  const [services, setServices] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('swallow_services') || '{}');
    return { ...defaultServices, ...stored };
  });
  const [widgets, setWidgets] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('swallow_widgets') || '{}');
    return { ...widgetDefaults, ...stored };
  });
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');

  // Sync from server on mount if logged in
  useEffect(() => {
    if (user) {
      api.getPreferences().then(data => {
        if (data.preferences) {
          const prefs = data.preferences;
          if (prefs.theme) setTheme(prefs.theme);
          if (prefs.language) setLanguage(prefs.language);
          if (prefs.default_services) {
            const serverServices = typeof prefs.default_services === 'string'
              ? JSON.parse(prefs.default_services)
              : prefs.default_services;
            setServices(prev => ({ ...prev, ...serverServices }));
          }
        }
      }).catch(() => {});
    }
  }, [user]);

  const handleServiceChange = (category, serviceId) => {
    setServices(prev => ({ ...prev, [category]: serviceId }));
    setSaved(false);
  };

  const handleWidgetChange = (widgetId) => {
    setWidgets(prev => ({ ...prev, [widgetId]: !prev[widgetId] }));
    setSaved(false);
  };

  const handleSave = async () => {
    localStorage.setItem('swallow_services', JSON.stringify(services));
    localStorage.setItem('swallow_widgets', JSON.stringify(widgets));
    window.dispatchEvent(new CustomEvent('swallow-services-updated', {
      detail: { services },
    }));
    window.dispatchEvent(new CustomEvent('swallow-widgets-updated', {
      detail: { widgets },
    }));
    if (user) {
      try {
        await api.updatePreferences({
          theme,
          language,
          search_engine: services.search,
          default_services: services,
        });
      } catch (e) {
        console.error('Failed to sync preferences:', e);
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'appearance', icon: Palette, label: t('settings.appearance') },
    { id: 'services', icon: LayoutGrid, label: t('settings.services') },
    { id: 'language', icon: Globe, label: t('settings.language') },
    { id: 'widgets', icon: Puzzle, label: t('settings.widgets') },
    { id: 'account', icon: User, label: t('settings.account') },
  ];

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <div className="settings-sidebar-header">
          <Link to="/" className="settings-back">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="settings-title">{t('settings.title')}</h1>
        </div>
        <nav className="settings-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon size={18} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="settings-content">
        {activeSection === 'appearance' && (
          <section className="settings-section">
            <h2 className="settings-section-title">{t('settings.appearance')}</h2>
            <div className="settings-card">
              <h3 className="settings-card-title">{t('settings.theme')}</h3>
              <div className="theme-options">
                {[
                  { value: 'light', icon: Sun, label: t('settings.themeLight') },
                  { value: 'dark', icon: Moon, label: t('settings.themeDark') },
                  { value: 'system', icon: Monitor, label: t('settings.themeSystem') },
                ].map(option => (
                  <button
                    key={option.value}
                    className={`theme-option ${theme === option.value ? 'active' : ''}`}
                    onClick={() => setTheme(option.value)}
                  >
                    <option.icon size={20} />
                    <span>{option.label}</span>
                    {theme === option.value && <Check size={16} className="theme-check" />}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'language' && (
          <section className="settings-section">
            <h2 className="settings-section-title">{t('settings.language')}</h2>
            <div className="settings-card">
              <div className="language-options">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span className="language-flag">{lang.flag}</span>
                    <span className="language-name">{lang.name}</span>
                    {language === lang.code && <Check size={16} className="language-check" />}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'services' && (
          <section className="settings-section">
            <h2 className="settings-section-title">{t('settings.services')}</h2>
            <p className="settings-section-desc">{t('settings.servicesDesc')}</p>
            <div className="services-list">
              {Object.entries(serviceCategories).map(([category, config]) => {
                const Icon = iconMap[category] || Search;
                return (
                  <div key={category} className="settings-card service-card">
                    <div className="service-header">
                      <Icon size={20} className="service-icon" />
                      <span className="service-label">{t(`services.${category}`)}</span>
                    </div>
                    <div className="service-select-wrapper">
                      <select
                        className="service-select"
                        value={services[category] || config.options[0].id}
                        onChange={(e) => handleServiceChange(category, e.target.value)}
                      >
                        {config.options.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="service-select-arrow" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeSection === 'widgets' && (
          <section className="settings-section">
            <h2 className="settings-section-title">{t('settings.widgets')}</h2>
            <p className="settings-section-desc">{t('settings.widgetsDesc')}</p>
            <div className="widgets-list">
              {[
                { id: 'clock', icon: Clock, label: t('widgets.clock') },
                { id: 'weather', icon: CloudSun, label: t('widgets.weather') },
                { id: 'calculator', icon: Calculator, label: t('widgets.calculator') },
                { id: 'currency', icon: DollarSign, label: t('widgets.currency') },
              ].map(widget => (
                <div key={widget.id} className="settings-card widget-card">
                  <div className="widget-header">
                    <widget.icon size={20} className="widget-icon" />
                    <span className="widget-label">{widget.label}</span>
                  </div>
                  <button
                    className={`widget-toggle ${widgets[widget.id] ? 'active' : ''}`}
                    onClick={() => handleWidgetChange(widget.id)}
                  >
                    <span className="widget-toggle-knob" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'account' && (
          <section className="settings-section">
            <h2 className="settings-section-title">{t('settings.account')}</h2>
            <div className="settings-card">
              {user ? (
                <div className="account-info">
                  <div className="account-avatar">
                    {user.display_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                  <div className="account-details">
                    <span className="account-name">{user.display_name}</span>
                    <span className="account-email">{user.email}</span>
                    <span className="account-sync">{t('auth.syncEnabled')}</span>
                  </div>
                </div>
              ) : (
                <div className="account-guest">
                  <p className="account-guest-text">{t('auth.syncDisabled')}</p>
                  <button
                    className="account-login-btn"
                    onClick={() => navigate('/login')}
                  >
                    {t('auth.login')}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="settings-actions">
          <button className="settings-save" onClick={handleSave}>
            {saved ? (
              <>
                <Check size={16} />
                <span>{t('settings.saved')}</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{t('settings.save')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
