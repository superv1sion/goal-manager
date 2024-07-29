import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useEffect, useState } from 'react'

import TaskComponent from '@/Components/TaskComponent'
import { useProcessingState } from '@/hooks/useProcessingState'
import { Actions } from '@/types/actions'

interface Props {
  actions: Actions
  actionsIdx: number
  onEditStart?: (index: number) => void
  onEditEnd?: (index: number) => void
  readOnly?: boolean
  addActionHandler?: (actionsIdx: number, text: string) => void
  removeActionHandler?: (actionsIdx: number, itemIdx: number) => void
  toggleCheckHandler?: (actionsIdx: number, text: number) => void
  editActionHandler?: (actionsIdx: number, index: number, text: string) => void
}
const ActionsComponent = observer(
  ({
    actionsIdx,
    actions,
    readOnly,
    onEditStart,
    onEditEnd,
    addActionHandler,
    removeActionHandler,
    toggleCheckHandler,
    editActionHandler,
  }: Props): React.JSX.Element => {
    const [editMode, setEditMode] = useState(false)
    const [addButtonDisable, setAddButtonDisable] = useState(false)
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
      <div className="bg-amber-300 h-52  w-72 rounded flex flex-col mb-1">
        <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
          {actions.name}
        </h4>
        <div className="bg-amber-200 h-4/6 px-1 py-2">
          <ul>
            {actions.tasks.map((action, index) => (
              <TaskComponent
                item={action}
                itemIndex={index}
                key={index}
                taskIdentifier={actions.name}
                onDeleteClick={(index: number) =>
                  removeActionHandler && removeActionHandler(actionsIdx, index)
                }
                onToggleCheckClick={(index: number) =>
                  toggleCheckHandler && toggleCheckHandler(actionsIdx, index)
                }
                onEditConfirm={(index: number, text: string) =>
                  editActionHandler && editActionHandler(actionsIdx, index, text)
                }
                onEditEnd={onEditActionsEnd}
                onEditStart={onEditActionsStart}
                readOnly={readOnly}
              />
            ))}
          </ul>
          {editMode ? (
            <TaskComponent
              itemIndex={actions.tasks.length}
              taskIdentifier={actionsIdx}
              onAddConfirm={(text: string) =>
                addActionHandler && addActionHandler(actionsIdx, text)
              }
              onEditEnd={onEditActionsEnd}
              readOnly={readOnly}
              writeMode
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
