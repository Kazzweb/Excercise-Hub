'use server'

import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'

export async function logMeal({ date, meal_type, food_name, calories, protein_g = 0, carbs_g = 0, fat_g = 0 }) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('calorie_logs')
    .insert([{ user_id: userId, date, meal_type, food_name, calories: Number(calories), protein_g: Number(protein_g), carbs_g: Number(carbs_g), fat_g: Number(fat_g) }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getMealsForDate(date) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('calorie_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function deleteMeal(id) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('calorie_logs')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
}

// Returns all unique dates (YYYY-MM-DD) where the user logged at least one meal
export async function getActivityDates() {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('calorie_logs')
    .select('date')
    .eq('user_id', userId)

  if (error) throw new Error(error.message)

  // Deduplicate dates
  const unique = [...new Set((data ?? []).map(r => r.date))]
  return unique
}
