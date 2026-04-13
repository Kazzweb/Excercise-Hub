'use client'

import { useState, useRef } from 'react'
import { ChevronDown, ChevronUp, Play } from 'lucide-react'
import WorkoutTimer from '../../components/WorkoutTimer'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import { logWorkout } from '../../actions/workout-log'

function ExerciseRow({ index, exerciseEntry, exercise }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors text-left"
      >
        <span className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center text-orange-500 text-sm font-bold shrink-0">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">
            {exercise?.name || exerciseEntry.exerciseId}
          </p>
          <p className="text-zinc-500 text-xs mt-0.5">{exercise?.category}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-zinc-300 text-sm font-medium">
            {exerciseEntry.sets} × {exerciseEntry.reps}
          </span>
          <span className="text-zinc-600 text-xs hidden sm:block">
            {exerciseEntry.rest}s rest
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-zinc-800 bg-zinc-900/50">
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video embed */}
            {exercise?.youtubeId && (
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Form Video
                </p>
                <YouTubeEmbed
                  videoId={exercise.youtubeId}
                  title={`${exercise.name} form guide`}
                />
              </div>
            )}

            {/* Form tips */}
            {exercise?.formTips && (
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Form Tips
                </p>
                <ul className="space-y-2">
                  {exercise.formTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-orange-500 mt-0.5 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function WorkoutDetailClient({ workout, exercises, relatedWorkouts }) {
  const [timerOpen, setTimerOpen] = useState(false)
  const startTimeRef = useRef(null)

  function handleStartWorkout() {
    startTimeRef.current = Date.now()
    setTimerOpen(true)
  }

  async function handleTimerComplete(completed) {
    setTimerOpen(false)
    if (completed) {
      const durationMinutes = startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 60000)
        : 0
      try {
        await logWorkout({ workout_id: workout.id, workout_title: workout.title, duration_minutes: durationMinutes })
      } catch (e) {
        console.error('Failed to log workout:', e)
      }
    }
    startTimeRef.current = null
  }

  return (
    <>
      {/* Start button */}
      <button
        onClick={handleStartWorkout}
        className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-colors shadow-xl shadow-orange-500/20"
      >
        <Play className="w-5 h-5" fill="white" />
        Start Workout
      </button>

      {/* Exercise list */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4">Exercises</h2>
        <div className="space-y-3">
          {workout.exercises.map((entry, i) => {
            const exercise = exercises.find((e) => e.id === entry.exerciseId)
            return (
              <ExerciseRow
                key={i}
                index={i}
                exerciseEntry={entry}
                exercise={exercise}
              />
            )
          })}
        </div>
      </div>

      {/* Workout timer modal */}
      {timerOpen && (
        <WorkoutTimer
          exercises={workout.exercises}
          onComplete={handleTimerComplete}
        />
      )}
    </>
  )
}
