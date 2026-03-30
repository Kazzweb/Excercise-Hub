import Image from 'next/image'
import Link from 'next/link'

const difficultyDots = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
}

const equipmentColors = {
  none: 'bg-green-500/20 text-green-400',
  barbell: 'bg-blue-500/20 text-blue-400',
  dumbbells: 'bg-purple-500/20 text-purple-400',
  'pull-up bar': 'bg-orange-500/20 text-orange-400',
  box: 'bg-yellow-500/20 text-yellow-400',
  cable: 'bg-cyan-500/20 text-cyan-400',
  machine: 'bg-rose-500/20 text-rose-400',
  gym: 'bg-indigo-500/20 text-indigo-400',
  bench: 'bg-teal-500/20 text-teal-400',
}

export default function ExerciseCard({ exercise }) {
  const filledDots = difficultyDots[exercise.difficulty] || 1

  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="group flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/30 hover:bg-zinc-800/80 transition-all duration-200 shadow-lg card-glow hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-zinc-800">
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />

        {/* Category badge bottom-left */}
        <div className="absolute bottom-2 left-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-900/90 text-zinc-300 border border-zinc-700 backdrop-blur-sm">
            {exercise.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-orange-400 transition-colors">
          {exercise.name}
        </h3>

        {/* Difficulty dots */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 text-xs">Difficulty:</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot <= filledDots ? 'bg-orange-500' : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>
          <span className="text-zinc-500 text-xs capitalize">{exercise.difficulty}</span>
        </div>

        {/* Equipment pill */}
        <div className="mt-auto">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${equipmentColors[exercise.equipment] || 'bg-zinc-700 text-zinc-400'}`}>
            {exercise.equipment}
          </span>
        </div>
      </div>
    </Link>
  )
}
