'use client'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { useStore } from 'src/store/stepsStore'

import { Plan } from '@/types/plan'

const PlanComponent = observer(({ plan }: { plan: Plan }): React.JSX.Element => {
  return (
    <div>
      <h2>{plan?.name}</h2>
      <h2>{plan?.duration}</h2>
    </div>
  )
})

export default PlanComponent
