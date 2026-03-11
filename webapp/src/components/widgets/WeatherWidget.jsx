import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import WidgetPanel from './WidgetPanel';
import './WeatherWidget.css';

const WMO_ICONS = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '🌧️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
};

export default function WeatherWidget() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWeather = () => {
    setLoading(true);
    setError(false);

    const cached = sessionStorage.getItem('swallow_weather');
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < 30 * 60 * 1000 && 'city' in data) {
        setWeather(data);
        setLoading(false);
        return;
      }
    }

    const fetchFromCoords = (latitude, longitude, city) => {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const cityPromise = city
        ? Promise.resolve(city)
        : fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`)
            .then(r => r.json())
            .then(d => d.address?.city || d.address?.town || d.address?.village || '')
            .catch(() => '');

      Promise.all([fetch(weatherUrl).then(r => r.json()), cityPromise])
        .then(([data, cityName]) => {
          const w = data.current_weather;
          const result = {
            temp: Math.round(w.temperature),
            icon: WMO_ICONS[w.weathercode] || '🌡️',
            wind: Math.round(w.windspeed),
            city: cityName,
          };
          sessionStorage.setItem('swallow_weather', JSON.stringify({ data: result, ts: Date.now() }));
          setWeather(result);
          setLoading(false);
        })
        .catch(() => { setError(true); setLoading(false); });
    };

    const fallbackToIP = () => {
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
          if (data.latitude && data.longitude) {
            fetchFromCoords(data.latitude, data.longitude, data.city || '');
          } else {
            setError(true); setLoading(false);
          }
        })
        .catch(() => { setError(true); setLoading(false); });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchFromCoords(pos.coords.latitude, pos.coords.longitude),
        () => fallbackToIP(),
        { timeout: 5000 }
      );
    } else {
      fallbackToIP();
    }
  };

  useEffect(() => { fetchWeather(); }, []);

  if (loading) {
    return (
      <WidgetPanel title={t('widgets.weather')}>
        <div className="weather-loading">...</div>
      </WidgetPanel>
    );
  }

  if (error) {
    return (
      <WidgetPanel title={t('widgets.weather')}>
        <div className="weather-error">
          <div>{t('widgets.locationRequired')}</div>
          <button className="weather-retry" onClick={fetchWeather}>{t('widgets.retry')}</button>
        </div>
      </WidgetPanel>
    );
  }

  return (
    <WidgetPanel title={t('widgets.weather')}>
      <div className="weather-content">
        <span className="weather-icon">{weather.icon}</span>
        <span className="weather-temp">{weather.temp}°C</span>
        <span className="weather-wind">{weather.wind} km/h</span>
      </div>
      {weather.city && <div className="weather-city">{weather.city}</div>}
    </WidgetPanel>
  );
}
