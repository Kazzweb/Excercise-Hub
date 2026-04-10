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
      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ background: 'var(--surface-2)' }}>
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.85) 0%, rgba(6,6,10,0.2) 60%, transparent 100%)' }}
        />

        {/* Bottom-left badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <LevelBadge level={program.level} />
          <span
            className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5"
            style={{ background: 'rgba(6,6,10,0.8)', color: 'var(--text-2)', border: '1px solid var(--border-2)', borderRadius: '2px' }}
          >
            <Calendar className="w-3 h-3" />
            {program.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3
            className="font-bold text-xl leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {program.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
            {program.subtitle}
          </p>
        </div>

        {/* Goal tag */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
          <Zap className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
          <span className="capitalize">{program.goal.replace('-', ' ')}</span>
        </div>

        {/* Benefits */}
        <ul className="flex flex-col gap-2 flex-1">
          {displayBenefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
              <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="pt-3 mt-1" style={{ borderTop: '1px solid var(--border)' }}>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest group-hover:gap-2.5 transition-all"
            style={{ color: 'var(--accent)' }}
          >
            View Program →
          </span>
        </div>
      </div>
    </Link>
  )
}
