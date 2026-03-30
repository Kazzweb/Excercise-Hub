'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Lock, Calendar } from 'lucide-react'

export default function ProgressTracker({ programId, schedule }) {
  const storageKey = `fit_progress_${programId}`
  const [completedDays, setCompletedDays] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) setCompletedDays(JSON.parse(stored))
    } catch {
      setCompletedDays([])
    }
  }, [storageKey])

  const toggleDay = (dayNum) => {
    if (!canInteract(dayNum)) return
    const updated = completedDays.includes(dayNum)
      ? completedDays.filter((d) => d !== dayNum)
      : [...completedDays, dayNum]
    setCompletedDays(updated)
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated))
    } catch {}
  }

  const canInteract = (dayNum) => {
    // Can interact with day 1 always, and days that follow a completed previous day
    if (dayNum === 1) return true
    return completedDays.includes(dayNum - 1) || completedDays.includes(dayNum)
  }

  const isCompleted = (dayNum) => completedDays.includes(dayNum)

  const isToday = (dayNum) => {
    // "Today" is the first incomplete day that is unlocked
    if (!canInteract(dayNum)) return false
    return !isCompleted(dayNum) && (dayNum === 1 || completedDays.includes(dayNum - 1))
  }

  const activeDays = schedule.filter((d) => d.type === 'active').length
  const completedActiveDays = schedule
    .filter((d) => d.type === 'active' && completedDays.includes(d.day))
    .length
  const percentage = activeDays > 0 ? Math.round((completedActiveDays / activeDays) * 100) : 0

  const handleReset = () => {
    setCompletedDays([])
    try {
      localStorage.removeItem(storageKey)
    } catch {}
  }

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-zinc-800 rounded-lg mb-4" />
        <div className="grid grid-cols-7 gap-2">
          {schedule.slice(0, 7).map((_, i) => (
            <div key={i} className="h-20 bg-zinc-800 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress summary */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Your Progress</p>
          <p className="text-zinc-400 text-sm">{completedActiveDays} of {activeDays} workouts completed</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-500">{percentage}%</p>
            <p className="text-zinc-500 text-xs">Complete</p>
          </div>
          {completedDays.length > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1 hover:bg-red-500/10 rounded"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-7 gap-2">
        {schedule.map((day) => {
          const completed = isCompleted(day.day)
          const today = isToday(day.day)
          const locked = !canInteract(day.day)
          const isRest = day.type === 'rest'

          return (
            <button
              key={day.day}
              onClick={() => toggleDay(day.day)}
              disabled={locked || isRest}
              className={`
                relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 min-h-[72px]
                ${completed
                  ? 'bg-green-500/15 border-green-500/40 text-green-400'
                  : today
                  ? 'bg-orange-500/15 border-orange-500/60 text-orange-400 shadow-lg shadow-orange-500/10'
                  : isRest
                  ? 'bg-zinc-800/50 border-zinc-800 text-zinc-600 cursor-default'
                  : locked
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed opacity-50'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 cursor-pointer'
                }
              `}
            >
              <span className="text-xs font-bold">{day.label}</span>

              <div className="my-1">
                {completed ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : locked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : isRest ? (
                  <span className="text-lg">💤</span>
                ) : today ? (
                  <span className="text-lg">🔥</span>
                ) : (
                  <Calendar className="w-4 h-4" />
                )}
              </div>

              <span className="text-[10px] text-center leading-tight opacity-80">
                {isRest ? 'Rest' : day.focus?.split(' ')[0]}
              </span>

              {today && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  Today
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Workout links for unlocked active days */}
      <div className="space-y-2">
        {schedule
          .filter((d) => d.type === 'active' && canInteract(d.day) && !isCompleted(d.day) && d.workoutId)
          .slice(0, 1)
          .map((day) => (
            <div key={day.day} className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <div>
                <p className="text-orange-400 font-medium text-sm">{day.label}: {day.focus}</p>
                <p className="text-zinc-400 text-xs">Ready to start</p>
              </div>
              <Link
                href={`/workout/${day.workoutId}`}
                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Start →
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
