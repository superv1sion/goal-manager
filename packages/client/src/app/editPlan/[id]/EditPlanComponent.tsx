import { observer } from 'mobx-react-lite'
import * as R from 'ramda'
import * as React from 'react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

import { updatePlanAction } from '@/app/editPlan/[id]/action'
import ActionsSection from '@/Components/ActionsSectionComponent'
import { EditPlanHeader } from '@/Components/EditPlanHeader'
import StepsSection from '@/Components/StepsSectionComponent'
import { useProccessingStatusHandler } from '@/hooks/useProcessingStatusHandler'
import { useStore } from '@/store/stepsStore'
import { Plan } from '@/types/plan'
import { Task } from '@/types/task'

interface Props {
  plan: Plan
}

export const EditPlanComponent = observer(({ plan }: Props): React.JSX.Element => {
  const { updatePlan } = useStore()
  const [state, setState] = useState<Plan>(plan)
  const [formState, submitForm] = useFormState(updatePlanAction(updatePlan, state), null)
  const { buttonDisabled, onEditStepsStart, onEditStepsEnd, onEditActionsStart, onEditActionsEnd } =
    useProccessingStatusHandler()
  // const [buttonDisabled, setButtonDisabled] = useState(false)
  // const [anyStepsProcessing, setAnyStepsProcessing] = useProcessingState({})
  // const [anyActionsProcessing, setAnyActionsProcessing] = useProcessingState({})
  //
  // useEffect(() => {
  //   setButtonDisabled(anyStepsProcessing || anyActionsProcessing)
  // }, [anyStepsProcessing, anyActionsProcessing])
  //
  // const onEditStepsStart = (index: number): void => {
  //   setAnyStepsProcessing(index, true)
  // }
  // const onEditStepsEnd = (index: number): void => {
  //   setAnyStepsProcessing(index, false)
  // }
  // const onEditActionsStart = (index: number): void => {
  //   setAnyActionsProcessing(index, true)
  // }
  // const onEditActionsEnd = (index: number): void => {
  //   setAnyActionsProcessing(index, false)
  // }

  type flag = 'add' | 'remove' | 'toggle' | 'edit'

  const updateState = (
    path: Array<string | number>,
    flag: flag,
    // stepIdx: number,
    itemIdx?: number,
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
      remove: (): Task[] => items.filter((_, index) => index !== itemIdx),
      toggle: (): Task[] =>
        items.map((item, index) =>
          index === itemIdx ? { ...item, isReady: !item.isReady } : item
        ),
      edit: (): Task[] =>
        items.map((item, index) => (index === itemIdx ? { ...item, text } : item)),
    }
    const updatedItems: Array<Task | undefined> = updater[flag]()
    const newState = R.assocPath(path, updatedItems, state)
    setState(newState)
  }
  const addStepItem = (stepIdx: number, text: string): void => {
    updateState(['steps', stepIdx, 'items'], 'add', 0, text)
  }

  const removeStepItem = (stepIdx: number, itemIdx: number): void => {
    updateState(['steps', stepIdx, 'items'], 'remove', itemIdx)
  }

  const toggleStepItemCheck = (stepIdx: number, itemIdx: number): void => {
    updateState(['steps', stepIdx, 'items'], 'toggle', itemIdx)
  }

  const editStepItem = (stepIdx: number, itemIdx: number, text: string): void => {
    updateState(['steps', stepIdx, 'items'], 'edit', itemIdx, text)
  }
  const addActionItem = (actionIdx: number, text: string): void => {
    updateState(['actions', actionIdx, 'tasks'], 'add', 0, text)
  }
  const removeActionItem = (actionIdx: number, itemIdx: number): void => {
    updateState(['actions', actionIdx, 'tasks'], 'remove', itemIdx)
  }
  const toggleActionItemCheck = (actionIdx: number, itemIdx: number): void => {
    updateState(['actions', actionIdx, 'tasks'], 'toggle', itemIdx)
  }
  const editActionItem = (actionIdx: number, itemIdx: number, text: string): void => {
    updateState(['actions', actionIdx, 'tasks'], 'edit', itemIdx, text)
  }
  return (
    <div className="px-4 py-6 w-screen">
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
