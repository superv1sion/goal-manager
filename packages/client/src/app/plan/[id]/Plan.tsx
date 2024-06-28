'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React from 'react'

import StepComponent from '@/Components/StepComponent'
import { Plan } from '@/types/plan'

const PlanComponent = observer(({ plan }: { plan: Plan }): React.JSX.Element => {
  const router = useRouter()
  return (
    <div>
      <h2>{plan?.name}</h2>
      <h2>{plan?.duration}</h2>

      <button
        className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
        onClick={() => router.push('/editPlan')}
      >
        Edit Plan
      </button>

      <button
        className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
        onClick={() => router.push('/plans')}
      >
        All Plans
      </button>

      <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">
        {plan.steps.map((step, index, arr) => {
          if (index === arr.length - 1) {
            return (
              <div className="row-start-2" key={index}>
                <StepComponent
                  stepNumber={index}
                  step={step}
                  // submitDisabler={setButtonDisabled}
                  readOnly
                />
              </div>
            )
          }
          return (
            <StepComponent
              key={index}
              stepNumber={index}
              // submitDisabler={setButtonDisabled}
              step={step}
              readOnly
            />
          )
        })}
      </div>
    </div>
  )
})

export default PlanComponent
