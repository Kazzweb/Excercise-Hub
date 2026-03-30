'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Dumbbell, ChevronUp } from 'lucide-react'
import LevelBadge from './LevelBadge'

export default function RandomWorkoutButton({ workouts }) {
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)

  const handleSurprise = () => {
    setAnimating(true)
    setResult(null)
    // Brief delay for animation effect
    setTimeout(() => {
      const random = workouts[Math.floor(Math.random() * workouts.length)]
      setResult(random)
      setAnimating(false)
    }, 400)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleSurprise}
        disabled={animating}
        className="group flex items-center gap-2 px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-wait"
      >
        <span className={`text-xl ${animating ? 'animate-spin' : 'group-hover:animate-bounce'}`}>🎲</span>
        <span>Surprise Me</span>
      </button>

      {result && (
        <div
          className={`w-full max-w-sm bg-zinc-800/90 border border-zinc-700 rounded-xl p-4 shadow-xl transition-all duration-300 ${
            animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Arrow pointing up */}
          <div className="flex justify-center -mt-7 mb-2">
            <ChevronUp className="w-5 h-5 text-zinc-600" />
          </div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-zinc-500 text-xs mb-0.5">Your workout:</p>
              <h4 className="text-white font-bold text-base">{result.title}</h4>
            </div>
            <LevelBadge level={result.level} />
          </div>
          <div className="flex items-center gap-4 mb-4 text-zinc-400 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              {result.duration} min
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Dumbbell className="w-3.5 h-3.5 text-orange-500" />
              {result.equipment}
            </span>
            <span className="text-orange-500 font-medium">
              {result.exercises.length} exercises
            </span>
          </div>
          <Link
            href={`/workout/${result.id}`}
            className="block w-full text-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-orange-500/20"
          >
            {"Let's Go →"}
          </Link>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
