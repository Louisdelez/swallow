import './WidgetPanel.css';

export default function WidgetPanel({ title, children }) {
  return (
    <div className="widget-panel">
      {title && <div className="widget-panel-title">{title}</div>}
      <div className="widget-panel-body">{children}</div>
    </div>
  );
}
