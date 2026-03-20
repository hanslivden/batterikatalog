-- ============================================================
-- Migration 001: installers table
-- ============================================================

CREATE TABLE installers (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  slug           TEXT        UNIQUE NOT NULL,
  org_number     TEXT,
  region         TEXT        NOT NULL,
  cities         TEXT[]      DEFAULT '{}',
  email          TEXT        NOT NULL,
  phone          TEXT,
  website        TEXT,
  brands         TEXT[]      DEFAULT '{}',
  certifications TEXT[]      DEFAULT '{}',
  description    TEXT,
  logo_url       TEXT,
  verified       BOOLEAN     DEFAULT false,
  featured       BOOLEAN     DEFAULT false,
  active         BOOLEAN     DEFAULT false,
  tier           TEXT        DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX idx_installers_region  ON installers (region);
CREATE INDEX idx_installers_slug    ON installers (slug);
CREATE INDEX idx_installers_active_featured ON installers (active, featured)
  WHERE active = true;

-- ============================================================
-- Slug generation helper
-- ============================================================

CREATE OR REPLACE FUNCTION generate_slug(input TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        translate(input, 'æøåÆØÅ', 'aoaAOA'),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Auto-populate slug from name if not provided
CREATE OR REPLACE FUNCTION set_installer_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter   INT := 0;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    base_slug := generate_slug(NEW.name);
    final_slug := base_slug;

    -- Ensure uniqueness
    WHILE EXISTS (
      SELECT 1 FROM installers WHERE slug = final_slug AND id != NEW.id
    ) LOOP
      counter := counter + 1;
      final_slug := base_slug || '-' || counter;
    END LOOP;

    NEW.slug := final_slug;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_installer_slug
  BEFORE INSERT OR UPDATE ON installers
  FOR EACH ROW EXECUTE FUNCTION set_installer_slug();

-- ============================================================
-- Auto-update updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_installers_updated_at
  BEFORE UPDATE ON installers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE installers ENABLE ROW LEVEL SECURITY;

-- Public: read active installers only
CREATE POLICY "Public can view active installers"
  ON installers
  FOR SELECT
  USING (active = true);

-- Service role: full access (bypasses RLS by default, but explicit for clarity)
CREATE POLICY "Service role has full access"
  ON installers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
