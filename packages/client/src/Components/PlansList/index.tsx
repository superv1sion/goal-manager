'use client'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'

import { useStore } from '@/store/stepsStore'

const PlansList = observer((): React.JSX.Element => {
  const { allPlans, deletePlan } = useStore()
  const onDeletePlanClick = (planId: string): void => {
    deletePlan(planId)
  }
  return (
    <div>
      <div className="flex justify-between font-extrabold mb-2 text-center">
        <span className="w-[30%]">Plan name</span>
        <span className="w-[50%] flex justify-between *:p-2 *:w-1/2">
          <span>Duration</span>
          <span>Date of creation</span>
        </span>
        <span className="w-[20%] flex justify-between *:p-2 *:w-1/2">
          <span>Actions</span>
        </span>
      </div>
      <div>
        {allPlans.map((plan, index) => {
          return (
            <div className="flex justify-between text-center hover:border-2 rounded-lg" key={index}>
              <span className="w-[30%] flex justify-center items-center">
                <Link href={`plan/${plan.planId}`} className="text-blue-900 rounded-lg px-4 py-1">
                  {plan.name}
                </Link>
              </span>
              <span className="w-[50%] flex justify-between *:p-2 *:w-1/2">
                <span>{plan.duration}</span>
                <span>{plan.creationDate?.toString() ?? ''}</span>
              </span>
              <span className="w-[20%] flex justify-between *:p-2 *:w-1/2">
                <button onClick={() => onDeletePlanClick(plan.planId)}>Delete</button>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
export default PlansList
