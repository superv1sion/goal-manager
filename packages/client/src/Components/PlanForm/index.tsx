'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'
import { useFormState } from 'react-dom'

import ActionsSection from '@/Components/ActionsSectionComponent'
import StepsSection from '@/Components/StepsSectionComponent'
import { useProccessingStatusHandler } from '@/hooks/useProcessingStatusHandler'
import { useStore } from '@/store/stepsStore'
import { DraftPlan } from '@/types/draftPlan'

import { addPlanAction } from './action'

const PlanForm = observer(({ draftPlan }: { draftPlan: DraftPlan }): ReactElement => {
  const {
    addPlan,
    deleteDraftPlan,
    consumeDraftPlan,
    addItem,
    removeItem,
    toggleCheck,
    editItem,
    addAction,
    removeAction,
    toggleActionCheck,
    editAction,
  } = useStore()
  const router = useRouter()
  const [formState, submitForm] = useFormState(addPlanAction(addPlan, draftPlan), null)
  const { buttonDisabled, onEditStepsStart, onEditStepsEnd, onEditActionsStart, onEditActionsEnd } =
    useProccessingStatusHandler()

  if (formState?.success) {
    consumeDraftPlan()
    return <></>
  }

  return (
    <div className="px-4 py-6 max-w-screen">
      <form action={submitForm} className="flex flex-col">
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
        <div className="flex justify-between mb-8">
          <StepsSection
            addItemHandler={addItem}
            removeItemHandler={removeItem}
            toggleCheckHandler={toggleCheck}
            editItemHandler={editItem}
            plan={draftPlan}
            onEditStepsStart={onEditStepsStart}
            onEditStepsEnd={onEditStepsEnd}
          />
          <ActionsSection
            actions={draftPlan.actions}
            addActionHandler={addAction}
            removeActionHandler={removeAction}
            toggleCheckHandler={toggleActionCheck}
            editActionHandler={editAction}
            onEditEnd={onEditActionsEnd}
            onEditStart={onEditActionsStart}
          />
        </div>

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
