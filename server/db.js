import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DB_PATH || join(__dirname, 'restomod.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS builds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    color TEXT,
    horsepower INTEGER,
    description TEXT,
    image_url TEXT,
    mods TEXT DEFAULT '[]',
    owner TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const count = db.prepare('SELECT COUNT(*) as count FROM builds').get();

if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO builds (title, year, color, horsepower, description, image_url, mods, owner)
    VALUES (@title, @year, @color, @horsepower, @description, @image_url, @mods, @owner)
  `);

  const seeds = [
    {
      title: 'Track-Day Terror',
      year: 2004,
      color: 'Pure Silver',
      horsepower: 245,
      description: 'A stripped-down, caged R53 built for time attacks. Gutted interior with Recaro SPG buckets, full roll cage, and a fire suppression system. The supercharger has been rebuilt with a 15% reduction pulley and paired with a Milltek exhaust for maximum scream. Suspension is fully adjustable BC Racing coilovers with camber plates.',
      image_url: 'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
      mods: JSON.stringify(['15% SC Reduction Pulley', 'Milltek Catback Exhaust', 'BC Racing Coilovers', 'Recaro SPG Buckets', 'Full Roll Cage', 'Wilwood Big Brake Kit', 'CAE Shifter', 'AEM Cold Air Intake']),
      owner: 'Mike T.'
    },
    {
      title: 'British Racing Green Dream',
      year: 2003,
      color: 'British Racing Green',
      horsepower: 210,
      description: 'A tasteful restomod that keeps the classic Mini spirit alive. Fresh BRG paint over a fully restored body with white bonnet stripes. The engine has been refreshed with a 17% pulley, upgraded intercooler, and custom tune. Rides on Enkei RPF1s wrapped in Michelin PS4S tires.',
      image_url: 'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
      mods: JSON.stringify(['17% SC Reduction Pulley', 'Forge Intercooler', 'Custom ECU Tune', 'Enkei RPF1 17x7.5', 'Michelin PS4S', 'Bilstein B14 Coilovers', 'EBC Yellowstuff Pads', 'NM Engineering Intake']),
      owner: 'Sarah K.'
    },
    {
      title: 'Midnight Runner',
      year: 2005,
      color: 'Astro Black',
      horsepower: 280,
      description: 'An absolute monster hiding in plain sight. From the outside it looks nearly stock with its Astro Black paint and subtle GP-style flares. Under the hood, a fully built engine with forged internals, a ported and polished supercharger, and methanol injection pushes nearly 280hp through a Quaife LSD.',
      image_url: 'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
      mods: JSON.stringify(['Forged Internals', 'Ported Supercharger', 'Methanol Injection', 'Quaife LSD', 'ACT Clutch', 'Custom Manifold', 'Water-Meth Kit', 'GP-Style Flares']),
      owner: 'Dan R.'
    },
    {
      title: 'Canyon Carver',
      year: 2006,
      color: 'Hyper Blue',
      horsepower: 225,
      description: 'Purpose-built for spirited canyon drives. The suspension geometry has been completely reworked with adjustable control arms, stiffer bushings, and a rear sway bar. A 15% pulley and full exhaust let the supercharger breathe while Brembo brakes provide the stopping power for mountain descents.',
      image_url: 'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
      mods: JSON.stringify(['15% SC Reduction Pulley', 'Brembo Brake Kit', 'Adjustable Control Arms', 'Powerflex Bushings', 'Rear Sway Bar', 'Full Exhaust System', 'Short Shifter', 'OMP Steering Wheel']),
      owner: 'Alex M.'
    },
    {
      title: 'Show Stopper',
      year: 2002,
      color: 'Pepper White',
      horsepower: 195,
      description: 'A concours-quality R53 that wins trophies at every show. Immaculate Pepper White paint with black bonnet stripes, sitting on rare JCW 18" wheels. The engine bay is fully detailed with polished and painted components. Interior has been retrimmed in alcantara with contrast stitching.',
      image_url: 'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
      mods: JSON.stringify(['JCW 18" Wheels', 'Alcantara Interior Retrim', 'Polished Engine Bay', 'LED Conversion Kit', 'JCW Exhaust', 'Lowering Springs', 'Chrome Delete Kit', 'Custom Bonnet Stripes']),
      owner: 'Chris L.'
    },
    {
      title: 'Rally Replica',
      year: 2004,
      color: 'Chili Red',
      horsepower: 235,
      description: 'Inspired by the WRC Mini, this R53 has been built for gravel and tarmac rallying. Raised suspension with long-travel dampers, underbody protection, and auxiliary lights up front. A hydraulic handbrake and Sparco harnesses complete the rally-ready interior. The engine runs a 15% pulley with a custom tune optimized for mid-range torque.',
      image_url: 'https://imagescf.dealercenter.net/1920/1080/202007-9e2da8f3d0c744649d6a5ae92bf60482.jpg',
      mods: JSON.stringify(['Rally Suspension Kit', 'Underbody Skid Plates', 'Auxiliary Light Bar', 'Hydraulic Handbrake', 'Sparco 6-Point Harness', '15% SC Pulley', 'Rally Tune', 'Mud Flaps']),
      owner: 'James P.'
    }
  ];

  const insertMany = db.transaction((builds) => {
    for (const build of builds) {
      insert.run(build);
    }
  });

  insertMany(seeds);
  console.log('Database seeded with 6 R53 restomod builds');
}

export default db;
