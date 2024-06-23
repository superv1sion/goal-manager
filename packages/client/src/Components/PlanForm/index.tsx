'use client'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import StepComponent from '@/Components/StepComponent'
import PlansStore from '@/store/stepsStore'
import { DraftPlan } from '@/types/draftPlan'

import { addPlan } from './action'
const useStore = (): any => {
  return PlansStore
}
const getPlanInitialValue = (): DraftPlan => {
  return toJS(PlansStore.draftPlan)
}

const PlanForm = observer((): ReactElement => {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  // const [plan, setPlan] = useState<DraftPlan | null>(null)
  // useEffect(() => {
  //   const initialPlan = getPlanInitialValue()
  //   setPlan(initialPlan)
  // }, [])
  const store = useStore()

  const steps = store?.draftPlan.steps.map((step, index, arr) => {
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

  const [formState, submitForm] = useFormState(addPlan, store?.draftPlan)

  return (
    <div className="px-8 py-6">
      <h3>Plan Name: {store?.draftPlan.name}</h3>
      <h3>Plan Duration: {store?.draftPlan?.duration}</h3>
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
