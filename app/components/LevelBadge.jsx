export default function LevelBadge({ level }) {
  const cls = {
    beginner:     'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced:     'badge-advanced',
  }[level] || 'badge-beginner'

  return (
    <span className={`pill ${cls}`}>
      {level}
    </span>
  )
}
