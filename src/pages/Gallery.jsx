import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BuildCard from '../components/BuildCard';

export default function Gallery() {
  const [builds, setBuilds] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBuilds() {
      setLoading(true);
      try {
        let query = supabase
          .from('builds')
          .select('*')
          .order('created_at', { ascending: false });

        if (search) {
          query = query.or(
            `title.ilike.%${search}%,color.ilike.%${search}%,owner.ilike.%${search}%`
          );
        }

        const { data, error } = await query;
        if (error) throw error;
        setBuilds(data || []);
      } catch (err) {
        console.error('Failed to load builds:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBuilds();
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
