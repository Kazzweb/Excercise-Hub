import Image from 'next/image'
import Link from 'next/link'
import { Clock, Dumbbell, Target } from 'lucide-react'
import LevelBadge from './LevelBadge'

const goalLabels = {
  strength: 'Strength',
  'weight-loss': 'Weight Loss',
  cardio: 'Cardio',
  flexibility: 'Flexibility',
  muscle: 'Muscle',
}

const goalColors = {
  strength: 'bg-blue-500/20 text-blue-400',
  'weight-loss': 'bg-red-500/20 text-red-400',
  cardio: 'bg-green-500/20 text-green-400',
  flexibility: 'bg-purple-500/20 text-purple-400',
  muscle: 'bg-orange-500/20 text-orange-400',
}

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/30 hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer shadow-lg card-glow hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-zinc-800">
        <Image
          src={workout.image}
          alt={workout.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
        {/* Goal tag */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${goalColors[workout.goal] || goalColors.strength} backdrop-blur-sm`}>
            {goalLabels[workout.goal] || workout.goal}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Level + Title */}
        <div className="flex items-start justify-between gap-2">
          <LevelBadge level={workout.level} />
        </div>

        <div>
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-400 transition-colors">
            {workout.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
            {workout.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-auto pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs capitalize">
            <Dumbbell className="w-3.5 h-3.5 text-orange-500" />
            <span>{workout.equipment}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs ml-auto">
            <Target className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-orange-500 font-medium">{workout.exercises.length} exercises</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-orange-500 text-sm font-semibold group-hover:text-orange-400 transition-colors">
            Start Workout →
          </span>
        </div>
      </div>
    </Link>
  )
}
