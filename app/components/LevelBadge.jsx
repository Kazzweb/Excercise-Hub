export default function LevelBadge({ level }) {
  const styles = {
    beginner: 'bg-green-500/20 text-green-400 border border-green-500/30',
    intermediate: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    advanced: 'bg-red-500/20 text-red-400 border border-red-500/30',
  }

  const style = styles[level] || styles.beginner

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
      {level}
    </span>
  )
}
