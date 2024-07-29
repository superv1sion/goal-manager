'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React from 'react'

import ActionsSection from '@/Components/ActionsSectionComponent'
import StepsSection from '@/Components/StepsSectionComponent'
import { Plan } from '@/types/plan'

const PlanComponent = observer(({ plan }: { plan: Plan }): React.JSX.Element => {
  const router = useRouter()
  return (
    <div className="flex flex-col px-5">
      <div className="mr-5 pt-4 flex flex-col">
        <h2 className="mb-1">Name: {plan?.name}</h2>
        <h2 className="mb-5">Duration: {plan?.duration}</h2>

        <div>
          <button
            className={`bg-slate-700 mb-8 mr-2 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
            onClick={() => router.push(`/editPlan/${plan.planId}`)}
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
        </div>
      </div>
      <div className="flex justify-between">
        <StepsSection plan={plan} readOnly />
        <ActionsSection actions={plan.actions} readOnly />
      </div>
    </div>
  )
})

export default PlanComponent
