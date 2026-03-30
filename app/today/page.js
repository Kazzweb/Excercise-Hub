'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Dumbbell, Zap, RefreshCw } from 'lucide-react'
import { workouts } from '../data/workouts'
import LevelBadge from '../components/LevelBadge'

const moods = [
  {
    id: 'energized',
    emoji: '⚡',
    label: 'Energized',
    desc: 'Ready to go hard',
    filter: (w) => w.goal === 'cardio' || w.goal === 'muscle',
    color: 'border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/15 text-yellow-400',
    activeColor: 'border-yellow-500 bg-yellow-500/20 text-yellow-300',
  },
  {
    id: 'tired',
    emoji: '😴',
    label: 'Tired',
    desc: 'Low energy today',
    filter: (w) => w.duration <= 20 || w.goal === 'flexibility',
    color: 'border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/15 text-blue-400',
    activeColor: 'border-blue-500 bg-blue-500/20 text-blue-300',
  },
  {
    id: 'strong',
    emoji: '💪',
    label: 'Strong',
    desc: 'Feeling powerful',
    filter: (w) => w.goal === 'strength' || w.goal === 'muscle',
    color: 'border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/15 text-orange-400',
    activeColor: 'border-orange-500 bg-orange-500/20 text-orange-300',
  },
]

const RECENT_KEY = 'fit_recent_workouts'

function saveRecent(workout) {
  try {
    const existing = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
    const updated = [workout, ...existing.filter((w) => w.id !== workout.id)].slice(0, 3)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
  } catch {}
}

export default function TodayPage() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [recentWorkouts, setRecentWorkouts] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
      setRecentWorkouts(recent)
    } catch {}
  }, [])

  const handleFindWorkout = () => {
    if (!selectedMood) return
    const mood = moods.find((m) => m.id === selectedMood)
    const filtered = workouts.filter(mood.filter)
    const pool = filtered.length > 0 ? filtered : workouts

    setAnimating(true)
    setResult(null)

    setTimeout(() => {
      const picked = pool[Math.floor(Math.random() * pool.length)]
      setResult(picked)
      setAnimating(false)
      saveRecent(picked)
      // Update recent display
      setRecentWorkouts((prev) => [picked, ...prev.filter((w) => w.id !== picked.id)].slice(0, 3))
    }, 600)
  }

  const handleTryAnother = () => {
    setResult(null)
    handleFindWorkout()
  }

  const selectedMoodData = moods.find((m) => m.id === selectedMood)

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl font-black text-white mb-3">What Should I Do Today?</h1>
          <p className="text-zinc-400 text-lg">
            Tell us how you are feeling and we will find the perfect workout for you.
          </p>
        </div>

        {/* Mood selector */}
        <div className="mb-8">
          <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider text-center mb-4">
            Feeling like...
          </p>
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => {
              const isActive = selectedMood === mood.id
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isActive ? mood.activeColor : mood.color
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="font-bold text-sm">{mood.label}</span>
                  <span className="text-xs opacity-70">{mood.desc}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Find workout button */}
        <button
          onClick={handleFindWorkout}
          disabled={!selectedMood || animating}
          className={`w-full py-4 font-bold text-lg rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 ${
            selectedMood && !animating
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30'
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
          }`}
        >
          {animating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Finding your workout...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Find My Workout
            </>
          )}
        </button>

        {/* Result card */}
        {result && !animating && (
          <div
            className="mt-6 bg-zinc-900 border border-orange-500/30 rounded-2xl overflow-hidden shadow-xl shadow-orange-500/5"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            <div className="bg-orange-500/10 border-b border-orange-500/20 px-5 py-3 flex items-center gap-2">
              <span className="text-orange-400 text-sm font-semibold">
                {selectedMoodData?.emoji} Perfect for your {selectedMoodData?.label?.toLowerCase()} energy
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-white font-black text-2xl mb-1">{result.title}</h3>
                  <p className="text-zinc-400 text-sm">{result.description}</p>
                </div>
                <LevelBadge level={result.level} />
              </div>

              <div className="flex items-center gap-5 mb-5 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  {result.duration} min
                </span>
                <span className="flex items-center gap-1.5 capitalize">
                  <Dumbbell className="w-4 h-4 text-orange-500" />
                  {result.equipment}
                </span>
                <span className="text-orange-500 font-semibold">
                  {result.exercises.length} exercises
                </span>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/workout/${result.id}`}
                  className="flex-1 text-center py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  {"Let's Go →"}
                </Link>
                <button
                  onClick={handleTryAnother}
                  className="flex items-center gap-1.5 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors text-sm border border-zinc-700"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent workouts */}
        {mounted && recentWorkouts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-4">
              Recently Picked
            </h2>
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <Link
                  key={workout.id}
                  href={`/workout/${workout.id}`}
                  className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-colors group"
                >
                  <div>
                    <p className="text-zinc-300 font-semibold text-sm group-hover:text-white transition-colors">
                      {workout.title}
                    </p>
                    <p className="text-zinc-600 text-xs mt-0.5 capitalize">
                      {workout.duration} min · {workout.equipment}
                    </p>
                  </div>
                  <span className="text-orange-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Start →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
