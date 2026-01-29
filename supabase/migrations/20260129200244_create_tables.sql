-- Create projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  asset_class TEXT NOT NULL CHECK (asset_class IN ('Residential', 'Mixed-Use', 'Commercial', 'Hospitality')),
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  brochure_url TEXT,
  intro_title TEXT,
  intro_text TEXT,
  intro_image TEXT,
  project_features JSONB,
  detail_sections JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  details TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create news table
CREATE TABLE news (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects (public read, auth write)
CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can modify projects"
  ON projects FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for events (public read, auth write)
CREATE POLICY "Public can read events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can modify events"
  ON events FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for news (public read, auth write)
CREATE POLICY "Public can read news"
  ON news FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can modify news"
  ON news FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for inquiries (public insert, auth read/delete)
CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (true);
