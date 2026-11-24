-- ResumeDeck share links. Apply with: npx wrangler d1 execute resumedeck-share --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS resumes (
  id         TEXT PRIMARY KEY,
  data       TEXT,                       -- JSON {data, config, sectionOrder}; NULL once the link is turned off
  created_at TEXT NOT NULL,
  expires_at TEXT,                       -- ISO time or NULL (never)
  owner_hash TEXT,                       -- SHA-256 of the owner token; NULL for links imported from Firebase
  views      INTEGER NOT NULL DEFAULT 0,
  revoked    INTEGER NOT NULL DEFAULT 0
);

-- Per-visitor create counter for rate limiting (hashed IP, never the raw address).
CREATE TABLE IF NOT EXISTS creates (
  ip TEXT NOT NULL,
  ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS creates_ip_ts ON creates (ip, ts);
