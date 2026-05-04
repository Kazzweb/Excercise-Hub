-- ============================================================
-- Fitness App Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Calorie / meal logs
CREATE TABLE IF NOT EXISTS calorie_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL,           -- Clerk userId
  date        DATE NOT NULL,
  meal_type   TEXT NOT NULL,           -- 'breakfast' | 'lunch' | 'dinner' | 'snack'
  food_name   TEXT NOT NULL,
  calories    INTEGER NOT NULL,
  protein_g   NUMERIC(6,1) DEFAULT 0,
  carbs_g     NUMERIC(6,1) DEFAULT 0,
  fat_g       NUMERIC(6,1) DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Workout completion logs
CREATE TABLE IF NOT EXISTS workout_logs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          TEXT NOT NULL,      -- Clerk userId
  workout_id       TEXT NOT NULL,      -- matches id from workouts.js
  workout_title    TEXT NOT NULL,
  date             DATE NOT NULL,
  duration_minutes INTEGER,
  completed        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- Body measurements over time
CREATE TABLE IF NOT EXISTS body_measurements (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL,          -- Clerk userId
  date         DATE NOT NULL,
  weight_kg    NUMERIC(5,1),
  body_fat_pct NUMERIC(4,1),
  notes        TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Indexes (fast queries by user + date)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_calorie_logs_user_date      ON calorie_logs (user_id, date);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date      ON workout_logs (user_id, date);
CREATE INDEX IF NOT EXISTS idx_body_measurements_user_date ON body_measurements (user_id, date);

-- ============================================================
-- Row Level Security (RLS)
-- Each user can only read/write rows where user_id matches their Clerk JWT sub claim.
-- Requires a Clerk JWT template named "supabase" configured in Clerk Dashboard.
-- ============================================================
ALTER TABLE calorie_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements  ENABLE ROW LEVEL SECURITY;

-- Policies enforce that each user can only access their own rows.
-- Requires Clerk JWT template named "supabase" — see README for setup.
DROP POLICY IF EXISTS "Allow all for anon" ON calorie_logs;
DROP POLICY IF EXISTS "Allow all for anon" ON workout_logs;
DROP POLICY IF EXISTS "Allow all for anon" ON body_measurements;

CREATE POLICY "Users access own rows" ON calorie_logs
  FOR ALL USING ((auth.jwt() ->> 'sub') = user_id) WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users access own rows" ON workout_logs
  FOR ALL USING ((auth.jwt() ->> 'sub') = user_id) WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users access own rows" ON body_measurements
  FOR ALL USING ((auth.jwt() ->> 'sub') = user_id) WITH CHECK ((auth.jwt() ->> 'sub') = user_id);
