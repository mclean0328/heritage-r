import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBuild() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    year: 2004,
    color: '',
    horsepower: '',
    description: '',
    image_url: '',
    mods: '',
    owner: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const modsArray = form.mods
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/builds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          horsepower: form.horsepower ? Number(form.horsepower) : null,
          year: Number(form.year),
          mods: modsArray
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create build');
      }

      navigate('/gallery');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="add-build-page">
      <h1>Add Your Build</h1>
      <p className="page-subtitle">Share your R53 restomod with the community</p>

      <form onSubmit={handleSubmit} className="build-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Build Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g., Weekend Warrior"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner">Owner Name</label>
            <input
              id="owner"
              name="owner"
              type="text"
              placeholder="Your name"
              value={form.owner}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Model Year *</label>
            <select id="year" name="year" value={form.year} onChange={handleChange}>
              {[2002, 2003, 2004, 2005, 2006].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              id="color"
              name="color"
              type="text"
              placeholder="e.g., British Racing Green"
              value={form.color}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="horsepower">Horsepower</label>
            <input
              id="horsepower"
              name="horsepower"
              type="number"
              min="100"
              max="500"
              placeholder="e.g., 220"
              value={form.horsepower}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="https://example.com/your-build.jpg"
            value={form.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Tell us about your build — what inspired it, what makes it special..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mods">Modifications (comma-separated)</label>
          <textarea
            id="mods"
            name="mods"
            rows="3"
            placeholder="e.g., 15% SC Pulley, Milltek Exhaust, BC Racing Coilovers"
            value={form.mods}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Add Build'}
        </button>
      </form>
    </div>
  );
}
