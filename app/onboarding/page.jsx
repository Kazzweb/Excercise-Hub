'use client';

import { useState } from 'react';
import { completeOnboarding } from '../actions/onboarding';

const GOALS = [
  { id: 'strength', label: 'Build Strength' },
  { id: 'muscle', label: 'Gain Muscle' },
  { id: 'weight-loss', label: 'Lose Weight' },
  { id: 'cardio', label: 'Improve Cardio' },
  { id: 'flexibility', label: 'Flexibility' },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { id: 'light', label: 'Light', desc: '1–3 days / week' },
  { id: 'moderate', label: 'Moderate', desc: '3–5 days / week' },
  { id: 'active', label: 'Active', desc: '6–7 days / week' },
  { id: 'very-active', label: 'Very Active', desc: 'Physical job + training' },
];

const GENDERS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
];

// Mifflin-St Jeor BMR → multiply by TDEE factor
const TDEE_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

// Mifflin-St Jeor equation (most validated formula for general population)
// Male:   BMR = 10W + 6.25H - 5A + 5
// Female: BMR = 10W + 6.25H - 5A - 161
// Other:  average of both = 10W + 6.25H - 5A - 78
function calcBMR({ gender, weightKg, heightCm, age }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'female') return base - 161;
  if (gender === 'male') return base + 5;
  return base - 78; // average of male (+5) and female (-161)
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    heightCm: '',
    weightKg: '',
    goal: '',
    level: '',
    activityLevel: '',
  });

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function validateStep() {
    if (step === 1) {
      if (!form.name.trim()) return 'Please enter your name.';
      if (!form.gender) return 'Please select your gender.';
      if (!form.age || Number(form.age) < 10 || Number(form.age) > 100)
        return 'Please enter a valid age (10–100).';
    }
    if (step === 2) {
      if (
        !form.heightCm ||
        Number(form.heightCm) < 100 ||
        Number(form.heightCm) > 250
      )
        return 'Please enter a valid height (100–250 cm).';
      if (
        !form.weightKg ||
        Number(form.weightKg) < 30 ||
        Number(form.weightKg) > 300
      )
        return 'Please enter a valid weight (30–300 kg).';
    }
    if (step === 3) {
      if (!form.goal) return 'Please select your primary goal.';
      if (!form.level) return 'Please select your fitness level.';
      if (!form.activityLevel) return 'Please select your activity level.';
    }
    return '';
  }

  function next() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setStep((s) => s + 1);
  }

  async function submit() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }

    const w = Number(form.weightKg);
    const h = Number(form.heightCm);
    const a = Number(form.age);
    const bmr = Math.round(
      calcBMR({ gender: form.gender, weightKg: w, heightCm: h, age: a }),
    );
    const tdee = Math.round(bmr * (TDEE_FACTORS[form.activityLevel] ?? 1.55));

    setSaving(true);
    try {
      // Everything goes through the server action — avoids client-side race conditions
      await completeOnboarding({
        firstName: form.name.split(' ')[0],
        lastName: form.name.split(' ').slice(1).join(' ') || null,
        gender: form.gender,
        age: a,
        heightCm: h,
        weightKg: w,
        goal: form.goal,
        level: form.level,
        activityLevel: form.activityLevel,
        bmr,
        tdee,
      });
      window.location.href = '/';
    } catch (e) {
      console.error('Onboarding error:', e);
      setError('Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  const progress = (step / 3) * 100;

  return (
    <div
      className='min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16'
      style={{ background: 'var(--bg)' }}
    >
      <div className='w-full max-w-lg fade-up-1'>
        {/* Progress */}
        <div className='mb-10'>
          <span style={monoLabel}>Step {step} of 3</span>
          <div
            className='mt-3 mb-6'
            style={{
              height: 3,
              background: 'var(--border)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${progress}%`,
                background: '#e8190c',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div
            style={{
              width: 36,
              height: 3,
              background: '#e8190c',
              marginBottom: '1.25rem',
            }}
          />
          <h1 style={headingStyle}>
            {step === 1 && (
              <>
                TELL US
                <br />
                <em style={red}>ABOUT YOU</em>
              </>
            )}
            {step === 2 && (
              <>
                YOUR
                <br />
                <em style={red}>BODY STATS</em>
              </>
            )}
            {step === 3 && (
              <>
                YOUR
                <br />
                <em style={red}>GOALS</em>
              </>
            )}
          </h1>
        </div>

        {/* ── Step 1: Name · Gender · Age ── */}
        {step === 1 && (
          <div className='flex flex-col gap-5 fade-up-2'>
            <Field label='Full Name'>
              <input
                type='text'
                placeholder='e.g. Alex Johnson'
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label='Gender'>
              <div className='flex gap-2'>
                {GENDERS.map((g) => (
                  <button
                    key={g.id}
                    type='button'
                    onClick={() => set('gender', g.id)}
                    style={chipStyle(form.gender === g.id, 'dark')}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label='Age'>
              <input
                type='number'
                placeholder='e.g. 25'
                min={10}
                max={100}
                value={form.age}
                onChange={(e) => set('age', e.target.value)}
                style={inputStyle}
              />
            </Field>
          </div>
        )}

        {/* ── Step 2: Height · Weight ── */}
        {step === 2 && (
          <div className='flex flex-col gap-5 fade-up-2'>
            <Field label='Height (cm)'>
              <input
                type='number'
                placeholder='e.g. 175'
                min={100}
                max={250}
                value={form.heightCm}
                onChange={(e) => set('heightCm', e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label='Weight (kg)'>
              <input
                type='number'
                placeholder='e.g. 75'
                min={30}
                max={300}
                value={form.weightKg}
                onChange={(e) => set('weightKg', e.target.value)}
                style={inputStyle}
              />
            </Field>

            {/* Live BMR preview once both fields are filled */}
            {form.heightCm && form.weightKg && form.age && form.gender && (
              <div
                style={{
                  border: '1px solid rgba(232,25,12,0.25)',
                  background: 'rgba(232,25,12,0.05)',
                }}
              >
                <div
                  style={{
                    padding: '0.9rem 1rem 0.6rem',
                    borderBottom: '1px solid rgba(232,25,12,0.15)',
                  }}
                >
                  <p style={monoLabel}>
                    Basal Metabolic Rate (Mifflin-St Jeor)
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.2rem',
                      color: '#e8190c',
                      lineHeight: 1,
                      marginTop: '0.3rem',
                    }}
                  >
                    {Math.round(
                      calcBMR({
                        gender: form.gender,
                        weightKg: Number(form.weightKg),
                        heightCm: Number(form.heightCm),
                        age: Number(form.age),
                      }),
                    )}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: '#aaa',
                        marginLeft: '0.5rem',
                      }}
                    >
                      kcal / day
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: '#888',
                      marginTop: '0.3rem',
                    }}
                  >
                    Calories your body needs at complete rest
                  </p>
                </div>
                {/* Show exactly which values are feeding the formula */}
                <div
                  style={{
                    padding: '0.6rem 1rem',
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    ['Gender', form.gender],
                    ['Age', `${form.age} yrs`],
                    ['Height', `${form.heightCm} cm`],
                    ['Weight', `${form.weightKg} kg`],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.55rem',
                          color: '#aaa',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text)',
                          letterSpacing: '0.05em',
                          textTransform: 'capitalize',
                          marginTop: '0.1rem',
                        }}
                      >
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 3: Goal · Level · Activity ── */}
        {step === 3 && (
          <div className='flex flex-col gap-7 fade-up-2'>
            <Field label='Primary Goal'>
              <div className='flex flex-wrap gap-2'>
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    type='button'
                    onClick={() => set('goal', g.id)}
                    style={chipStyle(form.goal === g.id, 'red')}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label='Fitness Level'>
              <div className='flex flex-wrap gap-2'>
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    type='button'
                    onClick={() => set('level', l.id)}
                    style={chipStyle(form.level === l.id, 'dark')}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label='How active are you?'>
              <div className='flex flex-col gap-2'>
                {ACTIVITY_LEVELS.map((a) => (
                  <button
                    key={a.id}
                    type='button'
                    onClick={() => set('activityLevel', a.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 1rem',
                      border:
                        form.activityLevel === a.id
                          ? '2px solid #0c0c0c'
                          : '1px solid var(--border)',
                      background:
                        form.activityLevel === a.id ? '#0c0c0c' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:
                          form.activityLevel === a.id
                            ? '#f0ece0'
                            : 'var(--text)',
                      }}
                    >
                      {a.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color:
                          form.activityLevel === a.id
                            ? 'rgba(240,236,224,0.55)'
                            : 'var(--text-2)',
                      }}
                    >
                      {a.desc}
                    </span>
                  </button>
                ))}
              </div>
            </Field>

            {/* TDEE preview */}
            {form.activityLevel &&
              form.heightCm &&
              form.weightKg &&
              form.age &&
              form.gender &&
              (() => {
                const bmr = calcBMR({
                  gender: form.gender,
                  weightKg: Number(form.weightKg),
                  heightCm: Number(form.heightCm),
                  age: Number(form.age),
                });
                const tdee = Math.round(
                  bmr * (TDEE_FACTORS[form.activityLevel] ?? 1.55),
                );
                const cut = Math.round(tdee - 500);
                const bulk = Math.round(tdee + 300);
                return (
                  <div
                    style={{
                      border: '1px solid rgba(232,25,12,0.25)',
                      background: 'rgba(232,25,12,0.05)',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.9rem 1rem 0.6rem',
                        borderBottom: '1px solid rgba(232,25,12,0.15)',
                      }}
                    >
                      <p style={monoLabel}>
                        Total Daily Energy Expenditure (TDEE)
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '2.2rem',
                          color: '#e8190c',
                          lineHeight: 1,
                          marginTop: '0.3rem',
                        }}
                      >
                        {tdee}
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: '#aaa',
                            marginLeft: '0.5rem',
                          }}
                        >
                          kcal / day
                        </span>
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: '#888',
                          marginTop: '0.3rem',
                        }}
                      >
                        Maintenance calories based on your stats + activity
                        level
                      </p>
                    </div>
                    {/* Goal-adjusted targets */}
                    <div
                      style={{
                        padding: '0.6rem 1rem',
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {[
                        ['Lose weight', `${cut} kcal`, 'deficit'],
                        ['Maintain', `${tdee} kcal`, 'maintain'],
                        ['Build muscle', `${bulk} kcal`, 'surplus'],
                      ].map(([label, val, type]) => (
                        <div key={type}>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.55rem',
                              color: '#aaa',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {label}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              color:
                                type === 'maintain' ? '#e8190c' : 'var(--text)',
                              marginTop: '0.1rem',
                            }}
                          >
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
          </div>
        )}

        {/* Error */}
        {error && (
          <p
            className='mt-4'
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#e8190c',
              letterSpacing: '0.06em',
            }}
          >
            {error}
          </p>
        )}

        {/* Navigation */}
        <div className='flex items-center justify-between mt-10'>
          {step > 1 ? (
            <button
              type='button'
              onClick={() => setStep((s) => s - 1)}
              className='btn-ghost px-6 py-3'
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type='button'
              onClick={next}
              className='btn-primary px-8 py-3'
            >
              Continue →
            </button>
          ) : (
            <button
              type='button'
              onClick={submit}
              disabled={saving}
              className='btn-primary px-8 py-3'
              style={{
                opacity: saving ? 0.6 : 1,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving…' : "Let's Go →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className='flex flex-col gap-2'>
      <label
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#fff',
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function chipStyle(active, variant) {
  const isRed = variant === 'red';
  const isDark = variant === 'dark';
  return {
    padding: '0.45rem 1rem',
    border: active
      ? `2px solid ${isRed ? '#e8190c' : '#0c0c0c'}`
      : '1px solid var(--border)',
    background: active
      ? isRed
        ? 'rgba(232,25,12,0.08)'
        : 'rgba(232,25,12,0.6)'
      : 'transparent',
    color: active ? (isRed ? '#e8190c' : '#f0ece0') : 'var(--text-2)',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.15s',
  };
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid #cdc8b8',
  borderRadius: 0,
  background: '#e8e4d4',
  color: '#0c0c0c',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.95rem',
  outline: 'none',
};

const headingStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
  color: 'var(--text)',
  lineHeight: 0.92,
  letterSpacing: '0.02em',
};
const monoLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6rem',
  color: '#aaa',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};
const red = { fontStyle: 'normal', color: '#e8190c' };
