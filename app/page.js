'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Zap, Clock, Dumbbell, Target, Users, BookOpen, ChevronRight, XCircle, Flame, TrendingUp } from 'lucide-react'
import { workouts } from './data/workouts'
import { exercises } from './data/exercises'
import { programs } from './data/programs'
import WorkoutCard from './components/WorkoutCard'
import ExerciseCard from './components/ExerciseCard'
import ProgramCard from './components/ProgramCard'
import FilterStrip from './components/FilterStrip'
import HorizontalScroll from './components/HorizontalScroll'
import RandomWorkoutButton from './components/RandomWorkoutButton'
import SectionHeader from './components/SectionHeader'
import LevelBadge from './components/LevelBadge'

const goalQuickLinks = [
  { label: 'Full Body', value: 'strength', emoji: '💪' },
  { label: 'Cardio', value: 'cardio', emoji: '🏃' },
  { label: 'Core', value: 'strength', emoji: '🎯' },
  { label: 'Strength', value: 'strength', emoji: '🏋️' },
  { label: 'Flexibility', value: 'flexibility', emoji: '🧘' },
]

const howItWorks = [
  {
    num: '01',
    icon: <Target className="w-6 h-6 text-orange-500" />,
    title: 'Choose Your Goal',
    desc: 'Pick from strength, cardio, weight loss, flexibility, or muscle building. Filter by time and equipment available.',
  },
  {
    num: '02',
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    title: 'Get Your Workout',
    desc: 'We instantly match you with the perfect workout from our library, or surprise you with a random pick.',
  },
  {
    num: '03',
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    title: 'Start Moving',
    desc: 'Follow the guided workout with built-in timer, set tracking, rest periods, and exercise form tips.',
  },
]

const commonMistakes = [
  {
    title: 'Knee Cave on Squats',
    tip: 'Push knees outward to track over toes. Strengthening glutes and hip abductors prevents this.',
    exerciseSlug: 'squat',
    color: 'border-red-500/30 bg-red-500/5',
  },
  {
    title: 'Rounding Lower Back in Deadlifts',
    tip: 'Brace core hard before lifting. Keep chest tall and bar close to body throughout the movement.',
    exerciseSlug: 'deadlift',
    color: 'border-red-500/30 bg-red-500/5',
  },
  {
    title: 'Sagging Hips in Plank',
    tip: 'Squeeze glutes and brace abs simultaneously. If hips drop, take a break and reset with proper tension.',
    exerciseSlug: 'plank',
    color: 'border-red-500/30 bg-red-500/5',
  },
]

