'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { exercises } from '../data/exercises'
import ExerciseCard from '../components/ExerciseCard'

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Core', 'Shoulders', 'Arms', 'Cardio']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

const categoryToMuscleGroup = {
  Chest: 'Chest',
  Back: 'Back',
  Legs: 'Legs',
  Core: 'Core',
  Shoulders: 'Shoulders',
  Arms: 'Arms',
  Cardio: 'Cardio',
}

export default function ExercisesPage() {
  const [search, setSearch] = useState('')
  const [muscle, setMuscle] = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      const matchSearch =
        search === '' ||
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.muscles.some((m) => m.toLowerCase().includes(search.toLowerCase()))

      const matchMuscle =
        muscle === 'All' ||
        ex.category === muscle ||
        categoryToMuscleGroup[ex.category] === muscle

      const matchDifficulty =
        difficulty === 'All' ||
        ex.difficulty === difficulty.toLowerCase()

      return matchSearch && matchMuscle && matchDifficulty
    })
  }, [search, muscle, difficulty])

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Exercise Library</h1>
          <p className="text-zinc-400">
            {exercises.length} exercises with video guides and form tips. Learn to move right.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises by name or muscle group..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-colors"
          />
        </div>

        {/* Muscle group filter */}
        <div className="mb-4">
          <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2">Muscle Group</p>
          <div className="flex flex-wrap gap-2">
            {muscleGroups.map((group) => (
              <button
                key={group}
                onClick={() => setMuscle(group)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  muscle === group
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-orange-500/60 hover:text-zinc-200'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="mb-6">
          <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  difficulty === level
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-orange-500/60 hover:text-zinc-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-zinc-500 text-sm mb-6">
          <span className="text-white font-semibold">{filtered.length}</span>{' '}
          exercise{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-400 font-medium">No exercises found</p>
            <p className="text-zinc-600 text-sm mt-1">Try a different search or filter</p>
            <button
              onClick={() => { setSearch(''); setMuscle('All'); setDifficulty('All') }}
              className="mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
