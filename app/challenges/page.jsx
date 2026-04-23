'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Dumbbell, Clock, Zap, Star } from 'lucide-react'
import { challenges } from '../data/challenges'
import { getUserChallenges } from '../actions/challenges'

const EQUIPMENT_LABELS = { none: 'No Equipment', gym: 'Gym', dumbbells: 'Dumbbells' }
const LEVEL_LABELS     = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
const GOAL_FILTERS     = [
  { id: 'all',         label: 'All' },
  { id: 'weight-loss', label: 'Fat Loss' },
  { id: 'muscle',      label: 'Muscle' },
  { id: 'strength',    label: 'Strength' },
  { id: 'cardio',      label: 'Cardio' },
  { id: 'flexibility', label: 'Flexibility' },
]

export default function ChallengesPage() {
  const { user, isLoaded } = useUser()
  const [filter, setFilter]         = useState('all')
  const [enrollments, setEnrollments] = useState([])

  const userGoal = user?.publicMetadata?.goal ?? null

  useEffect(() => {
    getUserChallenges()
      .then(setEnrollments)
      .catch(() => {})
  }, [])

  const enrollmentMap = Object.fromEntries(enrollments.map(e => [e.challenge_id, e]))

  const filtered = filter === 'all' ? challenges : challenges.filter(c => c.goal === filter)

  // Recommended challenge based on user goal
  const recommended = userGoal ? challenges.find(c => c.goal === userGoal) : null

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 fade-up-1">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">30-Day Challenges</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-none">
            PICK YOUR <span className="text-orange-500">CHALLENGE</span>
          </h1>
          <p className="mt-3 text-sm text-zinc-400 max-w-lg">
            Science-backed 30-day programs tailored to your goal. Progressive overload built in every week.
          </p>
        </div>

        {/* Recommended for you */}
        {isLoaded && recommended && !enrollmentMap[recommended.id] && (
          <div className="mb-8 fade-up-2">
            <div className="relative overflow-hidden rounded-2xl border p-5" style={{ borderColor: `${recommended.color}30`, background: `${recommended.color}08` }}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: `${recommended.color}15` }} />
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">Recommended for you</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{recommended.emoji}</span>
                    <h3 className="font-display text-xl font-bold text-white">{recommended.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">{recommended.subtitle}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Tag>{recommended.duration} days</Tag>
                    <Tag>{LEVEL_LABELS[recommended.level]}</Tag>
                    <Tag>{EQUIPMENT_LABELS[recommended.equipment]}</Tag>
                  </div>
                </div>
                <Link href={`/challenges/${recommended.id}`} className="btn-primary shrink-0 whitespace-nowrap">
                  Start →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Active challenges */}
        {enrollments.length > 0 && (
          <div className="mb-8 fade-up-2">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-3">Active Challenges</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {enrollments.map(e => {
                const challenge = challenges.find(c => c.id === e.challenge_id)
                if (!challenge) return null
                const pct = Math.round((e.completedCount / challenge.duration) * 100)
                return (
                  <Link key={e.challenge_id} href={`/challenges/${e.challenge_id}`}
                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-colors">
                    <span className="text-3xl">{challenge.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-white text-sm truncate">{challenge.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: challenge.color }} />
                        </div>
                        <span className="text-xs font-mono text-zinc-500 shrink-0">{e.completedCount}/{challenge.duration}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Filter strip */}
        <div className="flex gap-2 flex-wrap mb-6 fade-up-2">
          {GOAL_FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === f.id
                  ? 'bg-orange-500 text-white border-0'
                  : 'bg-white/5 text-zinc-400 border border-white/8'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Challenge cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 fade-up-3">
          {filtered.map(challenge => {
            const enrollment = enrollmentMap[challenge.id]
            const pct = enrollment ? Math.round((enrollment.completedCount / challenge.duration) * 100) : 0

            return (
              <Link key={challenge.id} href={`/challenges/${challenge.id}`}
                className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-black/40">

                {/* Color bar */}
                <div className="h-1.5 w-full" style={{ background: challenge.color }} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Emoji + title */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-3xl block mb-2">{challenge.emoji}</span>
                      <h3 className="font-display font-bold text-white text-lg leading-tight">{challenge.title}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{challenge.subtitle}</p>
                    </div>
                    {enrollment && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0 ml-2">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 mb-4">
                    <StatPill icon={<Clock className="w-3 h-3" />} label={`${challenge.duration}d`} />
                    <StatPill icon={<Zap className="w-3 h-3" />} label={`${challenge.daysPerWeek}×/wk`} />
                    <StatPill icon={<Dumbbell className="w-3 h-3" />} label={EQUIPMENT_LABELS[challenge.equipment]} />
                  </div>

                  {/* Benefits */}
                  <ul className="flex flex-col gap-1.5 mb-5 flex-1">
                    {challenge.benefits.slice(0, 3).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="mt-0.5 shrink-0" style={{ color: challenge.color }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Progress bar (if enrolled) */}
                  {enrollment && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-mono text-zinc-500">Progress</span>
                        <span className="text-xs font-mono text-zinc-400">{enrollment.completedCount}/{challenge.duration} days</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: challenge.color }} />
                      </div>
                    </div>
                  )}

                  {/* Level badge + CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-mono px-2 py-1 rounded-full border border-zinc-700 text-zinc-400">
                      {LEVEL_LABELS[challenge.level]}
                    </span>
                    <span className="text-xs font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                      {enrollment ? 'Continue →' : 'Start Challenge →'}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Tag({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400">
      {children}
    </span>
  )
}

function StatPill({ icon, label }) {
  return (
    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800/60 border border-zinc-700/50">
      <span className="text-zinc-500">{icon}</span>
      <span className="text-xs font-mono text-zinc-400">{label}</span>
    </div>
  )
}
