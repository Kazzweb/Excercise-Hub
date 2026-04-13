'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Dumbbell,
  Target,
  XCircle,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { workouts } from './data/workouts';
import { exercises } from './data/exercises';
import { programs } from './data/programs';
import WorkoutCard from './components/WorkoutCard';
import ExerciseCard from './components/ExerciseCard';
import ProgramCard from './components/ProgramCard';
import FilterStrip from './components/FilterStrip';
import HorizontalScroll from './components/HorizontalScroll';
import RandomWorkoutButton from './components/RandomWorkoutButton';
import SectionHeader from './components/SectionHeader';
import LevelBadge from './components/LevelBadge';

const goalQuickLinks = [
  { label: 'Strength', value: 'strength' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Muscle', value: 'muscle' },
  { label: 'Flexibility', value: 'flexibility' },
];

const howItWorks = [
  {
    num: '01',
    icon: <Target className='w-5 h-5' />,
    title: 'Choose Your Goal',
    desc: 'Pick from strength, cardio, weight loss, flexibility, or muscle building. Filter by time and equipment.',
  },
  {
    num: '02',
    icon: <Flame className='w-5 h-5' />,
    title: 'Get Your Workout',
    desc: 'We instantly match you with the perfect workout, or hit shuffle for a random surprise.',
  },
  {
    num: '03',
    icon: <Dumbbell className='w-5 h-5' />,
    title: 'Start Moving',
    desc: 'Follow along with built-in timer, set tracking, rest periods, and exercise form tips.',
  },
];

const commonMistakes = [
  {
    title: 'Knee Cave on Squats',
    tip: 'Push knees outward to track over toes. Strengthening glutes and hip abductors prevents this.',
    exerciseSlug: 'squat',
  },
  {
    title: 'Rounding Lower Back in Deadlifts',
    tip: 'Brace core hard before lifting. Keep chest tall and bar close to body throughout the movement.',
    exerciseSlug: 'deadlift',
  },
  {
    title: 'Sagging Hips in Plank',
    tip: 'Squeeze glutes and brace abs simultaneously. If hips drop, take a break and reset with proper tension.',
    exerciseSlug: 'plank',
  },
];

/* Editorial columns — workouts grouped by goal */
const editorialCols = [
  {
    label: 'Strength',
    workouts: workouts.filter((w) => w.goal === 'strength').slice(0, 4),
  },
  {
    label: 'Cardio',
    workouts: workouts
      .filter((w) => w.goal === 'cardio' || w.goal === 'weight-loss')
      .slice(0, 4),
  },
  {
    label: 'Muscle & Flex',
    workouts: workouts
      .filter((w) => w.goal === 'muscle' || w.goal === 'flexibility')
      .slice(0, 4),
  },
];

function WorkoutFilterSection() {
  const [filters, setFilters] = useState({
    goal: 'all',
    time: 'all',
    equipment: 'all',
  });

  const filtered = workouts.filter((w) => {
    if (filters.goal !== 'all' && w.goal !== filters.goal) return false;
    if (filters.time !== 'all' && String(w.duration) !== filters.time)
      return false;
    if (filters.equipment !== 'all' && w.equipment !== filters.equipment)
      return false;
    return true;
  });

  return (
    <section className='bg-zinc-950/50 border-y border-zinc-800/50 relative overflow-hidden'>
      {/* Decorative gradient blob */}
      <div className='absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none' />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10'>
        <SectionHeader
          title='Browse All Workouts'
          subtitle='Filter by goal, duration, and available equipment.'
          cta='View All'
          ctaHref='/workout'
        />
        <div className='mb-6'>
          <FilterStrip filters={filters} onChange={setFilters} />
        </div>
        <p className='text-sm mb-6 uppercase tracking-widest font-semibold text-zinc-500'>
          {filtered.length} workout{filtered.length !== 1 ? 's' : ''} found
        </p>
        {filtered.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filtered.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className='text-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800/30 backdrop-blur-sm'>
            <Dumbbell className='w-12 h-12 mx-auto mb-4 text-zinc-700' />
            <p className='text-lg font-semibold text-zinc-400'>
              No workouts match your filters
            </p>
            <button
              onClick={() =>
                setFilters({ goal: 'all', time: 'all', equipment: 'all' })
              }
              className='mt-4 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors'
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  const featuredWorkout = workouts[0];

  return (
    <div className='bg-zinc-950 min-h-screen text-zinc-100 font-sans'>
      {/* ── HERO ───────────────────────── */}
      <section className='relative pt-8 pb-16 overflow-hidden'>
        {/* Background glow for premium feel */}
        <div className='absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none' />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]'>
            {/* Left: Text Content */}
            <div className='flex flex-col justify-center order-2 lg:order-1 pt-12 lg:pt-0'>
              {/* <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-orange-500 text-xs font-bold uppercase tracking-widest mb-8 w-fit shadow-sm backdrop-blur-md">
                <Flame className="w-3.5 h-3.5" /> Free &bull; No Signup Required
              </div> */}

              <h1 className='fade-up-2 font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white mb-6'>
                NO{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500'>
                  EXCUSES.
                </span>
                <br />
                START NOW.
              </h1>

              <p className='fade-up-3 text-lg text-zinc-400 leading-relaxed max-w-lg mb-10 font-medium'>
                Free workouts matched in seconds. No gym, no equipment, no
                barriers. Pick your goal and transform your life today.
              </p>

              <div className='flex flex-wrap items-center gap-4 fade-up-3 mb-10'>
                <Link href='/workout' className='btn-primary'>
                  Generate Workout
                </Link>
                <RandomWorkoutButton workouts={workouts} />
              </div>

              {/* Quick links */}
              <div className='flex items-center gap-4 flex-wrap fade-up-4'>
                <span className='text-xs uppercase tracking-widest text-zinc-600 font-bold mr-2'>
                  Quick Pick:
                </span>
                {goalQuickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={`/workout?goal=${item.value}`}
                    className='text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors'
                  >
                    {item.label} &rarr;
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Image Hero */}
            <div className='relative order-1 lg:order-2 h-full min-h-[400px] lg:min-h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-500/10 border border-zinc-800/50'>
              <Image
                src='https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80'
                alt='Athlete training'
                fill
                className='object-cover object-center'
                priority
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent' />
              <div className='absolute bottom-8 left-8 right-8'>
                <div className='bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/30'>
                      <Target className='w-6 h-6' />
                    </div>
                    <div>
                      <h4 className='text-white font-bold tracking-tight'>
                        Personalized For You
                      </h4>
                      <p className='text-zinc-300 text-sm'>
                        Over 50+ exercises combined for maximum results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS FOOTER ────────────────────────────── */}
      <div className='border-y border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/50'>
            {[
              {
                num: '50',
                suffix: '+',
                highlight: true,
                label: 'Exercises in Library',
              },
              { num: '12', suffix: '', label: 'Curated Workouts' },
              { num: '3', suffix: '', label: 'Full Programs' },
            ].map((stat) => (
              <div
                key={stat.label}
                className='py-8 text-center flex flex-col justify-center'
              >
                <div className='font-display text-4xl sm:text-5xl font-black mb-2 tracking-tight'>
                  <span
                    className={
                      stat.highlight ? 'text-orange-500' : 'text-white'
                    }
                  >
                    {stat.num}
                  </span>
                  <span
                    className={
                      stat.highlight ? 'text-orange-500' : 'text-zinc-500'
                    }
                  >
                    {stat.suffix}
                  </span>
                </div>
                <div className='text-xs text-zinc-400 tracking-widest uppercase font-bold'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDITORIAL COLUMNS ────────────────────────────── */}
      <section className='py-20 bg-zinc-950 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-baseline justify-between mb-12'>
            <h2 className='font-display text-3xl font-bold text-white tracking-tight'>
              Browse Quick Collections
            </h2>
            <span className='text-xs text-zinc-500 uppercase tracking-widest font-bold hidden sm:inline-block'>
              Curated by goal
            </span>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {editorialCols.map((col) => (
              <div
                key={col.label}
                className='bg-zinc-900/40 rounded-3xl p-6 border border-zinc-800/50 shadow-sm transition hover:shadow-lg hover:border-zinc-700/50'
              >
                <div className='flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80'>
                  <span className='font-display font-bold text-xl text-white uppercase tracking-wide'>
                    {col.label}
                  </span>
                  <span className='text-xs text-zinc-500 tracking-widest font-bold'>
                    {String(col.workouts.length).padStart(2, '0')}
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  {col.workouts.map((w) => (
                    <Link
                      key={w.id}
                      href={`/workout/${w.id}`}
                      className='group flex flex-col p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-700/50'
                    >
                      <div className='font-bold text-zinc-200 group-hover:text-white transition-colors mb-2'>
                        {w.title}
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-zinc-500 font-semibold capitalize'>
                          {w.equipment} &bull; {w.level}
                        </span>
                        <span className='text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md'>
                          {w.duration} min
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORKOUT ──────────────────────────────── */}
      <section className='py-20 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            title='Featured Workout'
            subtitle='Start here if you are not sure where to begin.'
          />

          <div className='grid grid-cols-1 lg:grid-cols-5 bg-zinc-900/30 rounded-[2.5rem] overflow-hidden border border-zinc-800/50 shadow-2xl transition hover:shadow-orange-500/5 hover:border-zinc-700/50'>
            {/* Image */}
            <div className='relative lg:col-span-2 min-h-[300px] lg:min-h-full'>
              <Image
                src={featuredWorkout.image}
                alt={featuredWorkout.title}
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 40vw'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/90 lg:to-transparent lg:bg-gradient-to-t' />
            </div>

            {/* Content */}
            <div className='p-8 sm:p-12 lg:col-span-3 flex flex-col justify-center relative'>
              <div className='flex items-center gap-3 mb-6'>
                <LevelBadge level={featuredWorkout.level} />
                <span className='px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full border border-orange-500/20 uppercase tracking-wider'>
                  Featured
                </span>
              </div>

              <h3 className='font-display text-4xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tight'>
                {featuredWorkout.title}
              </h3>
              <p className='mb-8 text-zinc-400 text-lg'>
                {featuredWorkout.description}
              </p>

              {/* Stats */}
              <div className='flex flex-wrap items-center gap-6 mb-8'>
                <div className='flex items-center gap-2 text-sm font-semibold text-zinc-300'>
                  <div className='p-2 bg-zinc-800 rounded-full text-orange-500'>
                    <Clock className='w-4 h-4' />
                  </div>
                  {featuredWorkout.duration} min
                </div>
                <div className='flex items-center gap-2 text-sm font-semibold text-zinc-300 capitalize'>
                  <div className='p-2 bg-zinc-800 rounded-full text-orange-500'>
                    <Dumbbell className='w-4 h-4' />
                  </div>
                  {featuredWorkout.equipment}
                </div>
                <div className='flex items-center gap-2 text-sm font-semibold text-zinc-300 capitalize'>
                  <div className='p-2 bg-zinc-800 rounded-full text-orange-500'>
                    <Target className='w-4 h-4' />
                  </div>
                  {featuredWorkout.goal}
                </div>
              </div>

              {/* Exercise list excerpt */}
              <div className='mb-8 bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50'>
                {featuredWorkout.exercises.slice(0, 3).map((ex, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between py-3 border-b border-zinc-800/80 last:border-0 last:pb-0 first:pt-0'
                  >
                    <div className='flex items-center gap-4'>
                      <span className='w-8 h-8 rounded-full flex items-center justify-center bg-orange-500/10 text-orange-500 font-bold text-sm shadow-sm'>
                        {i + 1}
                      </span>
                      <span className='font-semibold text-zinc-200 capitalize'>
                        {ex.exerciseId.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <span className='text-sm font-bold text-zinc-500 bg-zinc-800 px-3 py-1 rounded-lg'>
                      {ex.sets} × {ex.reps}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/workout/${featuredWorkout.id}`}
                className='btn-primary w-fit flex items-center gap-2'
              >
                Start This Workout <ChevronRight className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER + WORKOUT GRID ─────────────────────────── */}
      <WorkoutFilterSection />

      {/* ── PROGRAMS ─────────────────────────────────────── */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            title='Training Programs'
            subtitle='Structured multi-week programs. Follow the plan, see the results.'
            cta='View All Programs'
            ctaHref='/programs'
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className='py-24 bg-zinc-900/20 border-y border-zinc-800/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            title='How It Works'
            subtitle='From zero to workout in under 60 seconds.'
          />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {howItWorks.map((step, idx) => (
              <div
                key={step.num}
                className='bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg shadow-black/20'
              >
                <div className='flex items-start justify-between mb-8'>
                  <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-inner shadow-white/20'>
                    {step.icon}
                  </div>
                  <span className='font-display text-5xl font-black text-zinc-800/80 leading-none'>
                    {step.num}
                  </span>
                </div>
                <h3 className='font-bold text-xl text-white mb-3 tracking-wide'>
                  {step.title}
                </h3>
                <p className='text-zinc-400 leading-relaxed font-medium'>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXERCISE LIBRARY ──────────────────────────────── */}
      <section className='py-24 overflow-hidden relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            title='Exercise Library'
            subtitle='Learn proper form with video guides for every exercise.'
            cta='View Full Library'
            ctaHref='/exercises'
          />
          <HorizontalScroll>
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className='shrink-0 w-64 md:w-72 pl-4 first:pl-0'
              >
                <ExerciseCard exercise={exercise} />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── SURPRISE CTA BANNER ───────────────────────────── */}
      <section className='py-12'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='relative overflow-hidden p-12 lg:p-20 text-center rounded-[3rem] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl shadow-orange-500/10'>
            <div className='absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-lg shadow-orange-500/50' />
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none' />

            <div className='text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6'>
              What Should I Do Today?
            </div>
            <h2 className='font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight'>
              Not sure
              <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500'>
                where to start?
              </span>
            </h2>
            <p className='text-lg text-zinc-400 max-w-md mx-auto mb-10 font-medium'>
              Hit shuffle and get moving — no planning required. Let's build
              momentum.
            </p>
            <div className='flex flex-col items-center gap-6'>
              <RandomWorkoutButton workouts={workouts} />
              <Link
                href='/today'
                className='text-sm font-bold text-zinc-500 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400'
              >
                Or tell us how you feel today &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────── */}
      <section className='py-24 bg-zinc-900/30 border-t border-zinc-800/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            title='Avoid These Mistakes'
            subtitle='Small form fixes make a huge difference in results and injury prevention.'
          />
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {commonMistakes.map((mistake) => (
              <div
                key={mistake.title}
                className='bg-zinc-900/80 rounded-3xl p-8 border border-zinc-800/50 relative overflow-hidden group hover:border-zinc-700/50 transition-colors shadow-lg shadow-black/20'
              >
                <div className='absolute top-0 left-0 bottom-0 w-1.5 bg-zinc-800 group-hover:bg-orange-500 transition-colors' />

                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-3'>
                    <XCircle className='w-6 h-6 text-orange-500 shrink-0' />
                    <h3 className='font-bold text-lg text-white tracking-wide'>
                      {mistake.title}
                    </h3>
                  </div>
                  <p className='text-zinc-400 leading-relaxed font-medium'>
                    {mistake.tip}
                  </p>
                  <Link
                    href={`/exercises/${mistake.exerciseSlug}`}
                    className='mt-2 inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors'
                  >
                    Watch proper form <ChevronRight className='w-4 h-4' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className='py-32 border-t border-zinc-800/50 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/80' />
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
          <div className='w-16 h-1 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-10 shadow-lg shadow-orange-500/50' />
          <h2 className='font-display text-5xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-6'>
            READY TO START YOUR
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500'>
              FITNESS JOURNEY?
            </span>
          </h2>
          <p className='text-xl text-zinc-400 mb-12 font-medium'>
            No gym, no excuses, no barriers. Start moving today and feel the
            difference.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
            <Link
              href='/programs'
              className='btn-primary w-full sm:w-auto text-center px-10 py-4 text-base'
            >
              View Programs
            </Link>
            <Link
              href='/workout'
              className='btn-ghost w-full sm:w-auto text-center px-10 py-4 text-base bg-zinc-900/50 backdrop-blur-sm'
            >
              Browse Workouts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
