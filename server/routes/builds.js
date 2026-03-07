import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/builds — list all, optional ?search=
router.get('/', (req, res) => {
  const { search } = req.query;
  let builds;

  if (search) {
    const pattern = `%${search}%`;
    builds = db.prepare(`
      SELECT * FROM builds
      WHERE title LIKE ? OR mods LIKE ? OR color LIKE ? OR owner LIKE ?
      ORDER BY created_at DESC
    `).all(pattern, pattern, pattern, pattern);
  } else {
    builds = db.prepare('SELECT * FROM builds ORDER BY created_at DESC').all();
  }

  builds = builds.map(b => ({ ...b, mods: JSON.parse(b.mods) }));
  res.json(builds);
});

// GET /api/builds/:id
router.get('/:id', (req, res) => {
  const build = db.prepare('SELECT * FROM builds WHERE id = ?').get(req.params.id);
  if (!build) return res.status(404).json({ error: 'Build not found' });
  build.mods = JSON.parse(build.mods);
  res.json(build);
});

// POST /api/builds
router.post('/', (req, res) => {
  const { title, year, color, horsepower, description, image_url, mods, owner } = req.body;
  if (!title || !year) {
    return res.status(400).json({ error: 'Title and year are required' });
  }

  const result = db.prepare(`
    INSERT INTO builds (title, year, color, horsepower, description, image_url, mods, owner)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, year, color || null, horsepower || null, description || null, image_url || null, JSON.stringify(mods || []), owner || null);

  const build = db.prepare('SELECT * FROM builds WHERE id = ?').get(result.lastInsertRowid);
  build.mods = JSON.parse(build.mods);
  res.status(201).json(build);
});

// PUT /api/builds/:id
router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM builds WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Build not found' });

  const { title, year, color, horsepower, description, image_url, mods, owner } = req.body;

  db.prepare(`
    UPDATE builds SET title = ?, year = ?, color = ?, horsepower = ?, description = ?, image_url = ?, mods = ?, owner = ?
    WHERE id = ?
  `).run(
    title ?? existing.title,
    year ?? existing.year,
    color ?? existing.color,
    horsepower ?? existing.horsepower,
    description ?? existing.description,
    image_url ?? existing.image_url,
    JSON.stringify(mods ?? JSON.parse(existing.mods)),
    owner ?? existing.owner,
    req.params.id
  );

  const build = db.prepare('SELECT * FROM builds WHERE id = ?').get(req.params.id);
  build.mods = JSON.parse(build.mods);
  res.json(build);
});

// DELETE /api/builds/:id
router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM builds WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Build not found' });

  db.prepare('DELETE FROM builds WHERE id = ?').run(req.params.id);
  res.json({ message: 'Build deleted' });
});

export default router;
