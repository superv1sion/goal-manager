import React from 'react'

import PlanForm from '../PlanForm/index';
import StepComponent from '../StepComponent/index';

export default function WrapComponent() {
    return (
        <div className="px-8 py-6">
            <PlanForm/>
            <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">
                <StepComponent selfNumber={1} title="HAVING" itemsList={['bla-bla', 'bla']}/>
                <StepComponent selfNumber={2} title="BEING" itemsList={['bla-bla', 'bla']}/>
                <StepComponent selfNumber={3} title="DOING" itemsList={['bla-bla', 'bla']}/>
                <StepComponent selfNumber={5} title="COST" itemsList={['bla-bla', 'bla']}/>
                <StepComponent selfNumber={4} title="DOING" itemsList={['bla-bla', 'bla']}/>
                <StepComponent selfNumber={5} title="COST" itemsList={['bla-bla', 'bla']}/>
                <StepComponent
                    addClasses="row-start-2"
                    selfNumber={5}
                    title="COST"
                    itemsList={['bla-bla', 'bla']}
                />
            </div>
        </div>
    )
}
