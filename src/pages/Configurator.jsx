import { useState } from 'react';
import { CATEGORIES, PARTS, formatCost, getDomain } from '../data/partsData';

const CATEGORY_COLORS = {
  interior: '#4a7ae8',
  exterior: '#e63950',
  suspension: '#008550',
  performance: '#f0a030',
  maintenance: '#8888a0',
};

/* Part marker positions as percentage of the car image (left%, top%) */
const PART_POSITIONS = {
  'Air Intake':                { left: 10, top: 48 },
  'Brakes':                    { left: 21, top: 64 },
  'Supercharger Maintenance':  { left: 17, top: 33 },
  'Exhaust':                   { left: 88, top: 62 },
  'Steering Wheel':            { left: 32, top: 30 },
  'Shifter':                   { left: 40, top: 50 },
  'Seat - Option 1':           { left: 44, top: 28 },
  'Seat - Option 2':           { left: 47, top: 40 },
  'Seat Brackets':             { left: 50, top: 54 },
  'Seat Sliders':              { left: 54, top: 60 },
  'Radio':                     { left: 36, top: 40 },
  'Door Pulls':                { left: 54, top: 38 },
  'Pedals':                    { left: 28, top: 56 },
  'Rear Seat Delete':          { left: 62, top: 32 },
  'Mats - Driver Side':        { left: 38, top: 62 },
  'Mats - Passenger Side':     { left: 45, top: 66 },
  'Floorboards - Driver Side': { left: 32, top: 66 },
  'Floorboards - Passenger Side': { left: 52, top: 66 },
  'Wheels':                    { left: 22, top: 72 },
  'Tires':                     { left: 76, top: 73 },
  'Coilovers':                 { left: 49, top: 74 },
  'Maintenance':               { left: 22, top: 30 },
};

export default function Configurator() {
  const [selectedParts, setSelectedParts] = useState(() => new Set(PARTS.map(p => p.name)));
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePart, setActivePart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);

  const togglePart = (name) => {
    setSelectedParts(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectedTotal = PARTS
    .filter(p => selectedParts.has(p.name))
    .reduce((sum, p) => sum + (p.cost || 0), 0);

  const selectedCount = selectedParts.size;

  const isVisible = (part) => activeCategory === 'all' || part.category === activeCategory;

  const activePartData = activePart ? PARTS.find(p => p.name === activePart) : null;

  return (
    <div className="configurator-page">
      <div className="configurator-header">
        <h1>Visual Configurator</h1>
        <p>Explore and select parts for the R53 Cooper S build</p>
      </div>

      <div className="configurator-controls">
        <div className="config-filters">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'filter-active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              className={`filter-btn ${activeCategory === key ? 'filter-active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
        <div className="configurator-total">
          <span className="configurator-total-label">{selectedCount} of {PARTS.length} parts selected</span>
          <span className="configurator-total-value">{formatCost(selectedTotal)}</span>
        </div>
      </div>

      <div className="configurator-main">
        <div className="configurator-diagram" onClick={() => setActivePart(null)}>
          <img
            src="/mini-silhouette.svg"
            alt="R53 Mini Cooper S side profile"
            className="configurator-car-img"
            draggable={false}
          />

          {/* Part markers overlay */}
          {PARTS.map((part) => {
            const pos = PART_POSITIONS[part.name];
            if (!pos) return null;
            const color = CATEGORY_COLORS[part.category];
            const selected = selectedParts.has(part.name);
            const visible = isVisible(part);
            const isHovered = hoveredPart === part.name;
            const isActive = activePart === part.name;
            const dimmed = !visible;

            return (
              <div
                key={part.name}
                className={`cfg-marker-dot ${dimmed ? 'cfg-marker-dimmed' : ''} ${!selected ? 'cfg-marker-off' : ''} ${isActive ? 'cfg-marker-active' : ''} ${isHovered ? 'cfg-marker-hovered' : ''}`}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  '--marker-color': color,
                }}
                onClick={(e) => { e.stopPropagation(); setActivePart(part.name); }}
                onMouseEnter={() => setHoveredPart(part.name)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                <span className="cfg-marker-dot-inner" />
                <span className="cfg-marker-dot-label">{part.name}</span>

                {/* Tooltip on hover */}
                {isHovered && !activePart && (
                  <div className="cfg-marker-tooltip">
                    <strong>{part.name}</strong>
                    <span>{formatCost(part.cost)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {activePartData && (
          <div className="configurator-detail">
            <div className="cfg-detail-header">
              <h3>{activePartData.name}</h3>
              <button className="cfg-detail-close" onClick={() => setActivePart(null)}>&times;</button>
            </div>

            <span className={`cat-badge cat-${activePartData.category}`}>
              {CATEGORIES[activePartData.category].icon} {CATEGORIES[activePartData.category].label}
            </span>

            <div className="cfg-detail-cost">
              {formatCost(activePartData.cost)}
            </div>

            {activePartData.url && (
              <a href={activePartData.url} target="_blank" rel="noopener noreferrer" className="cfg-detail-source">
                {getDomain(activePartData.url)} &#x2197;
              </a>
            )}

            <button
              className={`cfg-toggle-btn ${selectedParts.has(activePartData.name) ? 'cfg-toggle-on' : ''}`}
              onClick={() => togglePart(activePartData.name)}
            >
              <span className="cfg-toggle-track">
                <span className="cfg-toggle-knob" />
              </span>
              <span>{selectedParts.has(activePartData.name) ? 'Included in build' : 'Not included'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Parts checklist */}
      <div className="configurator-parts-list">
        <h2>All Parts</h2>
        {Object.entries(CATEGORIES).map(([catKey, cat]) => {
          const catParts = PARTS.filter(p => p.category === catKey);
          if (activeCategory !== 'all' && activeCategory !== catKey) return null;
          return (
            <div key={catKey} className="cfg-parts-group">
              <h3 className="cfg-parts-group-title">
                <span>{cat.icon}</span> {cat.label}
              </h3>
              {catParts.map(part => (
                <div
                  key={part.name}
                  className={`cfg-parts-item ${activePart === part.name ? 'cfg-parts-item-active' : ''}`}
                  onClick={() => setActivePart(part.name)}
                >
                  <button
                    className={`cfg-toggle-switch ${selectedParts.has(part.name) ? 'cfg-toggle-switch-on' : ''}`}
                    onClick={(e) => { e.stopPropagation(); togglePart(part.name); }}
                    aria-label={`Toggle ${part.name}`}
                  >
                    <span className="cfg-toggle-switch-knob" />
                  </button>
                  <span className={`cfg-parts-name ${!selectedParts.has(part.name) ? 'cfg-parts-name-off' : ''}`}>
                    {part.name}
                  </span>
                  <span className={`cfg-parts-cost ${part.cost === null ? 'cost-tbd' : ''}`}>
                    {formatCost(part.cost)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
