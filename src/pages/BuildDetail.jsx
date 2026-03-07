import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BuildDetail() {
  const { id } = useParams();
  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch(`/api/builds/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setBuild(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading build...</div>;
  if (!build) {
    return (
      <div className="not-found">
        <h2>Build Not Found</h2>
        <Link to="/gallery" className="btn btn-primary">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="build-detail">
      <Link to="/gallery" className="back-link">&larr; Back to Gallery</Link>

      <div className="detail-layout">
        <div className="detail-image-section">
          {imgError ? (
            <div className="detail-image-placeholder">
              <span>{build.title.charAt(0)}</span>
            </div>
          ) : (
            <img
              src={build.image_url}
              alt={build.title}
              className="detail-image"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="detail-info-section">
          <h1 className="detail-title">{build.title}</h1>
          <p className="detail-owner">Built by {build.owner}</p>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Year</span>
              <span className="spec-value">{build.year}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Color</span>
              <span className="spec-value">{build.color}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Horsepower</span>
              <span className="spec-value">{build.horsepower} HP</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Platform</span>
              <span className="spec-value">R53 Cooper S</span>
            </div>
          </div>

          <div className="detail-description">
            <h3>About This Build</h3>
            <p>{build.description}</p>
          </div>

          <div className="detail-mods">
            <h3>Modifications</h3>
            <div className="mod-list">
              {build.mods.map((mod, i) => (
                <span key={i} className="mod-tag">{mod}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
