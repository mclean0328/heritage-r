# Heritage R

A full-stack web application for showcasing restomod R53 Mini Cooper S builds (2002–2006). Browse a gallery of builds, explore a detailed parts configuration and cost breakdown, and learn about the R53 platform.

## Tech Stack

- **Frontend:** React 19, Vite 7, React Router v7
- **Backend:** Express 5, better-sqlite3
- **Styling:** CSS custom properties (dark theme)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd r53-restomod-showcase
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the API server**

   ```bash
   npm run server
   ```

   The Express API will start on `http://localhost:3001`. It automatically creates and seeds the SQLite database on first run.

4. **Start the frontend dev server** (in a separate terminal)

   ```bash
   npm run dev
   ```

   Vite will start on `http://localhost:5173`. API requests are proxied to the backend automatically.

5. **Open the app**

   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run server`  | Start the Express API server             |
| `npm run build`   | Build the frontend for production        |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint                               |

## Project Structure

```
r53-restomod-showcase/
├── server/
│   ├── index.js          # Express entry point (port 3001)
│   ├── db.js             # SQLite setup, schema & seed data
│   └── routes/
│       └── builds.js     # CRUD API routes (/api/builds)
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Router & layout
│   ├── App.css           # All component styles
│   ├── index.css         # CSS variables & global resets
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── BuildCard.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Configuration.jsx
│       ├── Gallery.jsx
│       ├── BuildDetail.jsx
│       └── Contact.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Pages

- **Home** — Hero section and featured builds
- **About** — Background on the R53 platform and the restomod philosophy
- **Config** — Parts list and cost breakdown with category filtering
- **Gallery** — Searchable grid of all R53 builds
- **Contact** — Contact form and info cards
