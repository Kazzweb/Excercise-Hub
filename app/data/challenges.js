// ─────────────────────────────────────────────────────────────────────────────
// 30-Day Challenges
// Each challenge has a weekly template (7 day slots) that repeats 4× for 30 days.
// Week index 0-3 progressively increases volume/intensity.
// ─────────────────────────────────────────────────────────────────────────────

function generateSchedule(weekTemplates) {
  const days = []
  for (let i = 0; i < 30; i++) {
    const weekIdx = Math.min(Math.floor(i / 7), weekTemplates.length - 1)
    const dayOfWeek = i % 7
    days.push({ day: i + 1, ...weekTemplates[weekIdx][dayOfWeek] })
  }
  return days
}

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 1 — Fat Blaster 30
// Goal: weight-loss | No equipment | Beginner-Intermediate
// Split: Full Body → HIIT → Upper → Lower → Cardio → Rest → Active Recovery
// ─────────────────────────────────────────────────────────────────────────────
const fatBlasterWeeks = [
  // WEEK 1 — Foundation (3 sets, learn the movements)
  [
    {
      type: 'full-body', title: 'Full Body Ignition',
      description: 'Activate every muscle group with compound bodyweight moves. Focus on form.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'squat',           sets: 3, reps: '12',    rest: 45 },
        { exerciseId: 'push-up',         sets: 3, reps: '10',    rest: 45 },
        { exerciseId: 'lunge',           sets: 3, reps: '10',    rest: 45 },
        { exerciseId: 'plank',           sets: 3, reps: '30 sec',rest: 30 },
        { exerciseId: 'mountain-climber',sets: 3, reps: '20',    rest: 45 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Starter',
      description: '20 sec on, 10 sec off — Tabata style. Keep intensity high.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',  sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'burpee',        sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'high-knees',    sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'jump-squat',    sets: 4, reps: '20 sec', rest: 10 },
      ],
    },
    {
      type: 'upper', title: 'Upper Body Sculpt',
      description: 'Target chest, back, shoulders and arms with bodyweight moves.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 3, reps: '12',     rest: 45 },
        { exerciseId: 'pike-push-up', sets: 3, reps: '10',     rest: 45 },
        { exerciseId: 'tricep-dip',   sets: 3, reps: '10',     rest: 45 },
        { exerciseId: 'inchworm',     sets: 3, reps: '8',      rest: 45 },
        { exerciseId: 'plank',        sets: 3, reps: '30 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Burn',
      description: 'Glutes, quads and hamstrings. Feel the burn.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'squat',                  sets: 3, reps: '15',     rest: 45 },
        { exerciseId: 'lunge',                  sets: 3, reps: '12',     rest: 45 },
        { exerciseId: 'glute-bridge',           sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'wall-sit',               sets: 3, reps: '30 sec', rest: 30 },
        { exerciseId: 'calf-raise',             sets: 3, reps: '20',     rest: 30 },
      ],
    },
    {
      type: 'cardio', title: 'Steady Cardio',
      description: 'Sustained moderate intensity to torch calories and build endurance.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 3, reps: '45 sec', rest: 15 },
        { exerciseId: 'high-knees',      sets: 3, reps: '45 sec', rest: 15 },
        { exerciseId: 'mountain-climber',sets: 3, reps: '45 sec', rest: 15 },
        { exerciseId: 'burpee',          sets: 3, reps: '45 sec', rest: 15 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Full recovery. Hydrate, sleep, stretch lightly.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Active Recovery',
      description: 'Light movement to flush soreness and keep momentum.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',  sets: 2, reps: '8',      rest: 30 },
        { exerciseId: 'side-plank',sets: 2, reps: '20 sec', rest: 20 },
        { exerciseId: 'bear-crawl',sets: 2, reps: '10',     rest: 30 },
      ],
    },
  ],
  // WEEK 2 — Build (3-4 sets, add volume)
  [
    {
      type: 'full-body', title: 'Full Body Power',
      description: 'Same movements, more volume. Push past last week.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'squat',           sets: 4, reps: '15',    rest: 45 },
        { exerciseId: 'push-up',         sets: 4, reps: '12',    rest: 45 },
        { exerciseId: 'lunge',           sets: 4, reps: '12',    rest: 45 },
        { exerciseId: 'plank',           sets: 3, reps: '40 sec',rest: 30 },
        { exerciseId: 'mountain-climber',sets: 3, reps: '25',    rest: 45 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Escalation',
      description: 'Longer work intervals. Keep that heart rate up.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',       sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'jump-squat',   sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'high-knees',   sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'mountain-climber', sets: 5, reps: '25 sec', rest: 10 },
      ],
    },
    {
      type: 'upper', title: 'Upper Body Challenge',
      description: 'More sets, more reps. Your upper body is getting stronger.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'push-up',          sets: 4, reps: '14',     rest: 45 },
        { exerciseId: 'pike-push-up',     sets: 4, reps: '12',     rest: 45 },
        { exerciseId: 'diamond-push-up',  sets: 3, reps: '8',      rest: 45 },
        { exerciseId: 'tricep-dip',       sets: 3, reps: '12',     rest: 45 },
        { exerciseId: 'plank',            sets: 3, reps: '45 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Destroyer',
      description: 'Increased volume on glutes, quads, hamstrings.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'squat',               sets: 4, reps: '18',     rest: 45 },
        { exerciseId: 'jump-squat',          sets: 3, reps: '12',     rest: 45 },
        { exerciseId: 'lunge',               sets: 4, reps: '14',     rest: 45 },
        { exerciseId: 'single-leg-glute-bridge', sets: 3, reps: '12', rest: 30 },
        { exerciseId: 'wall-sit',            sets: 3, reps: '40 sec', rest: 30 },
      ],
    },
    {
      type: 'cardio', title: 'Cardio Surge',
      description: 'Longer intervals, less rest. Metabolism in overdrive.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 4, reps: '50 sec', rest: 10 },
        { exerciseId: 'high-knees',      sets: 4, reps: '50 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '50 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 4, reps: '50 sec', rest: 10 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'You earned this. Rest up for week 3.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Mobility Flow',
      description: 'Loosen up those tight muscles from the week.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',   sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank', sets: 2, reps: '25 sec', rest: 20 },
        { exerciseId: 'donkey-kick',sets: 2, reps: '12',     rest: 30 },
      ],
    },
  ],
  // WEEK 3 — Intensify (4 sets, add harder variations)
  [
    {
      type: 'full-body', title: 'Full Body Inferno',
      description: 'Supersets and harder variations. No rest until you earn it.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jump-squat',       sets: 4, reps: '15',    rest: 30 },
        { exerciseId: 'push-up',          sets: 4, reps: '15',    rest: 30 },
        { exerciseId: 'lunge',            sets: 4, reps: '14',    rest: 30 },
        { exerciseId: 'plank',            sets: 4, reps: '50 sec',rest: 20 },
        { exerciseId: 'burpee',           sets: 4, reps: '12',    rest: 30 },
        { exerciseId: 'mountain-climber', sets: 3, reps: '30',    rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Max Effort',
      description: 'Peak Tabata. Give 100% on every interval.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',       sets: 6, reps: '30 sec', rest: 10 },
        { exerciseId: 'jump-squat',   sets: 6, reps: '30 sec', rest: 10 },
        { exerciseId: 'high-knees',   sets: 6, reps: '30 sec', rest: 10 },
        { exerciseId: 'box-jump',     sets: 4, reps: '30 sec', rest: 10 },
      ],
    },
    {
      type: 'upper', title: 'Upper Body Mastery',
      description: 'Diamond push-ups, dips and pike presses. True upper body strength.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'diamond-push-up', sets: 4, reps: '12',     rest: 45 },
        { exerciseId: 'push-up',         sets: 4, reps: '15',     rest: 45 },
        { exerciseId: 'pike-push-up',    sets: 4, reps: '12',     rest: 45 },
        { exerciseId: 'tricep-dip',      sets: 4, reps: '15',     rest: 45 },
        { exerciseId: 'plank',           sets: 4, reps: '55 sec', rest: 20 },
      ],
    },
    {
      type: 'lower', title: 'Leg Day Finisher',
      description: 'Explosive lower body. Jump squats, single-leg work, sustained wall sits.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jump-squat',              sets: 4, reps: '15',     rest: 30 },
        { exerciseId: 'lunge',                   sets: 4, reps: '16',     rest: 30 },
        { exerciseId: 'single-leg-glute-bridge', sets: 4, reps: '14',     rest: 30 },
        { exerciseId: 'step-up',                 sets: 3, reps: '14',     rest: 30 },
        { exerciseId: 'wall-sit',                sets: 3, reps: '50 sec', rest: 20 },
      ],
    },
    {
      type: 'cardio', title: 'Cardio Blitz',
      description: 'Near-continuous effort. Minimal rest, maximum calorie burn.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'high-knees',      sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'burpee',          sets: 4, reps: '55 sec', rest: 5 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Almost there. Let your body rebuild.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Recovery & Core',
      description: 'Light core and mobility to keep the streak alive.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'russian-twist', sets: 3, reps: '20',     rest: 30 },
        { exerciseId: 'side-plank',    sets: 3, reps: '30 sec', rest: 20 },
        { exerciseId: 'bear-crawl',    sets: 2, reps: '12',     rest: 30 },
      ],
    },
  ],
  // WEEK 4 — Peak (4+ sets, max effort)
  [
    {
      type: 'full-body', title: 'Final Boss — Full Body',
      description: 'Your strongest workout yet. Prove 30 days made you different.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'jump-squat',       sets: 5, reps: '15',    rest: 30 },
        { exerciseId: 'push-up',          sets: 4, reps: '18',    rest: 30 },
        { exerciseId: 'lunge',            sets: 4, reps: '16',    rest: 30 },
        { exerciseId: 'plank',            sets: 4, reps: '60 sec',rest: 20 },
        { exerciseId: 'burpee',           sets: 4, reps: '15',    rest: 30 },
        { exerciseId: 'mountain-climber', sets: 4, reps: '30',    rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Grand Finale',
      description: 'Your last HIIT session. Leave everything on the floor.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'burpee',      sets: 6, reps: '35 sec', rest: 10 },
        { exerciseId: 'box-jump',    sets: 6, reps: '35 sec', rest: 10 },
        { exerciseId: 'high-knees',  sets: 6, reps: '35 sec', rest: 10 },
        { exerciseId: 'jump-squat',  sets: 6, reps: '35 sec', rest: 10 },
      ],
    },
    {
      type: 'upper', title: 'Upper Body Peak',
      description: 'Max reps, max sets. One last upper body push.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'push-up',         sets: 5, reps: '18',     rest: 30 },
        { exerciseId: 'diamond-push-up', sets: 4, reps: '14',     rest: 30 },
        { exerciseId: 'pike-push-up',    sets: 4, reps: '14',     rest: 30 },
        { exerciseId: 'tricep-dip',      sets: 4, reps: '18',     rest: 30 },
        { exerciseId: 'plank',           sets: 4, reps: '60 sec', rest: 20 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Peak',
      description: 'The final leg day. Go harder than day 4.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jump-squat',              sets: 5, reps: '18',     rest: 30 },
        { exerciseId: 'lunge',                   sets: 4, reps: '18',     rest: 30 },
        { exerciseId: 'single-leg-glute-bridge', sets: 4, reps: '16',     rest: 30 },
        { exerciseId: 'step-up',                 sets: 4, reps: '16',     rest: 30 },
        { exerciseId: 'wall-sit',                sets: 3, reps: '60 sec', rest: 20 },
      ],
    },
    {
      type: 'cardio', title: 'Cardio Victory Lap',
      description: 'Last cardio session. Celebrate every rep.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 5, reps: '60 sec', rest: 5 },
        { exerciseId: 'high-knees',      sets: 5, reps: '60 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '60 sec', rest: 5 },
        { exerciseId: 'burpee',          sets: 4, reps: '60 sec', rest: 5 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest. Tomorrow you finish strong.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Challenge Complete!',
      description: 'Light movement to close out 30 days. You did it.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',      sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',    sets: 2, reps: '30 sec', rest: 20 },
        { exerciseId: 'russian-twist', sets: 2, reps: '20',     rest: 30 },
      ],
    },
  ],
]

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 2 — Muscle Builder 30
// Goal: muscle | Gym equipment | Intermediate
// Split: Push → Pull → Legs → Rest → Upper → Lower → Rest (PPL hybrid)
// ─────────────────────────────────────────────────────────────────────────────
const muscleBuilderWeeks = [
  // WEEK 1 — 3 × 8-10 (learn movements, establish baseline)
  [
    {
      type: 'push', title: 'Push Day — Chest & Shoulders',
      description: 'Chest, shoulders, triceps. Control the eccentric on every rep.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'bench-press',           sets: 3, reps: '8',  rest: 90 },
        { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '10', rest: 90 },
        { exerciseId: 'overhead-press',        sets: 3, reps: '10', rest: 90 },
        { exerciseId: 'lateral-raise',         sets: 3, reps: '12', rest: 60 },
        { exerciseId: 'cable-pushdown',        sets: 3, reps: '12', rest: 60 },
      ],
    },
    {
      type: 'pull', title: 'Pull Day — Back & Biceps',
      description: 'Back width, thickness and bicep peaks. Squeeze at the top.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'pull-up',         sets: 3, reps: '6',  rest: 90 },
        { exerciseId: 'bent-over-row',   sets: 3, reps: '8',  rest: 90 },
        { exerciseId: 'lat-pulldown',    sets: 3, reps: '10', rest: 90 },
        { exerciseId: 'seated-cable-row',sets: 3, reps: '10', rest: 90 },
        { exerciseId: 'bicep-curl',      sets: 3, reps: '12', rest: 60 },
        { exerciseId: 'hammer-curl',     sets: 3, reps: '12', rest: 60 },
      ],
    },
    {
      type: 'legs', title: 'Leg Day — Quads, Hams & Glutes',
      description: 'Big compound leg movements. Depth on squats, hinge on deadlifts.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 4, reps: '8',  rest: 120 },
        { exerciseId: 'romanian-deadlift',  sets: 3, reps: '10', rest: 90 },
        { exerciseId: 'leg-press',          sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'leg-curl',           sets: 3, reps: '12', rest: 60 },
        { exerciseId: 'barbell-hip-thrust', sets: 3, reps: '12', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 3, reps: '15', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Muscle is built at rest. Eat, sleep, recover.', duration: 0, rest: true, exercises: [] },
    {
      type: 'upper', title: 'Upper Body Hypertrophy',
      description: 'Full upper body session. Moderate weight, higher reps.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'bench-press',     sets: 3, reps: '10', rest: 75 },
        { exerciseId: 'bent-over-row',   sets: 3, reps: '10', rest: 75 },
        { exerciseId: 'overhead-press',  sets: 3, reps: '10', rest: 75 },
        { exerciseId: 'lat-pulldown',    sets: 3, reps: '10', rest: 75 },
        { exerciseId: 'bicep-curl',      sets: 3, reps: '12', rest: 60 },
        { exerciseId: 'skull-crusher',   sets: 3, reps: '12', rest: 60 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Hypertrophy',
      description: 'Quad and glute dominance. Slow, controlled reps.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'leg-press',          sets: 3, reps: '15', rest: 90 },
        { exerciseId: 'romanian-deadlift',  sets: 3, reps: '12', rest: 75 },
        { exerciseId: 'barbell-hip-thrust', sets: 3, reps: '15', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 4, reps: '20', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Active rest — a walk or light stretch is fine.', duration: 0, rest: true, exercises: [] },
  ],
  // WEEK 2 — 3 × 10-12 (more volume)
  [
    {
      type: 'push', title: 'Push — Volume Up',
      description: 'Same movements. Two more reps on every set.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'bench-press',           sets: 3, reps: '10', rest: 90 },
        { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'overhead-press',        sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'lateral-raise',         sets: 3, reps: '15', rest: 60 },
        { exerciseId: 'cable-pushdown',        sets: 4, reps: '12', rest: 60 },
      ],
    },
    {
      type: 'pull', title: 'Pull — Volume Up',
      description: 'Add reps and an extra set on your weakest move.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'pull-up',          sets: 3, reps: '8',  rest: 90 },
        { exerciseId: 'bent-over-row',    sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'lat-pulldown',     sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'seated-cable-row', sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'bicep-curl',       sets: 3, reps: '14', rest: 60 },
        { exerciseId: 'hammer-curl',      sets: 3, reps: '14', rest: 60 },
      ],
    },
    {
      type: 'legs', title: 'Legs — Volume Up',
      description: 'More volume, same intensity. Feel the pump.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 4, reps: '10', rest: 120 },
        { exerciseId: 'romanian-deadlift',  sets: 3, reps: '12', rest: 90 },
        { exerciseId: 'leg-press',          sets: 4, reps: '15', rest: 90 },
        { exerciseId: 'leg-curl',           sets: 3, reps: '15', rest: 60 },
        { exerciseId: 'barbell-hip-thrust', sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 4, reps: '20', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Recovery is where the gains happen.', duration: 0, rest: true, exercises: [] },
    {
      type: 'upper', title: 'Upper Body — Added Sets',
      description: 'Extra sets on key compound lifts.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'bench-press',     sets: 4, reps: '10', rest: 75 },
        { exerciseId: 'bent-over-row',   sets: 4, reps: '10', rest: 75 },
        { exerciseId: 'overhead-press',  sets: 3, reps: '12', rest: 75 },
        { exerciseId: 'lat-pulldown',    sets: 3, reps: '12', rest: 75 },
        { exerciseId: 'cable-fly',       sets: 3, reps: '15', rest: 60 },
        { exerciseId: 'skull-crusher',   sets: 3, reps: '14', rest: 60 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body — Added Sets',
      description: 'Four sets on squats and hip thrusts.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 4, reps: '14', rest: 90 },
        { exerciseId: 'leg-press',          sets: 4, reps: '16', rest: 90 },
        { exerciseId: 'romanian-deadlift',  sets: 3, reps: '14', rest: 75 },
        { exerciseId: 'barbell-hip-thrust', sets: 4, reps: '16', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 4, reps: '22', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Sleep 7-9 hours for optimal recovery.', duration: 0, rest: true, exercises: [] },
  ],
  // WEEK 3 — 4 × 8-10 (increase weight, maintain reps)
  [
    {
      type: 'push', title: 'Push — Heavier Week',
      description: 'Increase weight by 5-10%. Same rep targets.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'bench-press',           sets: 4, reps: '8',  rest: 90 },
        { exerciseId: 'incline-dumbbell-press', sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'overhead-press',        sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'lateral-raise',         sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'cable-pushdown',        sets: 4, reps: '14', rest: 60 },
      ],
    },
    {
      type: 'pull', title: 'Pull — Heavier Week',
      description: 'More weight on rows and pull-ups. Control the descent.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'pull-up',          sets: 4, reps: '8',  rest: 90 },
        { exerciseId: 'bent-over-row',    sets: 4, reps: '8',  rest: 90 },
        { exerciseId: 'lat-pulldown',     sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'seated-cable-row', sets: 4, reps: '12', rest: 90 },
        { exerciseId: 'bicep-curl',       sets: 4, reps: '12', rest: 60 },
        { exerciseId: 'hammer-curl',      sets: 3, reps: '14', rest: 60 },
      ],
    },
    {
      type: 'legs', title: 'Legs — Strength Phase',
      description: 'Heavier squats and deadlifts. 5 min between squat sets if needed.',
      duration: 60, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 4, reps: '8',  rest: 120 },
        { exerciseId: 'deadlift',           sets: 4, reps: '6',  rest: 120 },
        { exerciseId: 'leg-press',          sets: 3, reps: '15', rest: 90 },
        { exerciseId: 'leg-curl',           sets: 4, reps: '12', rest: 60 },
        { exerciseId: 'barbell-hip-thrust', sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 4, reps: '20', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Heavy week demands full rest. No compromise.', duration: 0, rest: true, exercises: [] },
    {
      type: 'upper', title: 'Upper Body — Peak Volume',
      description: 'Four sets across the board. Your strongest upper session.',
      duration: 60, rest: false,
      exercises: [
        { exerciseId: 'bench-press',    sets: 4, reps: '10', rest: 75 },
        { exerciseId: 'bent-over-row',  sets: 4, reps: '10', rest: 75 },
        { exerciseId: 'overhead-press', sets: 4, reps: '10', rest: 75 },
        { exerciseId: 'cable-fly',      sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'face-pull',      sets: 3, reps: '20', rest: 45 },
        { exerciseId: 'skull-crusher',  sets: 4, reps: '12', rest: 60 },
        { exerciseId: 'hammer-curl',    sets: 4, reps: '12', rest: 60 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body — Peak Volume',
      description: 'Five sets on squats. Last big leg day before deload.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 5, reps: '10', rest: 90 },
        { exerciseId: 'romanian-deadlift',  sets: 4, reps: '12', rest: 75 },
        { exerciseId: 'barbell-hip-thrust', sets: 4, reps: '18', rest: 60 },
        { exerciseId: 'leg-curl',           sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 4, reps: '25', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Last rest day before the final week push.', duration: 0, rest: true, exercises: [] },
  ],
  // WEEK 4 — Peak / Strength Test
  [
    {
      type: 'push', title: 'Push — Final Week Max',
      description: 'Test your new strength. Heavier than week 1 on every lift.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'bench-press',           sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'incline-dumbbell-press', sets: 4, reps: '12', rest: 90 },
        { exerciseId: 'overhead-press',        sets: 4, reps: '12', rest: 90 },
        { exerciseId: 'lateral-raise',         sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'cable-pushdown',        sets: 4, reps: '15', rest: 60 },
      ],
    },
    {
      type: 'pull', title: 'Pull — Final Week Max',
      description: 'Pull heavier than day 1. See how far you have come.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'pull-up',          sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'bent-over-row',    sets: 4, reps: '10', rest: 90 },
        { exerciseId: 'lat-pulldown',     sets: 4, reps: '12', rest: 90 },
        { exerciseId: 'seated-cable-row', sets: 4, reps: '12', rest: 90 },
        { exerciseId: 'bicep-curl',       sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'hammer-curl',      sets: 4, reps: '15', rest: 60 },
      ],
    },
    {
      type: 'legs', title: 'Legs — Final Week Max',
      description: 'Compare to day 3. The numbers tell the story.',
      duration: 60, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 5, reps: '10', rest: 120 },
        { exerciseId: 'deadlift',           sets: 4, reps: '8',  rest: 120 },
        { exerciseId: 'leg-press',          sets: 4, reps: '15', rest: 90 },
        { exerciseId: 'leg-curl',           sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'barbell-hip-thrust', sets: 4, reps: '20', rest: 60 },
        { exerciseId: 'calf-raise',         sets: 5, reps: '25', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'One more rest. You have earned it.', duration: 0, rest: true, exercises: [] },
    {
      type: 'upper', title: 'Upper Body — Grand Finale',
      description: 'The last upper session. Leave nothing in the tank.',
      duration: 60, rest: false,
      exercises: [
        { exerciseId: 'bench-press',    sets: 5, reps: '10', rest: 75 },
        { exerciseId: 'bent-over-row',  sets: 5, reps: '10', rest: 75 },
        { exerciseId: 'overhead-press', sets: 4, reps: '12', rest: 75 },
        { exerciseId: 'cable-fly',      sets: 4, reps: '15', rest: 60 },
        { exerciseId: 'skull-crusher',  sets: 4, reps: '14', rest: 60 },
        { exerciseId: 'bicep-curl',     sets: 4, reps: '15', rest: 60 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body — Grand Finale',
      description: 'Last leg day. Make your week 1 self proud.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 5, reps: '12', rest: 90 },
        { exerciseId: 'romanian-deadlift',  sets: 4, reps: '14', rest: 75 },
        { exerciseId: 'barbell-hip-thrust', sets: 5, reps: '20', rest: 60 },
        { exerciseId: 'leg-press',          sets: 4, reps: '18', rest: 75 },
        { exerciseId: 'calf-raise',         sets: 5, reps: '25', rest: 45 },
      ],
    },
    { type: 'rest', title: 'Challenge Complete!', description: '30 days of Muscle Builder done. Take a full rest day and celebrate.', duration: 0, rest: true, exercises: [] },
  ],
]

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 3 — Strength Foundation 30
// Goal: strength | Gym | Beginner
// Split: Upper Heavy → Lower Heavy → Active Rest → Full Body → Cardio → Rest → Rest
// ─────────────────────────────────────────────────────────────────────────────
const strengthFoundationWeeks = [
  [
    {
      type: 'upper', title: 'Upper Strength — Heavy Compounds',
      description: '5×5 style. Heavy weight, full rest, perfect form.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'bench-press',    sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'bent-over-row',  sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'overhead-press', sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'bicep-curl',     sets: 3, reps: '8', rest: 90  },
      ],
    },
    {
      type: 'lower', title: 'Lower Strength — Heavy Compounds',
      description: 'Squat and deadlift focus. Strength is built here.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'squat',             sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'deadlift',          sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'romanian-deadlift', sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'calf-raise',        sets: 3, reps: '15',rest: 60  },
      ],
    },
    {
      type: 'active-recovery', title: 'Active Recovery',
      description: 'Light bodyweight to flush soreness. No loading.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',   sets: 2, reps: '8',      rest: 30 },
        { exerciseId: 'side-plank', sets: 2, reps: '20 sec', rest: 20 },
        { exerciseId: 'glute-bridge',sets: 2, reps: '15',    rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body Strength Circuit',
      description: 'One set of each big lift. Reinforce patterns.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'squat',          sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'bench-press',    sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'bent-over-row',  sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'overhead-press', sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'deadlift',       sets: 2, reps: '5', rest: 180 },
      ],
    },
    {
      type: 'cardio', title: 'Conditioning — Low Intensity',
      description: 'Easy cardio to support recovery and build work capacity.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 3, reps: '45 sec', rest: 15 },
        { exerciseId: 'mountain-climber',sets: 3, reps: '30 sec', rest: 20 },
        { exerciseId: 'high-knees',      sets: 3, reps: '30 sec', rest: 20 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Complete rest. Strength athletes need it.', duration: 0, rest: true, exercises: [] },
    { type: 'rest', title: 'Rest Day', description: 'Second rest day. Eat plenty of protein.', duration: 0, rest: true, exercises: [] },
  ],
  [
    {
      type: 'upper', title: 'Upper Strength — Add 5 lbs',
      description: 'Add 5 lbs to bench and row. Progression is the goal.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'bench-press',    sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'bent-over-row',  sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'overhead-press', sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'skull-crusher',  sets: 3, reps: '8', rest: 90  },
      ],
    },
    {
      type: 'lower', title: 'Lower Strength — Add 10 lbs',
      description: 'Squat and deadlift heavier. Consistency + load = strength.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'deadlift',           sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'barbell-hip-thrust', sets: 3, reps: '10',rest: 90  },
        { exerciseId: 'calf-raise',         sets: 3, reps: '15',rest: 60  },
      ],
    },
    {
      type: 'active-recovery', title: 'Core + Mobility',
      description: 'Brace and stabilize. Core strength supports the big lifts.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',         sets: 3, reps: '40 sec', rest: 30 },
        { exerciseId: 'russian-twist', sets: 3, reps: '16',     rest: 30 },
        { exerciseId: 'v-up',          sets: 3, reps: '10',     rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body — Week 2',
      description: 'All patterns, moderate load. Build confidence.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'squat',          sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'bench-press',    sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'pull-up',        sets: 3, reps: '5', rest: 120 },
        { exerciseId: 'overhead-press', sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'deadlift',       sets: 2, reps: '5', rest: 180 },
      ],
    },
    {
      type: 'cardio', title: 'Conditioning',
      description: 'Slightly more volume than week 1.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 3, reps: '50 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 3, reps: '40 sec', rest: 15 },
        { exerciseId: 'burpee',          sets: 3, reps: '8',      rest: 30 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest and eat. You are building a stronger body.', duration: 0, rest: true, exercises: [] },
    { type: 'rest', title: 'Rest Day', description: 'Second rest day of week 2.', duration: 0, rest: true, exercises: [] },
  ],
  [
    {
      type: 'upper', title: 'Upper Strength — 3×3 Test',
      description: 'Try a heavy triple on bench and row. Find your near-max.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'bench-press',    sets: 5, reps: '5',  rest: 180 },
        { exerciseId: 'bent-over-row',  sets: 5, reps: '5',  rest: 180 },
        { exerciseId: 'overhead-press', sets: 4, reps: '6',  rest: 120 },
        { exerciseId: 'lat-pulldown',   sets: 3, reps: '10', rest: 90  },
      ],
    },
    {
      type: 'lower', title: 'Lower Strength — 3×3 Test',
      description: 'Heavy squat and deadlift. You are stronger than week 1.',
      duration: 60, rest: false,
      exercises: [
        { exerciseId: 'squat',    sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'deadlift', sets: 5, reps: '5', rest: 180 },
        { exerciseId: 'leg-press',sets: 4, reps: '10',rest: 90  },
        { exerciseId: 'leg-curl', sets: 3, reps: '12',rest: 60  },
      ],
    },
    {
      type: 'active-recovery', title: 'Active Recovery + Core',
      description: 'Brace, breathe, recover.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',       sets: 3, reps: '50 sec', rest: 30 },
        { exerciseId: 'side-plank',  sets: 3, reps: '30 sec', rest: 20 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '10',     rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body — Week 3',
      description: 'All major patterns under heavier load.',
      duration: 50, rest: false,
      exercises: [
        { exerciseId: 'squat',          sets: 4, reps: '6', rest: 150 },
        { exerciseId: 'bench-press',    sets: 4, reps: '6', rest: 150 },
        { exerciseId: 'bent-over-row',  sets: 4, reps: '6', rest: 150 },
        { exerciseId: 'overhead-press', sets: 3, reps: '8', rest: 120 },
        { exerciseId: 'deadlift',       sets: 3, reps: '5', rest: 180 },
      ],
    },
    {
      type: 'cardio', title: 'Conditioning',
      description: 'Slightly harder than week 2. Keep breathing controlled.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',          sets: 4, reps: '10',     rest: 30 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '45 sec', rest: 15 },
        { exerciseId: 'jump-squat',      sets: 3, reps: '12',     rest: 30 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest harder. Week 4 is the peak.', duration: 0, rest: true, exercises: [] },
    { type: 'rest', title: 'Rest Day', description: 'Second rest day.', duration: 0, rest: true, exercises: [] },
  ],
  [
    {
      type: 'upper', title: 'Upper Strength — 1RM Attempt',
      description: 'Work up to a heavy single. See your 30-day progress.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'bench-press',    sets: 5, reps: '5',  rest: 180 },
        { exerciseId: 'bent-over-row',  sets: 5, reps: '5',  rest: 180 },
        { exerciseId: 'overhead-press', sets: 4, reps: '6',  rest: 120 },
        { exerciseId: 'skull-crusher',  sets: 4, reps: '10', rest: 90  },
      ],
    },
    {
      type: 'lower', title: 'Lower Strength — 1RM Attempt',
      description: 'Heavy squat day. You are stronger than you think.',
      duration: 60, rest: false,
      exercises: [
        { exerciseId: 'squat',              sets: 5, reps: '5',  rest: 180 },
        { exerciseId: 'deadlift',           sets: 5, reps: '5',  rest: 180 },
        { exerciseId: 'barbell-hip-thrust', sets: 4, reps: '12', rest: 90  },
        { exerciseId: 'leg-curl',           sets: 4, reps: '12', rest: 60  },
      ],
    },
    {
      type: 'active-recovery', title: 'Final Active Recovery',
      description: 'Light movement. Prepare for the final two sessions.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',     sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'plank',        sets: 3, reps: '60 sec', rest: 20 },
        { exerciseId: 'glute-bridge', sets: 2, reps: '15',     rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body — Final Strength Test',
      description: 'Compare every lift to week 1. The numbers say it all.',
      duration: 55, rest: false,
      exercises: [
        { exerciseId: 'squat',          sets: 4, reps: '6', rest: 150 },
        { exerciseId: 'bench-press',    sets: 4, reps: '6', rest: 150 },
        { exerciseId: 'bent-over-row',  sets: 4, reps: '6', rest: 150 },
        { exerciseId: 'overhead-press', sets: 4, reps: '6', rest: 120 },
        { exerciseId: 'deadlift',       sets: 3, reps: '5', rest: 180 },
      ],
    },
    {
      type: 'cardio', title: 'Final Conditioning',
      description: 'Last cardio. You are fitter than day 1.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',          sets: 4, reps: '12',     rest: 30 },
        { exerciseId: 'box-jump',        sets: 4, reps: '10',     rest: 30 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '45 sec', rest: 15 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Final rest before the last day.', duration: 0, rest: true, exercises: [] },
    { type: 'rest', title: 'Challenge Complete!', description: 'Strength Foundation done. 30 days of consistent strength work. Impressive.', duration: 0, rest: true, exercises: [] },
  ],
]

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 4 — Cardio Crusher 30
// Goal: cardio | No equipment | Beginner-Intermediate
// Split: HIIT → Cardio → HIIT → Steady → Full-body Cardio → Rest → Walk
// ─────────────────────────────────────────────────────────────────────────────
const cardioCrusherWeeks = [
  [
    {
      type: 'hiit', title: 'HIIT Ignition',
      description: '20 on / 10 off. Build your first aerobic base.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'high-knees',   sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'jumping-jack', sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'burpee',       sets: 4, reps: '20 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Steady State Cardio',
      description: 'Moderate pace, 25 minutes. Keep heart rate at 60-70% max.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack', sets: 5, reps: '50 sec', rest: 10 },
        { exerciseId: 'high-knees',   sets: 5, reps: '50 sec', rest: 10 },
        { exerciseId: 'step-up',      sets: 4, reps: '50 sec', rest: 10 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Round 2',
      description: 'Same protocol as day 1. Try to do more reps per interval.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'jump-squat',      sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 4, reps: '20 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Longer Steady State',
      description: 'Push to 30 minutes. Pace over power.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'step-up',         sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '55 sec', rest: 5 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body Cardio',
      description: 'Strength + cardio hybrid. Best of both worlds.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',       sets: 3, reps: '10',    rest: 30 },
        { exerciseId: 'squat',        sets: 3, reps: '15',    rest: 30 },
        { exerciseId: 'push-up',      sets: 3, reps: '10',    rest: 30 },
        { exerciseId: 'high-knees',   sets: 3, reps: '30 sec',rest: 15 },
        { exerciseId: 'lunge',        sets: 3, reps: '12',    rest: 30 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest. Your heart is adapting.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Easy Movement',
      description: 'Light walking-pace movements. Keep the body moving.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',   sets: 2, reps: '8',      rest: 30 },
        { exerciseId: 'step-up',    sets: 2, reps: '40 sec', rest: 20 },
        { exerciseId: 'side-plank', sets: 2, reps: '20 sec', rest: 20 },
      ],
    },
  ],
  [
    {
      type: 'hiit', title: 'HIIT 30/10',
      description: '30 sec on, 10 sec off. One week stronger.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'high-knees',      sets: 5, reps: '30 sec', rest: 10 },
        { exerciseId: 'jump-squat',      sets: 5, reps: '30 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 5, reps: '30 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Cardio Volume Build',
      description: '30-minute continuous moderate intensity.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'high-knees',      sets: 5, reps: '55 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '55 sec', rest: 5 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Power',
      description: 'Explosive moves. Box jumps added this week.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'box-jump',        sets: 4, reps: '30 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '30 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 5, reps: '30 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Extended Steady State',
      description: '35-minute moderate push.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 6, reps: '55 sec', rest: 5 },
        { exerciseId: 'step-up',         sets: 6, reps: '55 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '55 sec', rest: 5 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body Cardio Circuit',
      description: 'Increased reps from last week.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'burpee',    sets: 4, reps: '12',    rest: 30 },
        { exerciseId: 'squat',     sets: 3, reps: '18',    rest: 30 },
        { exerciseId: 'push-up',   sets: 3, reps: '12',    rest: 30 },
        { exerciseId: 'high-knees',sets: 4, reps: '35 sec',rest: 10 },
        { exerciseId: 'lunge',     sets: 3, reps: '14',    rest: 30 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Recovery is training too.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Easy Movement',
      description: 'Stay loose for next week.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',     sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'glute-bridge', sets: 2, reps: '15',     rest: 30 },
        { exerciseId: 'side-plank',   sets: 2, reps: '25 sec', rest: 20 },
      ],
    },
  ],
  [
    {
      type: 'hiit', title: 'HIIT 35/10',
      description: '35 sec on, 10 sec off. Your lungs are getting stronger.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'high-knees',      sets: 5, reps: '35 sec', rest: 10 },
        { exerciseId: 'box-jump',        sets: 4, reps: '35 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 5, reps: '35 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '35 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Cardio Endurance',
      description: '38-minute session. You are building real endurance.',
      duration: 38, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 6, reps: '60 sec', rest: 5 },
        { exerciseId: 'high-knees',      sets: 6, reps: '60 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 6, reps: '60 sec', rest: 5 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Max Effort',
      description: '100% on every interval. This is peak HIIT.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',    sets: 6, reps: '35 sec', rest: 10 },
        { exerciseId: 'jump-squat',sets: 6, reps: '35 sec', rest: 10 },
        { exerciseId: 'box-jump',  sets: 6, reps: '35 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Peak Steady State',
      description: 'Your best effort at sustained moderate intensity.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 7, reps: '55 sec', rest: 5 },
        { exerciseId: 'step-up',         sets: 7, reps: '55 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 6, reps: '55 sec', rest: 5 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body Cardio — Peak',
      description: 'Highest volume full body cardio of the challenge.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'burpee',    sets: 4, reps: '15',    rest: 20 },
        { exerciseId: 'squat',     sets: 4, reps: '20',    rest: 20 },
        { exerciseId: 'push-up',   sets: 4, reps: '14',    rest: 20 },
        { exerciseId: 'high-knees',sets: 4, reps: '40 sec',rest: 10 },
        { exerciseId: 'lunge',     sets: 4, reps: '16',    rest: 20 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Final rest before the last week.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Recovery Walk',
      description: 'Light movement only. Save energy for week 4.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',  sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',sets: 2, reps: '30 sec', rest: 20 },
      ],
    },
  ],
  [
    {
      type: 'hiit', title: 'HIIT Final Sprint',
      description: 'Your best HIIT session. Every interval counts.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'high-knees',      sets: 6, reps: '40 sec', rest: 10 },
        { exerciseId: 'box-jump',        sets: 6, reps: '40 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 6, reps: '40 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 6, reps: '40 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Endurance Victory Lap',
      description: 'Long steady state. See how far your cardio has come.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 7, reps: '60 sec', rest: 5 },
        { exerciseId: 'high-knees',      sets: 7, reps: '60 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 7, reps: '60 sec', rest: 5 },
      ],
    },
    {
      type: 'hiit', title: 'HIIT Grand Finale',
      description: 'Leave nothing behind.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',    sets: 6, reps: '40 sec', rest: 10 },
        { exerciseId: 'box-jump',  sets: 6, reps: '40 sec', rest: 10 },
        { exerciseId: 'jump-squat',sets: 6, reps: '40 sec', rest: 10 },
      ],
    },
    {
      type: 'cardio', title: 'Final Steady State',
      description: 'Last long cardio session.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 7, reps: '60 sec', rest: 5 },
        { exerciseId: 'step-up',         sets: 7, reps: '60 sec', rest: 5 },
        { exerciseId: 'mountain-climber',sets: 7, reps: '60 sec', rest: 5 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body Finale',
      description: 'The last workout of Cardio Crusher 30.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'burpee',    sets: 5, reps: '15',    rest: 20 },
        { exerciseId: 'squat',     sets: 4, reps: '20',    rest: 20 },
        { exerciseId: 'push-up',   sets: 4, reps: '15',    rest: 20 },
        { exerciseId: 'high-knees',sets: 5, reps: '45 sec',rest: 10 },
        { exerciseId: 'lunge',     sets: 4, reps: '18',    rest: 20 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Last rest day. You made it.', duration: 0, rest: true, exercises: [] },
    { type: 'rest', title: 'Challenge Complete!', description: 'Cardio Crusher 30 done. Your lungs, heart and stamina are transformed.', duration: 0, rest: true, exercises: [] },
  ],
]

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 5 — Core & Flex 30
// Goal: flexibility | No equipment | All levels
// Split: Core → Flex → Core+Cardio → Flexibility → Core → Rest → Full Body
// ─────────────────────────────────────────────────────────────────────────────
const coreFlexWeeks = [
  [
    {
      type: 'core', title: 'Core Foundation',
      description: 'Build a strong, stable core. Everything starts here.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 3, reps: '30 sec', rest: 30 },
        { exerciseId: 'bicycle-crunch', sets: 3, reps: '16',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 3, reps: '16',     rest: 30 },
      ],
    },
    {
      type: 'active-recovery', title: 'Flexibility Flow',
      description: 'Full body stretch and mobility. Hold each position.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '8',      rest: 30 },
        { exerciseId: 'side-plank',  sets: 2, reps: '20 sec', rest: 20 },
        { exerciseId: 'donkey-kick', sets: 2, reps: '12',     rest: 20 },
      ],
    },
    {
      type: 'full-body', title: 'Core + Cardio Mix',
      description: 'Core exercises mixed with light cardio. Keep it flowing.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'mountain-climber',sets: 3, reps: '30 sec', rest: 15 },
        { exerciseId: 'plank',           sets: 3, reps: '35 sec', rest: 20 },
        { exerciseId: 'bicycle-crunch',  sets: 3, reps: '20',     rest: 20 },
        { exerciseId: 'jumping-jack',    sets: 3, reps: '40 sec', rest: 15 },
      ],
    },
    {
      type: 'active-recovery', title: 'Deep Flexibility',
      description: 'Focus on tight areas. Breathe into every stretch.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'inchworm',     sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'glute-bridge', sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'donkey-kick',  sets: 3, reps: '12',     rest: 20 },
      ],
    },
    {
      type: 'core', title: 'Core Finisher',
      description: 'End of week core blast.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'v-up',          sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'flutter-kicks', sets: 3, reps: '30 sec', rest: 20 },
        { exerciseId: 'side-plank',    sets: 3, reps: '25 sec', rest: 20 },
        { exerciseId: 'bear-crawl',    sets: 3, reps: '8',      rest: 30 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Full rest. Let the flexibility gains set in.', duration: 0, rest: true, exercises: [] },
    {
      type: 'full-body', title: 'Full Body Flow',
      description: 'Light full body movement to close the week.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'squat',     sets: 2, reps: '12',     rest: 30 },
        { exerciseId: 'push-up',   sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'inchworm',  sets: 2, reps: '8',      rest: 30 },
        { exerciseId: 'plank',     sets: 2, reps: '35 sec', rest: 20 },
      ],
    },
  ],
  [
    {
      type: 'core', title: 'Core Build',
      description: 'More volume this week. Your core is already stronger.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 3, reps: '40 sec', rest: 20 },
        { exerciseId: 'v-up',           sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 3, reps: '14',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 3, reps: '20',     rest: 30 },
        { exerciseId: 'flutter-kicks',  sets: 3, reps: '30 sec', rest: 20 },
      ],
    },
    {
      type: 'active-recovery', title: 'Mobility Flow — Week 2',
      description: 'Deeper range of motion than last week.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'inchworm',     sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'donkey-kick',  sets: 3, reps: '14',     rest: 20 },
        { exerciseId: 'glute-bridge', sets: 3, reps: '18',     rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Core + Cardio Circuit',
      description: 'Longer intervals this week.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'mountain-climber',sets: 3, reps: '40 sec', rest: 15 },
        { exerciseId: 'plank',           sets: 3, reps: '45 sec', rest: 20 },
        { exerciseId: 'bicycle-crunch',  sets: 3, reps: '24',     rest: 20 },
        { exerciseId: 'burpee',          sets: 3, reps: '8',      rest: 30 },
      ],
    },
    {
      type: 'active-recovery', title: 'Deep Stretch Session',
      description: 'Full body mobility — hold each stretch for 30-45 sec.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'side-plank',  sets: 3, reps: '30 sec', rest: 20 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '10',     rest: 30 },
      ],
    },
    {
      type: 'core', title: 'Core Power',
      description: 'End of week 2 core session.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'v-up',          sets: 4, reps: '12',     rest: 30 },
        { exerciseId: 'side-plank',    sets: 4, reps: '30 sec', rest: 20 },
        { exerciseId: 'flutter-kicks', sets: 4, reps: '35 sec', rest: 20 },
        { exerciseId: 'bear-crawl',    sets: 3, reps: '10',     rest: 30 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Your posture is already improving. Keep going.', duration: 0, rest: true, exercises: [] },
    {
      type: 'full-body', title: 'Full Body Flow — Week 2',
      description: 'Slightly harder than last week\'s Sunday.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'squat',        sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'push-up',      sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'inchworm',     sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'plank',        sets: 3, reps: '45 sec', rest: 20 },
        { exerciseId: 'donkey-kick',  sets: 3, reps: '12',     rest: 20 },
      ],
    },
  ],
  [
    {
      type: 'core', title: 'Core Intensity',
      description: 'Four sets per exercise. Your midsection is solid now.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 4, reps: '50 sec', rest: 20 },
        { exerciseId: 'v-up',           sets: 4, reps: '14',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 4, reps: '16',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 4, reps: '24',     rest: 20 },
        { exerciseId: 'flutter-kicks',  sets: 4, reps: '40 sec', rest: 20 },
      ],
    },
    {
      type: 'active-recovery', title: 'Deep Mobility',
      description: 'Full body range of motion work.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'donkey-kick', sets: 3, reps: '16',     rest: 20 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '12',     rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Peak Core + Cardio',
      description: 'The hardest circuit of the challenge.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'mountain-climber',sets: 4, reps: '45 sec', rest: 10 },
        { exerciseId: 'plank',           sets: 4, reps: '55 sec', rest: 15 },
        { exerciseId: 'v-up',            sets: 4, reps: '14',     rest: 20 },
        { exerciseId: 'burpee',          sets: 4, reps: '10',     rest: 20 },
      ],
    },
    {
      type: 'active-recovery', title: 'Full Body Stretch',
      description: 'Longest flexibility session of the challenge.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'inchworm',     sets: 4, reps: '12',     rest: 30 },
        { exerciseId: 'side-plank',   sets: 4, reps: '35 sec', rest: 20 },
        { exerciseId: 'glute-bridge', sets: 4, reps: '20',     rest: 30 },
        { exerciseId: 'donkey-kick',  sets: 4, reps: '14',     rest: 20 },
      ],
    },
    {
      type: 'core', title: 'Core Peak',
      description: 'Best core session yet.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'v-up',          sets: 4, reps: '16',     rest: 20 },
        { exerciseId: 'side-plank',    sets: 4, reps: '40 sec', rest: 15 },
        { exerciseId: 'flutter-kicks', sets: 4, reps: '45 sec', rest: 15 },
        { exerciseId: 'bear-crawl',    sets: 4, reps: '12',     rest: 20 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Final week coming. Rest hard.', duration: 0, rest: true, exercises: [] },
    {
      type: 'full-body', title: 'Full Body Flow — Week 3',
      description: 'Hardest Sunday flow of the challenge.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 3, reps: '18',     rest: 30 },
        { exerciseId: 'push-up',     sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'plank',       sets: 3, reps: '55 sec', rest: 20 },
        { exerciseId: 'lunge',       sets: 3, reps: '14',     rest: 30 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '12',     rest: 30 },
      ],
    },
  ],
  [
    {
      type: 'core', title: 'Core Grand Finale',
      description: 'Max volume core. Show what 30 days built.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 5, reps: '60 sec', rest: 15 },
        { exerciseId: 'v-up',           sets: 4, reps: '18',     rest: 20 },
        { exerciseId: 'leg-raise',      sets: 4, reps: '18',     rest: 20 },
        { exerciseId: 'russian-twist',  sets: 4, reps: '28',     rest: 20 },
        { exerciseId: 'flutter-kicks',  sets: 4, reps: '50 sec', rest: 15 },
      ],
    },
    {
      type: 'active-recovery', title: 'Final Flexibility',
      description: 'Feel how much more flexible you are than day 1.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 4, reps: '14',     rest: 30 },
        { exerciseId: 'donkey-kick', sets: 4, reps: '18',     rest: 20 },
        { exerciseId: 'bear-crawl',  sets: 4, reps: '14',     rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Final Core + Cardio',
      description: 'Last high-intensity session.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'mountain-climber',sets: 5, reps: '50 sec', rest: 10 },
        { exerciseId: 'plank',           sets: 5, reps: '60 sec', rest: 10 },
        { exerciseId: 'v-up',            sets: 5, reps: '16',     rest: 15 },
        { exerciseId: 'burpee',          sets: 4, reps: '12',     rest: 20 },
      ],
    },
    {
      type: 'active-recovery', title: 'Final Stretch',
      description: 'Feel your flexibility. Compare it to day 1.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'inchworm',     sets: 4, reps: '14',     rest: 30 },
        { exerciseId: 'glute-bridge', sets: 4, reps: '20',     rest: 30 },
        { exerciseId: 'side-plank',   sets: 4, reps: '45 sec', rest: 20 },
      ],
    },
    {
      type: 'core', title: 'Core — Last Day',
      description: 'One final core session. You are a different person now.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 4, reps: '60 sec', rest: 15 },
        { exerciseId: 'v-up',           sets: 4, reps: '18',     rest: 20 },
        { exerciseId: 'flutter-kicks',  sets: 4, reps: '50 sec', rest: 15 },
        { exerciseId: 'bear-crawl',     sets: 4, reps: '14',     rest: 20 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'One more rest. Tomorrow you close it out.', duration: 0, rest: true, exercises: [] },
    { type: 'rest', title: 'Challenge Complete!', description: 'Core & Flex 30 is done. Your posture, flexibility, and core strength are transformed.', duration: 0, rest: true, exercises: [] },
  ],
]

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 6 — Home Muscle Builder 30
// Goal: muscle | No equipment | Intermediate
// Split: Full Body → Legs → Upper Push → Core → HIIT → Rest → Active Recovery
// ─────────────────────────────────────────────────────────────────────────────
const homeMuscleWeeks = [
  // WEEK 1 — Foundation (3 sets, learn tempo and form)
  [
    {
      type: 'full-body', title: 'Home Full Body Ignition',
      description: 'Activate every muscle group with compound bodyweight moves. Focus on full range of motion.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'squat',            sets: 3, reps: '12',     rest: 60 },
        { exerciseId: 'push-up',          sets: 3, reps: '10',     rest: 60 },
        { exerciseId: 'lunge',            sets: 3, reps: '10',     rest: 60 },
        { exerciseId: 'mountain-climber', sets: 3, reps: '20',     rest: 45 },
        { exerciseId: 'plank',            sets: 3, reps: '30 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Leg Day at Home',
      description: 'Quads, glutes, hamstrings — all targeted without a single machine.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 3, reps: '15',     rest: 60 },
        { exerciseId: 'lunge',       sets: 3, reps: '12',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 3, reps: '15',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 3, reps: '30 sec', rest: 30 },
        { exerciseId: 'calf-raise',  sets: 3, reps: '20',     rest: 30 },
      ],
    },
    {
      type: 'upper', title: 'Push & Sculpt',
      description: 'Chest, shoulders and triceps — bodyweight pressing progressions.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 3, reps: '12',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 3, reps: '8',      rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 3, reps: '10',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 3, reps: '8',      rest: 45 },
        { exerciseId: 'plank',        sets: 3, reps: '30 sec', rest: 30 },
      ],
    },
    {
      type: 'core', title: 'Core Foundation',
      description: 'Build the iron core that powers every other movement.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 3, reps: '45 sec', rest: 30 },
        { exerciseId: 'russian-twist',  sets: 3, reps: '20',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'bicycle-crunch', sets: 3, reps: '20',     rest: 30 },
        { exerciseId: 'superman',       sets: 3, reps: '12',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Home HIIT Ignite',
      description: '20 sec on, 10 sec off — Tabata style. No equipment, full intensity.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',  sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'burpee',        sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'high-knees',    sets: 4, reps: '20 sec', rest: 10 },
        { exerciseId: 'jump-squat',    sets: 4, reps: '20 sec', rest: 10 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Full rest. Eat well, sleep 8 hours, stay hydrated.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Active Recovery',
      description: 'Light movement to flush soreness and keep your streak alive.',
      duration: 15, rest: false,
      exercises: [
        { exerciseId: 'inchworm',   sets: 2, reps: '8',      rest: 30 },
        { exerciseId: 'side-plank', sets: 2, reps: '20 sec', rest: 20 },
        { exerciseId: 'bear-crawl', sets: 2, reps: '10',     rest: 30 },
      ],
    },
  ],
  // WEEK 2 — Build (4 sets, more volume)
  [
    {
      type: 'full-body', title: 'Home Full Body Power',
      description: 'Same movements, 4 sets. Push past last week.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'squat',            sets: 4, reps: '14',     rest: 60 },
        { exerciseId: 'push-up',          sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'lunge',            sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'mountain-climber', sets: 4, reps: '25',     rest: 45 },
        { exerciseId: 'plank',            sets: 4, reps: '35 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Leg Day Volume',
      description: 'More sets, more reps. Your legs will earn their gains.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 4, reps: '18',     rest: 60 },
        { exerciseId: 'lunge',       sets: 4, reps: '14',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 4, reps: '18',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 4, reps: '40 sec', rest: 30 },
        { exerciseId: 'calf-raise',  sets: 4, reps: '25',     rest: 30 },
      ],
    },
    {
      type: 'upper', title: 'Push Strength',
      description: 'Progressive push volume. Slow the tempo for more muscle tension.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 4, reps: '14',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 4, reps: '10',     rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 4, reps: '10',     rest: 45 },
        { exerciseId: 'side-plank',   sets: 4, reps: '25 sec', rest: 25 },
      ],
    },
    {
      type: 'core', title: 'Core Builder',
      description: 'Heavier core volume. Brace harder, breathe steadily.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 4, reps: '45 sec', rest: 30 },
        { exerciseId: 'russian-twist',  sets: 4, reps: '24',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 4, reps: '15',     rest: 30 },
        { exerciseId: 'bicycle-crunch', sets: 4, reps: '25',     rest: 30 },
        { exerciseId: 'superman',       sets: 4, reps: '15',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Home HIIT Surge',
      description: 'Extra round this week. Do not pace yourself — go all out.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',  sets: 5, reps: '20 sec', rest: 10 },
        { exerciseId: 'burpee',        sets: 5, reps: '20 sec', rest: 10 },
        { exerciseId: 'high-knees',    sets: 5, reps: '20 sec', rest: 10 },
        { exerciseId: 'jump-squat',    sets: 5, reps: '20 sec', rest: 10 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Full rest. Recovery is where the muscle is built.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Active Recovery',
      description: 'Move light, breathe deep, prepare for week 3.',
      duration: 15, rest: false,
      exercises: [
        { exerciseId: 'inchworm',   sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank', sets: 2, reps: '25 sec', rest: 25 },
        { exerciseId: 'bear-crawl', sets: 2, reps: '12',     rest: 30 },
      ],
    },
  ],
  // WEEK 3 — Push (4–5 sets, heavier reps)
  [
    {
      type: 'full-body', title: 'Home Full Body Push',
      description: 'You have built the base — now push your limits.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'squat',            sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'push-up',          sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'lunge',            sets: 4, reps: '14',     rest: 60 },
        { exerciseId: 'mountain-climber', sets: 4, reps: '30',     rest: 45 },
        { exerciseId: 'plank',            sets: 4, reps: '45 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Leg Day Intensity',
      description: 'Maximum lower body volume. Rest only as long as needed.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 5, reps: '18',     rest: 60 },
        { exerciseId: 'lunge',       sets: 4, reps: '15',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 5, reps: '18',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 4, reps: '50 sec', rest: 30 },
        { exerciseId: 'calf-raise',  sets: 4, reps: '25',     rest: 30 },
      ],
    },
    {
      type: 'upper', title: 'Push Peak',
      description: 'Slow tempo, controlled eccentric. Make every rep count.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 4, reps: '15',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 4, reps: '10',     rest: 45 },
        { exerciseId: 'side-plank',   sets: 4, reps: '30 sec', rest: 25 },
      ],
    },
    {
      type: 'core', title: 'Iron Core',
      description: 'Your core is the foundation of everything. Make it bulletproof.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 4, reps: '60 sec', rest: 30 },
        { exerciseId: 'russian-twist',  sets: 4, reps: '28',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 4, reps: '15',     rest: 30 },
        { exerciseId: 'bicycle-crunch', sets: 4, reps: '30',     rest: 30 },
        { exerciseId: 'superman',       sets: 4, reps: '15',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Home HIIT Overdrive',
      description: '25 sec on, 10 sec off. This one should leave you breathless.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'high-knees',      sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'jump-squat',      sets: 5, reps: '25 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 3, reps: '25 sec', rest: 10 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest is non-negotiable. Eat protein, sleep, repeat.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Active Recovery',
      description: 'Stay loose and mobile. One more week to go.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',  sets: 3, reps: '30 sec', rest: 25 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'glute-bridge',sets: 2, reps: '15',     rest: 30 },
      ],
    },
  ],
  // WEEK 4 — Peak (5 sets, maximum output)
  [
    {
      type: 'full-body', title: 'Home Full Body Finale',
      description: 'Final week. Leave everything on the floor.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'squat',            sets: 5, reps: '18',     rest: 60 },
        { exerciseId: 'push-up',          sets: 5, reps: '18',     rest: 60 },
        { exerciseId: 'lunge',            sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'mountain-climber', sets: 5, reps: '30',     rest: 45 },
        { exerciseId: 'plank',            sets: 5, reps: '45 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Leg Day Max',
      description: 'The hardest leg session of the programme. Earn it.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 5, reps: '20',     rest: 60 },
        { exerciseId: 'lunge',       sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 5, reps: '20',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 5, reps: '60 sec', rest: 30 },
        { exerciseId: 'calf-raise',  sets: 5, reps: '30',     rest: 30 },
      ],
    },
    {
      type: 'upper', title: 'Push Max',
      description: 'Final push session — hit numbers you could not dream of on Day 1.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 5, reps: '18',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 5, reps: '12',     rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 5, reps: '10',     rest: 45 },
        { exerciseId: 'side-plank',   sets: 5, reps: '35 sec', rest: 25 },
      ],
    },
    {
      type: 'core', title: 'Core Final Test',
      description: 'Your strongest core session. Prove how far you have come.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 5, reps: '60 sec', rest: 30 },
        { exerciseId: 'russian-twist',  sets: 5, reps: '30',     rest: 30 },
        { exerciseId: 'leg-raise',      sets: 5, reps: '18',     rest: 30 },
        { exerciseId: 'bicycle-crunch', sets: 5, reps: '30',     rest: 30 },
        { exerciseId: 'superman',       sets: 5, reps: '18',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Home HIIT Peak',
      description: 'Final HIIT. 6 rounds. This is your moment.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'jumping-jack',    sets: 6, reps: '25 sec', rest: 10 },
        { exerciseId: 'burpee',          sets: 6, reps: '25 sec', rest: 10 },
        { exerciseId: 'high-knees',      sets: 6, reps: '25 sec', rest: 10 },
        { exerciseId: 'jump-squat',      sets: 6, reps: '25 sec', rest: 10 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '25 sec', rest: 10 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest. You have earned it and then some.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Active Recovery',
      description: 'Celebrate your last recovery day. Tomorrow is peak week complete.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',  sets: 3, reps: '35 sec', rest: 25 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'glute-bridge',sets: 3, reps: '15',     rest: 30 },
      ],
    },
  ],
]

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 7 — Calisthenics 30
// Goal: strength | No equipment | Intermediate
// Split: Upper Push → Lower Power → Full Body Circuit → Core → Explosive → Rest → Recovery
// ─────────────────────────────────────────────────────────────────────────────
const calisthenicsWeeks = [
  // WEEK 1 — Foundation (3 sets, controlled tempo)
  [
    {
      type: 'upper', title: 'Push Fundamentals',
      description: 'Master the push-up and its progressions. Slow eccentric, full ROM.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 3, reps: '12',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 3, reps: '8',      rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 3, reps: '10',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 3, reps: '8',      rest: 45 },
        { exerciseId: 'plank',        sets: 3, reps: '30 sec', rest: 30 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Power',
      description: 'Explosive leg training — squat mechanics and jump preparation.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 3, reps: '15',     rest: 60 },
        { exerciseId: 'lunge',       sets: 3, reps: '12',     rest: 60 },
        { exerciseId: 'jump-squat',  sets: 3, reps: '10',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 3, reps: '15',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 3, reps: '30 sec', rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Full Body Circuit',
      description: 'Move through compound patterns with minimal rest between exercises.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'push-up',          sets: 3, reps: '10',     rest: 45 },
        { exerciseId: 'squat',            sets: 3, reps: '12',     rest: 45 },
        { exerciseId: 'mountain-climber', sets: 3, reps: '20',     rest: 45 },
        { exerciseId: 'plank',            sets: 3, reps: '30 sec', rest: 30 },
        { exerciseId: 'burpee',           sets: 3, reps: '8',      rest: 60 },
      ],
    },
    {
      type: 'core', title: 'Core Foundations',
      description: 'The calisthenics core — anti-rotation, anti-extension, stability.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 3, reps: '45 sec', rest: 30 },
        { exerciseId: 'leg-raise',      sets: 3, reps: '12',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 3, reps: '20',     rest: 30 },
        { exerciseId: 'side-plank',     sets: 3, reps: '20 sec', rest: 20 },
        { exerciseId: 'superman',       sets: 3, reps: '12',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Explosive Power Day',
      description: 'Plyometric training to build athleticism and cardiovascular power.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'burpee',          sets: 4, reps: '8',      rest: 60 },
        { exerciseId: 'jump-squat',      sets: 4, reps: '10',     rest: 60 },
        { exerciseId: 'high-knees',      sets: 4, reps: '30 sec', rest: 30 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '20 sec', rest: 30 },
        { exerciseId: 'bear-crawl',      sets: 3, reps: '10',     rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Complete rest. Let the tendons and joints recover.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Mobility Flow',
      description: 'Joint mobility and light movement. Prepare for next week.',
      duration: 15, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 2, reps: '8',      rest: 30 },
        { exerciseId: 'side-plank',  sets: 2, reps: '20 sec', rest: 20 },
        { exerciseId: 'glute-bridge',sets: 2, reps: '12',     rest: 30 },
      ],
    },
  ],
  // WEEK 2 — Build (4 sets, increase volume)
  [
    {
      type: 'upper', title: 'Push Volume',
      description: '4 sets this week. Slow the negative to 3 seconds.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 4, reps: '14',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 4, reps: '10',     rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 4, reps: '10',     rest: 45 },
        { exerciseId: 'side-plank',   sets: 4, reps: '25 sec', rest: 25 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Strength',
      description: 'More sets, more reps, more explosive power.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 4, reps: '18',     rest: 60 },
        { exerciseId: 'lunge',       sets: 4, reps: '14',     rest: 60 },
        { exerciseId: 'jump-squat',  sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 4, reps: '18',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 4, reps: '40 sec', rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Circuit Intensity',
      description: 'Reduce rest between exercises to 30 seconds. Maintain form.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'push-up',          sets: 4, reps: '12',     rest: 30 },
        { exerciseId: 'squat',            sets: 4, reps: '15',     rest: 30 },
        { exerciseId: 'mountain-climber', sets: 4, reps: '25',     rest: 30 },
        { exerciseId: 'plank',            sets: 4, reps: '40 sec', rest: 30 },
        { exerciseId: 'burpee',           sets: 4, reps: '10',     rest: 60 },
      ],
    },
    {
      type: 'core', title: 'Core Strength',
      description: 'Longer holds, more reps. Your core is getting stronger.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 4, reps: '50 sec', rest: 30 },
        { exerciseId: 'leg-raise',      sets: 4, reps: '15',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 4, reps: '25',     rest: 30 },
        { exerciseId: 'side-plank',     sets: 4, reps: '25 sec', rest: 25 },
        { exerciseId: 'superman',       sets: 4, reps: '15',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Explosive Surge',
      description: 'More reps, same rest. Plyometric power output rising.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',          sets: 4, reps: '10',     rest: 60 },
        { exerciseId: 'jump-squat',      sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'high-knees',      sets: 4, reps: '35 sec', rest: 30 },
        { exerciseId: 'mountain-climber',sets: 4, reps: '25 sec', rest: 30 },
        { exerciseId: 'bear-crawl',      sets: 4, reps: '12',     rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Rest. Adaptation happens during recovery, not training.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Mobility Flow',
      description: 'Light movement. Keep the joints primed.',
      duration: 15, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 2, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',  sets: 2, reps: '25 sec', rest: 25 },
        { exerciseId: 'glute-bridge',sets: 2, reps: '15',     rest: 30 },
      ],
    },
  ],
  // WEEK 3 — Push (5 sets, near max effort)
  [
    {
      type: 'upper', title: 'Push Intensity',
      description: '5 sets. 4-second eccentric on every push-up. This is where you grow.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 4, reps: '12',     rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 4, reps: '15',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 4, reps: '10',     rest: 45 },
        { exerciseId: 'side-plank',   sets: 4, reps: '30 sec', rest: 25 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Max',
      description: 'Heavy squat volume and explosive jumps. Maximum lower body output.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 5, reps: '20',     rest: 60 },
        { exerciseId: 'lunge',       sets: 4, reps: '15',     rest: 60 },
        { exerciseId: 'jump-squat',  sets: 5, reps: '12',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 5, reps: '20',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 4, reps: '50 sec', rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Circuit Peak',
      description: 'Density training — more work in the same time. Rest 30 sec max.',
      duration: 40, rest: false,
      exercises: [
        { exerciseId: 'push-up',          sets: 5, reps: '14',     rest: 30 },
        { exerciseId: 'squat',            sets: 5, reps: '16',     rest: 30 },
        { exerciseId: 'mountain-climber', sets: 5, reps: '30',     rest: 30 },
        { exerciseId: 'plank',            sets: 5, reps: '45 sec', rest: 30 },
        { exerciseId: 'burpee',           sets: 4, reps: '12',     rest: 60 },
      ],
    },
    {
      type: 'core', title: 'Core Mastery',
      description: 'True core mastery comes from control, not speed.',
      duration: 25, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 5, reps: '60 sec', rest: 30 },
        { exerciseId: 'leg-raise',      sets: 4, reps: '18',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 4, reps: '30',     rest: 30 },
        { exerciseId: 'side-plank',     sets: 4, reps: '30 sec', rest: 25 },
        { exerciseId: 'superman',       sets: 4, reps: '18',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Explosive Overdrive',
      description: '25-second intervals at maximum intensity. Do not hold back.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'burpee',          sets: 5, reps: '12',     rest: 60 },
        { exerciseId: 'jump-squat',      sets: 5, reps: '14',     rest: 60 },
        { exerciseId: 'high-knees',      sets: 5, reps: '35 sec', rest: 25 },
        { exerciseId: 'mountain-climber',sets: 5, reps: '25 sec', rest: 25 },
        { exerciseId: 'bear-crawl',      sets: 4, reps: '15',     rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'One more week. Rest hard, train harder.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Mobility Flow',
      description: 'Prioritise shoulder and hip mobility before the final week.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',  sets: 3, reps: '30 sec', rest: 25 },
        { exerciseId: 'glute-bridge',sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'bear-crawl',  sets: 2, reps: '12',     rest: 40 },
      ],
    },
  ],
  // WEEK 4 — Peak (5+ sets, maximum output)
  [
    {
      type: 'upper', title: 'Push Final',
      description: 'The hardest push session of your life. Prove it to yourself.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'push-up',      sets: 5, reps: '18',     rest: 60 },
        { exerciseId: 'pike-push-up', sets: 5, reps: '14',     rest: 60 },
        { exerciseId: 'tricep-dip',   sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'inchworm',     sets: 5, reps: '12',     rest: 45 },
        { exerciseId: 'side-plank',   sets: 5, reps: '35 sec', rest: 25 },
      ],
    },
    {
      type: 'lower', title: 'Lower Body Finale',
      description: 'Maximum leg volume. Every rep is a step closer to the finish line.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'squat',       sets: 5, reps: '22',     rest: 60 },
        { exerciseId: 'lunge',       sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'jump-squat',  sets: 5, reps: '15',     rest: 60 },
        { exerciseId: 'glute-bridge',sets: 5, reps: '22',     rest: 45 },
        { exerciseId: 'wall-sit',    sets: 5, reps: '60 sec', rest: 30 },
      ],
    },
    {
      type: 'full-body', title: 'Circuit Finale',
      description: 'Full body, max effort, minimal rest. Your best session yet.',
      duration: 45, rest: false,
      exercises: [
        { exerciseId: 'push-up',          sets: 5, reps: '16',     rest: 30 },
        { exerciseId: 'squat',            sets: 5, reps: '18',     rest: 30 },
        { exerciseId: 'mountain-climber', sets: 5, reps: '30',     rest: 30 },
        { exerciseId: 'plank',            sets: 5, reps: '60 sec', rest: 30 },
        { exerciseId: 'burpee',           sets: 5, reps: '14',     rest: 60 },
      ],
    },
    {
      type: 'core', title: 'Core Finale',
      description: 'Five rounds. Show your core who is in charge.',
      duration: 30, rest: false,
      exercises: [
        { exerciseId: 'plank',          sets: 5, reps: '75 sec', rest: 30 },
        { exerciseId: 'leg-raise',      sets: 5, reps: '20',     rest: 30 },
        { exerciseId: 'russian-twist',  sets: 5, reps: '30',     rest: 30 },
        { exerciseId: 'side-plank',     sets: 5, reps: '35 sec', rest: 25 },
        { exerciseId: 'superman',       sets: 5, reps: '20',     rest: 30 },
      ],
    },
    {
      type: 'hiit', title: 'Explosive Peak',
      description: 'Six rounds. This is it — the final HIIT. Make it your best.',
      duration: 35, rest: false,
      exercises: [
        { exerciseId: 'burpee',          sets: 6, reps: '12',     rest: 60 },
        { exerciseId: 'jump-squat',      sets: 6, reps: '15',     rest: 60 },
        { exerciseId: 'high-knees',      sets: 6, reps: '35 sec', rest: 25 },
        { exerciseId: 'mountain-climber',sets: 6, reps: '25 sec', rest: 25 },
        { exerciseId: 'bear-crawl',      sets: 4, reps: '15',     rest: 45 },
      ],
    },
    { type: 'rest', title: 'Rest Day', description: 'Final rest day. Tomorrow you celebrate 30 days of calisthenics.', duration: 0, rest: true, exercises: [] },
    {
      type: 'active-recovery', title: 'Final Mobility Flow',
      description: 'Slow down. Reflect on how far you have come. Move freely.',
      duration: 20, rest: false,
      exercises: [
        { exerciseId: 'inchworm',    sets: 3, reps: '10',     rest: 30 },
        { exerciseId: 'side-plank',  sets: 3, reps: '35 sec', rest: 25 },
        { exerciseId: 'glute-bridge',sets: 3, reps: '15',     rest: 30 },
        { exerciseId: 'bear-crawl',  sets: 3, reps: '15',     rest: 40 },
      ],
    },
  ],
]

export const challenges = [
  {
    id: 'fat-blaster-30',
    title: 'Fat Blaster 30',
    subtitle: 'Torch fat with zero equipment in 30 days',
    description: 'A high-intensity bodyweight programme designed to shred fat fast. Five days a week, no equipment, progressive volume. The most efficient path from couch to lean.',
    goal: 'weight-loss',
    level: 'beginner',
    daysPerWeek: 5,
    duration: 30,
    equipment: 'none',
    color: '#ff4d3d',
    emoji: '🔥',
    benefits: ['Burn maximum calories with HIIT and circuits', 'Zero equipment — do it anywhere', 'Builds cardio and strength simultaneously', 'Progressive volume keeps results coming'],
    schedule: generateSchedule(fatBlasterWeeks),
  },
  {
    id: 'muscle-builder-30',
    title: 'Muscle Builder 30',
    subtitle: 'Add serious size with a structured gym split',
    description: 'A 30-day progressive hypertrophy programme using a Push/Pull/Legs split. Six training days per week, gym required. Each week adds volume and intensity to maximise muscle growth.',
    goal: 'muscle',
    level: 'intermediate',
    daysPerWeek: 6,
    duration: 30,
    equipment: 'gym',
    color: '#6366f1',
    emoji: '💪',
    benefits: ['PPL split for complete muscular development', 'Progressive volume every week', 'Optimised for hypertrophy (8–12 rep ranges)', 'Builds the habit of consistent gym training'],
    schedule: generateSchedule(muscleBuilderWeeks),
  },
  {
    id: 'strength-foundation-30',
    title: 'Strength Foundation 30',
    subtitle: 'Get strong on the big lifts — squat, bench, deadlift',
    description: 'A beginner strength programme built around the 5×5 method. Every session adds weight to the bar. You will finish 30 days genuinely stronger. Gym required.',
    goal: 'strength',
    level: 'beginner',
    daysPerWeek: 4,
    duration: 30,
    equipment: 'gym',
    color: '#f59e0b',
    emoji: '🏋️',
    benefits: ['5×5 strength methodology', 'Progressive load added every session', 'Build real-world functional strength', 'Master squat, bench, deadlift form'],
    schedule: generateSchedule(strengthFoundationWeeks),
  },
  {
    id: 'cardio-crusher-30',
    title: 'Cardio Crusher 30',
    subtitle: 'Build a powerful engine — HIIT + steady state cardio',
    description: 'Mix of HIIT and steady-state cardio designed to dramatically improve cardiovascular fitness in 30 days. No equipment. Suitable for beginners and intermediates.',
    goal: 'cardio',
    level: 'beginner',
    daysPerWeek: 5,
    duration: 30,
    equipment: 'none',
    color: '#22c55e',
    emoji: '🏃',
    benefits: ['Improve VO2 max and stamina', 'HIIT + LISS optimal fat-loss combo', 'Sessions get progressively harder', 'Better endurance in everyday life'],
    schedule: generateSchedule(cardioCrusherWeeks),
  },
  {
    id: 'core-flex-30',
    title: 'Core & Flex 30',
    subtitle: 'Build an iron core and unlock full body flexibility',
    description: 'Daily core training paired with flexibility and mobility work. Ideal if you sit a lot, have poor posture, or want to move better. No equipment needed.',
    goal: 'flexibility',
    level: 'beginner',
    daysPerWeek: 6,
    duration: 30,
    equipment: 'none',
    color: '#ec4899',
    emoji: '🧘',
    benefits: ['Stronger, more stable core', 'Improved flexibility and range of motion', 'Better posture and less back pain', 'Foundation for all other athletic training'],
    schedule: generateSchedule(coreFlexWeeks),
  },
  {
    id: 'home-muscle-30',
    title: 'Home Muscle Builder 30',
    subtitle: 'Build visible muscle at home — zero equipment, proven science',
    description: 'A 30-day bodyweight hypertrophy programme engineered for home training. Using progressive volume and time-under-tension, you will build visible muscle without touching a single piece of gym equipment. No gym, no excuses — just results.',
    goal: 'muscle',
    level: 'intermediate',
    daysPerWeek: 5,
    duration: 30,
    equipment: 'none',
    color: '#8b5cf6',
    emoji: '🏠',
    benefits: ['Build real muscle without any equipment', 'Progressive overload through volume and tempo', 'Upper, lower, and core split from home', 'HIIT sessions to keep body fat low', 'Scalable for any fitness level'],
    schedule: generateSchedule(homeMuscleWeeks),
  },
  {
    id: 'calisthenics-30',
    title: 'Calisthenics 30',
    subtitle: 'Master your bodyweight — the original no-gym strength method',
    description: 'A 30-day calisthenics challenge that builds impressive bodyweight strength from home. Master push-up progressions, explosive lower body power, and bulletproof core strength. No gym, no machines — just you versus gravity.',
    goal: 'strength',
    level: 'intermediate',
    daysPerWeek: 5,
    duration: 30,
    equipment: 'none',
    color: '#0ea5e9',
    emoji: '🤸',
    benefits: ['Master push-up and squat progressions', 'Build explosive power with plyometric training', 'Develop bulletproof core strength', 'Improve body control and coordination', 'Train anywhere — no gym required'],
    schedule: generateSchedule(calisthenicsWeeks),
  },
]

export function getChallengeById(id) {
  return challenges.find(c => c.id === id) ?? null
}

export function getChallengesForGoal(goal) {
  return challenges.filter(c => c.goal === goal)
}
