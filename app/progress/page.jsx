'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { ChevronLeft, ChevronRight, Flame, Calendar, TrendingUp, Award } from 'lucide-react'
import { getWorkoutActivityDates } from '../actions/workout-log'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function calculateStreaks(activeDatesSet) {
  if (activeDatesSet.size === 0) return { current: 0, longest: 0 }

  const today = toLocalDateStr(new Date())
  const yesterday = toLocalDateStr(addDays(new Date(), -1))

  // Current streak — walk backwards from today (or yesterday if today not logged yet)
  let current = 0
  let cursor = activeDatesSet.has(today) ? new Date() : activeDatesSet.has(yesterday) ? addDays(new Date(), -1) : null
  if (cursor) {
    while (activeDatesSet.has(toLocalDateStr(cursor))) {
      current++
      cursor = addDays(cursor, -1)
    }
  }

  // Longest streak — sort all dates and find max consecutive run
  const sorted = [...activeDatesSet].sort()
  let longest = 0, run = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T00:00:00')
    const curr = new Date(sorted[i]     + 'T00:00:00')
    const diff = Math.round((curr - prev) / 86400000)
    if (diff === 1) {
      run++
    } else {
      longest = Math.max(longest, run)
      run = 1
    }
  }
  longest = Math.max(longest, run)

  return { current, longest }
}

function buildCalendarDays(year, month) {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1).getDay()  // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []

  // Leading empty cells
  for (let i = 0; i < firstDay; i++) days.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const m = String(month + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    days.push(`${year}-${m}-${dd}`)
  }

  return days
}

export default function ProgressPage() {
  const { user, isLoaded } = useUser()
  const today = new Date()
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [activeDates, setActiveDates] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWorkoutActivityDates()
      .then(dates => setActiveDates(new Set(dates)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()
    if (isCurrentMonth) return
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const calendarDays = buildCalendarDays(viewYear, viewMonth)
  const todayStr     = toLocalDateStr(today)
  const { current: currentStreak, longest: longestStreak } = calculateStreaks(activeDates)
  const totalActiveDays = activeDates.size

  // Active days in current viewed month
  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`
  const monthActiveDays = [...activeDates].filter(d => d.startsWith(monthPrefix)).length

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 fade-up-1">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">Your Journey</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-none">
            CONSISTENCY <span className="text-orange-500">TRACKER</span>
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Every day you log counts. Build the habit, watch the streak grow.
          </p>
        </div>

        {/* Streak hero */}
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 overflow-hidden fade-up-2">
          {/* Background glow */}
          {currentStreak > 0 && (
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          )}

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-zinc-500">Current streak</p>
              <p className="text-xs text-zinc-600 font-mono">Complete a workout daily to keep it going</p>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display text-7xl font-bold text-white leading-none">{currentStreak}</span>
            <span className="font-display text-2xl text-zinc-400">{currentStreak === 1 ? 'day' : 'days'}</span>
          </div>

          {currentStreak === 0 && (
            <p className="text-sm text-zinc-500 mt-2">
              Complete a workout today to start your streak.
            </p>
          )}

          {currentStreak > 0 && currentStreak === longestStreak && (
            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Award className="w-3 h-3 text-orange-500" />
              <span className="text-xs font-bold text-orange-500">Personal best!</span>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6 fade-up-2">
          {[
            { icon: <TrendingUp className="w-4 h-4" />, label: 'Longest Streak', value: longestStreak, unit: longestStreak === 1 ? 'day' : 'days' },
            { icon: <Calendar className="w-4 h-4" />,   label: 'Total Active',   value: totalActiveDays, unit: totalActiveDays === 1 ? 'day' : 'days' },
            { icon: <Flame className="w-4 h-4" />,      label: 'This Month',     value: monthActiveDays, unit: monthActiveDays === 1 ? 'day' : 'days' },
          ].map(stat => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2 text-zinc-500">{stat.icon}</div>
              <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-0.5">{stat.unit}</p>
              <p className="text-xs text-zinc-600 font-mono mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 fade-up-3">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <p className="font-display font-bold text-white text-lg">{MONTH_NAMES[viewMonth]}</p>
              <p className="text-xs font-mono text-zinc-500">{viewYear}</p>
            </div>
            <button
              onClick={nextMonth}
              disabled={isCurrentMonth}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_LABELS.map(day => (
              <div key={day} className="text-center text-xs font-mono text-zinc-600 uppercase tracking-wider py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dateStr, i) => {
              if (!dateStr) return <div key={`empty-${i}`} />

              const isToday    = dateStr === todayStr
              const isActive   = activeDates.has(dateStr)
              const isFuture   = dateStr > todayStr
              const dayNum     = Number(dateStr.split('-')[2])

              return (
                <div
                  key={dateStr}
                  className="aspect-square flex items-center justify-center rounded-xl relative"
                  style={{
                    background: isActive
                      ? 'rgba(255,77,61,0.15)'
                      : isToday
                      ? 'rgba(255,255,255,0.04)'
                      : 'transparent',
                    border: isToday
                      ? '1.5px solid rgba(255,77,61,0.5)'
                      : '1.5px solid transparent',
                    opacity: isFuture ? 0.25 : 1,
                  }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: isActive ? '#ff4d3d' : isToday ? '#fff' : '#71717a',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {dayNum}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800/50">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-orange-500/20 border border-orange-500/30" />
              <span className="text-xs font-mono text-zinc-500">Active day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-white/4 border border-orange-500/40" />
              <span className="text-xs font-mono text-zinc-500">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-zinc-800/50" />
              <span className="text-xs font-mono text-zinc-500">No activity</span>
            </div>
          </div>
        </div>

        {/* Motivational note */}
        {currentStreak >= 3 && (
          <div className="mt-4 p-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 fade-up-4">
            <p className="text-sm text-orange-400 font-semibold text-center">
              {currentStreak >= 30 ? `🔥 ${currentStreak} days strong. Unstoppable.`
               : currentStreak >= 14 ? `${currentStreak} days in. You're building a real habit.`
               : currentStreak >= 7  ? `One week streak! Keep the fire going.`
               : `${currentStreak} days in a row. Don't break the chain!`}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
