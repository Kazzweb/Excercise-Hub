import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/exercises(.*)',
  '/programs(.*)',
  '/workout(.*)',
  '/today(.*)',
])

const isOnboardingRoute = createRouteMatcher(['/onboarding'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  // Not signed in
  if (!userId) {
    if (!isPublicRoute(req)) return redirectToSignIn({ returnBackUrl: req.url })
    return
  }

  // Already on onboarding — always let through
  if (isOnboardingRoute(req)) return

  // Fast path: JWT already carries onboardingComplete (steady-state for existing users)
  if (sessionClaims?.metadata?.onboardingComplete === true) return

  // Slow path: JWT is stale (happens right after onboarding save).
  // Ask Clerk's backend directly for the ground truth.
  try {
    const clerk = await clerkClient()
    const user  = await clerk.users.getUser(userId)

    if (user.publicMetadata?.onboardingComplete === true) {
      // Backend confirms complete — let them through even though JWT is stale
      return
    }
  } catch {
    // If Clerk API is unreachable, fail open so users aren't permanently locked out
    return
  }

  // Not complete — send to onboarding
  return NextResponse.redirect(new URL('/onboarding', req.url))
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
