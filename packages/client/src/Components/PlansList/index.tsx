'use client'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React, { useEffect } from 'react'

import PlanStore from '@/store/stepsStore'

const PlansList = observer((): React.Element => {
  useEffect(() => {
    PlanStore.setAllPlans()
  }, [])

  const plansItems = PlanStore.allPlans.map((plan, index) => {
    return (
      <div className="flex justify-between text-center hover:border-2 rounded-lg" key={index}>
        <span className="w-[50%] flex justify-center items-center">
          <Link href={`plan/${plan.planId}`} className="text-blue-900 rounded-lg px-4 py-1">
            {plan.name}
          </Link>
        </span>
        <span className="w-[50%] flex justify-between *:p-2 *:w-1/2">
          <span>{plan.duration}</span>
          <span>{plan.creationDate}</span>
        </span>
      </div>
    )
  })
  return (
    <div>
      <div className="flex justify-between font-extrabold mb-2 text-center">
        <span className="w-[50%]">Plan name</span>
        <span className="w-[50%] flex justify-between *:p-2 *:w-1/2">
          <span>Duration</span>
          <span>Date of creation</span>
        </span>
      </div>
      <div>{plansItems}</div>
    </div>
  )
})
export default PlansList
