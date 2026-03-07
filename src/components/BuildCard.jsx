import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BuildCard({ build }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/builds/${build.id}`} className="build-card">
      <div className="card-image-wrapper">
        {imgError ? (
          <div className="card-image-placeholder">
            <span>{build.title.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={build.image_url}
            alt={build.title}
            className="card-image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="card-hp-badge">{build.horsepower} HP</div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{build.title}</h3>
        <div className="card-meta">
          <span>{build.year} R53</span>
          <span className="card-dot">&bull;</span>
          <span>{build.color}</span>
        </div>
        <div className="card-mods">
          {build.mods.slice(0, 3).map((mod, i) => (
            <span key={i} className="mod-tag">{mod}</span>
          ))}
          {build.mods.length > 3 && (
            <span className="mod-tag mod-more">+{build.mods.length - 3} more</span>
          )}
        </div>
      </div>
    </Link>
  );
}
