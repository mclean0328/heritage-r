import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'sidebar-link active' : 'sidebar-link';

  const close = () => setOpen(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
        <span /><span /><span />
      </button>

      <div className={`sidebar-overlay ${open ? 'sidebar-overlay-visible' : ''}`} onClick={close} />

      <nav className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" onClick={close}>
            Heritage&#123;R&#125;
          </Link>
          <button className="sidebar-close" onClick={close} aria-label="Close menu">
            &times;
          </button>
        </div>
        <div className="sidebar-links">
          <Link to="/" className={isActive('/')} onClick={close}>Home</Link>
          <Link to="/about" className={isActive('/about')} onClick={close}>About</Link>
          <Link to="/config" className={isActive('/config')} onClick={close}>Parts List</Link>
          <Link to="/configurator" className={isActive('/configurator')} onClick={close}>Configurator</Link>
          <Link to="/gallery" className={isActive('/gallery')} onClick={close}>Featured</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={close}>Contact</Link>
        </div>
      </nav>
    </>
  );
}
