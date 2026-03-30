'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Dumbbell } from 'lucide-react'
import { workouts } from '../data/workouts'
import WorkoutCard from '../components/WorkoutCard'
import FilterStrip from '../components/FilterStrip'

function WorkoutContent() {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    goal: searchParams.get('goal') || 'all',
    time: searchParams.get('time') || 'all',
    equipment: searchParams.get('equipment') || 'all',
  })

  // Update filters when URL changes
  useEffect(() => {
    setFilters({
      goal: searchParams.get('goal') || 'all',
      time: searchParams.get('time') || 'all',
      equipment: searchParams.get('equipment') || 'all',
    })
  }, [searchParams])

  const filtered = workouts.filter((w) => {
    if (filters.goal !== 'all' && w.goal !== filters.goal) return false
    if (filters.time !== 'all' && String(w.duration) !== filters.time) return false
    if (filters.equipment !== 'all' && w.equipment !== filters.equipment) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter strip */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6">
        <FilterStrip filters={filters} onChange={setFilters} />
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-zinc-400 text-sm">
          <span className="text-white font-semibold">{filtered.length}</span>{' '}
          workout{filtered.length !== 1 ? 's' : ''} found
        </p>
        {(filters.goal !== 'all' || filters.time !== 'all' || filters.equipment !== 'all') && (
          <button
            onClick={() => setFilters({ goal: 'all', time: 'all', equipment: 'all' })}
            className="text-orange-500 hover:text-orange-400 text-xs font-medium transition-colors"
          >
            Clear all filters ×
          </button>
        )}
      </div>

      {/* Results grid */}
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
          <p className="text-zinc-400 text-sm mb-6">Try adjusting your filters to see more options</p>
          <button
            onClick={() => setFilters({ goal: 'all', time: 'all', equipment: 'all' })}
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
            Filter by goal, available time, and equipment to find the ideal workout for you right now.
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6 animate-pulse h-12" />
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
