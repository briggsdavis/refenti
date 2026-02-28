-- Update governance heading on About page to remove SVH alignment subtitle
UPDATE page_content
SET content = jsonb_set(content, '{governanceHeading}', '"Governance"')
WHERE page_slug = 'about';
