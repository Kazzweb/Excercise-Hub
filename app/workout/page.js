'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Dumbbell } from 'lucide-react'
import { workouts } from '../data/workouts'
import WorkoutCard from '../components/WorkoutCard'
import FilterStrip from '../components/FilterStrip'

const MUSCLE_GROUPS = [
  { id: 'Chest',      label: 'Chest',      emoji: '🫁', sub: 'Pecs · Upper chest' },
  { id: 'Back',       label: 'Back',        emoji: '🏋️', sub: 'Lats · Traps · Rhomboids' },
  { id: 'Legs',       label: 'Legs',        emoji: '🦵', sub: 'Quads · Hamstrings' },
  { id: 'Shoulders',  label: 'Shoulders',   emoji: '🎯', sub: 'Delts · Rotator cuff' },
  { id: 'Arms',       label: 'Arms',        emoji: '💪', sub: 'Biceps · Triceps' },
  { id: 'Core',       label: 'Core',        emoji: '🔥', sub: 'Abs · Obliques' },
  { id: 'Glutes',     label: 'Glutes',      emoji: '🍑', sub: 'Glutes · Hip flexors' },
  { id: 'Full Body',  label: 'Full Body',   emoji: '⚡', sub: 'All muscle groups' },
]

function WorkoutContent() {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    goal: searchParams.get('goal') || 'all',
    time: searchParams.get('time') || 'all',
    equipment: searchParams.get('equipment') || 'all',
  })
  const [muscle, setMuscle] = useState(searchParams.get('muscle') || 'all')

  useEffect(() => {
    setFilters({
      goal: searchParams.get('goal') || 'all',
      time: searchParams.get('time') || 'all',
      equipment: searchParams.get('equipment') || 'all',
    })
    setMuscle(searchParams.get('muscle') || 'all')
  }, [searchParams])

  const filtered = workouts.filter((w) => {
    if (filters.goal !== 'all' && w.goal !== filters.goal) return false
    if (filters.time !== 'all' && String(w.duration) !== filters.time) return false
    if (filters.equipment !== 'all' && w.equipment !== filters.equipment) return false
    if (muscle !== 'all' && (!w.muscles || !w.muscles.some(m => m === muscle))) return false
    return true
  })

  const hasActiveFilters =
    filters.goal !== 'all' || filters.time !== 'all' || filters.equipment !== 'all' || muscle !== 'all'

  function clearAll() {
    setFilters({ goal: 'all', time: 'all', equipment: 'all' })
    setMuscle('all')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Train by Muscle ───────────────────────────────────────────── */}
      <div>
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="text-lg font-black text-white tracking-tight">Train by Muscle</h2>
          <span className="text-xs text-zinc-500">Pick a target, get the right workout</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {MUSCLE_GROUPS.map((mg) => {
            const active = muscle === mg.id
            return (
              <button
                key={mg.id}
                onClick={() => setMuscle(active ? 'all' : mg.id)}
                className={`
                  flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center
                  transition-all duration-200 cursor-pointer
                  ${active
                    ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800'}
                `}
              >
                <span className="text-2xl leading-none">{mg.emoji}</span>
                <span className={`text-xs font-bold leading-tight ${active ? 'text-white' : 'text-zinc-200'}`}>
                  {mg.label}
                </span>
                <span className={`text-[10px] leading-tight hidden sm:block ${active ? 'text-orange-100' : 'text-zinc-500'}`}>
                  {mg.sub}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Filter strip ──────────────────────────────────────────────── */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <FilterStrip filters={filters} onChange={setFilters} />
      </div>

      {/* ── Result count ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-zinc-400 text-sm">
          {muscle !== 'all' && (
            <span className="text-orange-400 font-semibold mr-1">{muscle}:</span>
          )}
          <span className="text-white font-semibold">{filtered.length}</span>{' '}
          workout{filtered.length !== 1 ? 's' : ''} found
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-orange-500 hover:text-orange-400 text-xs font-medium transition-colors"
          >
            Clear all filters ×
          </button>
        )}
      </div>

      {/* ── Results grid ──────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">No workouts match</h3>
          <p className="text-zinc-400 text-sm mb-6">Try adjusting your filters or selecting a different muscle group</p>
          <button
            onClick={clearAll}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Show All Workouts
          </button>
        </div>
      )}
    </div>
  )
}

export default function WorkoutPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Page Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Find Your Perfect Workout
          </h1>
          <p className="text-zinc-400 text-base max-w-xl">
            Pick a muscle group to target, or filter by goal, time, and equipment to find the right session for today.
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl border border-zinc-800 h-20 animate-pulse" />
            ))}
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 h-12 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl border border-zinc-800 h-64 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <WorkoutContent />
      </Suspense>
    </div>
  )
}
