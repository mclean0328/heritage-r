import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildsRouter from './routes/builds.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(express.json());

// API routes
app.use('/api/builds', buildsRouter);

// Serve built frontend in production
const distPath = join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback — serve index.html for all non-API routes
app.get('{*path}', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Heritage R running on http://localhost:${PORT}`);
});
