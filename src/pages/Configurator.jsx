import { useState, useRef } from 'react';
import { CATEGORIES, PARTS, formatCost, getDomain } from '../data/partsData';

const CATEGORY_COLORS = {
  interior: '#4a7ae8',
  exterior: '#e63950',
  suspension: '#00a86b',
  performance: '#f0a030',
  maintenance: '#8888a0',
};

const PART_POSITIONS = {
  'Air Intake':                { x: 175, y: 225 },
  'Brakes':                    { x: 235, y: 355 },
  'Supercharger Maintenance':  { x: 270, y: 195 },
  'Exhaust':                   { x: 770, y: 345 },
  'Steering Wheel':            { x: 395, y: 210 },
  'Shifter':                   { x: 450, y: 290 },
  'Seat - Option 1':           { x: 480, y: 225 },
  'Seat - Option 2':           { x: 480, y: 255 },
  'Seat Brackets':             { x: 505, y: 310 },
  'Seat Sliders':              { x: 535, y: 330 },
  'Radio':                     { x: 400, y: 255 },
  'Door Pulls':                { x: 530, y: 210 },
  'Pedals':                    { x: 365, y: 320 },
  'Rear Seat Delete':          { x: 605, y: 240 },
  'Mats - Driver Side':        { x: 420, y: 345 },
  'Mats - Passenger Side':     { x: 470, y: 365 },
  'Floorboards - Driver Side': { x: 370, y: 365 },
  'Floorboards - Passenger Side': { x: 520, y: 365 },
  'Wheels':                    { x: 235, y: 395 },
  'Tires':                     { x: 695, y: 395 },
  'Coilovers':                 { x: 465, y: 410 },
  'Maintenance':               { x: 310, y: 175 },
};

