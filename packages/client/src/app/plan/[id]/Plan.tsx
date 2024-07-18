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
    <div className="flex">
      <div className="mr-5">
        <h2>{plan?.name}</h2>
        <h2>{plan?.duration}</h2>

        <button
          className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
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

        <StepsSection plan={plan} />
      </div>
      <ActionsSection actions={plan.actions} readonly />
    </div>
  )
})

export default PlanComponent
