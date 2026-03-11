import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import WidgetPanel from './WidgetPanel';
import './CalculatorWidget.css';

export default function CalculatorWidget() {
  const { t } = useLanguage();
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);

  const input = (val) => {
    if (reset) {
      setDisplay(val);
      setReset(false);
    } else {
      setDisplay(display === '0' && val !== '.' ? val : display + val);
    }
  };

  const operate = (nextOp) => {
    const current = parseFloat(display);
    if (prev !== null && op) {
      let result;
      switch (op) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current !== 0 ? prev / current : 'Err'; break;
        default: result = current;
      }
      const r = typeof result === 'number' ? parseFloat(result.toFixed(8)) : result;
      setDisplay(String(r));
      setPrev(r);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setReset(true);
  };

  const equals = () => {
    if (op) operate(null);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setReset(false);
  };

  return (
    <WidgetPanel title={t('widgets.calculator')}>
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        <button className="calc-btn calc-clear" onClick={clear}>C</button>
        <button className="calc-btn calc-op" onClick={() => operate('/')}>÷</button>
        <button className="calc-btn calc-op" onClick={() => operate('*')}>×</button>
        <button className="calc-btn calc-op" onClick={() => operate('-')}>−</button>
        <button className="calc-btn" onClick={() => input('7')}>7</button>
        <button className="calc-btn" onClick={() => input('8')}>8</button>
        <button className="calc-btn" onClick={() => input('9')}>9</button>
        <button className="calc-btn calc-op calc-plus" onClick={() => operate('+')}>+</button>
        <button className="calc-btn" onClick={() => input('4')}>4</button>
        <button className="calc-btn" onClick={() => input('5')}>5</button>
        <button className="calc-btn" onClick={() => input('6')}>6</button>
        <button className="calc-btn" onClick={() => input('1')}>1</button>
        <button className="calc-btn" onClick={() => input('2')}>2</button>
        <button className="calc-btn" onClick={() => input('3')}>3</button>
        <button className="calc-btn calc-eq" onClick={equals}>=</button>
        <button className="calc-btn calc-zero" onClick={() => input('0')}>0</button>
        <button className="calc-btn" onClick={() => input('.')}>.</button>
      </div>
    </WidgetPanel>
  );
}
