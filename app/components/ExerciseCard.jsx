import Image from 'next/image'
import Link from 'next/link'

const difficultyDots = { beginner: 1, intermediate: 2, advanced: 3 }

export default function ExerciseCard({ exercise }) {
  const filledDots = difficultyDots[exercise.difficulty] || 1

  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="card group flex flex-col overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden" style={{ background: 'var(--surface-2)' }}>
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.75) 0%, transparent 55%)' }}
        />
        <div className="absolute bottom-2 left-2">
          <span
            className="text-xs font-semibold px-2 py-0.5"
            style={{ background: 'rgba(6,6,10,0.9)', color: 'var(--text-2)', border: '1px solid var(--border-2)', borderRadius: '2px' }}
          >
            {exercise.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3
          className="font-semibold text-sm leading-tight"
          style={{ color: 'var(--text)' }}
        >
          {exercise.name}
        </h3>

        {/* Difficulty dots */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: dot <= filledDots ? 'var(--accent)' : 'var(--border-2)' }}
              />
            ))}
          </div>
          <span className="text-xs capitalize" style={{ color: 'var(--text-3)' }}>
            {exercise.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}
