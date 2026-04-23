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
      <div className="relative h-40 overflow-hidden bg-zinc-800">
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <span className="text-xs font-semibold px-2 py-0.5 bg-[rgba(6,6,10,0.9)] text-zinc-400 border border-zinc-700 rounded-sm">
            {exercise.category}
          </span>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm leading-tight text-white">
          {exercise.name}
        </h3>

        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`w-1.5 h-1.5 rounded-full ${dot <= filledDots ? 'bg-orange-500' : 'bg-zinc-700'}`}
              />
            ))}
          </div>
          <span className="text-xs capitalize text-zinc-500">
            {exercise.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}
