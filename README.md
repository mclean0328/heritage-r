# Heritage{R}

A web application for showcasing restomod R53 Mini Cooper S builds (2002-2006). Browse a gallery of builds, explore a detailed parts configuration and cost breakdown, use the interactive visual configurator, and learn about the R53 platform.

## Tech Stack

- **Frontend:** React 19, Vite 7, React Router v7
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Hosting:** Vercel
- **Styling:** CSS custom properties (dark theme)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [Supabase](https://supabase.com) account and project
- A [Vercel](https://vercel.com) account (for deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd r53-restomod-showcase
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration script:

   ```bash
   # Copy and paste the contents of this file into the SQL Editor:
   supabase/migrations/001_schema.sql
   ```

   This creates the `builds` and `messages` tables, enables Row Level Security, and seeds 6 sample builds.

3. **(Optional)** Go to **Storage** and create a public bucket called `assets` to host build images.

4. Copy your project credentials from **Settings > API**:
   - Project URL
   - anon/public key

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Start the dev server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in **Settings > Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy - Vercel auto-detects Vite and builds from `dist/`

The included `vercel.json` handles SPA routing so all paths resolve to `index.html`.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR   |
| `npm run build`   | Build the frontend for production    |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
r53-restomod-showcase/
├── public/
│   ├── crest-watermark.png     # Heritage{R} crest logo
│   ├── flags-bg.png            # Home page background
│   ├── mini-silhouette.svg     # R53 side profile diagram
│   └── favicon.png
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Router & layout
│   ├── App.css                 # All component styles
│   ├── index.css               # CSS variables & global resets
│   ├── lib/
│   │   └── supabase.js         # Supabase client initialization
│   ├── data/
│   │   └── partsData.js        # Parts list & pricing data
│   ├── components/
│   │   ├── Navbar.jsx          # Sidebar navigation
│   │   ├── Footer.jsx          # Footer with crest watermark
│   │   └── BuildCard.jsx       # Build gallery card
│   └── pages/
│       ├── Home.jsx            # Landing page with intro animation
│       ├── About.jsx           # R53 platform info
│       ├── Gallery.jsx         # Build gallery (Supabase)
│       ├── BuildDetail.jsx     # Individual build view (Supabase)
│       ├── Configuration.jsx   # Parts list & cost breakdown
│       ├── Configurator.jsx    # Interactive visual configurator
│       └── Contact.jsx         # Contact form (Supabase)
├── supabase/
│   └── migrations/
│       └── 001_schema.sql      # Database schema, RLS & seed data
├── vercel.json                 # Vercel SPA routing config
├── vite.config.js
└── package.json
```

## Pages

- **Home** - Cinematic intro animation with Heritage{R} brand reveal, crest, and car silhouette
- **About** - Background on the R53 platform (2002-2006) and the restomod philosophy
- **Parts List** - Filterable parts table with cost breakdown and vendor links
- **Configurator** - Interactive visual parts selector with car diagram overlay
- **Featured** - Gallery of community R53 builds from Supabase
- **Contact** - Contact form (messages stored in Supabase) and info cards

## Supabase Schema

### `builds` table
| Column      | Type        | Description                     |
| ----------- | ----------- | ------------------------------- |
| id          | uuid (PK)   | Auto-generated                  |
| title       | text        | Build name                      |
| year        | integer     | Model year (2002-2006)          |
| color       | text        | Paint color                     |
| horsepower  | integer     | Engine output                   |
| description | text        | Build story                     |
| image_url   | text        | Photo URL                       |
| mods        | jsonb       | Array of modification names     |
| owner       | text        | Builder name                    |
| created_at  | timestamptz | Auto-generated timestamp        |

### `messages` table
| Column     | Type        | Description              |
| ---------- | ----------- | ------------------------ |
| id         | uuid (PK)   | Auto-generated           |
| name       | text        | Sender name              |
| email      | text        | Sender email             |
| message    | text        | Message body             |
| created_at | timestamptz | Auto-generated timestamp |

RLS is enabled on both tables: public read on `builds`, public insert on `messages`.
