'use server'

import { auth } from '@clerk/nextjs/server'
import { createServerSupabaseClient } from '../../lib/supabase-server'

export async function logWorkout({ workout_id, workout_title, duration_minutes }) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')
  const supabase = await createServerSupabaseClient()

  const today = new Date()
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const { data, error } = await supabase
    .from('workout_logs')
    .insert([{ user_id: userId, workout_id, workout_title, date, duration_minutes: Number(duration_minutes ?? 0), completed: true }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Returns all unique dates (YYYY-MM-DD) where the user completed a workout
export async function getWorkoutActivityDates() {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('workout_logs')
    .select('date')
    .eq('user_id', userId)
    .eq('completed', true)

  if (error) throw new Error(error.message)

  const unique = [...new Set((data ?? []).map(r => r.date))]
  return unique
}
