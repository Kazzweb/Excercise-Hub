import Link from 'next/link'

export default function SectionHeader({ title, subtitle, cta, ctaHref }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-12">
      <div className="max-w-2xl">
        <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-5 shadow-sm shadow-orange-500/20" />
        <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white font-black">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {cta && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors shrink-0 group uppercase tracking-widest"
        >
          {cta}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}
