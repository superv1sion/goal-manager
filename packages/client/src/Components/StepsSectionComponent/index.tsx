import * as React from 'react'

import StepComponent from '@/Components/StepComponent'
import { DraftPlan } from '@/types/draftPlan'
import { Plan } from '@/types/plan'

interface Props {
  plan: DraftPlan | Plan
  onEditStepsStart?: (index: number) => void
  onEditStepsEnd?: (index: number) => void
  readOnly?: boolean
  addItemHandler?: (stepNumber: number, text: string) => void
  removeItemHandler?: (stepNumber: number, index: number) => void
  toggleCheckHandler?: (stepNumber: number, index: number) => void
  editItemHandler?: (stepNumber: number, index: number, text: string) => void
  calculateSumHandler?: (stepNumber: number, sum: number) => void
}

const StepsSection = ({
  plan,
  onEditStepsStart,
  onEditStepsEnd,
  readOnly,
  addItemHandler,
  removeItemHandler,
  toggleCheckHandler,
  editItemHandler,
  calculateSumHandler,
}: Props): React.JSX.Element => {
  return (
    <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">
      {plan.steps.map((step, index, arr) => {
        if (index === arr.length - 1) {
          return (
            <div className="row-start-2" key={index}>
              <StepComponent
                addItemHandler={addItemHandler}
                removeItemHandler={removeItemHandler}
                toggleCheckHandler={toggleCheckHandler}
                editItemHandler={editItemHandler}
                stepNumber={index}
                step={step}
                onEditStart={onEditStepsStart}
                onEditEnd={onEditStepsEnd}
                readOnly={readOnly}
                calculateSumHandler={calculateSumHandler}
              />
            </div>
          )
        }
        return (
          <StepComponent
            addItemHandler={addItemHandler}
            removeItemHandler={removeItemHandler}
            toggleCheckHandler={toggleCheckHandler}
            editItemHandler={editItemHandler}
            key={index}
            stepNumber={index}
            onEditStart={onEditStepsStart}
            onEditEnd={onEditStepsEnd}
            step={step}
            readOnly={readOnly}
            calculateSumHandler={calculateSumHandler}
          />
        )
      })}
    </div>
  )
}

export default StepsSection
