'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useMemo } from 'react'

import PlanForm from '@/Components/PlanForm'
import { useStore } from '@/store/stepsStore'

const EditPlan = observer((): ReactElement => {
  const { draftPlan, allPlans } = useStore()
  // const plan = useMemo(() => {
  //   return allPlans.find((e) => e.planId === params?.id)
  // }, [allPlans, params?.id])
  const router = useRouter()
  if (!draftPlan) {
    router.push('/initiatePlan')
    return <></>
  }
  // if (draftPlan.isConsumed) {
  //   router.push('/plans')
  //   return <></>
  // }
  return (
    <>
      <PlanForm draftPlan={draftPlan} />
    </>
  )
})
export default EditPlan
