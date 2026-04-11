import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  return (
    <div className='min-h-[calc(100vh-80px)] flex'>
      {/* Left editorial panel */}
      <div
        className='hidden lg:flex flex-col justify-between w-[42%] px-16 py-20'
        style={{ background: '#0c0c0c' }}
      >
        <span style={monoMuted}>New Member</span>

        <div>
          <div style={accentBar} />
          <h1 style={heroText}>
            START
            <br />
            YOUR
            <br />
            <em style={{ fontStyle: 'normal', color: '#e8190c' }}>JOURNEY</em>
          </h1>
          <p style={subText}>
            Create your free account and we&apos;ll personalise workouts to your
            height, weight, age, and goals.
          </p>
          <ul className='mt-8 flex flex-col gap-3'>
            {[
              'Personalised workouts',
              'Progress tracking',
              'Custom programs',
              'Free — always',
            ].map((item) => (
              <li key={item} className='flex items-center gap-3'>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: '#e8190c',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          No credit card required
        </span>
      </div>

      {/* Right form panel */}
      <div
        className='flex-1 w-full flex items-center justify-center px-6 py-16'
        style={{ background: 'var(--bg)' }}
      >
        {/* Mobile-only heading */}
        <div className='lg:hidden absolute  left-0 right-0 px-6'>
          <div
            style={{
              width: 32,
              height: 3,
              background: '#e8190c',
              marginBottom: '1rem',
            }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.4rem',
              color: 'var(--text)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
            }}
          >
            START YOUR{' '}
            <em style={{ fontStyle: 'normal', color: '#e8190c' }}>JOURNEY</em>
          </h2>
        </div>
        <SignUp
          afterSignUpUrl='/onboarding'
          appearance={{
            variables: {
              colorPrimary: '#e8190c',
              colorBackground: '#141414',
              colorInputBackground: '#242424',
              colorInputText: '#f5f5f5',
              colorText: '#f5f5f5',
              colorTextSecondary: '#a1a1a1',
              colorNeutral: '#ffffff',
              colorAlphaShade: '#ffffff',
              colorTextOnPrimaryBackground: '#ffffff',
              borderRadius: '6px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '16px',
            },
            elements: {
              rootBox: {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              card: {
                backgroundColor: '#141414',
                boxShadow: 'none',
                border: '1px solid #2a2a2a',
              },
              headerTitle: {
                color: '#ffffff',
              },
              headerSubtitle: {
                color: '#a1a1a1',
              },
              socialButtonsIconButton: {
                backgroundColor: '#fff',
                border: '1px solid #333333',
              },
              socialButtonsIconButton__apple: {
                backgroundColor: '#ffffff',
                border: '1px solid #333333',
              },
              socialButtonsBlockButton: {
                backgroundColor: '#1f1f1f',
                border: '1px solid #333333',
                color: '#f5f5f5',
              },
              dividerLine: {
                backgroundColor: '#2a2a2a',
              },
              dividerText: {
                color: '#666666',
              },
              formFieldLabel: {
                color: '#a1a1a1',
              },
              formFieldInput: {
                backgroundColor: '#242424',
                border: '1px solid #333333',
                color: '#f5f5f5',
                boxShadow: 'none',
              },
              formButtonPrimary: {
                backgroundColor: '#e8190c',
                color: '#ffffff',
                boxShadow: 'none',
              },
              footerActionText: {
                color: '#a1a1a1',
              },
              footerActionLink: {
                color: '#e8190c',
              },
              footer: {
                backgroundColor: '#141414',
                borderTop: '1px solid #2a2a2a',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

const monoMuted = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6rem',
  color: 'rgba(255,255,255,0.35)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
};
const accentBar = {
  width: 40,
  height: 3,
  background: '#e8190c',
  marginBottom: '2rem',
};
const heroText = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
  color: '#f0ece0',
  lineHeight: 0.92,
  letterSpacing: '0.02em',
  marginBottom: '1.5rem',
};
const subText = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  color: 'rgba(240,236,224,0.5)',
  lineHeight: 1.65,
  maxWidth: '28ch',
};
