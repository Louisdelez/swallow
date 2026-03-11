import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import WidgetPanel from './WidgetPanel';
import './CurrencyWidget.css';

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF', 'JPY', 'CAD'];

export default function CurrencyWidget() {
  const { t } = useLanguage();
  const [from, setFrom] = useState('EUR');
  const [to, setTo] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (from === to) { setRate(1); setLoading(false); return; }
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
      .then(r => r.json())
      .then(data => {
        setRate(data.rates?.[to] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [from, to]);

  const result = rate && amount ? (parseFloat(amount) * rate).toFixed(2) : '—';

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <WidgetPanel title={t('widgets.currency')}>
      <div className="currency-row">
        <input
          type="number"
          className="currency-input"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="0"
        />
        <select className="currency-select" value={from} onChange={e => setFrom(e.target.value)}>
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <button className="currency-swap" onClick={swap}>⇅</button>
      <div className="currency-row">
        <div className="currency-result">{loading ? '...' : result}</div>
        <select className="currency-select" value={to} onChange={e => setTo(e.target.value)}>
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </WidgetPanel>
  );
}
