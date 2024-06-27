'use client'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { store, StoreContext, useStore } from '@/store/stepsStore'

const PlanForm = dynamic(async () => await import('@/Components/PlanForm'), { ssr: false })
const CreatePlan = observer((): ReactElement => {
  const { draftPlan } = useStore()
  const router = useRouter()
  if (!draftPlan) {
    router.push('/initiatePlan')
    return <></>
  }
  if (draftPlan.isConsumed) {
    router.push('/plans')
    return <></>
  }
  return (
    <>
      <StoreContext.Provider value={store}>
        <PlanForm draftPlan={draftPlan} />
      </StoreContext.Provider>
    </>
  )
})
export default CreatePlan
