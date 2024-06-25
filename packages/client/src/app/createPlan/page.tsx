'use client'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'

import { store, StoreContext } from '@/store/stepsStore'

const PlanForm = dynamic(async () => await import('@/Components/PlanForm'), { ssr: false })
export default function CreatePlan(): ReactElement {
  return (
    <>
      <StoreContext.Provider value={store}>
        <PlanForm />
      </StoreContext.Provider>
    </>
  )
}
