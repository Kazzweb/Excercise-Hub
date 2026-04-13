import { notFound } from 'next/navigation'
import { getChallengeById } from '../../data/challenges'
import ChallengeClient from './ChallengeClient'

export default async function ChallengePage({ params }) {
  const { id } = await params
  const challenge = getChallengeById(id)
  if (!challenge) notFound()
  return <ChallengeClient challenge={challenge} />
}

export async function generateStaticParams() {
  const { challenges } = await import('../../data/challenges')
  return challenges.map(c => ({ id: c.id }))
}
