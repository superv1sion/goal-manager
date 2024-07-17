import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useEffect, useState } from 'react'

import TaskComponent from '@/Components/TaskComponent'
import { useStore } from '@/store/stepsStore'
import { Actions } from '@/types/actions'
import { useProcessingState } from '@/utils/useProcessingState'

interface Props {
  actions: Actions
  actionsIdx: number
  onEditStart?: (index: number) => void
  onEditEnd?: (index: number) => void
  readOnly?: boolean
}
const ActionsComponent = observer(
  ({ actionsIdx, actions, readOnly, onEditStart, onEditEnd }: Props): React.JSX.Element => {
    const [editMode, setEditMode] = useState(false)
    const [addButtonDisable, setAddButtonDisable] = useState(false)
    const { addAction, removeAction, toggleActionCheck, editAction } = useStore()
    const [anyTasksProcessing, setAnyTasksProcessing] = useProcessingState({})

    useEffect(() => {
      if (anyTasksProcessing) {
        setAddButtonDisable(true)
        if (onEditStart) {
          onEditStart(actionsIdx)
        }
        return
      }
      setAddButtonDisable(false)
      if (onEditEnd) {
        onEditEnd(actionsIdx)
      }
    }, [anyTasksProcessing])

    const addActionHandler = (text: string): void => {
      addAction(actionsIdx, text)
    }
    const removeActionHandler = (index: number): void => {
      removeAction(actionsIdx, index)
    }
    const toggleCheckHandler = (index: number): void => {
      toggleActionCheck(actionsIdx, index)
    }
    const editActionHandler = (index: number, text: string): void => {
      editAction(actionsIdx, index, text)
    }
    const enableEditMode = (): void => {
      setEditMode(true)
    }

    const disableEditMode = (): void => {
      setEditMode(false)
    }

    const onEditActionsStart = (index: number): void => {
      setAnyTasksProcessing(index, true)
    }

    const onEditActionsEnd = (index: number): void => {
      disableEditMode()
      setAnyTasksProcessing(index, false)
    }
    return (
      <div className="bg-amber-300 h-52  w-72 rounded flex flex-col">
        <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
          {actions.name}
        </h4>
        <div className="bg-amber-200 h-4/6 px-3 py-2">
          <ul>
            {actions.tasks.map((action, index) => (
              <TaskComponent
                item={action}
                itemIndex={index}
                key={index}
                taskIdentifier={actions.name}
                onDeleteClick={removeActionHandler}
                onToggleCheckClick={toggleCheckHandler}
                onEditConfirm={editActionHandler}
                onEditEnd={onEditActionsEnd}
                onEditStart={onEditActionsStart}
                readOnly
              />
            ))}
          </ul>
          {editMode ? (
            <TaskComponent
              itemIndex={actions.tasks.length}
              taskIdentifier={actionsIdx}
              onAddConfirm={addActionHandler}
              onEditEnd={onEditActionsEnd}
              writeMode
              readOnly
            />
          ) : null}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={addButtonDisable}
          onClick={(e) => {
            e.preventDefault()
            enableEditMode()
            onEditActionsStart(actions.tasks.length)
          }}
        >
          {!readOnly ? <PlusCircleIcon className="size-7 self-center" /> : null}
        </button>
      </div>
    )
  }
)
export default ActionsComponent
