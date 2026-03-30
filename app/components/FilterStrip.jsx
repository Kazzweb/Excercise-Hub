'use client'

const goalOptions = [
  { value: 'all', label: 'All Goals' },
  { value: 'strength', label: 'Strength' },
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'muscle', label: 'Muscle' },
]

const timeOptions = [
  { value: 'all', label: 'Any Time' },
  { value: '15', label: '15 min' },
  { value: '20', label: '20 min' },
  { value: '30', label: '30 min' },
  { value: '45', label: '45 min' },
  { value: '60', label: '60 min' },
]

const equipmentOptions = [
  { value: 'all', label: 'Any Equipment' },
  { value: 'none', label: 'No Equipment' },
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'gym', label: 'Gym' },
]

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
        active
          ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/30'
          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-orange-500/60 hover:text-zinc-200'
      }`}
    >
      {label}
    </button>
  )
}

function FilterGroup({ label, options, value, onSelect }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-zinc-500 text-xs font-medium shrink-0">{label}:</span>
      {options.map((opt) => (
        <Pill
          key={opt.value}
          label={opt.label}
          active={value === opt.value}
          onClick={() => onSelect(opt.value)}
        />
      ))}
    </div>
  )
}

export default function FilterStrip({ filters, onChange }) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        <FilterGroup
          label="Goal"
          options={goalOptions}
          value={filters.goal}
          onSelect={(val) => onChange({ ...filters, goal: val })}
        />
        <div className="w-px bg-zinc-800 shrink-0 self-stretch" />
        <FilterGroup
          label="Time"
          options={timeOptions}
          value={filters.time}
          onSelect={(val) => onChange({ ...filters, time: val })}
        />
        <div className="w-px bg-zinc-800 shrink-0 self-stretch" />
        <FilterGroup
          label="Equipment"
          options={equipmentOptions}
          value={filters.equipment}
          onSelect={(val) => onChange({ ...filters, equipment: val })}
        />
      </div>
    </div>
  )
}
