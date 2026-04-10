import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top: Brand + links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
              <div
                className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:-rotate-12 bg-orange-500 rounded-lg shadow-lg shadow-orange-500/20"
              >
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">
                FIT<span className="text-orange-500">START</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Start moving. No excuses.
            </p>
            <p className="text-xs mt-2 text-zinc-500 font-semibold tracking-wide">
              Free workouts for everyone, everywhere.
            </p>
          </div>

          {/* Workouts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">
              Workouts
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Generator', href: '/workout' },
                { label: 'Programs', href: '/programs' },
                { label: 'Today', href: '/today' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exercises */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">
              Exercises
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Library', href: '/exercises' },
                { label: 'By Muscle Group', href: '/exercises?muscle=Legs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#disclaimer"
                  className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80">
          <p className="text-xs text-center sm:text-left text-zinc-500 max-w-2xl" id="disclaimer">
            Not medical advice. Consult a doctor before starting any exercise program. This app is for inspirational and educational purposes only.
          </p>
          <p className="text-xs shrink-0 font-semibold text-zinc-500">
            &copy; {new Date().getFullYear()} FitStart
          </p>
        </div>
      </div>
    </footer>
  )
}
