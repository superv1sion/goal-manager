import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useEffect, useState } from 'react'

import TaskComponent from '@/Components/TaskComponent'
import { useProcessingState } from '@/hooks/useProcessingState'
import { Actions } from '@/types/actions'

interface Props {
  actions: Actions
  actionsIndex: number
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
    actionsIndex,
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
    const [anyTasksProcessing, setAnyTasksProcessing] = useProcessingState({})

    const enableEditMode = (): void => {
      setEditMode(true)
    }

    const disableEditMode = (): void => {
      setEditMode(false)
    }

    const onEditActionsStart = (index: number): void => {
      setAnyTasksProcessing(index, true)
      onEditStart && onEditStart(actionsIndex)
    }

    const onEditActionsEnd = (index: number): void => {
      disableEditMode()
      setAnyTasksProcessing(index, false)
      onEditEnd && onEditEnd(actionsIndex)
    }
    console.log('actions component')
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
                  removeActionHandler && removeActionHandler(actionsIndex, index)
                }
                onToggleCheckClick={(index: number) =>
                  toggleCheckHandler && toggleCheckHandler(actionsIndex, index)
                }
                onEditConfirm={(index: number, text: string) =>
                  editActionHandler && editActionHandler(actionsIndex, index, text)
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
              taskIdentifier={actionsIndex}
              onAddConfirm={(text: string) =>
                addActionHandler && addActionHandler(actionsIndex, text)
              }
              onEditEnd={onEditActionsEnd}
              readOnly={readOnly}
              writeMode
            />
          ) : null}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={anyTasksProcessing}
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
