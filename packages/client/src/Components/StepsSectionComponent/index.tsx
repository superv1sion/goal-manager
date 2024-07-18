import * as React from 'react'

import StepComponent from '@/Components/StepComponent'
import { DraftPlan } from '@/types/draftPlan'
import { Plan } from '@/types/plan'

interface Props {
  plan: DraftPlan | Plan
  onEditStepsStart?: (index: number) => void
  onEditStepsEnd?: (index: number) => void
  readonly?: boolean
}
const StepsSection = ({
  plan,
  onEditStepsStart,
  onEditStepsEnd,
  readonly,
}: Props): React.JSX.Element => {
  return (
    <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">
      {plan.steps.map((step, index, arr) => {
        if (index === arr.length - 1) {
          return (
            <div className="row-start-2" key={index}>
              <StepComponent
                stepNumber={index}
                step={step}
                onEditStart={onEditStepsStart}
                onEditEnd={onEditStepsEnd}
                readOnly
              />
            </div>
          )
        }
        return (
          <StepComponent
            key={index}
            stepNumber={index}
            onEditStart={onEditStepsStart}
            onEditEnd={onEditStepsEnd}
            step={step}
            readOnly
          />
        )
      })}
    </div>
  )
}

export default StepsSection
