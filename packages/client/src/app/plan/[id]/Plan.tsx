'use client'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from 'src/store/stepsStore'

const Plan = observer(({ id }: { id: string }): React.JSX.Element => {
  const { allPlans } = useStore()

  const plan = toJS(allPlans).find((e) => e.planId === id)
  return (
    <div>
      <h2>{plan?.name}</h2>
      <h2>{plan?.duration}</h2>
    </div>
  )
})

export default Plan
