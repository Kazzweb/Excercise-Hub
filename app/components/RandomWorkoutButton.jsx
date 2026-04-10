'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Dumbbell, Shuffle } from 'lucide-react'
import LevelBadge from './LevelBadge'

export default function RandomWorkoutButton({ workouts }) {
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)

  const handleSurprise = () => {
    setAnimating(true)
    setResult(null)
    setTimeout(() => {
      const random = workouts[Math.floor(Math.random() * workouts.length)]
      setResult(random)
      setAnimating(false)
    }, 380)
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      <button
        onClick={handleSurprise}
        disabled={animating}
        className="btn-ghost w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-wait"
      >
        <Shuffle className={`w-4 h-4 ${animating ? 'animate-spin' : ''}`} />
        Surprise Me
      </button>

      {result && !animating && (
        <div
          className="slide-in w-full rounded-2xl p-5"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
                Your workout
              </p>
              <h4 className="font-bold text-base leading-tight" style={{ color: 'var(--text)' }}>
                {result.title}
              </h4>
            </div>
            <LevelBadge level={result.level} />
          </div>

          <div className="flex items-center gap-4 mb-5 text-xs" style={{ color: 'var(--text-2)' }}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              {result.duration} min
            </span>
            <span className="flex items-center gap-1.5 capitalize">
              <Dumbbell className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              {result.equipment}
            </span>
            <span style={{ color: 'var(--accent)' }} className="font-semibold ml-auto">
              {result.exercises.length} exercises
            </span>
          </div>

          <Link
            href={`/workout/${result.id}`}
            className="btn-primary block w-full text-center px-4 py-2.5 rounded-2xl text-sm uppercase tracking-widest"
          >
            Let&apos;s Go →
          </Link>
        </div>
      )}
    </div>
  )
}
