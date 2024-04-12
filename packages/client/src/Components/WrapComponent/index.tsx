import React, { ReactElement } from 'react'

import PlanForm from '@/Components/PlanForm'

import StepComponent from '../StepComponent/index'

const WrapComponent = (): ReactElement => {
  return (
    <div className="px-8 py-6">
      <PlanForm />
      <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">
        <StepComponent selfNumber={1} title="HAVING" itemsList={['bla-bla', 'bla']} />
        <StepComponent selfNumber={2} title="BEING" itemsList={['bla-bla', 'bla']} />
        <StepComponent selfNumber={3} title="DOING" itemsList={['bla-bla', 'bla']} />
        <StepComponent selfNumber={5} title="COST" itemsList={['bla-bla', 'bla']} />
        <StepComponent selfNumber={4} title="DOING" itemsList={['bla-bla', 'bla']} />
        <StepComponent selfNumber={5} title="COST" itemsList={['bla-bla', 'bla']} />
        <div className="row-start-2">
          <StepComponent selfNumber={5} title="COST" itemsList={['bla-bla', 'bla']} />
        </div>
      </div>
    </div>
  )
}
export default WrapComponent
