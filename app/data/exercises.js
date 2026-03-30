export const exercises = [
  // ─── EXISTING ───────────────────────────────────────────────────────────────
  {
    id: 'squat',
    slug: 'squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'aclHkVaku9U',
    image: 'https://plus.unsplash.com/premium_photo-1666736570009-76c9551729bc?w=800&q=80',
    description: 'The king of lower body exercises. The barbell back squat builds unmatched strength and size in the legs and glutes while also engaging your core and back. It is the foundation of any serious strength program.',
    formTips: [
      'Keep chest up and core braced throughout the movement',
      'Push knees out over toes to maintain proper alignment',
      'Drive through heels on the way up, not your toes',
      'Reach depth — thighs parallel or below for full range of motion',
      'Maintain neutral spine throughout, avoid rounding the lower back'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse) — focus on pushing knees out',
      'Rounding the lower back under load — brace core harder and reduce weight',
      'Rising on toes instead of driving through heels — practice box squats',
      'Not reaching sufficient depth — work on ankle mobility'
    ]
  },
  {
    id: 'push-up',
    slug: 'push-up',
    name: 'Push-Up',
    category: 'Chest',
    muscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'IODxDxX7oi4',
    image: 'https://plus.unsplash.com/premium_photo-1673210887551-1b3dac70ef6d?w=800&q=80',
    description: 'The push-up is the ultimate bodyweight upper body exercise. It builds chest, tricep, and shoulder strength while also challenging your core stability. No equipment required — do it anywhere.',
    formTips: [
      'Keep your body in a straight line from head to heels',
      'Place hands slightly wider than shoulder-width apart',
      'Lower your chest all the way to the floor for full range of motion',
      'Keep elbows at a 45-degree angle, not flared wide',
      'Squeeze your glutes and brace your core throughout'
    ],
    commonMistakes: [
      'Sagging hips — squeeze glutes and core to keep body straight',
      'Flaring elbows out — tuck them closer to your body',
      'Partial reps — go all the way down and all the way up',
      'Looking up too far — keep neck neutral with spine'
    ]
  },
  {
    id: 'deadlift',
    slug: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'Back',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Traps', 'Forearms'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'op9kVnSso6Q',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    description: 'The deadlift is one of the most effective total-body exercises ever developed. It trains the entire posterior chain — hamstrings, glutes, back — and builds functional strength you can use in real life.',
    formTips: [
      'Start with bar over mid-foot, hip-width stance',
      'Hinge at the hips and push the floor away rather than pulling up',
      'Keep the bar close to your body throughout the lift — drag it up your shins',
      'Maintain a neutral spine — no rounding of the lower back',
      'Lock hips and knees out simultaneously at the top'
    ],
    commonMistakes: [
      'Rounding the lower back — this is dangerous, reduce weight and fix form',
      'Jerking the bar off the floor — build tension before pulling',
      'Bar drifting away from the body — engage lats to keep it close',
      'Hyperextending at the top — simply lock out, do not lean back excessively'
    ]
  },
  {
    id: 'pull-up',
    slug: 'pull-up',
    name: 'Pull-Up',
    category: 'Back',
    muscles: ['Lats', 'Biceps', 'Rear Deltoids', 'Core'],
    difficulty: 'intermediate',
    equipment: 'pull-up bar',
    youtubeId: 'eGo4IYlbE5g',
    image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'The pull-up is the gold standard for upper body pulling strength. It builds a wide, strong back and powerful biceps. Master the pull-up and you will have a physique and strength that commands respect.',
    formTips: [
      'Start from a dead hang with arms fully extended',
      'Pull shoulder blades down and back before initiating the pull',
      'Drive elbows toward your hips as you pull up',
      'Get your chin clearly above the bar at the top',
      'Lower yourself slowly and controlled — the negative builds strength too'
    ],
    commonMistakes: [
      'Kipping or swinging — build strict strength first before adding momentum',
      'Not going to full hang at the bottom — limits range of motion and gains',
      'Pulling with arms instead of lats — think about driving elbows down',
      'Shrugging shoulders — keep them depressed and packed throughout'
    ]
  },
  {
    id: 'plank',
    slug: 'plank',
    name: 'Plank',
    category: 'Core',
    muscles: ['Core', 'Transverse Abdominis', 'Shoulders', 'Glutes'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'pSHjTRCQxIw',
    image: 'https://images.unsplash.com/photo-1714646442330-9068099f5521?w=800&q=80',
    description: 'The plank is the foundational core stability exercise. It builds deep core strength, improves posture, and protects your spine. Unlike crunches, it trains the core as it is meant to function — as a stabilizer.',
    formTips: [
      'Keep body in a straight line from head to heels',
      'Brace your core as if about to take a punch',
      'Squeeze glutes and quads to maintain full body tension',
      'Keep hips level — do not let them rise or sink',
      'Breathe steadily throughout the hold'
    ],
    commonMistakes: [
      'Hips too high — this is a rest position, not a plank',
      'Hips sagging — engage core and glutes harder',
      'Holding breath — maintain steady breathing throughout',
      'Looking up too far — keep neck neutral'
    ]
  },
  {
    id: 'burpee',
    slug: 'burpee',
    name: 'Burpee',
    category: 'Cardio',
    muscles: ['Full Body', 'Chest', 'Legs', 'Core', 'Shoulders'],
    difficulty: 'intermediate',
    equipment: 'none',
    youtubeId: 'dZgVxmf6jkA',
    image: 'https://images.unsplash.com/photo-1739283180407-21e27d5c0735?w=800&q=80',
    description: 'The burpee is a brutal and effective full-body conditioning exercise. It combines a squat, push-up, and jump in one fluid movement, torching calories and building cardiovascular fitness simultaneously.',
    formTips: [
      'Start standing, then drop hands to the floor and jump feet back',
      'Perform a full push-up at the bottom',
      'Jump feet forward to hands and then explode upward',
      'Fully extend arms overhead at the top of the jump',
      'Land softly with bent knees to protect your joints'
    ],
    commonMistakes: [
      'Skipping the push-up — this removes a major strength component',
      'Landing with locked knees — always land with soft, bent knees',
      'Rushing without control — focus on form before adding speed',
      'Not fully extending at the jump — reach overhead for full benefit'
    ]
  },
  {
    id: 'lunge',
    slug: 'lunge',
    name: 'Forward Lunge',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'QOVaHwm-Q6U',
    image: 'https://images.unsplash.com/photo-1758599880618-3f03f2a401b4?w=800&q=80',
    description: 'The lunge is an essential unilateral leg exercise that builds strength, balance, and coordination. It targets each leg independently, helping to fix imbalances and build functional lower body strength.',
    formTips: [
      'Step forward and lower back knee toward the floor',
      'Keep front shin vertical — knee over ankle, not past toes',
      'Keep torso upright and core engaged throughout',
      'Push through front heel to return to standing',
      'Take a long enough step to allow full range of motion'
    ],
    commonMistakes: [
      'Front knee tracking too far forward — shorten your step and control the descent',
      'Leaning forward with the torso — keep chest tall and core tight',
      'Not lowering enough — back knee should nearly touch the floor',
      'Wobbling side to side — slow down and focus on balance'
    ]
  },
  {
    id: 'mountain-climber',
    slug: 'mountain-climber',
    name: 'Mountain Climber',
    category: 'Cardio',
    muscles: ['Core', 'Hip Flexors', 'Shoulders', 'Chest'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'nmwgirgXLYM',
    image: 'https://plus.unsplash.com/premium_photo-1661962597133-6bd08702bc2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Mountain climbers are a dynamic cardio and core exercise that gets your heart rate up while strengthening your midsection. They are perfect for HIIT workouts and require no equipment at all.',
    formTips: [
      'Start in a high plank position with wrists under shoulders',
      'Drive one knee toward chest while maintaining plank position',
      'Alternate legs in a running motion as fast as possible',
      'Keep hips level and do not let them bounce up and down',
      'Look slightly ahead, not down, to keep neck neutral'
    ],
    commonMistakes: [
      'Hips rising too high — maintain plank position throughout',
      'Not driving knees far enough — aim for chest, not just waist',
      'Losing core engagement — slow down if form breaks',
      'Arms bending — keep elbows locked and arms straight'
    ]
  },
  {
    id: 'jumping-jack',
    slug: 'jumping-jack',
    name: 'Jumping Jack',
    category: 'Cardio',
    muscles: ['Full Body', 'Calves', 'Hip Abductors', 'Shoulders'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'c4DAnQ6DtF8',
    image: 'https://images.pexels.com/photos/4853091/pexels-photo-4853091.jpeg',
    description: 'The jumping jack is a classic cardio exercise perfect for warm-ups and conditioning. It elevates the heart rate quickly, improves coordination, and can be done anywhere with no equipment.',
    formTips: [
      'Start with feet together and arms at sides',
      'Jump feet out to shoulder width while raising arms overhead',
      'Keep a slight bend in knees when landing',
      'Maintain a steady rhythm for best cardiovascular benefit',
      'Land softly on the balls of your feet to reduce impact'
    ],
    commonMistakes: [
      'Landing with straight legs — always maintain soft, bent knees',
      'Arms not going fully overhead — maximize the range of motion',
      'Crossing feet when jumping — focus on landing with feet hip-width apart',
      'Looking down — keep your gaze forward to maintain posture'
    ]
  },
  {
    id: 'glute-bridge',
    slug: 'glute-bridge',
    name: 'Glute Bridge',
    category: 'Legs',
    muscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Core'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'OUgsJ8-Vi0E',
    image: 'https://plus.unsplash.com/premium_photo-1664884884661-309d8ed2db8b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'The glute bridge is a foundational posterior chain exercise that activates and strengthens the glutes and hamstrings. It is perfect for beginners, rehabilitation, and as a warm-up for heavier lifts.',
    formTips: [
      'Lie on your back with knees bent, feet flat on floor hip-width apart',
      'Drive hips up by squeezing glutes — not by arching the lower back',
      'Create a straight line from shoulders to knees at the top',
      'Hold the top position for 1-2 seconds and squeeze hard',
      'Lower hips slowly and under control'
    ],
    commonMistakes: [
      'Hyperextending the lower back at the top — stop at neutral spine',
      'Pushing through toes instead of heels — press through heels to activate glutes',
      'Feet too close or too far from body — shins should be vertical at the top',
      'Not squeezing glutes at the top — this is the key part of the movement'
    ]
  },
  {
    id: 'dumbbell-row',
    slug: 'dumbbell-row',
    name: 'Dumbbell Row',
    category: 'Back',
    muscles: ['Lats', 'Rhomboids', 'Biceps', 'Rear Deltoids'],
    difficulty: 'beginner',
    equipment: 'dumbbells',
    youtubeId: 'roCP_IRne7k',
    image: 'https://plus.unsplash.com/premium_photo-1663036279765-9bab36edc5ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'The dumbbell row is one of the best exercises for building a thick, strong back. It allows for a full range of motion and lets each side work independently, helping to correct imbalances.',
    formTips: [
      'Support yourself on a bench with one hand and knee, keeping back flat',
      'Let the dumbbell hang at arm\'s length, elbow slightly bent',
      'Pull the dumbbell up toward your hip, leading with your elbow',
      'Squeeze your lat at the top of the movement for maximum contraction',
      'Lower the weight slowly and fully extend arm at the bottom'
    ],
    commonMistakes: [
      'Rotating the torso excessively — isolate the pulling to one side',
      'Pulling with biceps instead of back — focus on driving elbow back',
      'Not retracting shoulder blade — pull scapula back and down first',
      'Using too much weight and compromising form — start lighter'
    ]
  },
  {
    id: 'overhead-press',
    slug: 'overhead-press',
    name: 'Overhead Press',
    category: 'Shoulders',
    muscles: ['Anterior Deltoids', 'Triceps', 'Upper Chest', 'Core'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'ODwyDtlXnXk',
    image: 'https://images.pexels.com/photos/34669288/pexels-photo-34669288.jpeg',
    description: 'The overhead press is the king of shoulder exercises and a true test of upper body pressing strength. It builds powerful shoulders, strong triceps, and a rock-solid core when performed standing.',
    formTips: [
      'Start with bar at shoulder height, grip slightly wider than shoulder-width',
      'Brace core and squeeze glutes to protect your spine',
      'Press the bar in a straight line, not out in front of you',
      'Once bar passes head, push your head through and shrug shoulders at top',
      'Lower bar back to clavicle level with control'
    ],
    commonMistakes: [
      'Leaning back too much — this turns it into an incline press and strains the lower back',
      'Bar path drifting forward — press straight up and slightly back',
      'Flaring elbows excessively — keep them at 45 degrees from the body',
      'Not locking out fully overhead — extend arms completely at the top'
    ]
  },
  {
    id: 'bicep-curl',
    slug: 'bicep-curl',
    name: 'Dumbbell Bicep Curl',
    category: 'Arms',
    muscles: ['Biceps', 'Brachialis', 'Forearms'],
    difficulty: 'beginner',
    equipment: 'dumbbells',
    youtubeId: 'ykJmrZ5v0Oo',
    image: 'https://images.unsplash.com/photo-1598268030450-7a476f602bf6?w=800&q=80',
    description: 'The dumbbell bicep curl is the classic arm-building exercise. It isolates the biceps for direct stimulation and allows for supination to maximize muscle activation across the full range of motion.',
    formTips: [
      'Stand with dumbbells at sides, palms facing forward',
      'Keep elbows pinned to sides throughout — do not let them drift forward',
      'Curl weight up while rotating wrist outward (supinate) at the top',
      'Squeeze bicep hard at the top of the movement',
      'Lower slowly and fully extend at the bottom for a full stretch'
    ],
    commonMistakes: [
      'Swinging with momentum — slow down and use a weight you can control',
      'Elbows drifting forward — keep them glued to your sides',
      'Not fully extending at the bottom — losing the stretch limits gains',
      'Rushing the lowering phase — the eccentric portion builds muscle too'
    ]
  },
  {
    id: 'tricep-dip',
    slug: 'tricep-dip',
    name: 'Tricep Dip',
    category: 'Arms',
    muscles: ['Triceps', 'Chest', 'Shoulders'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: '6kALZikXxLc',
    image: 'https://images.pexels.com/photos/5496589/pexels-photo-5496589.jpeg',
    description: 'The tricep dip is an excellent bodyweight exercise for building arm and pushing strength. Performed on parallel bars or a chair, it directly targets the triceps and can be scaled from beginner to advanced.',
    formTips: [
      'Place hands on bars or edge of chair, shoulder-width apart',
      'Keep torso upright to target triceps — leaning forward shifts load to chest',
      'Lower body until upper arms are parallel to floor',
      'Press through palms to return to start, fully extending arms',
      'Keep elbows tracking backward, not flaring outward'
    ],
    commonMistakes: [
      'Going too deep — stop when upper arms are parallel to floor to protect shoulder joints',
      'Leaning too far forward — stay upright for maximum tricep emphasis',
      'Elbows flaring outward — keep them pointed behind you',
      'Locking knees with legs extended — start with bent knees'
    ]
  },
  {
    id: 'calf-raise',
    slug: 'calf-raise',
    name: 'Standing Calf Raise',
    category: 'Legs',
    muscles: ['Gastrocnemius', 'Soleus', 'Tibialis Anterior'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'eMTy3qylqnE',
    image: 'https://images.pexels.com/photos/13965339/pexels-photo-13965339.jpeg',
    description: 'The standing calf raise builds strong, defined calf muscles that support ankle stability and explosive power. Done on a step edge, it allows full range of motion from full stretch to full contraction.',
    formTips: [
      'Stand on edge of step with heels hanging off the edge',
      'Lower heels as far as possible for a full stretch',
      'Rise up on toes as high as possible and squeeze calves at top',
      'Hold the top position briefly before lowering',
      'Perform slowly — calves respond well to time under tension'
    ],
    commonMistakes: [
      'Not going through full range of motion — partial reps limit results',
      'Bouncing at the bottom — use the stretch but do not bounce',
      'Going too fast — slow, controlled reps are far more effective',
      'Not holding the top contraction — pause and squeeze for maximum activation'
    ]
  },
  {
    id: 'russian-twist',
    slug: 'russian-twist',
    name: 'Russian Twist',
    category: 'Core',
    muscles: ['Obliques', 'Rectus Abdominis', 'Hip Flexors'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'DJQGX2J4IVw',
    image: 'https://plus.unsplash.com/premium_photo-1663013228045-8921d6e05bd7?w=800&q=80',
    description: 'The Russian twist is a rotational core exercise that specifically targets the obliques. It is excellent for building rotational strength and stability that transfers to sports and everyday movements.',
    formTips: [
      'Sit with knees bent, feet either on floor or elevated for more challenge',
      'Lean back to about 45 degrees, keeping back straight',
      'Clasp hands together and rotate from side to side',
      'Keep core braced throughout — the rotation comes from your waist, not your arms',
      'Add a weight plate or medicine ball to increase difficulty'
    ],
    commonMistakes: [
      'Rounding the back — sit up tall and hinge from the hips',
      'Swinging arms without rotating torso — make sure your core is doing the work',
      'Moving too fast — slow, controlled rotation builds more core strength',
      'Holding breath — maintain steady breathing throughout'
    ]
  },
  {
    id: 'leg-raise',
    slug: 'leg-raise',
    name: 'Lying Leg Raise',
    category: 'Core',
    muscles: ['Lower Abdominals', 'Hip Flexors', 'Core'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'Wp4BlxcFTkE',
    image: 'https://images.pexels.com/photos/6339448/pexels-photo-6339448.jpeg',
    description: 'The lying leg raise is one of the best exercises for targeting the lower portion of the abs. It also builds hip flexor strength important for athletic performance.',
    formTips: [
      'Lie flat on back with hands under lower back or hips for support',
      'Keep legs straight and raise them to 90 degrees',
      'Lower legs slowly without letting them touch the floor',
      'Press lower back into the floor to maximize ab engagement',
      'Breathe out as you raise legs, breathe in as you lower'
    ],
    commonMistakes: [
      'Letting lower back arch off floor — place hands under hips for support',
      'Bending knees excessively — keep legs as straight as possible',
      'Letting feet touch the floor between reps — maintain tension throughout',
      'Using momentum — slow down and make the abs do the work'
    ]
  },
  // {
  //   id: 'superman',
  //   slug: 'superman',
  //   name: 'Superman Hold',
  //   category: 'Back',
  //   muscles: ['Erector Spinae', 'Glutes', 'Hamstrings', 'Rear Deltoids'],
  //   difficulty: 'beginner',
  //   equipment: 'none',
  //   youtubeId: null,
  //   image: 'https://images.unsplash.com/photo-1702138129392-364adea0ad00?w=800&q=80',
  //   description: 'The Superman hold is an excellent exercise for strengthening the lower back and posterior chain. It counteracts the effects of sitting and builds the foundational back strength needed for heavier lifts.',
  //   formTips: [
  //     'Lie face down with arms extended overhead and legs straight',
  //     'Simultaneously raise arms, chest, and legs off the floor',
  //     'Squeeze glutes and back muscles at the top of the movement',
  //     'Hold the raised position for 2-3 seconds before lowering',
  //     'Keep neck neutral — do not strain to look forward'
  //   ],
  //   commonMistakes: [
  //     'Raising only arms or only legs — the movement should be simultaneous',
  //     'Craning neck upward — keep it in line with spine',
  //     'Not holding at the top — the isometric contraction is important',
  //     'Moving too fast — slow, controlled reps with a hold are most effective'
  //   ]
  // },
  {
    id: 'box-jump',
    slug: 'box-jump',
    name: 'Box Jump',
    category: 'Cardio',
    muscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    difficulty: 'intermediate',
    equipment: 'box',
    youtubeId: 'k7dmYdknbac',
    image: 'https://images.pexels.com/photos/7688863/pexels-photo-7688863.jpeg',
    description: 'The box jump is a plyometric exercise that develops explosive power, speed, and athleticism. It trains the fast-twitch muscle fibers in your legs and improves your ability to generate force rapidly.',
    formTips: [
      'Stand about arm\'s length from the box, feet shoulder-width apart',
      'Swing arms back and bend knees to load for the jump',
      'Explode upward, swinging arms forward for momentum',
      'Land softly on the box with both feet, knees bent to absorb impact',
      'Step down carefully rather than jumping down to reduce injury risk'
    ],
    commonMistakes: [
      'Landing with locked knees — always land with soft, bent knees',
      'Landing on only the toes — aim for mid-foot landing',
      'Jumping down from the box — step down to protect your joints',
      'Starting with too high a box — build height gradually'
    ]
  },
  {
    id: 'wall-sit',
    slug: 'wall-sit',
    name: 'Wall Sit',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'cWTZ8Am1Ee0',
    image: 'https://images.pexels.com/photos/6740055/pexels-photo-6740055.jpeg',
    description: 'The wall sit is an isometric exercise that builds tremendous quad strength and muscular endurance. It mimics the seated skiing position and is excellent for athletes and beginners alike.',
    formTips: [
      'Place back flat against wall, slide down until thighs are parallel to floor',
      'Keep knees directly over ankles — not past your toes',
      'Maintain back flat against the wall throughout the hold',
      'Keep arms relaxed at sides or on thighs',
      'Breathe steadily and focus on maintaining position'
    ],
    commonMistakes: [
      'Thighs not parallel to floor — slide down further for proper position',
      'Knees extending past toes — feet need to be further from the wall',
      'Back arching away from wall — press entire back flat',
      'Holding breath — breathe consistently throughout the hold'
    ]
  },

  // ─── NEW HOME WORKOUTS (Bodyweight) ─────────────────────────────────────────
  {
    id: 'high-knees',
    slug: 'high-knees',
    name: 'High Knees',
    category: 'Cardio',
    muscles: ['Hip Flexors', 'Core', 'Calves', 'Quadriceps'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'oDdkytliOqE',
    image: 'https://images.pexels.com/photos/6339342/pexels-photo-6339342.jpeg',
    description: 'High knees are a high-intensity cardio move that doubles as a core and hip flexor strengthener. Drive your knees up rapidly to spike your heart rate and improve running mechanics.',
    formTips: [
      'Stand tall, drive knees up to waist height alternately',
      'Pump arms in opposition to your legs for momentum',
      'Land softly on the balls of your feet',
      'Keep core tight and back straight throughout',
      'Maintain a fast, consistent pace for best cardio effect'
    ],
    commonMistakes: [
      'Not bringing knees high enough — aim for waist height',
      'Leaning back — keep torso upright',
      'Arms not moving — use arm drive to increase speed',
      'Landing on heels — stay on the balls of your feet'
    ]
  },
  {
    id: 'jump-squat',
    slug: 'jump-squat',
    name: 'Jump Squat',
    category: 'Cardio',
    muscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    difficulty: 'intermediate',
    equipment: 'none',
    youtubeId: 'CVaEhXotL7M',
    image: 'https://images.unsplash.com/photo-1675910516854-5bb63390d162?w=800&q=80',
    description: 'The jump squat combines strength and cardio for an explosive lower body exercise. It builds powerful legs, burns serious calories, and improves athletic performance.',
    formTips: [
      'Perform a regular squat, then explode upward into a jump',
      'Swing arms down then up to generate momentum',
      'Reach full extension at the peak of the jump',
      'Land softly with knees bent to absorb impact',
      'Go straight into the next squat with control'
    ],
    commonMistakes: [
      'Not squatting deep enough before jumping',
      'Landing with straight legs — absorb impact through bent knees',
      'Looking down — keep gaze forward for balance',
      'Rushing — prioritize control over speed'
    ]
  },
  {
    id: 'pike-push-up',
    slug: 'pike-push-up',
    name: 'Pike Push-Up',
    category: 'Shoulders',
    muscles: ['Anterior Deltoids', 'Triceps', 'Upper Chest', 'Core'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'x7_I5SUAd00',
    image: 'https://images.pexels.com/photos/4854298/pexels-photo-4854298.jpeg',
    description: 'The pike push-up shifts the push-up angle to target shoulders like a bodyweight overhead press. It is the best progression toward a handstand push-up and builds impressive shoulder strength without equipment.',
    formTips: [
      'Start in downward dog position, hips high and arms straight',
      'Lower the crown of your head toward the floor between your hands',
      'Press back up by driving through palms — think of pushing the floor away',
      'Keep core tight and legs straight throughout',
      'The more vertical your torso, the more shoulder emphasis'
    ],
    commonMistakes: [
      'Hips dropping — keep them high throughout the movement',
      'Head hitting the floor hard — control the descent',
      'Wide elbows — keep them tracking back, not flared out',
      'Not pressing fully — extend arms all the way at the top'
    ]
  },
  {
    id: 'bicycle-crunch',
    slug: 'bicycle-crunch',
    name: 'Bicycle Crunch',
    category: 'Core',
    muscles: ['Obliques', 'Rectus Abdominis', 'Hip Flexors'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: '9FGilxCbdz8',
    image: 'https://images.pexels.com/photos/8038625/pexels-photo-8038625.jpeg',
    description: 'The bicycle crunch is one of the most effective ab exercises scientifically proven to activate the obliques. It combines rotation and leg drive for complete core engagement in a single movement.',
    formTips: [
      'Lie on back with hands lightly behind your head, legs raised',
      'Bring opposite elbow to opposite knee while extending the other leg',
      'Rotate from the torso, not just the elbow',
      'Keep lower back pressed into the floor',
      'Move in a slow, controlled rhythm — quality over speed'
    ],
    commonMistakes: [
      'Pulling on the neck — hands should lightly support, not yank',
      'Twisting only with elbows — rotation must come from core',
      'Rushing the movement — slow reps activate more muscle',
      'Feet touching the floor — keep legs elevated throughout'
    ]
  },
  {
    id: 'side-plank',
    slug: 'side-plank',
    name: 'Side Plank',
    category: 'Core',
    muscles: ['Obliques', 'Glutes', 'Hip Abductors', 'Core'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'iNbH7_edNI8',
    image: 'https://images.pexels.com/photos/2294363/pexels-photo-2294363.jpeg',
    description: 'The side plank is the definitive oblique-strengthening exercise. It builds lateral core stability critical for spine health, athletic performance, and injury prevention.',
    formTips: [
      'Stack feet and raise hips so body forms a straight diagonal line',
      'Keep supporting elbow directly under shoulder',
      'Drive hips upward — do not let them sag toward the floor',
      'Brace obliques and glutes simultaneously',
      'Look straight ahead, not down at the floor'
    ],
    commonMistakes: [
      'Hips sagging — this defeats the purpose; keep them lifted',
      'Shoulder collapsing — press firmly through forearm',
      'Holding breath — breathe steadily throughout the hold',
      'Top hip rotating forward — stay squared and stacked'
    ]
  },
  {
    id: 'flutter-kicks',
    slug: 'flutter-kicks',
    name: 'Flutter Kicks',
    category: 'Core',
    muscles: ['Lower Abdominals', 'Hip Flexors', 'Quadriceps'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'ANVdMDaYRts',
    image: 'https://plus.unsplash.com/premium_photo-1661374885382-08eb6dfe4592?w=800&q=80',
    description: 'Flutter kicks are a continuous lower-ab exercise that builds endurance in the core and hip flexors. Used by military training programs worldwide for good reason — they are brutally effective.',
    formTips: [
      'Lie flat, hands under hips, legs raised a few inches off the floor',
      'Alternate raising each leg 6-12 inches in a scissor motion',
      'Keep lower back pressed into the floor at all times',
      'Keep legs straight and toes pointed',
      'Breathe steadily — do not hold your breath'
    ],
    commonMistakes: [
      'Lower back arching — place hands under hips and press it flat',
      'Bending knees — keep legs straight throughout',
      'Kicking too high — small range of motion is more effective',
      'Holding breath — keep breathing consistently'
    ]
  },
  {
    id: 'donkey-kick',
    slug: 'donkey-kick',
    name: 'Donkey Kick',
    category: 'Legs',
    muscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Core'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'SJ1Xuz9D-ZQ',
    image: 'https://images.pexels.com/photos/3931114/pexels-photo-3931114.jpeg',
    description: 'Donkey kicks are one of the most targeted glute isolation exercises available without equipment. They are perfect for glute activation before heavier lifts or as part of a home workout.',
    formTips: [
      'Start on all fours with wrists under shoulders and knees under hips',
      'Kick one leg straight back and up, keeping the knee bent 90 degrees',
      'Squeeze the glute hard at the top of the movement',
      'Keep hips square to the floor — do not rotate',
      'Return to start under control and repeat on same side'
    ],
    commonMistakes: [
      'Rotating hips upward — keep pelvis neutral and square',
      'Not squeezing glute at top — the contraction is the whole point',
      'Arching the lower back — brace core throughout',
      'Moving too fast — slow reps create better mind-muscle connection'
    ]
  },
  {
    id: 'inchworm',
    slug: 'inchworm',
    name: 'Inchworm',
    category: 'Cardio',
    muscles: ['Full Body', 'Core', 'Hamstrings', 'Shoulders'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'ZY2ji_Ho0dA',
    image: 'https://images.pexels.com/photos/7397794/pexels-photo-7397794.jpeg',
    description: 'The inchworm is a brilliant dynamic warm-up and full-body mobility exercise. It stretches hamstrings, activates shoulders and core, and gets the whole body primed for any workout.',
    formTips: [
      'Stand tall, hinge forward and place hands on the floor',
      'Walk hands out until you reach a plank position',
      'Hold the plank briefly, then walk feet toward hands',
      'Keep legs as straight as possible throughout',
      'Maintain a flat back when lowering and rising'
    ],
    commonMistakes: [
      'Bending knees — straighten them to maximize hamstring stretch',
      'Letting hips sag in plank — brace core and glutes',
      'Rushing — move slowly to feel each stretch',
      'Not reaching full plank — walk hands out far enough'
    ]
  },
  {
    id: 'step-up',
    slug: 'step-up',
    name: 'Step-Up',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'dQqApCGd5Ss',
    image: 'https://images.pexels.com/photos/14623702/pexels-photo-14623702.jpeg',
    description: 'The step-up is a simple but powerful unilateral leg exercise that mimics real-world movement. It builds single-leg strength, balance, and stability while being gentle on the joints.',
    formTips: [
      'Place entire foot on the step — not just the toes',
      'Drive through the heel of the stepping foot to stand up',
      'Keep torso upright and core braced',
      'Avoid pushing off the trailing foot — make the lead leg do all the work',
      'Lower yourself slowly and under control'
    ],
    commonMistakes: [
      'Pushing off the back foot — use only the front leg',
      'Leaning forward excessively — keep chest up',
      'Using too high a step — start with knee-height and progress',
      'Dropping down too quickly — control the descent'
    ]
  },
  {
    id: 'diamond-push-up',
    slug: 'diamond-push-up',
    name: 'Diamond Push-Up',
    category: 'Arms',
    muscles: ['Triceps', 'Inner Chest', 'Anterior Deltoids'],
    difficulty: 'intermediate',
    equipment: 'none',
    youtubeId: 'J0DnG1_S92I',
    image: 'https://images.pexels.com/photos/36764389/pexels-photo-36764389.jpeg',
    description: 'The diamond push-up is the most effective bodyweight tricep exercise. The narrow hand position dramatically increases the load on the triceps and inner chest compared to a standard push-up.',
    formTips: [
      'Form a diamond shape with thumbs and index fingers touching under your chest',
      'Keep elbows tucked close to your sides throughout',
      'Lower chest to your hands while keeping body rigid',
      'Press back up by extending through the triceps',
      'Keep core and glutes tight throughout the movement'
    ],
    commonMistakes: [
      'Flaring elbows out — tuck them close for tricep emphasis',
      'Placing hands too far forward — hands should be under chest',
      'Hips sagging — maintain a rigid plank body position',
      'Partial reps — lower your chest all the way down'
    ]
  },
  {
    id: 'v-up',
    slug: 'v-up',
    name: 'V-Up',
    category: 'Core',
    muscles: ['Rectus Abdominis', 'Hip Flexors', 'Obliques'],
    difficulty: 'intermediate',
    equipment: 'none',
    youtubeId: '7UVgs18Y1P4',
    image: 'https://images.pexels.com/photos/6493586/pexels-photo-6493586.jpeg',
    description: 'The V-Up is a challenging full-range core exercise that simultaneously works upper and lower abs. It requires coordination, flexibility, and core strength to perform correctly.',
    formTips: [
      'Start lying flat with arms extended overhead and legs straight',
      'Simultaneously raise legs and torso to form a V shape',
      'Reach hands toward feet at the top of the movement',
      'Keep legs straight and core engaged throughout',
      'Lower back down with full control'
    ],
    commonMistakes: [
      'Bending knees — keep legs straight for full ab engagement',
      'Using momentum — control every part of the movement',
      'Not fully extending at the bottom — maintain tension throughout',
      'Jerking upward — initiate the movement from the core, not the arms'
    ]
  },
  {
    id: 'single-leg-glute-bridge',
    slug: 'single-leg-glute-bridge',
    name: 'Single Leg Glute Bridge',
    category: 'Legs',
    muscles: ['Glutes', 'Hamstrings', 'Core', 'Hip Abductors'],
    difficulty: 'beginner',
    equipment: 'none',
    youtubeId: 'g_BYB0R-4Ws',
    image: 'https://plus.unsplash.com/premium_photo-1666736570253-92d6bc5599fd?w=800&q=80',
    description: 'The single leg glute bridge isolates one glute at a time, increasing difficulty and helping identify and correct strength imbalances. It is a great progression from the standard glute bridge.',
    formTips: [
      'Lie on your back, one knee bent with foot flat, extend other leg straight',
      'Drive hips up by pressing through the heel of the bent leg',
      'Squeeze glute at the top — do not use lower back to bridge',
      'Keep hips level — do not let one side drop',
      'Hold the top position for a full second before lowering'
    ],
    commonMistakes: [
      'Hips tilting to one side — keep them level throughout',
      'Pressing through toes instead of heel',
      'Arching lower back instead of driving through glute',
      'Letting the floating leg drift — keep it aligned with your body'
    ]
  },
  {
    id: 'bear-crawl',
    slug: 'bear-crawl',
    name: 'Bear Crawl',
    category: 'Cardio',
    muscles: ['Core', 'Shoulders', 'Quadriceps', 'Hip Flexors'],
    difficulty: 'intermediate',
    equipment: 'none',
    youtubeId: 't8XLor7unqU',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    description: 'The bear crawl is a primal movement pattern that builds total-body conditioning, core stability, and coordination. It challenges your body in all planes of motion and requires no equipment whatsoever.',
    formTips: [
      'Start on all fours with knees hovering 1–2 inches off the floor',
      'Move opposite hand and foot simultaneously',
      'Keep hips level and low — do not let them rock side to side',
      'Keep core braced and back flat throughout',
      'Maintain slow, deliberate movement for maximum effect'
    ],
    commonMistakes: [
      'Hips too high — keep them low and level',
      'Moving same-side hand and foot together — use opposite limbs',
      'Dropping knees to the floor — keep them hovering',
      'Rushing — slow movement is harder and more beneficial'
    ]
  },

  // ─── NEW GYM EXERCISES ────────────────────────────────────────────────────────
  {
    id: 'bench-press',
    slug: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    muscles: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'rT7DgCr-3pg',
    image: 'https://images.unsplash.com/photo-1690731033723-ad718c6e585a?w=800&q=80',
    description: 'The barbell bench press is the most popular upper body strength exercise in the gym. It builds a thick, powerful chest and is the cornerstone of any push day or upper body program.',
    formTips: [
      'Grip slightly wider than shoulder-width, with a natural arch in the lower back',
      'Retract shoulder blades and drive them into the bench for a stable base',
      'Lower bar to lower chest in a slight arc — not straight down',
      'Keep feet flat on the floor for leg drive',
      'Press bar back toward the rack in a slight arc at the top'
    ],
    commonMistakes: [
      'Bouncing bar off chest — use full control throughout',
      'Flaring elbows 90 degrees — tuck them to 45-75 degrees',
      'Losing shoulder blade retraction at the bottom — stay tight',
      'Not using leg drive — press feet into floor throughout'
    ]
  },
  {
    id: 'incline-dumbbell-press',
    slug: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    muscles: ['Upper Chest', 'Anterior Deltoids', 'Triceps'],
    difficulty: 'intermediate',
    equipment: 'dumbbells',
    youtubeId: 'DbFgADa2PL8',
    image: 'https://images.pexels.com/photos/18060023/pexels-photo-18060023.jpeg',
    description: 'The incline dumbbell press targets the upper chest — an area often underdeveloped. Dumbbells allow a greater range of motion and a deeper stretch at the bottom compared to the barbell version.',
    formTips: [
      'Set bench to 30-45 degrees — higher angles shift load to shoulders',
      'Lower dumbbells to the sides of upper chest',
      'Press up and slightly in, bringing dumbbells close at the top',
      'Keep shoulder blades retracted and chest up throughout',
      'Feel the stretch at the bottom before pressing back up'
    ],
    commonMistakes: [
      'Bench angle too high — 45+ degrees becomes a shoulder press',
      'Not touching chest level at the bottom — use full range',
      'Dumbbells drifting too wide — keep them in line with chest',
      'Letting shoulders roll forward — maintain retracted scapulae'
    ]
  },
  {
    id: 'lat-pulldown',
    slug: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back',
    muscles: ['Lats', 'Biceps', 'Rear Deltoids', 'Rhomboids'],
    difficulty: 'beginner',
    equipment: 'cable',
    youtubeId: 'CAwf7n6Luuc',
    image: 'https://images.unsplash.com/photo-1534872850130-5355701fcc89?w=800&q=80',
    description: 'The lat pulldown is the go-to machine exercise for building a wide back. It is the best beginner substitute for pull-ups and directly trains the latissimus dorsi for that coveted V-taper.',
    formTips: [
      'Grip slightly wider than shoulder-width, palms facing away',
      'Pull elbows down and back — imagine putting them in your back pockets',
      'Pull bar to upper chest, not behind the neck',
      'Lean back slightly and let your chest rise to meet the bar',
      'Control the weight back up — do not let it yank your arms up'
    ],
    commonMistakes: [
      'Pulling bar behind the neck — this strains the cervical spine',
      'Using too much weight and swinging — strict form beats heavy ego',
      'Pulling with arms only — initiate with lat contraction',
      'Not controlling the return — the eccentric builds muscle too'
    ]
  },
  {
    id: 'seated-cable-row',
    slug: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'Back',
    muscles: ['Rhomboids', 'Lats', 'Biceps', 'Rear Deltoids', 'Traps'],
    difficulty: 'beginner',
    equipment: 'cable',
    youtubeId: 'GZbfZ033f74',
    image: 'https://plus.unsplash.com/premium_photo-1713800445156-d7af22114f7a?w=800&q=80',
    description: 'The seated cable row builds middle back thickness and improves posture by strengthening the rhomboids and traps. The cable provides constant tension throughout the entire movement.',
    formTips: [
      'Sit tall with knees slightly bent, maintain neutral spine',
      'Retract shoulder blades first, then pull elbows back',
      'Drive elbows behind your body and squeeze the back hard at the finish',
      'Allow a full stretch by letting shoulder blades protract at the front',
      'Keep chest up — do not round forward to reach the attachment'
    ],
    commonMistakes: [
      'Rounding forward to reach the handle — only torso movement allowed',
      'Pulling with biceps instead of back — lead with shoulder blade retraction',
      'Not reaching full stretch at the front — limit your range of motion gains',
      'Leaning back excessively — use your back, not body momentum'
    ]
  },
  {
    id: 'leg-press',
    slug: 'leg-press',
    name: 'Leg Press',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'beginner',
    equipment: 'machine',
    youtubeId: 'GvRgijoJ2xY',
    image: 'https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg',
    description: 'The leg press is a machine-based compound leg exercise that lets you overload the quadriceps safely. It is excellent for building leg mass and for those who cannot squat due to mobility or injury.',
    formTips: [
      'Place feet shoulder-width apart, mid-to-upper platform',
      'Lower platform until knees reach 90 degrees or slightly below',
      'Press through the heels, not toes, back to start',
      'Keep lower back in contact with the seat pad throughout',
      'Do not lock out knees at the top — maintain slight bend'
    ],
    commonMistakes: [
      'Feet too low — this excessive knee travel can cause injury',
      'Letting knees cave inward — push knees out in line with toes',
      'Full lockout at the top — keep tension on the muscle',
      'Lowering too far with lower back lifting off the seat'
    ]
  },
  {
    id: 'romanian-deadlift',
    slug: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'Legs',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Traps'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'JCXUYuzwNrM',
    image: 'https://images.pexels.com/photos/5209197/pexels-photo-5209197.jpeg',
    description: 'The Romanian deadlift is one of the best exercises for developing hamstring length, strength, and flexibility. The hip hinge pattern carries over to nearly every athletic movement and lift.',
    formTips: [
      'Stand with bar at hip height, soft bend in knees',
      'Hinge at hips, pushing them back as you lower the bar',
      'Keep bar close to body throughout — it should drag down your thighs',
      'Lower until you feel a deep hamstring stretch (mid-shin for most)',
      'Drive hips forward to stand, squeezing glutes at the top'
    ],
    commonMistakes: [
      'Bending knees too much — this becomes a squat, not an RDL',
      'Rounding upper back — maintain neutral spine throughout',
      'Bar drifting away — keep it in contact with legs',
      'Not going low enough — aim for a full hamstring stretch'
    ]
  },
  {
    id: 'barbell-hip-thrust',
    slug: 'barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    category: 'Legs',
    muscles: ['Glutes', 'Hamstrings', 'Core', 'Quadriceps'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'SEdqd1n0cvg',
    image: 'https://images.pexels.com/photos/13122465/pexels-photo-13122465.jpeg',
    description: 'The barbell hip thrust is the most effective exercise for isolating and maximally loading the glutes. Research consistently shows it produces greater glute activation than squats or deadlifts.',
    formTips: [
      'Rest upper back on bench edge, barbell over hip crease with padding',
      'Plant feet hip-width apart so shins are vertical at the top',
      'Drive hips up until thighs are parallel to floor — squeeze hard',
      'Keep chin tucked and core braced — do not hyperextend lower back',
      'Lower under control for a full stretch before the next rep'
    ],
    commonMistakes: [
      'Hyperextending lower back at the top — squeeze glutes, not lower back',
      'Feet too close or far — adjust until shins are vertical at peak',
      'Not reaching full hip extension — get hips to parallel height',
      'Chin up or neck craning — keep chin tucked throughout'
    ]
  },
  {
    id: 'leg-curl',
    slug: 'leg-curl',
    name: 'Lying Leg Curl',
    category: 'Legs',
    muscles: ['Hamstrings', 'Gastrocnemius'],
    difficulty: 'beginner',
    equipment: 'machine',
    youtubeId: 'Orxowest56U',
    image: 'https://plus.unsplash.com/premium_photo-1661601953380-1638ddf23596?w=800&q=80',
    description: 'The lying leg curl is the most direct hamstring isolation exercise. It trains the hamstrings through knee flexion — a function often neglected by compound exercises that focus on hip extension.',
    formTips: [
      'Lie face down with the pad just above your heels',
      'Curl heels toward glutes through the full range of motion',
      'Squeeze hamstrings hard at the top — pause for a moment',
      'Lower the weight slowly — the eccentric phase is crucial',
      'Keep hips in contact with the pad throughout'
    ],
    commonMistakes: [
      'Hips rising off the pad — reduce weight and control the movement',
      'Partial reps — go through the full range for full development',
      'Rushing the lowering phase — slow eccentrics build more mass',
      'Too much weight — hamstrings need to feel the full contraction'
    ]
  },
  {
    id: 'skull-crusher',
    slug: 'skull-crusher',
    name: 'Skull Crusher',
    category: 'Arms',
    muscles: ['Triceps', 'Anconeus'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'l3WBhEUf_Sg',
    image: 'https://images.pexels.com/photos/6478667/pexels-photo-6478667.jpeg',
    description: 'The skull crusher (lying tricep extension) is one of the best exercises for building tricep mass. It loads the long head of the tricep — the largest portion — through a long range of motion.',
    formTips: [
      'Lie on bench, grip EZ-bar or barbell with overhand grip',
      'Keep elbows pointing straight up — do not let them flare out',
      'Lower bar toward forehead by bending only at the elbows',
      'Extend back to start, fully locking out the triceps',
      'Keep upper arms perpendicular to the floor throughout'
    ],
    commonMistakes: [
      'Elbows flaring out — keep them pointing straight up',
      'Moving upper arms — only the forearms should move',
      'Lowering to the neck instead of forehead — stay controlled',
      'Using too much weight — ego lifting with poor form strains elbows'
    ]
  },
  {
    id: 'cable-pushdown',
    slug: 'cable-pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'Arms',
    muscles: ['Triceps', 'Lateral Head', 'Medial Head'],
    difficulty: 'beginner',
    equipment: 'cable',
    youtubeId: 'kiuVA0gs3EI',
    image: 'https://images.pexels.com/photos/17559311/pexels-photo-17559311.jpeg',
    description: 'The cable tricep pushdown is a staple arm exercise that isolates all three heads of the tricep. The cable maintains constant tension throughout the movement, making it superior to free weights for isolation.',
    formTips: [
      'Stand close to the cable, elbows tucked at sides',
      'Push the attachment down until arms are fully extended',
      'Squeeze triceps hard at full extension',
      'Allow hands to come up until forearms are parallel to floor',
      'Keep upper arms stationary — only forearms move'
    ],
    commonMistakes: [
      'Elbows drifting away from sides — keep them pinned',
      'Leaning over the cable to use body momentum',
      'Not fully extending at the bottom — get a complete contraction',
      'Going too heavy — lighter weight with full range beats heavy partials'
    ]
  },
  {
    id: 'hammer-curl',
    slug: 'hammer-curl',
    name: 'Hammer Curl',
    category: 'Arms',
    muscles: ['Brachialis', 'Brachioradialis', 'Biceps'],
    difficulty: 'beginner',
    equipment: 'dumbbells',
    youtubeId: 'zC3nLlEvin4',
    image: 'https://images.pexels.com/photos/5327469/pexels-photo-5327469.jpeg',
    description: 'The hammer curl uses a neutral grip to emphasize the brachialis — a muscle that sits beneath the bicep and can significantly increase arm thickness. It also builds strong forearms and better grip.',
    formTips: [
      'Hold dumbbells with a neutral (thumbs up) grip',
      'Keep elbows pinned to sides throughout',
      'Curl weight up with palms facing inward the whole time',
      'Squeeze at the top and lower slowly',
      'Alternate arms or do both simultaneously'
    ],
    commonMistakes: [
      'Rotating wrists — keep the neutral grip throughout',
      'Swinging — elbows stay locked at your sides',
      'Not going through full range — extend fully at the bottom',
      'Too heavy a weight — control matters more than load here'
    ]
  },
  {
    id: 'lateral-raise',
    slug: 'lateral-raise',
    name: 'Lateral Raise',
    category: 'Shoulders',
    muscles: ['Lateral Deltoids', 'Supraspinatus', 'Upper Traps'],
    difficulty: 'beginner',
    equipment: 'dumbbells',
    youtubeId: 'FeJP-TFewrc',
    image: 'https://images.pexels.com/photos/12600523/pexels-photo-12600523.jpeg',
    description: 'The lateral raise is the single best exercise for building wider, rounder shoulders. It directly isolates the lateral deltoid — the part of the shoulder responsible for width — and cannot be effectively trained any other way.',
    formTips: [
      'Hold dumbbells at sides with a slight bend in elbows',
      'Raise arms out to shoulder height, leading with your elbows',
      'Tilt pinkies slightly up at the top — like pouring a glass of water',
      'Pause at shoulder height before lowering slowly',
      'Lower in twice the time it takes to raise — slow eccentrics matter'
    ],
    commonMistakes: [
      'Swinging and using momentum — strict form, lighter weight',
      'Raising above shoulder height — puts unnecessary load on AC joint',
      'Not tilting pinkies up slightly — this maximizes lateral delt activation',
      'Too heavy — shoulders need high reps with proper control'
    ]
  },
  {
    id: 'face-pull',
    slug: 'face-pull',
    name: 'Face Pull',
    category: 'Shoulders',
    muscles: ['Rear Deltoids', 'Rhomboids', 'Rotator Cuff', 'Traps'],
    difficulty: 'beginner',
    equipment: 'cable',
    youtubeId: 'eIq5CB9JfKE',
    image: 'https://images.pexels.com/photos/35529263/pexels-photo-35529263.jpeg',
    description: 'The face pull is one of the most important exercises for shoulder health and posture. It strengthens the rear delts and rotator cuff — muscles chronically underdeveloped by pressing-dominant programs.',
    formTips: [
      'Set cable to face height with rope attachment',
      'Pull rope toward your face, separating the ends toward your ears',
      'Lead with elbows flared high and out',
      'Externally rotate at the top — hands finish beside your ears',
      'Keep elbows above wrists throughout the movement'
    ],
    commonMistakes: [
      'Elbows dropping low — keep them flared high and wide',
      'Not separating the rope at the end — external rotation is key',
      'Too heavy — this is a health exercise, not an ego lift',
      'Pulling to the neck instead of face — aim between forehead and nose'
    ]
  },
  {
    id: 'cable-fly',
    slug: 'cable-fly',
    name: 'Cable Fly',
    category: 'Chest',
    muscles: ['Pectorals', 'Anterior Deltoids', 'Biceps'],
    difficulty: 'beginner',
    equipment: 'cable',
    youtubeId: '4YWvHGHqJos',
    image: 'https://plus.unsplash.com/premium_photo-1663036928517-a612859220b7?w=800&q=80',
    description: 'The cable fly provides constant tension throughout the full range of motion — something dumbbells cannot do. It is one of the best exercises for isolating the chest and achieving a deep stretch and peak contraction.',
    formTips: [
      'Set cables slightly above shoulder height for mid-chest emphasis',
      'Start with arms extended out to sides, slight bend in elbows',
      'Bring hands together in front of chest in an arc — like hugging a tree',
      'Squeeze chest at the center for a full second',
      'Return to start slowly, feeling the stretch across the pecs'
    ],
    commonMistakes: [
      'Bending elbows too much — this becomes a row, not a fly',
      'Using arms to pull instead of chest — think about squeezing your pecs together',
      'Rushing the return — the eccentric stretch is where growth happens',
      'Standing too far from machine — maintain slight tension at full stretch'
    ]
  },
  // {
  //   id: 'arnold-press',
  //   slug: 'arnold-press',
  //   name: 'Arnold Press',
  //   category: 'Shoulders',
  //   muscles: ['All Three Deltoid Heads', 'Triceps', 'Upper Traps'],
  //   difficulty: 'intermediate',
  //   equipment: 'dumbbells',
  //   youtubeId: 'vj2w851ZHRM',
  //   image: 'https://plus.unsplash.com/premium_photo-1754473911374-9b5af438e321?w=800&q=80',
  //   description: 'The Arnold Press was popularized by Arnold Schwarzenegger and trains all three deltoid heads in a single movement thanks to its rotation. It builds complete, full-looking shoulders.',
  //   formTips: [
  //     'Start with dumbbells at chin height, palms facing you',
  //     'Rotate palms outward as you press upward',
  //     'Finish with palms facing forward at full arm extension',
  //     'Reverse the rotation on the way down to return to start',
  //     'Keep core tight and avoid excessive lower back arch'
  //   ],
  //   commonMistakes: [
  //     'Not rotating fully — the full rotation is what makes this exercise unique',
  //     'Leaning back excessively — keep the torso upright',
  //     'Rushing the movement — slow rotation builds more muscle',
  //     'Too much weight — the rotation demands control over heavy load'
  //   ]
  // },
  {
    id: 'bent-over-row',
    slug: 'bent-over-row',
    name: 'Barbell Bent Over Row',
    category: 'Back',
    muscles: ['Lats', 'Rhomboids', 'Traps', 'Biceps', 'Lower Back'],
    difficulty: 'intermediate',
    equipment: 'barbell',
    youtubeId: 'FWJR5Ve8bnQ',
    image: 'https://images.pexels.com/photos/5837302/pexels-photo-5837302.jpeg',
    description: 'The barbell bent over row is one of the most effective mass-building back exercises. It builds thickness across the entire back and is a staple in any serious strength and muscle building program.',
    formTips: [
      'Hinge to about 45 degrees, maintaining a neutral spine',
      'Pull bar to your lower chest/upper abdomen — not to your waist',
      'Lead with elbows driving back, squeezing shoulder blades together',
      'Keep bar close to the body throughout — do not let it drift',
      'Lower bar with control, allowing a full stretch at the bottom'
    ],
    commonMistakes: [
      'Rounding the lower back — brace core hard before each rep',
      'Using momentum to swing the bar up — strict reps build more muscle',
      'Pulling to the wrong height — aim for lower chest, not belly button',
      'Not retracting scapulae at the top — squeeze the back hard'
    ]
  },
]
