import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Sun, Moon, Monitor, Check, Save,
  Mail, Calendar, HardDrive, FileText, Map, Languages,
  Image, Play, Newspaper, StickyNote, Music, KeyRound, Search,
  Store, User, Globe, Palette, LayoutGrid, ChevronDown, Sparkles, Contact, Table, Presentation, Video, ClipboardList, ShoppingCart, TrendingUp, BookOpen, Globe2, PenLine, MessageCircle,
  Clock, Calculator, DollarSign, CloudSun, Puzzle, Download, Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSync } from '../contexts/SyncContext';
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
  const { broadcastCurrentState, sseStatus } = useSync();
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
  const [importStatus, setImportStatus] = useState(null);
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

  const handleExport = () => {
    const data = {
      version: 1,
      theme,
      language,
      services,
      widgets,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swallow-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.version || !data.theme || !data.language || !data.services || !data.widgets) {
            setImportStatus('error');
            setTimeout(() => setImportStatus(null), 3000);
            return;
          }
          setTheme(data.theme);
          setLanguage(data.language);
          setServices(data.services);
          setWidgets(data.widgets);
          localStorage.setItem('swallow_services', JSON.stringify(data.services));
          localStorage.setItem('swallow_widgets', JSON.stringify(data.widgets));
          setImportStatus('success');
          setTimeout(() => setImportStatus(null), 3000);
        } catch {
          setImportStatus('error');
          setTimeout(() => setImportStatus(null), 3000);
        }
      };
      reader.readAsText(file);
    };
    input.click();
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
    // Broadcast to extension via postMessage bridge
    broadcastCurrentState();

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
    { id: 'importexport', icon: Download, label: t('settings.importExport') },
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
                    <img className="language-flag" src={`https://flagcdn.com/w40/${lang.countryCode}.png`} alt={lang.name} width="24" height="18" />
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

        {activeSection === 'importexport' && (
          <section className="settings-section">
            <h2 className="settings-section-title">{t('settings.importExport')}</h2>
            <div className="settings-card">
              <h3 className="settings-card-title">{t('settings.export')}</h3>
              <p className="settings-section-desc">{t('settings.exportDesc')}</p>
              <button className="settings-save" onClick={handleExport}>
                <Download size={16} />
                <span>{t('settings.export')}</span>
              </button>
            </div>
            <div className="settings-card" style={{ marginTop: '1rem' }}>
              <h3 className="settings-card-title">{t('settings.import')}</h3>
              <p className="settings-section-desc">{t('settings.importDesc')}</p>
              <button className="settings-save" onClick={handleImport}>
                <Upload size={16} />
                <span>{t('settings.import')}</span>
              </button>
              {importStatus === 'success' && (
                <p className="settings-section-desc" style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>
                  {t('settings.importSuccess')}
                </p>
              )}
              {importStatus === 'error' && (
                <p className="settings-section-desc" style={{ color: '#e74c3c', marginTop: '0.5rem' }}>
                  {t('settings.importError')}
                </p>
              )}
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
                    <span className="account-sync">
                      {t('auth.syncEnabled')}
                      <span className={`sync-indicator sync-${sseStatus}`} title={`SSE: ${sseStatus}`} />
                    </span>
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
