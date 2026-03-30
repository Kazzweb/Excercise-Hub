import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Dumbbell, ChevronLeft, Check, Zap } from 'lucide-react'
import { programs } from '../../data/programs'
import { workouts } from '../../data/workouts'
import LevelBadge from '../../components/LevelBadge'
import ProgressTracker from '../../components/ProgressTracker'

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

const goalColors = {
  strength: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'weight-loss': 'bg-red-500/20 text-red-400 border-red-500/30',
  cardio: 'bg-green-500/20 text-green-400 border-green-500/30',
  flexibility: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  muscle: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

export default async function ProgramDetailPage({ params }) {
  const { slug } = await params
  const program = programs.find((p) => p.slug === slug)

  if (!program) notFound()

  const getWorkout = (id) => workouts.find((w) => w.id === id)

  // Chunk schedule into weeks of 7
  const weeks = []
  for (let i = 0; i < program.schedule.length; i += 7) {
    weeks.push(program.schedule.slice(i, i + 7))
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          All Programs
        </Link>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="relative h-80 sm:h-96">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/50 to-zinc-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10 pb-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <LevelBadge level={program.level} />
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-zinc-800/80 text-zinc-300 border border-zinc-700 rounded-full backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5" />
              {program.duration}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${goalColors[program.goal] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                {program.goal.replace('-', ' ')}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-zinc-800/80 text-zinc-300 border border-zinc-700 rounded-full capitalize backdrop-blur-sm">
              <Dumbbell className="w-3.5 h-3.5" />
              {program.equipment}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
            {program.title}
          </h1>
          <p className="text-orange-400 font-medium text-lg mb-4">{program.subtitle}</p>
          <p className="text-zinc-400 text-base max-w-2xl leading-relaxed">
            {program.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: schedule */}
          <div className="lg:col-span-2 space-y-10">
            {/* Benefits */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What You Will Gain</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly schedule */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Program Schedule</h2>
              <div className="space-y-8">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx}>
                    <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-3">
                      Week {weekIdx + 1}
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                      {week.map((day) => {
                        const workout = day.workoutId ? getWorkout(day.workoutId) : null
                        return (
                          <div
                            key={day.day}
                            className={`flex flex-col items-center text-center p-2 rounded-xl border min-h-[80px] ${
                              day.type === 'rest'
                                ? 'bg-zinc-800/30 border-zinc-800 text-zinc-600'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-orange-500/40 transition-colors'
                            }`}
                          >
                            <span className="text-xs font-bold text-zinc-500 mb-1">{day.label}</span>
                            {day.type === 'rest' ? (
                              <>
                                <span className="text-xl">💤</span>
                                <span className="text-[10px] text-zinc-600 mt-1">Rest</span>
                              </>
                            ) : workout ? (
                              <Link href={`/workout/${workout.id}`} className="flex flex-col items-center gap-1 group w-full">
                                <span className="text-lg">🔥</span>
                                <span className="text-[10px] text-orange-400 group-hover:text-orange-300 transition-colors leading-tight">
                                  {day.focus}
                                </span>
                              </Link>
                            ) : (
                              <>
                                <span className="text-lg">🏋️</span>
                                <span className="text-[10px] leading-tight mt-1">{day.focus}</span>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: progress tracker */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-6">Track Your Progress</h2>
                <ProgressTracker programId={program.id} schedule={program.schedule} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
