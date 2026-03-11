import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import WidgetPanel from './WidgetPanel';

export default function ClockWidget() {
  const [now, setNow] = useState(new Date());
  const { language } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString(language, { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <WidgetPanel>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, color: 'var(--text-primary)' }}>
          {time}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{date}</div>
      </div>
    </WidgetPanel>
  );
}
