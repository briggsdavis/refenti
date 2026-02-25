-- Create page_content table for editable page text and hero images
CREATE TABLE page_content (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  page_slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on change
CREATE OR REPLACE FUNCTION update_page_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_page_content_updated_at();

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can read page_content"
  ON page_content FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated write
CREATE POLICY "Authenticated can modify page_content"
  ON page_content FOR ALL
  TO authenticated
  USING (true);

-- Seed with current hardcoded content
INSERT INTO page_content (id, page_slug, content) VALUES

('home', 'home', '{
  "heroImage": "/home-hero.jpg",
  "heroTagline": "Refining urban landscapes",
  "philosophyHeading": "Quality Assets in Growth Markets.",
  "philosophyBody": "Refenti Realty Group is a real estate investment and development platform that originates, structures, and manages assets across residential, mixed-use, commercial, and hospitality sectors. The platform operates under Solstice Ventures Holding and applies consistent governance standards, structured development processes, and disciplined capital deployment across each project in its portfolio.",
  "philosophyImage": "/quality.jpg",
  "platformHeading": "A Platform Built for Long-Term Value",
  "platformBody": "The platform operates with a long-term orientation, disciplined capital deployment, and a structured development approach designed to support governance, execution certainty, and long-term asset performance. Refenti operates under Solstice Ventures Holding (SVH) and serves as a public, non-operational institutional reference point.",
  "portfolioBadge": "The Collection",
  "portfolioTitle": "Portfolio",
  "portfolioBody": "Refenti''s portfolio represents the application of a consistent investment and development logic across a selective set of real estate assets. Each project reflects how the platform originates, structures, and stewards assets with a primary focus on long-term capital appreciation, supported by disciplined execution and operational resilience.",
  "portfolioCta": "View Projects",
  "portfolioSubtext": "Selective Development",
  "updatesHeading": "Featured Updates",
  "updatesSubheading": "Current Milestones",
  "updatesCta": "View All News & Events"
}'::jsonb),

('about', 'about', '{
  "heroImage": "/a.jpg",
  "heroTitle": "About",
  "heroSubtitle": "Institutional Real Estate Platform",
  "visionHeading": "Vision",
  "visionText": "To operate as a disciplined, scalable real estate investment and development platform aligned with long-term capital and institutional stakeholders.",
  "missionHeading": "Mission",
  "missionText": "To develop and steward real estate assets with a primary focus on long-term capital appreciation, applying institutional standards of governance, quality, and discipline in structurally undersupplied markets.",
  "valuesHeading": "Values",
  "values": [
    {"title": "Governance discipline", "description": "Institutional standards and oversight frameworks"},
    {"title": "Execution certainty", "description": "Reliable delivery on commitments and timelines"},
    {"title": "Structured risk management", "description": "Systematic approach to identifying and mitigating risk"},
    {"title": "Long-term orientation", "description": "Focus on sustained capital appreciation"}
  ],
  "originHeading": "Origin & Philosophy",
  "originImage": "/drone.jpg",
  "originBody": "Refenti Realty Group was established as a platform-led real estate investment and development entity, intentionally structured to support long-term capital appreciation.\n\nThe platform prioritizes governance discipline, repeatability, and institutional alignment over opportunistic or project-led development. Projects are originated and developed within a consistent framework designed to support scalability, execution certainty, and long-term stewardship across diverse assets and market cycles.",
  "governanceLabel": "GOVERNANCE",
  "governanceHeading": "Governance & Alignment with Solstice Ventures Holding",
  "governanceBody": "Refenti Realty Group operates under Solstice Ventures Holding (SVH).\n\nThe platform aligns with group-level governance standards, oversight mechanisms, and institutional controls established by SVH. This alignment supports accountability, consistency, and disciplined capital deployment across the platform."
}'::jsonb),

('investment', 'investment', '{
  "heroImage": "/i.jpg",
  "heroTitle": "Investment",
  "heroSubtitle": "Institutional Real Estate Platform",
  "approachLabel": "INVESTMENT APPROACH",
  "approachHeading": "Institutional-Grade Real Estate",
  "approachBody": "RRG originates, develops, and manages real estate assets that meet institutional standards of quality, risk management, and long-term value creation. The platform focuses on assets with durable demand, clear governance, and long-term income stability.\n\nInvestment decisions are made with a long-term perspective, emphasizing disciplined governance, execution certainty, conservative underwriting, and resilience across market cycles.",
  "developHeading": "How We Develop",
  "developImage": "/replacement.jpg",
  "developBody": "RRG operates as an integrated development platform, retaining strategic control over concept definition, asset strategy, structuring, and delivery oversight.",
  "developBullets": [
    "Core development leadership, design coordination, asset stewardship, and investment structuring are managed in-house.",
    "Construction and specialized services are delivered through vetted partners under defined performance and risk frameworks.",
    "Delivery follows phased execution, disciplined cost control, and conservative assumptions."
  ],
  "riskLabel": "RISK MANAGEMENT",
  "riskHeading": "Disciplined Risk Framework",
  "riskCategories": [
    {"title": "Execution", "description": "Integrated oversight, experienced partners, phased construction"},
    {"title": "Financing", "description": "Conservative structuring, diversified funding, aligned timelines"},
    {"title": "Market", "description": "Demand-driven asset selection, disciplined positioning, phased releases"}
  ],
  "qualityHeading": "Quality & Governance",
  "qualityImage": "/governance.jpg",
  "qualityBody": "RRG operates to institutional-grade standards across governance, delivery, and asset quality:",
  "qualityBullets": [
    "Strong governance, transparency, and reporting discipline",
    "Disciplined capital and cost management",
    "High design, engineering, and construction standards",
    "Reliable delivery through phased execution",
    "Assets designed for long-term operational performance"
  ],
  "assetClassesHeading": "Asset Classes",
  "assetClassesIntro": "RRG focuses on asset classes with resilient demand and long-term income potential:",
  "assetClasses": [
    {"name": "Residential", "image": "/resident.jpg"},
    {"name": "Mixed-Use", "image": "/mixed-use.jpg"},
    {"name": "Commercial & Serviced", "image": "/commercial.jpg"},
    {"name": "Serviced Apartments", "image": "/serviced-apartements.jpg"},
    {"name": "Hospitality", "image": "/hospitality.jpg"}
  ],
  "structuresHeading": "Investment Structures",
  "structuresBody": "Investment structures are tailored to project context and partner alignment, including:",
  "structuresBullets": [
    "Joint ventures and co-development",
    "Own-balance-sheet development",
    "EPC+F or other structured delivery models"
  ]
}'::jsonb),

('projects', 'projects', '{
  "heroImage": "/portfolio-hero.jpg",
  "heroTitle": "Portfolio",
  "heroSubtitle": "Refined Urban Assets",
  "overviewLabel": "Portfolio Overview",
  "overviewBody": "Refenti''s portfolio comprises selectively developed assets aligned with its investment and development mandate. Projects are presented on a representative basis and may include assets that are completed, under development, or in advanced planning stages. Portfolio presentation is intended to demonstrate platform capability rather than commercial availability."
}'::jsonb),

('contact', 'contact', '{
  "heading": "Connect With Us",
  "subheading": "Inquiry Portal",
  "contactItems": [
    {"label": "Management", "value": "info@refenti.com"},
    {"label": "Connect", "value": "+251 986 1986 86"},
    {"label": "Our Hub", "value": "Refenti (Bole Bulbula), Addis Ababa, Ethiopia"}
  ]
}'::jsonb),

('events-news', 'events-news', '{
  "subheading": "Institutional Updates",
  "heading": "News & Events",
  "newsLabel": "Sector Insights",
  "newsHeading": "News",
  "eventsLabel": "Strategic Engagements",
  "eventsHeading": "Technical Events"
}'::jsonb);
