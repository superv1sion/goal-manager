'use client'
import React, { ReactElement } from 'react'
import PlanStore from 'src/store/stepsStore'

import PlanForm from '@/Components/PlanForm'

export default function CreatePlan(): ReactElement {
  return (
    <>
      <PlanForm />
    </>
  )
}
