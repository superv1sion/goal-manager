'use client'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import StepComponent from '@/Components/StepComponent'
import PlansStore from '@/store/stepsStore'
import { Plan } from '@/types/plan'

import { addPlan } from './action'

const getPlanInitialValue = (): Plan => {
  return toJS(PlansStore.currentPlan)
}

const PlanForm = observer((): ReactElement => {
  const [formState, submitForm] = useFormState(addPlan, getPlanInitialValue())
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('currentPlan') !== null) {
      PlansStore.setCurrentPlan()
    }
  }, [PlansStore])

  const steps = PlansStore.currentPlan.steps.map((step, index, arr) => {
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
  })

  return (
    <div className="px-8 py-6">
      <form action={submitForm} className="flex flex-col mb-8">
        <label htmlFor="planName" className="mb-2">
          Enter plan name
        </label>
        <input
          className="outline-0 mb-4 px-2 py-2 border-2 rounded-lg border-amber-200"
          type="text"
          name="planName"
          id="planName"
          placeholder="Plan Name"
        />

        <label htmlFor="planDuration" className="mb-2">
          Plan Duration
        </label>
        <input
          className="outline-0 mb-4 px-2 py-2 border-2 rounded-lg border-amber-200"
          type="text"
          name="planDuration"
          placeholder="Enter plan duration"
        />

        <button
          disabled={buttonDisabled}
          type="submit"
          className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
        >
          Create Plan
        </button>

        <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">{steps}</div>
      </form>
    </div>
  )
})

export default PlanForm
