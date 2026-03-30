export const workouts = [
  {
    id: 'full-body-beginner-30',
    title: 'Full Body Blast',
    goal: 'strength',
    duration: 30,
    level: 'beginner',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    description: 'A complete full-body workout that requires zero equipment. Perfect for beginners looking to build foundational strength and develop healthy exercise habits from the comfort of home.',
    exercises: [
      { exerciseId: 'squat', sets: 3, reps: '10', rest: 60 },
      { exerciseId: 'push-up', sets: 3, reps: '8-10', rest: 60 },
      { exerciseId: 'lunge', sets: 3, reps: '10 each leg', rest: 60 },
      { exerciseId: 'plank', sets: 3, reps: '30 sec', rest: 45 },
      { exerciseId: 'glute-bridge', sets: 3, reps: '12', rest: 45 }
    ]
  },
  {
    id: 'cardio-burn-20',
    title: 'Cardio Burn',
    goal: 'cardio',
    duration: 20,
    level: 'beginner',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80',
    description: 'A fast-paced bodyweight cardio workout designed to torch calories and improve cardiovascular fitness. No equipment needed — just energy and determination.',
    exercises: [
      { exerciseId: 'jumping-jack', sets: 3, reps: '30 sec', rest: 30 },
      { exerciseId: 'mountain-climber', sets: 3, reps: '30 sec', rest: 30 },
      { exerciseId: 'burpee', sets: 3, reps: '8', rest: 45 },
      { exerciseId: 'jumping-jack', sets: 3, reps: '30 sec', rest: 30 },
      { exerciseId: 'mountain-climber', sets: 3, reps: '30 sec', rest: 30 }
    ]
  },
  {
    id: 'core-crusher-15',
    title: 'Core Crusher',
    goal: 'strength',
    duration: 15,
    level: 'beginner',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
    description: 'A targeted 15-minute core workout that will fire up your abs, obliques, and lower back. Great as a standalone session or as a finisher after any other workout.',
    exercises: [
      { exerciseId: 'plank', sets: 3, reps: '45 sec', rest: 30 },
      { exerciseId: 'russian-twist', sets: 3, reps: '20 total', rest: 30 },
      { exerciseId: 'leg-raise', sets: 3, reps: '12', rest: 30 },
      { exerciseId: 'mountain-climber', sets: 3, reps: '20 sec', rest: 30 },
      { exerciseId: 'superman', sets: 3, reps: '10', rest: 30 }
    ]
  },
  {
    id: 'dumbbell-strength-45',
    title: 'Dumbbell Strength Builder',
    goal: 'strength',
    duration: 45,
    level: 'intermediate',
    equipment: 'dumbbells',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
    description: 'A comprehensive dumbbell workout targeting all major muscle groups. This balanced program will help you build lean muscle, increase strength, and improve overall body composition.',
    exercises: [
      { exerciseId: 'dumbbell-row', sets: 4, reps: '10 each side', rest: 60 },
      { exerciseId: 'overhead-press', sets: 4, reps: '10', rest: 60 },
      { exerciseId: 'bicep-curl', sets: 3, reps: '12', rest: 45 },
      { exerciseId: 'tricep-dip', sets: 3, reps: '12', rest: 45 },
      { exerciseId: 'lunge', sets: 3, reps: '10 each', rest: 60 },
      { exerciseId: 'calf-raise', sets: 3, reps: '15', rest: 30 }
    ]
  },
  {
    id: 'gym-power-60',
    title: 'Gym Power Session',
    goal: 'muscle',
    duration: 60,
    level: 'advanced',
    equipment: 'gym',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80',
    description: 'A heavy-hitting gym workout built around compound lifts. This session is designed to maximize muscle growth and strength gains using the big three movements plus accessory work.',
    exercises: [
      { exerciseId: 'squat', sets: 5, reps: '5', rest: 180 },
      { exerciseId: 'deadlift', sets: 4, reps: '5', rest: 180 },
      { exerciseId: 'overhead-press', sets: 4, reps: '8', rest: 120 },
      { exerciseId: 'pull-up', sets: 4, reps: '6-8', rest: 120 },
      { exerciseId: 'dumbbell-row', sets: 3, reps: '10 each', rest: 90 }
    ]
  },
  {
    id: 'fat-burn-hiit-20',
    title: 'Fat Burn HIIT',
    goal: 'weight-loss',
    duration: 20,
    level: 'intermediate',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
    description: 'High-intensity interval training designed for maximum calorie burn. Alternating between intense effort and short rest periods keeps your metabolism elevated long after the workout ends.',
    exercises: [
      { exerciseId: 'burpee', sets: 4, reps: '10', rest: 30 },
      { exerciseId: 'mountain-climber', sets: 4, reps: '40 sec', rest: 20 },
      { exerciseId: 'jumping-jack', sets: 4, reps: '40 sec', rest: 20 },
      { exerciseId: 'squat', sets: 4, reps: '15', rest: 30 },
      { exerciseId: 'push-up', sets: 4, reps: '10', rest: 30 }
    ]
  },
  {
    id: 'flexibility-flow-30',
    title: 'Flexibility Flow',
    goal: 'flexibility',
    duration: 30,
    level: 'beginner',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    description: 'A gentle but effective flexibility and mobility workout combining static holds with dynamic movement. Perfect for active recovery days, stress relief, and improving range of motion.',
    exercises: [
      { exerciseId: 'glute-bridge', sets: 3, reps: '30 sec hold', rest: 30 },
      { exerciseId: 'superman', sets: 3, reps: '10', rest: 30 },
      { exerciseId: 'lunge', sets: 2, reps: '30 sec hold each', rest: 30 },
      { exerciseId: 'plank', sets: 3, reps: '30 sec', rest: 30 },
      { exerciseId: 'wall-sit', sets: 3, reps: '45 sec', rest: 30 }
    ]
  },
  {
    id: 'push-pull-legs-45',
    title: 'Push Pull Legs',
    goal: 'muscle',
    duration: 45,
    level: 'intermediate',
    equipment: 'gym',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    description: 'A classic push-pull-legs split condensed into a single balanced session. This workout hits all major movement patterns, ensuring complete muscular development and maximum training efficiency.',
    exercises: [
      { exerciseId: 'push-up', sets: 4, reps: '12-15', rest: 60 },
      { exerciseId: 'overhead-press', sets: 4, reps: '10', rest: 90 },
      { exerciseId: 'pull-up', sets: 4, reps: '8', rest: 90 },
      { exerciseId: 'dumbbell-row', sets: 3, reps: '12 each', rest: 60 },
      { exerciseId: 'squat', sets: 4, reps: '10', rest: 90 },
      { exerciseId: 'lunge', sets: 3, reps: '10 each', rest: 60 }
    ]
  },
  {
    id: 'upper-body-blast-30',
    title: 'Upper Body Blast',
    goal: 'strength',
    duration: 30,
    level: 'intermediate',
    equipment: 'dumbbells',
    image: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=800&q=80',
    description: 'A focused upper body workout using dumbbells to build chest, back, shoulders, and arms. This efficient 30-minute session delivers maximum upper body stimulus with minimal time investment.',
    exercises: [
      { exerciseId: 'push-up', sets: 4, reps: '12', rest: 60 },
      { exerciseId: 'dumbbell-row', sets: 4, reps: '10 each', rest: 60 },
      { exerciseId: 'overhead-press', sets: 3, reps: '10', rest: 60 },
      { exerciseId: 'bicep-curl', sets: 3, reps: '12', rest: 45 },
      { exerciseId: 'tricep-dip', sets: 3, reps: '12', rest: 45 }
    ]
  },
  {
    id: 'leg-day-intense-45',
    title: 'Leg Day Intensive',
    goal: 'muscle',
    duration: 45,
    level: 'intermediate',
    equipment: 'gym',
    image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?w=800&q=80',
    description: 'A comprehensive leg day workout that leaves no muscle untouched. Squats, lunges, glute work, and explosive training combine for a complete lower body session you will feel for days.',
    exercises: [
      { exerciseId: 'squat', sets: 4, reps: '8', rest: 120 },
      { exerciseId: 'lunge', sets: 3, reps: '12 each', rest: 90 },
      { exerciseId: 'glute-bridge', sets: 4, reps: '15', rest: 60 },
      { exerciseId: 'calf-raise', sets: 4, reps: '20', rest: 45 },
      { exerciseId: 'wall-sit', sets: 3, reps: '60 sec', rest: 60 },
      { exerciseId: 'box-jump', sets: 3, reps: '8', rest: 90 }
    ]
  },
  {
    id: 'quick-morning-15',
    title: 'Quick Morning Energizer',
    goal: 'cardio',
    duration: 15,
    level: 'beginner',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
    description: 'A fast 15-minute morning routine to wake up your body and get your blood flowing. No equipment needed, and it can be done right next to your bed. Start every day strong.',
    exercises: [
      { exerciseId: 'jumping-jack', sets: 2, reps: '30 sec', rest: 15 },
      { exerciseId: 'push-up', sets: 2, reps: '8', rest: 30 },
      { exerciseId: 'squat', sets: 2, reps: '10', rest: 30 },
      { exerciseId: 'mountain-climber', sets: 2, reps: '20 sec', rest: 20 },
      { exerciseId: 'plank', sets: 2, reps: '20 sec', rest: 20 }
    ]
  },
  {
    id: 'bodyweight-strength-60',
    title: 'Bodyweight Strength Master',
    goal: 'strength',
    duration: 60,
    level: 'advanced',
    equipment: 'none',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
    description: 'A challenging 60-minute bodyweight workout that proves you do not need a gym to build serious strength. High volume, controlled tempo, and progressive movements will push your limits.',
    exercises: [
      { exerciseId: 'push-up', sets: 5, reps: '20', rest: 60 },
      { exerciseId: 'pull-up', sets: 5, reps: '10', rest: 90 },
      { exerciseId: 'squat', sets: 5, reps: '20', rest: 60 },
      { exerciseId: 'plank', sets: 4, reps: '60 sec', rest: 45 },
      { exerciseId: 'burpee', sets: 4, reps: '12', rest: 60 },
      { exerciseId: 'tricep-dip', sets: 4, reps: '15', rest: 60 },
      { exerciseId: 'lunge', sets: 4, reps: '15 each', rest: 60 }
    ]
  }
]
