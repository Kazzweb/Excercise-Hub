import Link from 'next/link'

export default function SectionHeader({ title, subtitle, cta, ctaHref }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-zinc-400 text-sm sm:text-base max-w-xl">{subtitle}</p>
        )}
      </div>
      {cta && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-400 font-medium text-sm transition-colors shrink-0"
        >
          {cta}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}
