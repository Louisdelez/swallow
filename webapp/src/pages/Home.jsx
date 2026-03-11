import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import WidgetsContainer from '../components/widgets/WidgetsContainer';
import { defaultServices, serviceCategories } from '../utils/services';
import './Home.css';

function getSearchName() {
  const stored = JSON.parse(localStorage.getItem('swallow_services') || '{}');
  const searchId = stored.search || defaultServices.search;
  const service = serviceCategories.search.options.find(s => s.id === searchId);
  return service?.name || 'Google';
}

export default function Home() {
  const [searchName, setSearchName] = useState(getSearchName);

  const refresh = useCallback(() => setSearchName(getSearchName()), []);

  useEffect(() => {
    window.addEventListener('swallow-services-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('swallow-services-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const updateHeight = () => {
      const home = document.querySelector('.home');
      if (home) {
        const top = home.getBoundingClientRect().top;
        home.style.height = `calc(100vh - ${top}px)`;
      }
    };

    // Run immediately + after short delay (extension TopBar injects async)
    updateHeight();
    const timer = setTimeout(updateHeight, 500);
    // Watch for DOM changes (extension injecting TopBar)
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true });
    window.addEventListener('resize', updateHeight);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="home">
      <WidgetsContainer />
      <main className="home-main">
        <div className="home-logo">
          <h1 className="home-title">{searchName}</h1>
        </div>
        <SearchBar />
      </main>
      <Footer />
    </div>
  );
}
