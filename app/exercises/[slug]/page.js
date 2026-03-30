import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Check, XCircle, ChevronLeft } from 'lucide-react'
import { exercises } from '../../data/exercises'
import LevelBadge from '../../components/LevelBadge'
import MuscleTag from '../../components/MuscleTag'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import HorizontalScroll from '../../components/HorizontalScroll'
import ExerciseCard from '../../components/ExerciseCard'

export async function generateStaticParams() {
  return exercises.map((e) => ({ slug: e.slug }))
}

const equipmentColors = {
  none: 'bg-green-500/20 text-green-400 border-green-500/30',
  barbell: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  dumbbells: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'pull-up bar': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  box: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  cable: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  machine: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  gym: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
}

export default async function ExerciseDetailPage({ params }) {
  const { slug } = await params
  const exercise = exercises.find((e) => e.slug === slug)

  if (!exercise) notFound()

  const related = exercises
    .filter((e) => e.slug !== slug && e.category === exercise.category)
    .slice(0, 6)

  const difficultyDots = { beginner: 1, intermediate: 2, advanced: 3 }
  const filledDots = difficultyDots[exercise.difficulty] || 1

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/exercises"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Exercise Library
        </Link>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="relative h-72 sm:h-80">
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-zinc-950/50 to-zinc-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-10">
          {/* Category + Equipment */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 bg-zinc-800/80 text-zinc-300 border border-zinc-700 rounded-full backdrop-blur-sm">
              {exercise.category}
            </span>
            <LevelBadge level={exercise.difficulty} />
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${equipmentColors[exercise.equipment] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
              {exercise.equipment}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {exercise.name}
          </h1>

          {/* Muscles */}
          <div className="flex flex-wrap gap-2 mb-4">
            {exercise.muscles.map((muscle) => (
              <MuscleTag key={muscle} muscle={muscle} />
            ))}
          </div>

          {/* Difficulty dots */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-zinc-500 text-sm">Difficulty:</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className={`w-3 h-3 rounded-full ${dot <= filledDots ? 'bg-orange-500' : 'bg-zinc-700'}`}
                />
              ))}
            </div>
            <span className="text-zinc-400 text-sm capitalize">{exercise.difficulty}</span>
          </div>

          <p className="text-zinc-300 text-lg max-w-3xl leading-relaxed">
            {exercise.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Video */}
          {exercise.youtubeId && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Form Video</h2>
              <YouTubeEmbed
                videoId={exercise.youtubeId}
                title={`${exercise.name} form guide`}
              />
            </div>
          )}

          {/* Form tips */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Form Tips</h2>
            <ul className="space-y-3">
              {exercise.formTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 bg-zinc-900 rounded-xl p-3.5 border border-zinc-800">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common mistakes */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Common Mistakes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exercise.commonMistakes.map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-zinc-300 text-sm leading-relaxed">{mistake}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Muscle groups visual */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Muscles Worked</h2>
          <div className="flex flex-wrap gap-3">
            {exercise.muscles.map((muscle) => (
              <div key={muscle} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-zinc-300 text-sm font-medium">{muscle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related exercises */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6">
              More {exercise.category} Exercises
            </h2>
            <HorizontalScroll>
              {related.map((ex) => (
                <div key={ex.id} className="shrink-0 w-48">
                  <ExerciseCard exercise={ex} />
                </div>
              ))}
            </HorizontalScroll>
          </div>
        )}
      </div>
    </div>
  )
}
