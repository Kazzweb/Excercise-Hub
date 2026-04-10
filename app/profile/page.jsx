'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { updateProfile } from '../actions/onboarding'

const GOALS = [
  { id: 'strength',    label: 'Build Strength' },
  { id: 'muscle',      label: 'Gain Muscle' },
  { id: 'weight-loss', label: 'Lose Weight' },
  { id: 'cardio',      label: 'Improve Cardio' },
  { id: 'flexibility', label: 'Flexibility' },
]
const LEVELS = [
  { id: 'beginner',     label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced',     label: 'Advanced' },
]
const ACTIVITY_LEVELS = [
  { id: 'sedentary',   label: 'Sedentary',   desc: 'Little or no exercise',     factor: 1.2 },
  { id: 'light',       label: 'Light',        desc: '1–3 days / week',           factor: 1.375 },
  { id: 'moderate',    label: 'Moderate',     desc: '3–5 days / week',           factor: 1.55 },
  { id: 'active',      label: 'Active',       desc: '6–7 days / week',           factor: 1.725 },
  { id: 'very-active', label: 'Very Active',  desc: 'Physical job + training',   factor: 1.9 },
]
const GENDERS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
]

// Mifflin-St Jeor
function calcBMR({ gender, weightKg, heightCm, age }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  if (gender === 'female') return base - 161
  if (gender === 'male')   return base + 5
  return base - 78
}

