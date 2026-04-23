import Image from 'next/image'
import Link from 'next/link'
import { Check, Calendar, Zap } from 'lucide-react'
import LevelBadge from './LevelBadge'

export default function ProgramCard({ program }) {
  const displayBenefits = program.benefits.slice(0, 3)

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="card group flex flex-col overflow-hidden rounded-2xl shadow-lg"
    >
      <div className="relative h-52 overflow-hidden bg-zinc-800">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <LevelBadge level={program.level} />
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-[rgba(6,6,10,0.8)] text-zinc-400 border border-zinc-700 rounded-sm">
            <Calendar className="w-3 h-3" />
            {program.duration}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-bold text-xl leading-tight text-white">
            {program.title}
          </h3>
          <p className="text-sm mt-1 text-zinc-400">{program.subtitle}</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Zap className="w-3.5 h-3.5 text-orange-500" />
          <span className="capitalize">{program.goal.replace('-', ' ')}</span>
        </div>

        <ul className="flex flex-col gap-2 flex-1">
          {displayBenefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
              <Check className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 mt-1 border-t border-zinc-800">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-orange-500 group-hover:gap-2.5 transition-all">
            View Program →
          </span>
        </div>
      </div>
    </Link>
  )
}
