'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import ActionsSection from '@/Components/ActionsSectionComponent'
import StepComponent from '@/Components/StepComponent'
import StepsSection from '@/Components/StepsSectionComponent'
import { useStore } from '@/store/stepsStore'
import { DraftPlan } from '@/types/draftPlan'
import { useProcessingState } from '@/utils/useProcessingState'

import { addPlanAction } from './action'

const PlanForm = observer(({ draftPlan }: { draftPlan: DraftPlan }): ReactElement => {
  const { addPlan, consumeDraftPlan } = useStore()
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formState, submitForm] = useFormState(addPlanAction(addPlan, draftPlan), null)
  const [anyStepsProcessing, setAnyStepsProcessing] = useProcessingState({})
  const [anyActionsProcessing, setAnyActionsProcessing] = useProcessingState({})

  useEffect(() => {
    setButtonDisabled(anyStepsProcessing || anyActionsProcessing)
  }, [anyStepsProcessing, anyActionsProcessing])

  if (formState?.success) {
    consumeDraftPlan()
    return <></>
  }
  const onEditStepsStart = (index: number): void => {
    setAnyStepsProcessing(index, true)
  }
  const onEditStepsEnd = (index: number): void => {
    setAnyStepsProcessing(index, false)
  }
  const onEditActionsStart = (index: number): void => {
    setAnyActionsProcessing(index, true)
  }
  const onEditActionsEnd = (index: number): void => {
    setAnyActionsProcessing(index, false)
  }
  return (
    <div className="px-8 py-6">
      <form action={submitForm} className="flex">
        <div className="flex flex-col mb-8 mr-5">
          <h3>Plan Name: {draftPlan.name}</h3>
          <h3>Plan Duration: {draftPlan?.duration}</h3>
          <button
            type="button"
            onClick={() => router.push('/initiatePlan')}
            className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
          >
            Back
          </button>

          <StepsSection
            plan={draftPlan}
            onEditStepsStart={onEditStepsStart}
            onEditStepsEnd={onEditStepsEnd}
          />
        </div>
        <ActionsSection
          actions={draftPlan.actions}
          onEditEnd={onEditActionsEnd}
          onEditStart={onEditActionsStart}
        />
        <button
          disabled={buttonDisabled}
          type="submit"
          className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
        >
          Create Plan
        </button>
      </form>
    </div>
  )
})

export default PlanForm
