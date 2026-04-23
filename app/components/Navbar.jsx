'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { UserButton, useAuth } from '@clerk/nextjs';

const navLinks = [
  { label: 'Exercises', href: '/exercises' },
  { label: 'Programs', href: '/programs' },
  { label: 'Challenges', href: '/challenges' },
  { label: 'Calories', href: '/calorie-tracker' },
  { label: 'Progress', href: '/progress' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-xl border-b border-zinc-800/50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            href='/'
            onClick={() => setMenuOpen(false)}
            className='flex items-center gap-1 group'
          >
            <span className='font-display text-2xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-80'>
              FIT<span className='text-orange-500'>START</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className='hidden md:flex items-center gap-5'>
            {!isSignedIn ? (
              <>
                <Link
                  href='/sign-in'
                  className='text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200'
                >
                  Sign In
                </Link>
                <Link href='/sign-up' className='btn-primary'>
                  Sign Up
                </Link>
              </>
            ) : (
              <div className='flex items-center gap-4'>
                {/* <Link
                  href='/workout'
                  className='text-sm font-bold text-white bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700/50 transition-all shadow-inner max-w-none'
                >
                  Start Now
                </Link> */}
                <UserButton userProfileUrl='/profile' />
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className='md:hidden p-2 text-zinc-300 hover:text-white transition-colors'
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label='Toggle menu'
          >
            {menuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className='md:hidden bg-zinc-950 border-t border-zinc-800/50 shadow-2xl'>
          <div className='px-4 py-4 flex flex-col gap-2 max-w-7xl mx-auto'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='px-4 py-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className='pt-4 mt-2 flex flex-col gap-3 border-t border-zinc-800/50'>
              {!isSignedIn ? (
                <>
                  <Link
                    href='/sign-in'
                    className='btn-ghost w-full text-center'
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href='/sign-up'
                    className='btn-primary w-full text-center'
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href='/workout'
                    className='btn-primary w-full text-center'
                    onClick={() => setMenuOpen(false)}
                  >
                    Start Now
                  </Link>
                  <div className='flex items-center gap-3 px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50'>
                    <UserButton
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
                    <span className='text-sm font-semibold text-zinc-300'>
                      My Account
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
