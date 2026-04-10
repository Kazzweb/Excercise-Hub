import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex">
      {/* Left editorial panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[42%] px-16 py-20"
        style={{ background: '#0c0c0c' }}
      >
        <span style={monoMuted}>Member Access</span>

        <div>
          <div style={accentBar} />
          <h1 style={heroText}>
            WELCOME<br />
            <em style={{ fontStyle: 'normal', color: '#e8190c' }}>BACK</em>
          </h1>
          <p style={subText}>
            Sign in to track your progress, pick up where you left off, and keep pushing.
          </p>
        </div>

        <div className="flex gap-10">
          {[['50+', 'Exercises'], ['12', 'Workouts'], ['Free', 'Forever']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#e8190c', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16" style={{ background: 'var(--bg)' }}>
        {/* Mobile-only heading */}
        <div className="lg:hidden absolute top-24 left-0 right-0 px-6">
          <div style={{ width: 32, height: 3, background: '#e8190c', marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--text)', lineHeight: 0.92, letterSpacing: '0.02em' }}>
            WELCOME <em style={{ fontStyle: 'normal', color: '#e8190c' }}>BACK</em>
          </h2>
        </div>

        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#e8190c',
              colorBackground: '#f0ece0',
              colorInputBackground: '#e8e4d4',
              colorInputText: '#0c0c0c',
              colorText: '#0c0c0c',
              colorTextSecondary: '#666',
              colorNeutral: '#0c0c0c',
              borderRadius: '0px',
              fontFamily: 'Outfit, sans-serif',
            },
          }}
        />
      </div>
    </div>
  )
}

const monoMuted = { fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.16em', textTransform: 'uppercase' }
const accentBar = { width: 40, height: 3, background: '#e8190c', marginBottom: '2rem' }
const heroText  = { fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', color: '#f0ece0', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: '1.5rem' }
const subText   = { fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(240,236,224,0.5)', lineHeight: 1.65, maxWidth: '28ch' }
