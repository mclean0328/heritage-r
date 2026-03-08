import { useState } from 'react';
import { CATEGORIES, PARTS, formatCost, getDomain } from '../data/partsData';

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
        <h1>Parts List</h1>
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
