import { useState, useEffect, useCallback } from 'react';
import { widgetDefaults } from '../../utils/services';
import ClockWidget from './ClockWidget';
import CalculatorWidget from './CalculatorWidget';
import CurrencyWidget from './CurrencyWidget';
import WeatherWidget from './WeatherWidget';
import './WidgetsContainer.css';

const WIDGET_COMPONENTS = {
  clock: ClockWidget,
  weather: WeatherWidget,
  calculator: CalculatorWidget,
  currency: CurrencyWidget,
};

function getWidgets() {
  const stored = JSON.parse(localStorage.getItem('swallow_widgets') || '{}');
  return { ...widgetDefaults, ...stored };
}

export default function WidgetsContainer() {
  const [widgets, setWidgets] = useState(getWidgets);

  const refresh = useCallback(() => setWidgets(getWidgets()), []);

  useEffect(() => {
    window.addEventListener('swallow-widgets-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('swallow-widgets-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  const activeWidgets = Object.entries(widgets).filter(([, enabled]) => enabled);
  if (activeWidgets.length === 0) return null;

  return (
    <div className="widgets-container">
      {activeWidgets.map(([id]) => {
        const Component = WIDGET_COMPONENTS[id];
        return Component ? <Component key={id} /> : null;
      })}
    </div>
  );
}
