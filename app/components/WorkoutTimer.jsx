'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, SkipForward, ChevronLeft, ChevronRight, Play, Pause, Clock, Timer } from 'lucide-react'
import { exercises as exerciseData } from '../data/exercises'

function getExercise(id) {
  return exerciseData.find((e) => e.id === id) || null
}

function parseTimedReps(reps) {
  if (!reps) return null
  const str = String(reps).toLowerCase().trim()
  const sec = str.match(/^(\d+)\s*sec/)
  if (sec) return parseInt(sec[1])
  const min = str.match(/^(\d+)\s*min/)
  if (min) return parseInt(min[1]) * 60
  return null
}

export default function WorkoutTimer({ exercises, onComplete }) {
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [phase, setPhase] = useState('active') // 'active' | 'rest'
  const [elapsed, setElapsed] = useState(0)
  const [restRemaining, setRestRemaining] = useState(0)
  const [paused, setPaused] = useState(false)
  const [done, setDone] = useState(false)

  const currentExerciseData = exercises[currentExIdx]
  const currentExercise = getExercise(currentExerciseData?.exerciseId)
  const timedSeconds = parseTimedReps(currentExerciseData?.reps)
  const isTimed = timedSeconds !== null

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0)
  const completedSets = exercises.slice(0, currentExIdx).reduce((sum, ex) => sum + ex.sets, 0) + (currentSet - 1)
  const progress = Math.round((completedSets / totalSets) * 100)

  const startRest = useCallback(() => {
    const ex = exercises[currentExIdx]
    setPhase('rest')
    setRestRemaining(ex.rest)
  }, [currentExIdx, exercises])

  // Active phase timer (count up)
  useEffect(() => {
    if (phase !== 'active' || paused || done) return
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(interval)
  }, [phase, paused, done])

  // Auto-complete for timed exercises
  useEffect(() => {
    if (phase !== 'active' || paused || done || !isTimed) return
    if (elapsed >= timedSeconds) {
      startRest()
    }
  }, [elapsed, phase, paused, done, isTimed, timedSeconds, startRest])

  // Rest phase timer (count down)
  useEffect(() => {
    if (phase !== 'rest' || paused || done) return
    if (restRemaining <= 0) {
      advanceAfterRest()
      return
    }
    const interval = setInterval(() => setRestRemaining((r) => r - 1), 1000)
    return () => clearInterval(interval)
  }, [phase, paused, restRemaining, done])

  const advanceAfterRest = useCallback(() => {
    const ex = exercises[currentExIdx]
    if (currentSet < ex.sets) {
      setCurrentSet((s) => s + 1)
      setPhase('active')
      setElapsed(0)
    } else {
      if (currentExIdx < exercises.length - 1) {
        setCurrentExIdx((i) => i + 1)
        setCurrentSet(1)
        setPhase('active')
        setElapsed(0)
      } else {
        setDone(true)
        // Don't call onComplete here — let user click "Done" button
      }
    }
  }, [currentExIdx, currentSet, exercises])

  const handleCompleteSet = () => startRest()

  const handleSkipRest = () => {
    setRestRemaining(0)
    advanceAfterRest()
  }

  const handlePrev = () => {
    if (currentExIdx > 0) {
      setCurrentExIdx((i) => i - 1)
      setCurrentSet(1)
      setPhase('active')
      setElapsed(0)
    }
  }

  const handleNext = () => {
    if (currentExIdx < exercises.length - 1) {
      setCurrentExIdx((i) => i + 1)
      setCurrentSet(1)
      setPhase('active')
      setElapsed(0)
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const timedRemaining = isTimed ? Math.max(0, timedSeconds - elapsed) : null
  const timedProgressPct = isTimed ? (elapsed / timedSeconds) * 100 : 0

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Progress bar */}
        <div className="h-1.5 bg-zinc-800 w-full">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <span className="text-orange-500 font-semibold">{progress}%</span>
            <span>complete</span>
          </div>
          <button
            onClick={() => onComplete(false)}
            className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close workout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
            <p className="text-zinc-400 mb-6">Amazing work. You crushed it!</p>
            <button
              onClick={() => onComplete(true)}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Phase indicator */}
            <div className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-widest ${
              phase === 'rest' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
            }`}>
              {phase === 'rest' ? 'Rest Period' : isTimed ? 'Timed Set — Auto-completes' : 'Active Set'}
            </div>

            {/* Main content */}
            <div className="p-6 text-center">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                Exercise {currentExIdx + 1} of {exercises.length}
              </p>
              <h2 className="text-2xl font-bold text-white mb-1">
                {currentExercise?.name || currentExerciseData?.exerciseId}
              </h2>
              <p className="text-zinc-400 text-sm mb-2">
                Set {currentSet} of {currentExerciseData?.sets} &bull; {currentExerciseData?.reps}
              </p>

              {/* Timer display */}
              <div className="my-8">
                {phase === 'active' ? (
                  isTimed ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Timer className="w-4 h-4 text-orange-400" />
                        <span>Time remaining</span>
                      </div>
                      <div className={`text-6xl font-bold tabular-nums ${
                        timedRemaining <= 5 ? 'text-red-400' : 'text-orange-400'
                      }`}>
                        {formatTime(timedRemaining)}
                      </div>
                      {/* Timed progress ring */}
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 max-w-xs">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${timedProgressPct}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Elapsed</span>
                      </div>
                      <div className="text-6xl font-bold text-white tabular-nums">
                        {formatTime(elapsed)}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-zinc-400 text-sm">Rest remaining</div>
                    <div className={`text-6xl font-bold tabular-nums ${
                      restRemaining <= 5 ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {formatTime(restRemaining)}
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2 max-w-xs">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all"
                        style={{
                          width: `${(1 - restRemaining / (currentExerciseData?.rest || 60)) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {phase === 'active' ? (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPaused((p) => !p)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors text-sm font-medium border border-zinc-700"
                  >
                    {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    {paused ? 'Resume' : 'Pause'}
                  </button>
                  {!isTimed && (
                    <button
                      onClick={handleCompleteSet}
                      className="flex-1 max-w-xs px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20 text-sm"
                    >
                      Complete Set ✓
                    </button>
                  )}
                  {isTimed && (
                    <button
                      onClick={handleCompleteSet}
                      className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors text-sm border border-zinc-700"
                    >
                      <SkipForward className="w-4 h-4" />
                      Skip
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSkipRest}
                  className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors text-sm font-medium border border-zinc-700"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip Rest
                </button>
              )}
            </div>

            {/* Navigation */}
            <div className="px-6 pb-6 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentExIdx === 0}
                className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-1.5">
                {exercises.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentExIdx ? 'bg-orange-500' : i < currentExIdx ? 'bg-zinc-600' : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentExIdx === exercises.length - 1}
                className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
