import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  {
    to: '/', label: 'Home', color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l9-9 9 9" /><path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    to: '/about', label: 'About', color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    to: '/configurator', label: 'Configurator', color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="13" width="22" height="6" rx="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M4 13V8a2 2 0 012-2h5l3 4h4a2 2 0 012 2v1" />
      </svg>
    ),
  },
  {
    to: '/contact', label: 'Contact', color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'float-link float-link-active' : 'float-link';

  return (
    <>
      <button
        className={`menu-btn ${menuOpen ? 'menu-btn-open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span /><span /><span />
      </button>

      {menuOpen && (
        <div className="float-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      <nav className={`float-nav ${menuOpen ? 'float-nav-open' : ''}`}>
        {NAV_ITEMS.map(({ to, label, icon, color }, index) => (
          <Link
            key={to}
            to={to}
            className={isActive(to)}
            onClick={() => setMenuOpen(false)}
            style={{ '--i': index }}
          >
            <span className="float-link-icon" style={{ '--icon-color': color }}>
              {icon}
            </span>
            <span className="float-link-label">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
