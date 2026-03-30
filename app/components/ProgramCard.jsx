import Image from 'next/image'
import Link from 'next/link'
import { Check, Calendar, Zap, Dumbbell } from 'lucide-react'
import LevelBadge from './LevelBadge'

const goalColors = {
  strength: 'text-blue-400',
  'weight-loss': 'text-red-400',
  cardio: 'text-green-400',
  flexibility: 'text-purple-400',
  muscle: 'text-orange-400',
}

export default function ProgramCard({ program }) {
  const displayBenefits = program.benefits.slice(0, 3)

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/40 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-0.5"
    >
      {/* Image with gradient overlay */}
      <div className="relative h-52 overflow-hidden bg-zinc-800">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <LevelBadge level={program.level} />
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-900/80 text-zinc-300 border border-zinc-700 backdrop-blur-sm">
            <Calendar className="w-3 h-3" />
            {program.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="text-white font-bold text-xl leading-tight group-hover:text-orange-400 transition-colors">
            {program.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1">{program.subtitle}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <Zap className={`w-3.5 h-3.5 ${goalColors[program.goal] || 'text-orange-400'}`} />
            <span className="capitalize">{program.goal.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs capitalize">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500" />
            <span>{program.equipment}</span>
          </div>
        </div>

        {/* Benefits */}
        <ul className="flex flex-col gap-1.5 flex-1">
          {displayBenefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
              <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-2 pt-3 border-t border-zinc-800">
          <span className="inline-flex items-center gap-1 text-orange-500 font-semibold text-sm group-hover:text-orange-400 transition-colors">
            View Program
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
