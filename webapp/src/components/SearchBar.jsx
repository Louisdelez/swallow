import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getSearchUrl, defaultServices, serviceCategories } from '../utils/services';
import './SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const { t } = useLanguage();

  const userServices = JSON.parse(localStorage.getItem('swallow_services') || '{}');
  const searchEngine = userServices.search || defaultServices.search;
  const searchUrl = getSearchUrl(searchEngine);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = searchUrl + encodeURIComponent(query.trim());
    }
  };

  const handleLucky = () => {
    if (query.trim()) {
      const luckyUrls = {
        google: 'https://www.google.com/search?btnI=1&q=',
        bing: 'https://www.bing.com/search?q=',
        duckduckgo: 'https://duckduckgo.com/?q=!ducky+',
        brave: 'https://search.brave.com/search?q=',
      };
      const luckyUrl = luckyUrls[searchEngine] || (searchUrl);
      window.location.href = luckyUrl + encodeURIComponent(query.trim());
    }
  };

  return (
    <form className={`searchbar ${focused ? 'searchbar-focused' : ''}`} onSubmit={handleSearch}>
      <div className="searchbar-inner">
        <Search size={20} className="searchbar-icon" />
        <input
          type="text"
          className="searchbar-input"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
        />
      </div>
      <div className="searchbar-buttons">
        <button type="submit" className="searchbar-btn">
          {t('search.button')}
        </button>
      </div>
    </form>
  );
}
