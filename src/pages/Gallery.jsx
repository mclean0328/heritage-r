import { useEffect, useState } from 'react';
import BuildCard from '../components/BuildCard';

export default function Gallery() {
  const [builds, setBuilds] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    setLoading(true);
    fetch(`/api/builds${params}`)
      .then(res => res.json())
      .then(data => {
        setBuilds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load builds:', err);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Featured Builds</h1>
      </div>

      <div className="search-bar">
        {/* <input
          type="text"
          placeholder="Search by title, color, mods, or owner..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />*/}
      </div>

      {loading ? (
        <div className="loading">Loading builds...</div>
      ) : builds.length === 0 ? (
        <div className="empty-state">
          <p>No builds found{search ? ` matching "${search}"` : ''}.</p>
        </div>
      ) : (
        <div className="build-grid">
          {builds.map(build => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}
    </div>
  );
}
