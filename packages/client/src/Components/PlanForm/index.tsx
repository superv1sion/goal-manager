'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useState } from 'react'
import { useFormState } from 'react-dom'

import StepComponent from '@/Components/StepComponent'
import { useStore } from '@/store/stepsStore'

import { addPlanAction } from './action'

const PlanForm = observer((): ReactElement => {
  const { draftPlan, addPlan } = useStore()
  const router = useRouter()
  if (!draftPlan) {
    router.push('/initiatePlan')
    return <></>
  }
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [formState, submitForm] = useFormState(addPlanAction(addPlan), null)
  return (
    <div className="px-8 py-6">
      <form action={submitForm} className="flex flex-col mb-8">
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
        <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">
          {draftPlan.steps.map((step, index, arr) => {
            if (index === arr.length - 1) {
              return (
                <div className="row-start-2" key={index}>
                  <StepComponent
                    stepNumber={index}
                    disabled={buttonDisabled}
                    step={step}
                    submitDisabler={setButtonDisabled}
                  />
                </div>
              )
            }
            return (
              <StepComponent
                key={index}
                stepNumber={index}
                submitDisabler={setButtonDisabled}
                disabled={buttonDisabled}
                step={step}
              />
            )
          })}
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