function WorkoutFilterSection() {
  const [filters, setFilters] = useState({ goal: 'all', time: 'all', equipment: 'all' })

  const filtered = workouts.filter((w) => {
    if (filters.goal !== 'all' && w.goal !== filters.goal) return false
    if (filters.time !== 'all' && String(w.duration) !== filters.time) return false
    if (filters.equipment !== 'all' && w.equipment !== filters.equipment) return false
    return true
  })

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Find Your Workout"
        subtitle="Filter by goal, duration, and available equipment to find the perfect workout for you."
        cta="View All Workouts"
        ctaHref="/workout"
      />
      <div className="mb-6">
        <FilterStrip filters={filters} onChange={setFilters} />
      </div>
      <p className="text-zinc-500 text-sm mb-6">
        {filtered.length} workout{filtered.length !== 1 ? 's' : ''} found
      </p>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500">
          <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium text-zinc-400">No workouts match</p>
          <p className="text-sm mt-1">Try different filters</p>
          <button
            onClick={() => setFilters({ goal: 'all', time: 'all', equipment: 'all' })}
            className="mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}

export default function HomePage() {
  const featuredWorkout = workouts[0]

  return (
    <div className="bg-zinc-950">
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
            alt="Gym background"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Flame className="w-3.5 h-3.5" />
            Free Workouts — No Signup Required
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Start Your Workout.{' '}
            <span className="gradient-text">Right Now.</span>
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            No gym membership. No expensive equipment. No excuses. Get matched with the perfect workout in seconds — free, forever.
          </p>

          {/* Quick goal pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {goalQuickLinks.map((item) => (
              <Link
                key={item.label}
                href={`/workout?goal=${item.value}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm font-medium rounded-full transition-all duration-150 backdrop-blur-sm"
              >
                <span>{item.emoji}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/workout"
              className="flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-colors btn-glow"
            >
              <Zap className="w-5 h-5" />
              Generate My Workout
            </Link>
            <RandomWorkoutButton workouts={workouts} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
          <div className="w-px h-8 bg-zinc-700 rounded-full" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 divide-x divide-zinc-800 text-center">
            <div className="px-4">
              <p className="text-3xl font-black text-white">50+</p>
              <p className="text-zinc-400 text-sm mt-0.5">Exercises</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-black text-white">12</p>
              <p className="text-zinc-400 text-sm mt-0.5">Workouts Ready</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-black text-white">3</p>
              <p className="text-zinc-400 text-sm mt-0.5">Beginner Programs</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED WORKOUT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          title="Featured Workout"
          subtitle="Start here if you are not sure where to begin."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
          {/* Image */}
          <div className="relative min-h-64 lg:min-h-0">
            <Image
              src={featuredWorkout.image}
              alt={featuredWorkout.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/20 lg:bg-gradient-to-r" />
            <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <LevelBadge level={featuredWorkout.level} />
              <span className="text-orange-500 text-sm font-semibold">Featured</span>
            </div>

            <h3 className="text-3xl font-black text-white mb-2">{featuredWorkout.title}</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">{featuredWorkout.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{featuredWorkout.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400 text-sm capitalize">
                <Dumbbell className="w-4 h-4 text-orange-500" />
                <span>{featuredWorkout.equipment}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                <Target className="w-4 h-4 text-orange-500" />
                <span className="capitalize">{featuredWorkout.goal}</span>
              </div>
            </div>

            {/* First 3 exercises */}
            <div className="mb-6 space-y-2">
              {featuredWorkout.exercises.slice(0, 3).map((ex, i) => {
                const exData = exercises.find((e) => e.id === ex.exerciseId)
                return (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-zinc-300 text-sm font-medium">{exData?.name || ex.exerciseId}</span>
                    </div>
                    <span className="text-zinc-500 text-xs">{ex.sets} × {ex.reps}</span>
                  </div>
                )
              })}
              {featuredWorkout.exercises.length > 3 && (
                <p className="text-zinc-500 text-xs pt-1">
                  +{featuredWorkout.exercises.length - 3} more exercises
                </p>
              )}
            </div>

            <Link
              href={`/workout/${featuredWorkout.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20 self-start"
            >
              Start This Workout
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FILTER + WORKOUT GRID ── */}
      <WorkoutFilterSection />

      {/* ── PROGRAMS ── */}
      <section className="bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionHeader
            title="Beginner Programs"
            subtitle="Structured multi-week programs that take the guesswork out of training. Follow the plan, see the results."
            cta="View All Programs"
            ctaHref="/programs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          title="How It Works"
          subtitle="From zero to workout in under 60 seconds."
        />
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            {howItWorks.map((step) => (
              <div key={step.num} className="p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black text-zinc-800">{step.num}</span>
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXERCISE SPOTLIGHT ── */}
      <section className="bg-zinc-900/30 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Exercise Library"
            subtitle="Learn proper form with video guides for every exercise in your program."
            cta="View Full Library →"
            ctaHref="/exercises"
          />
          <HorizontalScroll>
            {exercises.map((exercise) => (
              <div key={exercise.id} className="shrink-0 w-48">
                <ExerciseCard exercise={exercise} />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── SURPRISE CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-10 sm:p-16 text-center shadow-2xl shadow-orange-500/20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-white/80" />
              <span className="text-white/80 font-semibold uppercase text-sm tracking-wider">What Should I Do Today?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Not sure where to start?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Let us pick a workout for you. Hit the button and get moving — no planning required.
            </p>
            <div className="flex flex-col items-center gap-4">
              <RandomWorkoutButton workouts={workouts} />
              <Link
                href="/today"
                className="text-orange-100 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
              >
                Or tell us how you feel today →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ── */}
      <section className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Avoid These Common Mistakes"
            subtitle="Small form fixes make a huge difference in results and injury prevention."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {commonMistakes.map((mistake) => (
              <div
                key={mistake.title}
                className={`p-6 rounded-xl border ${mistake.color} hover:border-red-500/50 transition-colors`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <h3 className="text-white font-semibold">{mistake.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{mistake.tip}</p>
                <Link
                  href={`/exercises/${mistake.exerciseSlug}`}
                  className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-400 text-xs font-semibold transition-colors"
                >
                  Learn proper form <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Ready to start your fitness journey?
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
          Join thousands of people who chose to start today. No gym, no excuses, no barriers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/programs"
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-xl shadow-orange-500/20"
          >
            View Beginner Programs
          </Link>
          <Link
            href="/workout"
            className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold rounded-xl transition-colors"
          >
            Browse Workouts
          </Link>
        </div>
      </section>
    </div>
  )
}
