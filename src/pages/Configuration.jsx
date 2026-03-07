import { useState } from 'react';

const CATEGORIES = {
  interior: {
    label: 'Interior',
    icon: '\u{1F4BA}',
  },
  exterior: {
    label: 'Exterior & Wheels',
    icon: '\u{1F6DE}',
  },
  suspension: {
    label: 'Suspension & Brakes',
    icon: '\u{1F527}',
  },
  performance: {
    label: 'Performance',
    icon: '\u{26A1}',
  },
  maintenance: {
    label: 'Maintenance',
    icon: '\u{1F6E0}',
  },
};

const PARTS = [
  {
    name: 'Shifter',
    cost: 503.66,
    category: 'interior',
    url: 'https://www.speedingparts.com/p/powertrain/short-shift-gear-levers/mini-short-shift/revin-short-shifter-mini-r53-r56-bottom-mounted.html',
  },
  {
    name: 'Door Pulls',
    cost: 105.30,
    category: 'interior',
    url: 'https://www.rennline.com/bmw/mini/interior-accessories/interior-handles/',
  },
  {
    name: 'Seat - Option 1',
    cost: 1475,
    category: 'interior',
    url: 'https://www.ecstuning.com/b-recaro-parts/recaro-sporster-gt-seat/410.1gt.316~dk/',
  },
  {
    name: 'Seat - Option 2',
    cost: null,
    category: 'interior',
    url: null,
  },
  {
    name: 'Seat Brackets',
    cost: null,
    category: 'interior',
    url: null,
  },
  {
    name: 'Seat Sliders',
    cost: null,
    category: 'interior',
    url: null,
  },
  {
    name: 'Steering Wheel',
    cost: 249,
    category: 'interior',
    url: 'https://www.rennline.com/rennline-steering-wheel-quick-disconnect-sku-i18/',
  },
  {
    name: 'Rear Seat Delete',
    cost: 348,
    category: 'interior',
    url: 'https://www.minimania.com/part/NMI6010/Rear-Seat-Delete-Kit-W-o-Grommets---R50-53-Mini-Cooper--S',
  },
  {
    name: 'Pedals',
    cost: 226.80,
    category: 'interior',
    url: 'https://www.rennline.com/rennline-pedal-set-4-piece-rubber-grip-mini-sku-p71-60-97/',
  },
  {
    name: 'Mats - Driver Side',
    cost: 112.50,
    category: 'interior',
    url: 'https://www.rennline.com/track-mat-mini-driver-side-sku-tm22/',
  },
  {
    name: 'Mats - Passenger Side',
    cost: 112.50,
    category: 'interior',
    url: 'https://www.rennline.com/track-mat-mini-passenger-side-sku-tm23/',
  },
  {
    name: 'Floorboards - Driver Side',
    cost: 100,
    category: 'interior',
    url: 'https://www.rennline.com/rennline-floorboard-drivers-side-mini-sku-f52/',
  },
  {
    name: 'Floorboards - Passenger Side',
    cost: 93,
    category: 'interior',
    url: 'https://www.rennline.com/rennline-floorboard-passengers-side-mini-sku-f53/',
  },
  {
    name: 'Radio',
    cost: 120,
    category: 'interior',
    url: 'https://www.ecstuning.com/b-bremmen-parts/69-apple-carplay-touchscreen-multimedia-system-with-carplay-android-auto/65126977698~brp/',
  },
  {
    name: 'Wheels',
    cost: 1639.60,
    category: 'exterior',
    url: 'https://www.minimania.com/part/G2NMW2065/Mini-Cooper--S-Rse12-18in-4x100-Black-Wheel-R50-R52-R53-R55-R56-R57-R58-R59',
  },
  {
    name: 'Tires',
    cost: 930,
    category: 'exterior',
    url: null,
  },
  {
    name: 'Brakes',
    cost: 710.99,
    category: 'suspension',
    url: 'https://www.minimania.com/part/NMK3203/Stage-2-Brake-Kit-Ebc-Green-Street---R50-52-53-Cooper--S-Post-4-03',
  },
  {
    name: 'Coilovers',
    cost: 2351.90,
    category: 'suspension',
    url: 'https://www.minimania.com/part/NMS3009/Mini-Cooper-Coilover-Kit-Kw-Variant-2-Gen1-R50-R52-R53',
  },
  {
    name: 'Exhaust',
    cost: 972,
    category: 'performance',
    url: 'https://www.ecstuning.com/b-milltek-sport-parts/cat-back-exhaust-system-resonated/ssxm006~mll/',
  },
  {
    name: 'Air Intake',
    cost: 339.99,
    category: 'performance',
    url: 'https://www.turnermotorsport.com/p-22756708-cold-air-intake-system-manual-black/',
  },
  {
    name: 'Supercharger Maintenance',
    cost: 181,
    category: 'maintenance',
    url: null,
  },
  {
    name: 'Maintenance',
    cost: 380,
    category: 'maintenance',
    url: null,
  },
];

function formatCost(cost) {
  if (cost === null) return 'TBD';
  return `$${cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export default function Configuration() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredParts = activeCategory === 'all'
    ? PARTS
    : PARTS.filter((p) => p.category === activeCategory);

  const totalCost = PARTS.reduce((sum, p) => sum + (p.cost || 0), 0);
  const filteredTotal = filteredParts.reduce((sum, p) => sum + (p.cost || 0), 0);
  const partsWithCost = PARTS.filter((p) => p.cost !== null).length;

  return (
    <div className="config-page">
      <div className="config-header">
        <h1>Build Configuration</h1>
        <p>Parts list and cost breakdown for the R53</p>
      </div>

      <div className="config-summary">
        <div className="summary-card">
          <span className="summary-label">Total Parts</span>
          <span className="summary-value">{PARTS.length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Priced Items</span>
          <span className="summary-value">{partsWithCost}</span>
        </div>
        <div className="summary-card summary-card-accent">
          <span className="summary-label">Estimated Total</span>
          <span className="summary-value">{formatCost(totalCost)}</span>
        </div>
      </div>

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

      {activeCategory !== 'all' && (
        <div className="config-filter-total">
          Showing {filteredParts.length} parts &middot; Subtotal: {formatCost(filteredTotal)}
        </div>
      )}

      <div className="config-table-wrapper">
        <table className="config-table">
          <thead>
            <tr>
              <th>Part</th>
              <th>Category</th>
              <th className="cost-col">Cost</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map((part, i) => (
              <tr key={i} className={part.cost === null ? 'row-tbd' : ''}>
                <td className="part-name">
                  {part.url ? (
                    <a href={part.url} target="_blank" rel="noopener noreferrer">
                      {part.name}
                      <span className="external-icon"> &#x2197;</span>
                    </a>
                  ) : (
                    part.name
                  )}
                </td>
                <td>
                  <span className={`cat-badge cat-${part.category}`}>
                    {CATEGORIES[part.category].icon} {CATEGORIES[part.category].label}
                  </span>
                </td>
                <td className="cost-col">
                  <span className={part.cost === null ? 'cost-tbd' : 'cost-value'}>
                    {formatCost(part.cost)}
                  </span>
                </td>
                <td className="source-col">
                  {part.url ? (
                    <a href={part.url} target="_blank" rel="noopener noreferrer" className="source-link">
                      {getDomain(part.url)}
                    </a>
                  ) : (
                    <span className="no-source">&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
