'use server'

import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'

export async function enrollInChallenge(challengeId) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('challenge_enrollments')
    .upsert([{ user_id: userId, challenge_id: challengeId, start_date: today }], { onConflict: 'user_id,challenge_id' })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function completeChallengeDay(challengeId, dayNumber) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('challenge_day_logs')
    .upsert([{ user_id: userId, challenge_id: challengeId, day_number: dayNumber }], { onConflict: 'user_id,challenge_id,day_number' })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function uncompleteChallengeDay(challengeId, dayNumber) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('challenge_day_logs')
    .delete()
    .eq('user_id', userId)
    .eq('challenge_id', challengeId)
    .eq('day_number', dayNumber)

  if (error) throw new Error(error.message)
}

// Returns { enrollment, completedDays: Set<number> } for a single challenge
export async function getChallengeProgress(challengeId) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const [{ data: enrollment }, { data: logs }] = await Promise.all([
    supabase.from('challenge_enrollments').select('*').eq('user_id', userId).eq('challenge_id', challengeId).maybeSingle(),
    supabase.from('challenge_day_logs').select('day_number').eq('user_id', userId).eq('challenge_id', challengeId),
  ])

  return {
    enrollment: enrollment ?? null,
    completedDays: (logs ?? []).map(l => l.day_number),
  }
}

// Returns all enrollments + completed day counts for the user
export async function getUserChallenges() {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const [{ data: enrollments }, { data: logs }] = await Promise.all([
    supabase.from('challenge_enrollments').select('*').eq('user_id', userId),
    supabase.from('challenge_day_logs').select('challenge_id, day_number').eq('user_id', userId),
  ])

  const countMap = {}
  for (const log of logs ?? []) {
    countMap[log.challenge_id] = (countMap[log.challenge_id] ?? 0) + 1
  }

  return (enrollments ?? []).map(e => ({
    ...e,
    completedCount: countMap[e.challenge_id] ?? 0,
  }))
}
