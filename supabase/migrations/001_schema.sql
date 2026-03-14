-- ============================================
-- Heritage{R} - Supabase Schema & Seed Data
-- ============================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Create builds table
CREATE TABLE IF NOT EXISTS builds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT,
  horsepower INTEGER,
  description TEXT,
  image_url TEXT,
  mods JSONB DEFAULT '[]'::jsonb,
  owner TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create messages table (contact form submissions)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies - public read for builds, public insert for messages
CREATE POLICY "Allow public read access on builds"
  ON builds FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- 5. Seed builds data
INSERT INTO builds (title, year, color, horsepower, description, image_url, mods, owner) VALUES
(
  'Track-Day Terror',
  2004,
  'Pure Silver',
  245,
  'A stripped-down, caged R53 built for time attacks. Gutted interior with Recaro SPG buckets, full roll cage, and a fire suppression system. The supercharger has been rebuilt with a 15% reduction pulley and paired with a Milltek exhaust for maximum scream. Suspension is fully adjustable BC Racing coilovers with camber plates.',
  'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
  '["15% SC Reduction Pulley", "Milltek Catback Exhaust", "BC Racing Coilovers", "Recaro SPG Buckets", "Full Roll Cage", "Wilwood Big Brake Kit", "CAE Shifter", "AEM Cold Air Intake"]'::jsonb,
  'Mike T.'
),
(
  'British Racing Green Dream',
  2003,
  'British Racing Green',
  210,
  'A tasteful restomod that keeps the classic Mini spirit alive. Fresh BRG paint over a fully restored body with white bonnet stripes. The engine has been refreshed with a 17% pulley, upgraded intercooler, and custom tune. Rides on Enkei RPF1s wrapped in Michelin PS4S tires.',
  'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
  '["17% SC Reduction Pulley", "Forge Intercooler", "Custom ECU Tune", "Enkei RPF1 17x7.5", "Michelin PS4S", "Bilstein B14 Coilovers", "EBC Yellowstuff Pads", "NM Engineering Intake"]'::jsonb,
  'Sarah K.'
),
(
  'Midnight Runner',
  2005,
  'Astro Black',
  280,
  'An absolute monster hiding in plain sight. From the outside it looks nearly stock with its Astro Black paint and subtle GP-style flares. Under the hood, a fully built engine with forged internals, a ported and polished supercharger, and methanol injection pushes nearly 280hp through a Quaife LSD.',
  'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
  '["Forged Internals", "Ported Supercharger", "Methanol Injection", "Quaife LSD", "ACT Clutch", "Custom Manifold", "Water-Meth Kit", "GP-Style Flares"]'::jsonb,
  'Dan R.'
),
(
  'Canyon Carver',
  2006,
  'Hyper Blue',
  225,
  'Purpose-built for spirited canyon drives. The suspension geometry has been completely reworked with adjustable control arms, stiffer bushings, and a rear sway bar. A 15% pulley and full exhaust let the supercharger breathe while Brembo brakes provide the stopping power for mountain descents.',
  'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
  '["15% SC Reduction Pulley", "Brembo Brake Kit", "Adjustable Control Arms", "Powerflex Bushings", "Rear Sway Bar", "Full Exhaust System", "Short Shifter", "OMP Steering Wheel"]'::jsonb,
  'Alex M.'
),
(
  'Show Stopper',
  2002,
  'Pepper White',
  195,
  'A concours-quality R53 that wins trophies at every show. Immaculate Pepper White paint with black bonnet stripes, sitting on rare JCW 18" wheels. The engine bay is fully detailed with polished and painted components. Interior has been retrimmed in alcantara with contrast stitching.',
  'https://imagescf.dealercenter.net/1920/1080/202007-f02e202f5ed84747b094a032e4db370a.jpg',
  '["JCW 18\" Wheels", "Alcantara Interior Retrim", "Polished Engine Bay", "LED Conversion Kit", "JCW Exhaust", "Lowering Springs", "Chrome Delete Kit", "Custom Bonnet Stripes"]'::jsonb,
  'Chris L.'
),
(
  'Rally Replica',
  2004,
  'Chili Red',
  235,
  'Inspired by the WRC Mini, this R53 has been built for gravel and tarmac rallying. Raised suspension with long-travel dampers, underbody protection, and auxiliary lights up front. A hydraulic handbrake and Sparco harnesses complete the rally-ready interior. The engine runs a 15% pulley with a custom tune optimized for mid-range torque.',
  'https://imagescf.dealercenter.net/1920/1080/202007-9e2da8f3d0c744649d6a5ae92bf60482.jpg',
  '["Rally Suspension Kit", "Underbody Skid Plates", "Auxiliary Light Bar", "Hydraulic Handbrake", "Sparco 6-Point Harness", "15% SC Pulley", "Rally Tune", "Mud Flaps"]'::jsonb,
  'James P.'
);

-- 6. Create storage bucket for assets (run via Dashboard > Storage > New Bucket)
-- Bucket name: "assets"
-- Public bucket: Yes
-- Then upload: flags-bg.png, crest-watermark.png, mini-silhouette.svg, favicon.png, apple-touch-icon.png
