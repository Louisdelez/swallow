import { useMemo } from 'react';
import {
  Mail, Calendar, HardDrive, FileText, Map, Languages, Image,
  Play, Newspaper, StickyNote, Music, KeyRound, Search, Pencil
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { serviceCategories, defaultServices } from '../utils/services';
import { Link } from 'react-router-dom';
import './AppDrawer.css';

const iconMap = {
  'mail': Mail,
  'calendar': Calendar,
  'hard-drive': HardDrive,
  'file-text': FileText,
  'map': Map,
  'languages': Languages,
  'image': Image,
  'play': Play,
  'newspaper': Newspaper,
  'sticky-note': StickyNote,
  'music': Music,
  'key-round': KeyRound,
  'search': Search,
};

const iconColors = {
  email: '#ea4335',
  calendar: '#4285f4',
  drive: '#fbbc04',
  docs: '#4285f4',
  maps: '#34a853',
  translate: '#4285f4',
  photos: '#ea4335',
  videos: '#ff0000',
  news: '#4285f4',
  notes: '#fbbc04',
  music: '#ff0000',
  passwords: '#5f6368',
  search: '#4285f4',
};

export default function AppDrawer({ onClose }) {
  const { t } = useLanguage();

  const userServices = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem('swallow_services') || '{}');
    return { ...defaultServices, ...stored };
  }, []);

  const categories = Object.keys(serviceCategories).filter(k => k !== 'search');

  return (
    <div className="app-drawer">
      <div className="app-drawer-header">
        <span className="app-drawer-title">{t('nav.allApps')}</span>
        <Link to="/settings" className="app-drawer-edit" onClick={onClose} title={t('nav.settings')}>
          <Pencil size={16} />
        </Link>
      </div>
      <div className="app-drawer-grid">
        {categories.map(category => {
          const serviceId = userServices[category];
          const service = serviceCategories[category].options.find(s => s.id === serviceId)
            || serviceCategories[category].options[0];
          const IconComponent = iconMap[serviceCategories[category].icon] || Search;

          return (
            <a
              key={category}
              href={service.url}
              target="_blank"
              rel="noopener"
              className="app-drawer-item"
              onClick={onClose}
            >
              <div className="app-drawer-icon" style={{ color: iconColors[category] }}>
                <IconComponent size={24} />
              </div>
              <span className="app-drawer-label">{service.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
