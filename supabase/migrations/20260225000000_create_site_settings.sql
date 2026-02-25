-- Create site_settings table (single-row config)
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  show_news_events BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the default row
INSERT INTO site_settings (id, show_news_events) VALUES ('default', true);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read settings
CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated can modify settings
CREATE POLICY "Authenticated can modify site_settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true);
