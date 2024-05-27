import React from 'react'

import Plan from './Plan'

interface params {
  id: string
}

const PlanPage = ({ params }: params): React.Element => {
  // console.log(params.id)
  // console.log(toJS(PlansStore.allPlans))
  // const plan = toJS(PlansStore.allPlans.find((e) => e.planId === params.id))
  // console.log(plan)
  console.log(params, '----------------')
  return (
    <div>
      <Plan id={params.id} />
    </div>
  )
}

export default PlanPage
