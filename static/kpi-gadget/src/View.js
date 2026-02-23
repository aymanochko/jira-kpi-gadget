import React, { useEffect, useState } from 'react';
import { view, invoke } from '@forge/bridge';

// Utility function to decode HTML entities (e.g., &eacute; → é)
function decodeHtmlEntities(text) {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// Get trend display properties based on trend value
function getTrendDisplay(trend) {
  const trendMap = {
    'up': { arrow: '↑', label: 'Hausse', className: 'trend-up' },
    'down': { arrow: '↓', label: 'Baisse', className: 'trend-down' },
    'stable': { arrow: '→', label: 'Stable', className: 'trend-stable' },
  };
  return trendMap[trend] || { arrow: '', label: trend, className: '' };
}

function View() {
  const [context, setContext] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getConfig').then(setData);
  }, []);

  useEffect(() => {
    view.getContext().then(setContext);
  }, []);

  if (!context || !data) {
    return 'Loading...';
  }

  // Get trend display properties
  const trendValue = decodeHtmlEntities(data["trend"]);
  console.log("Tred : "+ data["trend"])
  const trendDisplay = getTrendDisplay(trendValue);

  return (
    
<div>
      {/* --- Ton CSS intégré ici --- */}
      <style>{`
        .kpi-card{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;display:inline-block;background:#fff;border-radius:12px;padding:20px;min-width:220px;box-shadow:0 2px 8px rgba(0,0,0,.1);border-left:4px solid #3b82f6;box-sizing:border-box}
        .kpi-card.ai-metric{border-left-color:#a855f7}
        .kpi-card.agile-metric{border-left-color:#3b82f6;min-width: 350px;margin: 5px}
        .kpi-card.quality-metric{border-left-color:#22c55e}
        .kpi-card.dark{background:#1e293b}
        .kpi-card.dark .kpi-label,.kpi-card.dark .kpi-unit,.kpi-card.dark .kpi-target{color:#94a3b8}
        .kpi-card.dark .kpi-value{color:#f1f5f9}
        .kpi-card.dark .kpi-meta{border-color:#334155}
        .kpi-card.dark .progress-bar{background:#0f172a}
        .kpi-label{color:#64748b;font-size:.75rem;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;font-weight:600}
        .kpi-value-container{display:flex;align-items:baseline;gap:4px;margin-bottom:8px}
        .kpi-value{font-size:2rem;font-weight:700;color:#1e293b}
        .kpi-unit{font-size:.9rem;color:#64748b}
        .kpi-meta{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #e2e8f0}
        .kpi-target{font-size:.8rem;color:#64748b}
        .kpi-target span{color:#22c55e;font-weight:600}
        .trend-indicator{display:flex;align-items:center;gap:4px;font-size:.85rem;font-weight:600}
        .trend-up{color:#22c55e}
        .trend-down{color:#ef4444}
        .trend-stable{color:#eab308}
        .progress-bar{width:100%;height:6px;background:#e2e8f0;border-radius:3px;margin-top:12px;overflow:hidden}
        .progress-fill{height:100%;border-radius:3px}
        .progress-fill.green{background:#22c55e}
        .progress-fill.blue{background:#3b82f6}
        .progress-fill.yellow{background:#eab308}
        .bug-severity{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}
        .severity-badge{font-size:.65rem;padding:3px 6px;border-radius:4px;font-weight:600}
        .severity-critical{background:#fef2f2;color:#ef4444}
        .severity-high{background:#fefce8;color:#eab308}
        .severity-medium{background:#eff6ff;color:#3b82f6}
        .severity-low{background:#f0fdf4;color:#22c55e}
      `}</style>
      {/* --- Ton HTML KPI --- */}
      <div className="kpi-card agile-metric">
      <div className="kpi-label">{data["label"] ? decodeHtmlEntities(data["label"]) : "Edit me"}</div>
        <div className="kpi-value-container">
          <span className="kpi-value">{data["value"] ? decodeHtmlEntities(data["value"]) : "Edit me"}</span>
          <span className="kpi-unit">{data["unit"] ? decodeHtmlEntities(data["unit"]) : "Edit me"}</span>
        </div>

        <div className="kpi-meta">
          <div className="kpi-target">
            Objectif: <span>{data["target"] ? decodeHtmlEntities(data["target"]) : "Edit me"}</span> {data["unit"] ? decodeHtmlEntities(data["unit"]) : "Edit me"}
          </div>
          <div className={`trend-indicator ${trendDisplay.className}`}>
            {trendValue ? `${trendDisplay.arrow} ${trendDisplay.label}` : 'Edit me'}
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill green" style={{ width: '84%' }}></div>
        </div>
      </div>

    </div>

  );
}

export default View;
