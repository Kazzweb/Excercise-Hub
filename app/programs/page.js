import { Calendar, TrendingUp, CheckCircle } from 'lucide-react'
import { programs } from '../data/programs'
import ProgramCard from '../components/ProgramCard'

const benefits = [
  {
    icon: <Calendar className="w-6 h-6 text-orange-500" />,
    title: 'Structure Removes Guesswork',
    desc: 'No more wondering what to do at the gym. Every session is planned, progressive, and purposeful.',
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    title: 'Progressive Overload Built In',
    desc: 'Programs are designed to gradually increase intensity, ensuring consistent gains over time.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
    title: 'Habit Formation',
    desc: 'Following a structured schedule for 7–30 days is the fastest way to make exercise a permanent habit.',
  },
]

export default function ProgramsPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold mb-6">
            <Calendar className="w-3.5 h-3.5" />
            Structured Programs
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Beginner Programs
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Multi-week training programs that guide you from your first workout to a genuine fitness habit. Pick your program and start today.
          </p>
        </div>
      </div>

      {/* Programs grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* Why follow a program */}
      <section className="bg-zinc-900/50 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Why Follow a Program?</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Random workouts get random results. Structured programs get transformations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
