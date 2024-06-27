import React from 'react'

import { useStore } from '@/store/stepsStore'

import Plan from './Plan'

interface params {
  id: string
}

const PlanPage = ({ id }: params): React.JSX.Element => {
  return (
    <div>
      <Plan id={id} />
    </div>
  )
}

export default PlanPage
