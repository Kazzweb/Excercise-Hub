import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Dumbbell, Target, ChevronLeft } from 'lucide-react'
import { workouts } from '../../data/workouts'
import { exercises } from '../../data/exercises'
import LevelBadge from '../../components/LevelBadge'
import WorkoutCard from '../../components/WorkoutCard'
import WorkoutDetailClient from './WorkoutDetailClient'

export async function generateStaticParams() {
  return workouts.map((w) => ({ id: w.id }))
}

const goalLabels = {
  strength: 'Strength',
  'weight-loss': 'Weight Loss',
  cardio: 'Cardio',
  flexibility: 'Flexibility',
  muscle: 'Muscle Building',
}

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params
  const workout = workouts.find((w) => w.id === id)

  if (!workout) notFound()

  const related = workouts
    .filter((w) => w.id !== id && (w.goal === workout.goal || w.level === workout.level))
    .slice(0, 3)

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/workout"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Workouts
        </Link>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="relative h-72 sm:h-96">
          <Image
            src={workout.image}
            alt={workout.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/40 to-zinc-950" />
        </div>

        {/* Hero content positioned over image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <LevelBadge level={workout.level} />
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-zinc-800/80 text-zinc-300 border border-zinc-700 rounded-full backdrop-blur-sm">
              {goalLabels[workout.goal] || workout.goal}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {workout.title}
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mb-6 leading-relaxed">
            {workout.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-zinc-300">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Duration</p>
                <p className="text-sm font-semibold">{workout.duration} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Equipment</p>
                <p className="text-sm font-semibold capitalize">{workout.equipment}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Exercises</p>
                <p className="text-sm font-semibold">{workout.exercises.length} movements</p>
              </div>
            </div>
          </div>

          {/* Client: start button + exercise list */}
          <WorkoutDetailClient
            workout={workout}
            exercises={exercises}
            relatedWorkouts={related}
          />
        </div>
      </div>

      {/* Related workouts */}
      {related.length > 0 && (
        <section className="bg-zinc-900/50 border-t border-zinc-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">Related Workouts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((w) => (
                <WorkoutCard key={w.id} workout={w} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
