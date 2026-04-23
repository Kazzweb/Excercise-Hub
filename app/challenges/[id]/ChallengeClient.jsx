'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Lock, Play, ChevronDown, ChevronUp, X } from 'lucide-react'
import { enrollInChallenge, completeChallengeDay, uncompleteChallengeDay, getChallengeProgress } from '../../actions/challenges'
import { exercises as exerciseData } from '../../data/exercises'
import WorkoutTimer from '../../components/WorkoutTimer'

const TYPE_COLORS = {
  'full-body':       '#ff4d3d',
  'upper':           '#6366f1',
  'lower':           '#22c55e',
  'hiit':            '#f59e0b',
  'cardio':          '#06b6d4',
  'push':            '#8b5cf6',
  'pull':            '#ec4899',
  'legs':            '#10b981',
  'core':            '#f97316',
  'active-recovery': '#64748b',
  'rest':            '#27272a',
}

const TYPE_LABELS = {
  'full-body': 'Full Body', 'upper': 'Upper', 'lower': 'Lower',
  'hiit': 'HIIT', 'cardio': 'Cardio', 'push': 'Push',
  'pull': 'Pull', 'legs': 'Legs', 'core': 'Core',
  'active-recovery': 'Active Rest', 'rest': 'Rest',
}

export default function ChallengeClient({ challenge }) {
  const router = useRouter()
  const [enrollment, setEnrollment]     = useState(null)
  const [completedDays, setCompletedDays] = useState(new Set())
  const [loading, setLoading]           = useState(true)
  const [enrolling, setEnrolling]       = useState(false)
  const [activeDay, setActiveDay]       = useState(null) // day object shown in modal

  useEffect(() => {
    getChallengeProgress(challenge.id)
      .then(({ enrollment, completedDays }) => {
        setEnrollment(enrollment)
        setCompletedDays(new Set(completedDays))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [challenge.id])

  async function handleEnroll() {
    setEnrolling(true)
    try {
      const e = await enrollInChallenge(challenge.id)
      setEnrollment(e)
    } catch (e) { console.error(e) }
    finally { setEnrolling(false) }
  }

  async function handleToggleDay(dayNumber) {
    if (!enrollment) return
    const isCompleted = completedDays.has(dayNumber)
    // Optimistic update
    setCompletedDays(prev => {
      const next = new Set(prev)
      isCompleted ? next.delete(dayNumber) : next.add(dayNumber)
      return next
    })
    try {
      if (isCompleted) {
        await uncompleteChallengeDay(challenge.id, dayNumber)
      } else {
        await completeChallengeDay(challenge.id, dayNumber)
      }
    } catch {
      // Rollback
      setCompletedDays(prev => {
        const next = new Set(prev)
        isCompleted ? next.add(dayNumber) : next.delete(dayNumber)
        return next
      })
    }
  }

  const completedCount = completedDays.size
  const progressPct    = Math.round((completedCount / challenge.duration) * 100)

  // Find next unlocked day (first incomplete non-rest day)
  const nextDay = enrollment
    ? challenge.schedule.find(d => !d.rest && !completedDays.has(d.day))
    : null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="mb-8 fade-up-1">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">30-Day Challenge</p>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{challenge.emoji}</span>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                {challenge.title}
              </h1>
              <p className="text-zinc-400 text-sm mt-1">{challenge.subtitle}</p>
            </div>
          </div>
          <p className="mt-4 text-zinc-400 max-w-2xl">{challenge.description}</p>
        </div>

        {/* Progress bar (if enrolled) */}
        {enrollment && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 fade-up-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500">Your progress</p>
                <p className="font-display text-3xl font-bold text-white mt-0.5">
                  {completedCount} <span className="text-zinc-500 text-xl">/ {challenge.duration} days</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold" style={{ color: challenge.color }}>{progressPct}%</p>
                <p className="text-xs font-mono text-zinc-500">complete</p>
              </div>
            </div>
            <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: challenge.color }} />
            </div>
            {nextDay && (
              <button onClick={() => setActiveDay(nextDay)}
                className="mt-4 flex items-center gap-2 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-orange-500/20">
                <Play className="w-4 h-4 fill-white" />
                Day {nextDay.day}: {nextDay.title}
              </button>
            )}
          </div>
        )}

        {/* Enroll CTA */}
        {!enrollment && (
          <div className="mb-6 fade-up-2">
            <button onClick={handleEnroll} disabled={enrolling}
              className="btn-primary px-8 py-4 text-base disabled:opacity-60">
              {enrolling ? 'Starting…' : `Start ${challenge.title} →`}
            </button>
            <p className="text-xs text-zinc-500 mt-2 font-mono">Enroll to track your progress and mark days complete.</p>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 fade-up-2">
          {challenge.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${challenge.color}20`, color: challenge.color }}>
                <Check className="w-3 h-3" />
              </span>
              <span className="text-sm text-zinc-300">{b}</span>
            </div>
          ))}
        </div>

        {/* 30-day grid */}
        <div className="fade-up-3">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-4">30-Day Schedule</p>

          {/* Week rows */}
          {[1, 2, 3, 4].map(week => {
            const weekDays = challenge.schedule.filter(d => Math.ceil(d.day / 7) === week)
            return (
              <div key={week} className="mb-4">
                <p className="text-xs font-mono text-zinc-600 mb-2 pl-1">Week {week}</p>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map(day => {
                    const isDone     = completedDays.has(day.day)
                    const isRest     = day.rest
                    const color      = TYPE_COLORS[day.type] ?? '#ff4d3d'
                    const isLocked   = !enrollment

                    return (
                      <button key={day.day}
                        onClick={() => {
                          if (!isRest) setActiveDay(day)
                        }}
                        className="group flex flex-col items-center p-2 rounded-xl border transition-all duration-150"
                        style={{
                          borderColor: isDone ? `${color}50` : 'rgba(255,255,255,0.06)',
                          background: isDone ? `${color}12` : isRest ? 'transparent' : 'rgba(255,255,255,0.02)',
                          cursor: isRest ? 'default' : 'pointer',
                        }}>

                        {/* Day number */}
                        <span className="text-xs font-mono text-zinc-500 mb-1">{day.day}</span>

                        {/* Status icon */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: isDone ? color : isRest ? 'rgba(255,255,255,0.04)' : `${color}18` }}>
                          {isDone ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : isRest ? (
                            <span className="text-zinc-600 text-xs">—</span>
                          ) : (
                            <span className="text-sm">{isLocked ? '🔒' : ''}</span>
                          )}
                          {!isDone && !isRest && !isLocked && (
                            <span className="text-sm font-bold" style={{ color }}>{day.day}</span>
                          )}
                        </div>

                        {/* Type label */}
                        <span className="text-[0.55rem] font-mono text-center leading-tight mt-1 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                          {TYPE_LABELS[day.type] ?? day.type}
                        </span>
                      </button>
                    )
                  })}
                  {/* Pad last week to 7 slots */}
                  {weekDays.length < 7 && Array.from({ length: 7 - weekDays.length }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Days 29-30 (overflow from week 5) */}
          {challenge.schedule.filter(d => d.day > 28).length > 0 && (
            <div>
              <p className="text-xs font-mono text-zinc-600 mb-2 pl-1">Final Days</p>
              <div className="grid grid-cols-7 gap-2">
                {challenge.schedule.filter(d => d.day > 28).map(day => {
                  const isDone = completedDays.has(day.day)
                  const isRest = day.rest
                  const color  = TYPE_COLORS[day.type] ?? '#ff4d3d'
                  return (
                    <button key={day.day}
                      onClick={() => { if (!isRest) setActiveDay(day) }}
                      className="group flex flex-col items-center p-2 rounded-xl border transition-all"
                      style={{
                        borderColor: isDone ? `${color}50` : 'rgba(255,255,255,0.06)',
                        background: isDone ? `${color}12` : 'rgba(255,255,255,0.02)',
                        cursor: isRest ? 'default' : 'pointer',
                      }}>
                      <span className="text-xs font-mono text-zinc-500 mb-1">{day.day}</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: isDone ? color : `${color}18` }}>
                        {isDone ? <Check className="w-4 h-4 text-white" /> : (
                          <span className="text-sm font-bold" style={{ color }}>{day.day}</span>
                        )}
                      </div>
                      <span className="text-[0.55rem] font-mono text-center leading-tight mt-1 text-zinc-600">
                        {TYPE_LABELS[day.type]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Type legend */}
        <div className="mt-6 flex flex-wrap gap-2 fade-up-4">
          {Object.entries(TYPE_LABELS).filter(([k]) => k !== 'rest').map(([k, label]) => (
            <div key={k} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <div className="w-2 h-2 rounded-full" style={{ background: TYPE_COLORS[k] }} />
              <span className="text-xs font-mono text-zinc-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day detail modal */}
      {activeDay && (
        <DayModal
          day={activeDay}
          isCompleted={completedDays.has(activeDay.day)}
          enrolled={!!enrollment}
          color={TYPE_COLORS[activeDay.type] ?? '#ff4d3d'}
          onClose={() => setActiveDay(null)}
          onToggle={() => handleToggleDay(activeDay.day)}
        />
      )}
    </div>
  )
}

function DayModal({ day, isCompleted, enrolled, color, onClose, onToggle }) {
  const [showAll, setShowAll] = useState(false)
  const [timerOpen, setTimerOpen] = useState(false)

  function handleTimerComplete(completed) {
    setTimerOpen(false)
    if (completed && !isCompleted) {
      onToggle()
      onClose()
    }
  }

  if (timerOpen) {
    return <WorkoutTimer exercises={day.exercises} onComplete={handleTimerComplete} />
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}>
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${color}20`, color }}>
                Day {day.day} — {TYPE_LABELS[day.type] ?? day.type}
              </span>
              {isCompleted && (
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Done
                </span>
              )}
            </div>
            <h2 className="font-display text-xl font-bold text-white">{day.title}</h2>
            <p className="text-sm text-zinc-400 mt-0.5">{day.description}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors ml-3 shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Duration */}
        {day.duration > 0 && (
          <div className="px-5 py-3 border-b border-zinc-800/50 flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 tracking-wider">Duration:</span>
            <span className="text-sm font-bold text-white">{day.duration} min</span>
          </div>
        )}

        {/* Exercises */}
        {day.exercises.length > 0 && (
          <div className="overflow-y-auto flex-1">
            <div className="p-5">
              <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-3">Exercises</p>
              <div className="flex flex-col gap-2">
                {(showAll ? day.exercises : day.exercises.slice(0, 5)).map((ex, i) => {
                  const info = exerciseData.find(e => e.id === ex.exerciseId)
                  return (
                    <div key={i} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: `${color}20`, color }}>
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white capitalize">
                            {info?.name ?? ex.exerciseId.replace(/-/g, ' ')}
                          </p>
                          {info?.category && (
                            <p className="text-xs text-zinc-500 capitalize">{info.category}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-sm font-bold text-white">{ex.sets}×{ex.reps}</p>
                        <p className="text-xs text-zinc-500">{ex.rest}s rest</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              {day.exercises.length > 5 && (
                <button onClick={() => setShowAll(p => !p)}
                  className="mt-3 flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors">
                  {showAll ? <><ChevronUp className="w-3.5 h-3.5" /> Show less</> : <><ChevronDown className="w-3.5 h-3.5" /> +{day.exercises.length - 5} more exercises</>}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        {enrolled && (
          <div className="p-4 border-t border-zinc-800 shrink-0 flex flex-col gap-2">
            {!isCompleted && day.exercises.length > 0 && (
              <button onClick={() => setTimerOpen(true)}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 text-white"
                style={{ background: color }}>
                <Play className="w-4 h-4 fill-white" />
                Start Workout
              </button>
            )}
            <button onClick={() => { onToggle(); onClose() }}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all border ${
                isCompleted
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-white/6 text-zinc-400 border-white/8'
              }`}>
              {isCompleted ? '✗ Mark as Incomplete' : '✓ Mark as Complete'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
