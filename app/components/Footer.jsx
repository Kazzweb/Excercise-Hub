import Link from 'next/link'
import { Flame } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 group w-fit">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Fit<span className="text-orange-500">Start</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Start moving. No excuses.
            </p>
            <p className="text-zinc-500 text-xs mt-2">
              Free workouts for everyone, everywhere.
            </p>
          </div>

          {/* Workouts */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Workouts</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/workout" className="text-zinc-400 hover:text-orange-500 text-sm transition-colors">
                  Generator
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-zinc-400 hover:text-orange-500 text-sm transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/today" className="text-zinc-400 hover:text-orange-500 text-sm transition-colors">
                  Today
                </Link>
              </li>
            </ul>
          </div>

          {/* Exercises */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Exercises</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/exercises" className="text-zinc-400 hover:text-orange-500 text-sm transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/exercises?muscle=Legs" className="text-zinc-400 hover:text-orange-500 text-sm transition-colors">
                  By Muscle Group
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#disclaimer" className="text-zinc-400 hover:text-orange-500 text-sm transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs text-center sm:text-left" id="disclaimer">
            Not medical advice. Consult a doctor before starting any exercise program.
          </p>
          <p className="text-zinc-600 text-xs shrink-0">
            © {new Date().getFullYear()} FitStart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