export default function Configurator() {
  const [selectedParts, setSelectedParts] = useState(() => new Set(PARTS.map(p => p.name)));
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePart, setActivePart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const svgRef = useRef(null);

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
        <div className="configurator-diagram">
          <svg
            ref={svgRef}
            viewBox="0 0 950 480"
            className="configurator-car-svg"
            onClick={(e) => { if (e.target === e.currentTarget || e.target.tagName === 'path' || e.target.tagName === 'line' || e.target.tagName === 'rect' || e.target.tagName === 'ellipse') setActivePart(null); }}
          >
            {/* Ground line */}
            <line x1="60" y1="435" x2="890" y2="435" stroke="var(--border)" strokeWidth="1" opacity="0.5" />

            {/* Shadow under car */}
            <ellipse cx="475" cy="435" rx="340" ry="12" fill="rgba(0,0,0,0.3)" />

            {/* Body silhouette - R53 Mini Cooper S side profile */}
            <path
              d="
                M 155,395
                Q 155,350 190,350
                L 190,350
                Q 165,350 165,310
                L 165,275
                Q 165,235 185,220
                L 210,205
                Q 230,195 260,190
                L 330,178
                Q 345,175 355,165
                L 385,135
                Q 395,128 415,125
                L 500,120
                Q 540,118 580,120
                L 660,130
                Q 690,135 710,145
                L 740,165
                Q 755,178 760,195
                L 765,225
                Q 768,245 768,270
                L 768,310
                Q 768,350 748,350
                L 748,350
                Q 780,350 780,395
                L 780,410
                Q 780,430 760,430
                L 720,430
                Q 720,430 720,395
                Q 720,350 695,350
                Q 670,350 670,395
                Q 670,430 670,430
                L 268,430
                Q 268,430 268,395
                Q 268,350 240,350
                Q 210,350 210,395
                Q 210,430 210,430
                L 175,430
                Q 155,430 155,410
                Z
              "
              fill="var(--bg-card)"
              stroke="var(--border-light)"
              strokeWidth="2"
            />

            {/* Bonnet scoop */}
            <rect x="275" y="182" width="55" height="8" rx="3" fill="var(--bg-secondary)" stroke="var(--border-light)" strokeWidth="1" />

            {/* Window area */}
            <path
              d="
                M 360,170
                L 395,138
                Q 405,130 420,128
                L 500,123
                Q 540,121 575,123
                L 640,130
                Q 655,133 665,140
                L 685,158
                Q 690,165 685,170
                L 680,175
                Q 675,180 665,180
                L 370,180
                Q 360,180 358,175
                Z
              "
              fill="rgba(26, 58, 138, 0.25)"
              stroke="var(--border-light)"
              strokeWidth="1.5"
            />

            {/* Door pillar divider (B-pillar) */}
            <line x1="545" y1="128" x2="545" y2="180" stroke="var(--border-light)" strokeWidth="2" />

            {/* Headlight */}
            <ellipse cx="180" cy="260" rx="18" ry="22" fill="rgba(255,255,200,0.08)" stroke="var(--border-light)" strokeWidth="1.5" />
            <ellipse cx="180" cy="260" rx="8" ry="10" fill="rgba(255,255,200,0.15)" />

            {/* Front grille */}
            <rect x="162" y="288" width="12" height="40" rx="4" fill="var(--bg-secondary)" stroke="var(--border-light)" strokeWidth="1" />
            <line x1="165" y1="298" x2="172" y2="298" stroke="var(--text-muted)" strokeWidth="1" opacity="0.5" />
            <line x1="165" y1="308" x2="172" y2="308" stroke="var(--text-muted)" strokeWidth="1" opacity="0.5" />
            <line x1="165" y1="318" x2="172" y2="318" stroke="var(--text-muted)" strokeWidth="1" opacity="0.5" />

            {/* Tail light */}
            <rect x="762" y="225" width="8" height="35" rx="3" fill="rgba(200,16,46,0.3)" stroke="rgba(200,16,46,0.5)" strokeWidth="1" />

            {/* Exhaust tip */}
            <ellipse cx="775" cy="370" rx="8" ry="6" fill="var(--bg-secondary)" stroke="var(--text-muted)" strokeWidth="1" />

            {/* Door handle */}
            <rect x="510" y="225" width="25" height="4" rx="2" fill="var(--border-light)" opacity="0.6" />

            {/* Side indicator */}
            <rect x="290" y="260" width="12" height="5" rx="2" fill="rgba(255,165,0,0.2)" stroke="rgba(255,165,0,0.4)" strokeWidth="0.5" />

            {/* Front wheel */}
            <circle cx="240" cy="395" r="48" fill="#080d1a" stroke="var(--border-light)" strokeWidth="2" />
            <circle cx="240" cy="395" r="38" fill="#0c1225" stroke="var(--text-muted)" strokeWidth="1" />
            <circle cx="240" cy="395" r="18" fill="var(--bg-card)" stroke="var(--border-light)" strokeWidth="1.5" />
            {/* Wheel spokes */}
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <line
                key={`fs${angle}`}
                x1={240 + 18 * Math.cos(angle * Math.PI / 180)}
                y1={395 + 18 * Math.sin(angle * Math.PI / 180)}
                x2={240 + 36 * Math.cos(angle * Math.PI / 180)}
                y2={395 + 36 * Math.sin(angle * Math.PI / 180)}
                stroke="var(--text-muted)"
                strokeWidth="2"
                opacity="0.4"
              />
            ))}

            {/* Rear wheel */}
            <circle cx="695" cy="395" r="48" fill="#080d1a" stroke="var(--border-light)" strokeWidth="2" />
            <circle cx="695" cy="395" r="38" fill="#0c1225" stroke="var(--text-muted)" strokeWidth="1" />
            <circle cx="695" cy="395" r="18" fill="var(--bg-card)" stroke="var(--border-light)" strokeWidth="1.5" />
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <line
                key={`rs${angle}`}
                x1={695 + 18 * Math.cos(angle * Math.PI / 180)}
                y1={395 + 18 * Math.sin(angle * Math.PI / 180)}
                x2={695 + 36 * Math.cos(angle * Math.PI / 180)}
                y2={395 + 36 * Math.sin(angle * Math.PI / 180)}
                stroke="var(--text-muted)"
                strokeWidth="2"
                opacity="0.4"
              />
            ))}

            {/* Part markers */}
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
                <g
                  key={part.name}
                  className={`cfg-marker ${dimmed ? 'cfg-marker-dimmed' : ''} ${!selected ? 'cfg-marker-off' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActivePart(part.name); }}
                  onMouseEnter={() => setHoveredPart(part.name)}
                  onMouseLeave={() => setHoveredPart(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Hit area */}
                  <circle cx={pos.x} cy={pos.y} r="16" fill="transparent" />

                  {/* Glow ring */}
                  {(isHovered || isActive) && !dimmed && (
                    <circle cx={pos.x} cy={pos.y} r="14" fill="none" stroke={color} strokeWidth="2" opacity="0.4" className="cfg-marker-glow" />
                  )}

                  {/* Main dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 9 : isHovered ? 8 : 6}
                    fill={selected ? color : 'transparent'}
                    stroke={color}
                    strokeWidth={selected ? 0 : 2}
                    opacity={dimmed ? 0.15 : 1}
                  />

                  {/* Connector line from marker to label */}
                  <line
                    x1={pos.x}
                    y1={pos.y + (isActive ? 9 : isHovered ? 8 : 6)}
                    x2={pos.x}
                    y2={pos.y + 18}
                    stroke={color}
                    strokeWidth="1"
                    opacity={dimmed ? 0.1 : 0.4}
                  />

                  {/* Label */}
                  <text
                    x={pos.x}
                    y={pos.y + 27}
                    textAnchor="middle"
                    fill={dimmed ? 'var(--text-muted)' : 'var(--text-secondary)'}
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                    opacity={dimmed ? 0.15 : 0.8}
                    className="cfg-marker-label"
                  >
                    {part.name.length > 16 ? part.name.slice(0, 14) + '…' : part.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredPart && !activePart && (() => {
            const part = PARTS.find(p => p.name === hoveredPart);
            const pos = PART_POSITIONS[hoveredPart];
            if (!part || !pos || !svgRef.current) return null;
            const svgRect = svgRef.current.getBoundingClientRect();
            const viewBox = { w: 950, h: 480 };
            const px = (pos.x / viewBox.w) * svgRect.width;
            const py = (pos.y / viewBox.h) * svgRect.height;
            return (
              <div className="cfg-tooltip" style={{ left: px + 12, top: py - 10 }}>
                <strong>{part.name}</strong>
                <span>{formatCost(part.cost)}</span>
              </div>
            );
          })()}
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
