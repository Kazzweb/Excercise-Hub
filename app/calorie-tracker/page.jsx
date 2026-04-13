'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { Trash2, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { logMeal, getMealsForDate, deleteMeal } from '../actions/calorie'

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack']

const MEAL_COLORS = {
  breakfast: '#f59e0b',
  lunch:     '#22c55e',
  dinner:    '#6366f1',
  snack:     '#ec4899',
}

function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const today = toLocalDateStr(new Date())
  const yesterday = toLocalDateStr(new Date(Date.now() - 86400000))
  if (dateStr === today) return 'Today'
  if (dateStr === yesterday) return 'Yesterday'
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const emptyForm = { food_name: '', calories: '', protein_g: '', carbs_g: '', fat_g: '' }

export default function CalorieTrackerPage() {
  const { user, isLoaded } = useUser()
  const [date, setDate]     = useState(toLocalDateStr(new Date()))
  const [meals, setMeals]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]   = useState(null) // null | meal_type string
  const [form, setForm]     = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const tdee = user?.publicMetadata?.tdee ?? null
  const goal = user?.publicMetadata?.goal ?? null

  const calorieTarget = tdee
    ? goal === 'weight-loss' ? tdee - 500
    : goal === 'muscle'      ? tdee + 300
    : tdee
    : null

  const loadMeals = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getMealsForDate(date)
      setMeals(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => { loadMeals() }, [loadMeals])

  function changeDate(offset) {
    const [y, m, d] = date.split('-').map(Number)
    const next = new Date(y, m - 1, d + offset)
    setDate(toLocalDateStr(next))
  }

  function openModal(mealType) {
    setForm(emptyForm)
    setFormError('')
    setModal(mealType)
  }

  function closeModal() {
    setModal(null)
    setForm(emptyForm)
    setFormError('')
  }

  async function handleAdd() {
    if (!form.food_name.trim()) { setFormError('Food name is required.'); return }
    if (!form.calories || isNaN(Number(form.calories)) || Number(form.calories) <= 0) {
      setFormError('Enter a valid calorie amount.'); return
    }
    setSaving(true)
    setFormError('')
    try {
      await logMeal({ date, meal_type: modal, food_name: form.food_name.trim(), calories: form.calories, protein_g: form.protein_g || 0, carbs_g: form.carbs_g || 0, fat_g: form.fat_g || 0 })
      closeModal()
      await loadMeals()
    } catch (e) {
      setFormError('Failed to save. Try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMeal(id)
      setMeals(prev => prev.filter(m => m.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  // Totals
  const totals = meals.reduce((acc, m) => ({
    calories:  acc.calories  + m.calories,
    protein_g: acc.protein_g + (m.protein_g ?? 0),
    carbs_g:   acc.carbs_g   + (m.carbs_g   ?? 0),
    fat_g:     acc.fat_g     + (m.fat_g     ?? 0),
  }), { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 })

  const progressPct = calorieTarget ? Math.min((totals.calories / calorieTarget) * 100, 100) : 0
  const remaining   = calorieTarget ? calorieTarget - totals.calories : null
  const over        = remaining !== null && remaining < 0

  const mealsByType = MEAL_TYPES.reduce((acc, t) => {
    acc[t] = meals.filter(m => m.meal_type === t)
    return acc
  }, {})

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 fade-up-1">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">Nutrition</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-none">
            CALORIE <span className="text-orange-500">TRACKER</span>
          </h1>
          {!tdee && (
            <p className="mt-3 text-sm text-zinc-400">
              Complete your <a href="/profile" className="text-orange-500 underline underline-offset-2">profile</a> to set your calorie target.
            </p>
          )}
        </div>

        {/* Date nav */}
        <div className="flex items-center justify-between mb-6 fade-up-2">
          <button onClick={() => changeDate(-1)} className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-white">{formatDate(date)}</p>
            <p className="text-xs text-zinc-500 font-mono">{date}</p>
          </div>
          <button
            onClick={() => changeDate(1)}
            disabled={date === toLocalDateStr(new Date())}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Daily summary card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 fade-up-2">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">Calories consumed</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-white leading-none">{totals.calories}</span>
                {calorieTarget && (
                  <span className="text-sm text-zinc-400 font-mono">/ {calorieTarget} kcal</span>
                )}
              </div>
            </div>
            {calorieTarget && (
              <div className="text-right">
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">
                  {over ? 'Over by' : 'Remaining'}
                </p>
                <p className={`font-display text-2xl font-bold leading-none ${over ? 'text-red-400' : 'text-orange-500'}`}>
                  {Math.abs(remaining)} kcal
                </p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {calorieTarget && (
            <div className="mb-5">
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPct}%`,
                    background: over ? '#f87171' : progressPct > 85 ? '#f59e0b' : '#ff4d3d',
                  }}
                />
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">{Math.round(progressPct)}% of daily goal</p>
            </div>
          )}

          {/* Macros */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Protein', value: Math.round(totals.protein_g), unit: 'g', color: '#22c55e' },
              { label: 'Carbs',   value: Math.round(totals.carbs_g),   unit: 'g', color: '#6366f1' },
              { label: 'Fat',     value: Math.round(totals.fat_g),     unit: 'g', color: '#f59e0b' },
            ].map(macro => (
              <div key={macro.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">{macro.label}</p>
                <p className="font-display text-xl font-bold" style={{ color: macro.color }}>
                  {macro.value}<span className="text-xs text-zinc-400 ml-0.5">{macro.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meal sections */}
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Loading meals…</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 fade-up-3">
            {MEAL_TYPES.map(type => {
              const entries = mealsByType[type]
              const typeTotal = entries.reduce((s, m) => s + m.calories, 0)
              const color = MEAL_COLORS[type]
              return (
                <div key={type} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                  {/* Meal header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="font-display font-bold text-white capitalize tracking-wide">{type}</span>
                      {entries.length > 0 && (
                        <span className="text-xs font-mono text-zinc-500">{typeTotal} kcal</span>
                      )}
                    </div>
                    <button
                      onClick={() => openModal(type)}
                      className="flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>

                  {/* Meal entries */}
                  {entries.length === 0 ? (
                    <p className="px-4 py-3 text-xs text-zinc-600 font-mono italic">No items logged</p>
                  ) : (
                    <div className="divide-y divide-zinc-800/50">
                      {entries.map(entry => (
                        <div key={entry.id} className="flex items-center justify-between px-4 py-3 group">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{entry.food_name}</p>
                            <div className="flex gap-3 mt-0.5">
                              {entry.protein_g > 0 && <span className="text-xs text-zinc-500 font-mono">P: {entry.protein_g}g</span>}
                              {entry.carbs_g   > 0 && <span className="text-xs text-zinc-500 font-mono">C: {entry.carbs_g}g</span>}
                              {entry.fat_g     > 0 && <span className="text-xs text-zinc-500 font-mono">F: {entry.fat_g}g</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-3">
                            <span className="font-display font-bold text-white text-sm">{entry.calories} kcal</span>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add meal modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500">Log food</p>
                <h2 className="font-display text-xl font-bold text-white capitalize mt-0.5">{modal}</h2>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Food name */}
              <div>
                <label className="text-xs font-mono tracking-widest uppercase text-zinc-400 block mb-1.5">Food name *</label>
                <input
                  type="text"
                  placeholder="e.g. Grilled chicken breast"
                  value={form.food_name}
                  onChange={e => setForm(p => ({ ...p, food_name: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
              </div>

              {/* Calories */}
              <div>
                <label className="text-xs font-mono tracking-widest uppercase text-zinc-400 block mb-1.5">Calories (kcal) *</label>
                <input
                  type="number"
                  placeholder="e.g. 250"
                  min={1}
                  value={form.calories}
                  onChange={e => setForm(p => ({ ...p, calories: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
              </div>

              {/* Macros row */}
              <div>
                <label className="text-xs font-mono tracking-widest uppercase text-zinc-400 block mb-1.5">Macros (optional)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'protein_g', label: 'Protein g' },
                    { key: 'carbs_g',   label: 'Carbs g' },
                    { key: 'fat_g',     label: 'Fat g' },
                  ].map(({ key, label }) => (
                    <input
                      key={key}
                      type="number"
                      placeholder={label}
                      min={0}
                      value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                    />
                  ))}
                </div>
              </div>

              {formError && (
                <p className="text-xs font-mono text-red-400">{formError}</p>
              )}

              <button
                onClick={handleAdd}
                disabled={saving}
                className="btn-primary w-full py-3 mt-1"
                style={{ opacity: saving ? 0.6 : 1 }}
              >
                {saving ? 'Saving…' : 'Add to Log →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
