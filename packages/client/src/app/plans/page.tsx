import React from 'react'

import PlansList from '@/Components/PlansList'

const Plans = (): React.JSX.Element => {
  return (
    <div>
      <h3 className="text-center text-3xl my-5">Your Plans</h3>
      <PlansList />
    </div>
  )
}

export default Plans
