-- ============================================================
-- Challenges Schema — run in Supabase SQL Editor
-- ============================================================

-- Tracks which challenge a user has enrolled in and when they started
CREATE TABLE IF NOT EXISTS challenge_enrollments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  start_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, challenge_id)
);

-- Tracks which days a user has completed in a challenge
CREATE TABLE IF NOT EXISTS challenge_day_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  day_number   INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, challenge_id, day_number)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_challenge_enrollments_user ON challenge_enrollments (user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_day_logs_user    ON challenge_day_logs (user_id, challenge_id);

-- RLS
ALTER TABLE challenge_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_day_logs    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for anon" ON challenge_enrollments;
DROP POLICY IF EXISTS "Allow all for anon" ON challenge_day_logs;

CREATE POLICY "Users access own rows" ON challenge_enrollments
  FOR ALL USING ((auth.jwt() ->> 'sub') = user_id) WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users access own rows" ON challenge_day_logs
  FOR ALL USING ((auth.jwt() ->> 'sub') = user_id) WITH CHECK ((auth.jwt() ->> 'sub') = user_id);
