import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import * as R from 'ramda'
import * as React from 'react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

import { updatePlanAction } from '@/app/editPlan/[id]/action'
import ActionsSection from '@/Components/ActionsSectionComponent'
import { EditPlanHeader } from '@/Components/EditPlanHeader'
import StepsSection from '@/Components/StepsSectionComponent'
import { useProcessingStatusHandler } from '@/hooks/useProcessingStatusHandler'
import { useStore } from '@/store/stepsStore'
import { Plan } from '@/types/plan'
import { Step } from '@/types/step'
import { Task } from '@/types/task'
interface Props {
  plan: Plan
}

export const EditPlanComponent = observer(({ plan }: Props): React.JSX.Element => {
  const { updatePlan } = useStore()
  const router = useRouter()
  const [state, setState] = useState<Plan>(plan)
  const [formState, submitForm] = useFormState(updatePlanAction(updatePlan, state), null)
  const { buttonDisabled, onEditStepsStart, onEditStepsEnd, onEditActionsStart, onEditActionsEnd } =
    useProcessingStatusHandler()

  if (formState?.success) {
    router.push('/plans')
    return <></>
  }

  type flag = 'add' | 'remove' | 'toggle' | 'edit'

  const updateState = (
    path: Array<string | number>,
    flag: flag,
    // stepIndex: number,
    itemIndex?: number,
    text = ''
  ): void => {
    const items = R.path<Task[]>(path, state) ?? []
    const updater = {
      add: (): Array<Task | undefined> => {
        const newItem: Task = {
          text,
          isReady: false,
          requiresFulfillment: false,
        }
        return [...items, newItem]
      },
      remove: (): Task[] => items.filter((_, index) => index !== itemIndex),
      toggle: (): Task[] =>
        items.map((item, index) =>
          index === itemIndex ? { ...item, isReady: !item.isReady } : item
        ),
      edit: (): Task[] =>
        items.map((item, index) => (index === itemIndex ? { ...item, text } : item)),
    }
    const updatedItems: Array<Task | undefined> = updater[flag]()
    const newState = R.assocPath(path, updatedItems, state)
    setState(newState)
  }
  const addStepItem = (stepIndex: number, text: string): void => {
    updateState(['steps', stepIndex, 'items'], 'add', 0, text)
  }

  const removeStepItem = (stepIndex: number, itemIndex: number): void => {
    updateState(['steps', stepIndex, 'items'], 'remove', itemIndex)
  }

  const toggleStepItemCheck = (stepIndex: number, itemIndex: number): void => {
    updateState(['steps', stepIndex, 'items'], 'toggle', itemIndex)
  }

  const editStepItem = (stepIndex: number, itemIndex: number, text: string): void => {
    updateState(['steps', stepIndex, 'items'], 'edit', itemIndex, text)
  }
  const calculateSum = (stepIndex: number, sum: number): void => {
    const step = { ...R.path<Step>(['steps', stepIndex], state) }
    const updatedStep = { ...step, sum }
    const newState = R.assocPath(['steps', stepIndex], updatedStep, state)
    setState(newState)
  }
  const addActionItem = (actionIndex: number, text: string): void => {
    updateState(['actions', actionIndex, 'tasks'], 'add', 0, text)
  }
  const removeActionItem = (actionIndex: number, itemIndex: number): void => {
    updateState(['actions', actionIndex, 'tasks'], 'remove', itemIndex)
  }
  const toggleActionItemCheck = (actionIndex: number, itemIndex: number): void => {
    updateState(['actions', actionIndex, 'tasks'], 'toggle', itemIndex)
  }
  const editActionItem = (actionIndex: number, itemIndex: number, text: string): void => {
    updateState(['actions', actionIndex, 'tasks'], 'edit', itemIndex, text)
  }

  return (
    <div className="px-5 py-2 w-screen">
      <form action={submitForm} className="flex flex-col">
        <EditPlanHeader
          defaultName={state.name}
          nameErrors={formState?.errors?.planName.errors}
          defaultDuration={state.duration}
          durationErrors={formState?.errors?.planDuration.errors}
        />
        <div className="flex mb-8 justify-between">
          <StepsSection
            readOnly={false}
            plan={state}
            addItemHandler={addStepItem}
            removeItemHandler={removeStepItem}
            toggleCheckHandler={toggleStepItemCheck}
            editItemHandler={editStepItem}
            onEditStepsStart={onEditStepsStart}
            onEditStepsEnd={onEditStepsEnd}
            calculateSumHandler={calculateSum}
          />
          <ActionsSection
            actions={state.actions}
            addActionHandler={addActionItem}
            removeActionHandler={removeActionItem}
            toggleCheckHandler={toggleActionItemCheck}
            editActionHandler={editActionItem}
            onEditEnd={onEditActionsEnd}
            onEditStart={onEditActionsStart}
          />
        </div>

        <button
          disabled={buttonDisabled}
          type="submit"
          className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12 
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed justify-self-center`}
        >
          Save Plan
        </button>
      </form>
    </div>
  )
})

export default EditPlanComponent
