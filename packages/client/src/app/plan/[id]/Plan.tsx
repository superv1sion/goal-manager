'use client'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import PlansStore from 'src/store/stepsStore'

import PlanStore from '@/store/stepsStore'

const Plan = observer(({ id }: { id: string }): React.Element => {
  useEffect(() => {
    PlanStore.setAllPlans()
  }, [])

  // console.log(params.id)
  // console.log(toJS(PlansStore.allPlans))

  const plan = toJS(PlansStore.allPlans).find((e) => e.planId === id)
  return (
    <div>
      <h2>{plan?.name}</h2>
      <h2>{plan?.duration}</h2>
    </div>
  )
})

export default Plan
