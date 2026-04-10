'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export async function completeOnboarding(data) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const client = await clerkClient()

  // Update display name via backend (avoids client-side user.update() race condition)
  if (data.firstName) {
    await client.users.updateUser(userId, {
      firstName: data.firstName,
      lastName:  data.lastName || undefined,
    })
  }

  // Write fitness profile to publicMetadata so middleware JWT can read onboardingComplete
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      onboardingComplete: true,
      gender:        data.gender,
      age:           data.age,
      heightCm:      data.heightCm,
      weightKg:      data.weightKg,
      goal:          data.goal,
      level:         data.level,
      activityLevel: data.activityLevel,
      bmr:           data.bmr,
      tdee:          data.tdee,
    },
  })
}

export async function updateProfile(data) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      onboardingComplete: true,
      gender:        data.gender,
      age:           data.age,
      heightCm:      data.heightCm,
      weightKg:      data.weightKg,
      goal:          data.goal,
      level:         data.level,
      activityLevel: data.activityLevel,
      bmr:           data.bmr,
      tdee:          data.tdee,
    },
  })
}
