import Image from 'next/image'
import Link from 'next/link'
import { Clock, Dumbbell } from 'lucide-react'
import LevelBadge from './LevelBadge'

const goalClass = {
  strength:     'goal-strength',
  'weight-loss':'goal-weight-loss',
  cardio:       'goal-cardio',
  flexibility:  'goal-flexibility',
  muscle:       'goal-muscle',
}

const goalLabel = {
  strength:     'Strength',
  'weight-loss':'Weight Loss',
  cardio:       'Cardio',
  flexibility:  'Flexibility',
  muscle:       'Muscle',
}

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card group flex flex-col overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'var(--surface-2)' }}>
        <Image
          src={workout.image}
          alt={workout.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.7) 0%, transparent 60%)' }} />

        {/* Goal tag */}
        <div className="absolute top-3 right-3">
          <span className={`pill ${goalClass[workout.goal] || 'goal-strength'}`}>
            {goalLabel[workout.goal] || workout.goal}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <LevelBadge level={workout.level} />
          <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
            {workout.exercises.length} ex
          </span>
        </div>

        <div>
          <h3
            className="font-bold text-lg leading-tight group-hover:transition-colors"
            style={{ color: 'var(--text)' }}
          >
            {workout.title}
          </h3>
          <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-2)' }}>
            {workout.description}
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex items-center gap-4 mt-auto pt-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
            <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            {workout.duration} min
          </div>
          <div className="flex items-center gap-1.5 text-xs capitalize" style={{ color: 'var(--text-2)' }}>
            <Dumbbell className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            {workout.equipment}
          </div>
          <span
            className="ml-auto text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all"
            style={{ color: 'var(--accent)' }}
          >
            Go →
          </span>
        </div>
      </div>
    </Link>
  )
}