function calcTDEE(bmr, activityLevel) {
  const factor = ACTIVITY_LEVELS.find(a => a.id === activityLevel)?.factor ?? 1.55
  return Math.round(bmr * factor)
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [saving, setSaving]   = useState(false)
  const [saved,  setSaved]    = useState(false)
  const [error,  setError]    = useState('')
  const [form,   setForm]     = useState(null)

  useEffect(() => {
    if (!isLoaded || !user) return
    const m = user.publicMetadata ?? {}
    setForm({
      gender:        m.gender        ?? '',
      age:           m.age           ?? '',
      heightCm:      m.heightCm      ?? '',
      weightKg:      m.weightKg      ?? '',
      goal:          m.goal          ?? '',
      level:         m.level         ?? '',
      activityLevel: m.activityLevel ?? '',
    })
  }, [isLoaded, user])

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
    setError('')
  }

  // Live calculations
  const canCalc = form?.gender && form?.age && form?.heightCm && form?.weightKg
  const bmr  = canCalc ? Math.round(calcBMR({ gender: form.gender, weightKg: Number(form.weightKg), heightCm: Number(form.heightCm), age: Number(form.age) })) : null
  const tdee = bmr && form?.activityLevel ? calcTDEE(bmr, form.activityLevel) : null
  const bmi  = (form?.heightCm && form?.weightKg)
    ? (Number(form.weightKg) / Math.pow(Number(form.heightCm) / 100, 2)).toFixed(1)
    : null

  function bmiLabel(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: '#005fa3' }
    if (bmi < 25)   return { label: 'Healthy',     color: '#006645' }
    if (bmi < 30)   return { label: 'Overweight',  color: '#7a4a00' }
    return                  { label: 'Obese',       color: '#e8190c' }
  }

  async function handleSave() {
    if (!form) return
    if (!form.gender || !form.age || !form.heightCm || !form.weightKg || !form.goal || !form.level || !form.activityLevel) {
      setError('Please fill in all fields before saving.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const a = Number(form.age), h = Number(form.heightCm), w = Number(form.weightKg)
      const newBmr  = Math.round(calcBMR({ gender: form.gender, weightKg: w, heightCm: h, age: a }))
      const newTdee = calcTDEE(newBmr, form.activityLevel)
      await updateProfile({ ...form, age: a, heightCm: h, weightKg: w, bmr: newBmr, tdee: newTdee })
      setSaved(true)
    } catch (e) {
      console.error(e)
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (!isLoaded || !form) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#aaa', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Loading…
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)]" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Header */}
        <div className="mb-12">
          <span style={monoLabel}>Account</span>
          <div style={{ width: 36, height: 3, background: '#e8190c', margin: '0.75rem 0 1rem' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', color: 'var(--text)', lineHeight: 0.92, letterSpacing: '0.02em' }}>
            YOUR <em style={{ fontStyle: 'normal', color: '#e8190c' }}>PROFILE</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-2)', marginTop: '0.75rem' }}>
            Update your stats anytime — your calorie targets and workout suggestions update automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: form ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Body stats */}
            <Section title="Body Stats">
              <Field label="Gender">
                <div className="flex gap-2 flex-wrap">
                  {GENDERS.map(g => (
                    <button key={g.id} type="button" onClick={() => set('gender', g.id)} style={chipStyle(form.gender === g.id, 'dark')}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Age (years)">
                  <input type="number" min={10} max={100} value={form.age} onChange={e => set('age', e.target.value)} style={inputStyle} placeholder="e.g. 25" />
                </Field>
                <Field label="Height (cm)">
                  <input type="number" min={100} max={250} value={form.heightCm} onChange={e => set('heightCm', e.target.value)} style={inputStyle} placeholder="e.g. 175" />
                </Field>
                <Field label="Weight (kg)">
                  <input type="number" min={30} max={300} value={form.weightKg} onChange={e => set('weightKg', e.target.value)} style={inputStyle} placeholder="e.g. 70" />
                </Field>
              </div>
            </Section>

            {/* Goals */}
            <Section title="Goals & Level">
              <Field label="Primary Goal">
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(g => (
                    <button key={g.id} type="button" onClick={() => set('goal', g.id)} style={chipStyle(form.goal === g.id, 'red')}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Fitness Level">
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(l => (
                    <button key={l.id} type="button" onClick={() => set('level', l.id)} style={chipStyle(form.level === l.id, 'dark')}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </Field>
            </Section>

            {/* Activity */}
            <Section title="Activity Level">
              <div className="flex flex-col gap-2">
                {ACTIVITY_LEVELS.map(a => (
                  <button key={a.id} type="button" onClick={() => set('activityLevel', a.id)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', border: form.activityLevel === a.id ? '2px solid #0c0c0c' : '1px solid var(--border)', background: form.activityLevel === a.id ? '#0c0c0c' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: form.activityLevel === a.id ? '#f0ece0' : 'var(--text)' }}>{a.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: form.activityLevel === a.id ? 'rgba(240,236,224,0.55)' : 'var(--text-2)' }}>{a.desc}</span>
                  </button>
                ))}
              </div>
            </Section>

            {/* Save */}
            {error && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#e8190c', letterSpacing: '0.06em' }}>{error}</p>}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary px-8 py-4 self-start"
              style={{ opacity: saving ? 0.65 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
            >
              {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes →'}
            </button>
          </div>

          {/* ── Right: live stats panel ── */}
          <div className="flex flex-col gap-4">
            <span style={monoLabel}>Your Numbers</span>

            {/* BMI */}
            <StatCard
              label="BMI"
              value={bmi ?? '—'}
              unit=""
              sub={bmi ? bmiLabel(Number(bmi)).label : 'Add height & weight'}
              subColor={bmi ? bmiLabel(Number(bmi)).color : '#aaa'}
            />

            {/* BMR */}
            <StatCard
              label="BMR — Calories at Rest"
              value={bmr ?? '—'}
              unit={bmr ? 'kcal / day' : ''}
              sub="Mifflin-St Jeor equation"
            />

            {/* TDEE */}
            <StatCard
              label="TDEE — Daily Maintenance"
              value={tdee ?? '—'}
              unit={tdee ? 'kcal / day' : ''}
              sub={form.activityLevel ? '' : 'Select activity level'}
              highlight
            />

            {/* Goal targets */}
            {tdee && (
              <div style={{ border: '1px solid var(--border)', padding: '1rem' }}>
                <p style={monoLabel}>Calorie Targets</p>
                <div className="flex flex-col gap-3 mt-3">
                  {[
                    { label: 'Lose weight',  kcal: tdee - 500, note: '500 kcal deficit' },
                    { label: 'Maintain',     kcal: tdee,       note: 'Maintenance' },
                    { label: 'Build muscle', kcal: tdee + 300, note: '300 kcal surplus' },
                  ].map(t => (
                    <div key={t.label} className="flex justify-between items-center">
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.label}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#ccc', letterSpacing: '0.06em' }}>{t.note}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: t.label === 'Maintain' ? '#e8190c' : 'var(--text)', lineHeight: 1 }}>
                        {t.kcal}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#aaa', marginLeft: '0.3rem' }}>kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula note */}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#bbb', letterSpacing: '0.06em', lineHeight: 1.5 }}>
              Calculated using the Mifflin-St Jeor equation — the most clinically validated BMR formula (±10% accuracy for most adults).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ border: '1px solid var(--border)', padding: '1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#aaa', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{title}</p>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0c0c0c', fontWeight: 600 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function StatCard({ label, value, unit, sub, subColor = '#aaa', highlight = false }) {
  return (
    <div style={{ border: `1px solid ${highlight ? 'rgba(232,25,12,0.3)' : 'var(--border)'}`, background: highlight ? 'rgba(232,25,12,0.04)' : 'transparent', padding: '1rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#aaa', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: highlight ? '#e8190c' : 'var(--text)', lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#aaa' }}>{unit}</span>}
      </div>
      {sub && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: subColor, letterSpacing: '0.06em', marginTop: '0.2rem' }}>{sub}</p>}
    </div>
  )
}

function chipStyle(active, variant) {
  return {
    padding: '0.45rem 1rem',
    border: active ? `2px solid ${variant === 'red' ? '#e8190c' : '#0c0c0c'}` : '1px solid var(--border)',
    background: active ? (variant === 'red' ? 'rgba(232,25,12,0.08)' : '#0c0c0c') : 'transparent',
    color: active ? (variant === 'red' ? '#e8190c' : '#f0ece0') : 'var(--text-2)',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }
}

const inputStyle = {
  width: '100%', padding: '0.75rem 1rem', border: '1px solid #cdc8b8',
  borderRadius: 0, background: '#e8e4d4', color: '#0c0c0c',
  fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', outline: 'none',
}

const monoLabel = { fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#aaa', letterSpacing: '0.14em', textTransform: 'uppercase' }
