'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

import PlanComponent from '@/app/plan/[id]/Plan'
import { useStore } from '@/store/stepsStore'

// interface params {
//   id: string
// }

const PlanPage = (): React.JSX.Element => {
  const params = useParams()
  const router = useRouter()
  const { allPlans } = useStore()
  const plan = useMemo(() => {
    return allPlans.find((e) => e.planId === params?.id)
  }, [allPlans, params?.id])
  if (!plan) {
    router.push('/plans')
    return <></>
  }
  return (
    <div>
      <PlanComponent plan={plan} />
    </div>
  )
}

export default PlanPage
