import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import TaskComponent from '@/Components/TaskComponent'
import { useStore } from '@/store/stepsStore'
import { Task } from '@/types/task'

interface Props {
  actions: Task[]
  actionsKey: string
  onEditStart?: () => void
  onEditEnd?: () => void
  readOnly?: boolean
}
const ActionsComponent = observer(
  ({ actionsKey, actions, readOnly, onEditStart, onEditEnd }: Props): React.JSX.Element => {
    const [editMode, setEditMode] = useState(false)

    const { addAction, removeAction, toggleActionCheck, editAction } = useStore()
    const addNewAction = (text: string): void => {
      addAction(actionsKey, text)
    }
    const removeActionHandler = (index: number): void => {
      removeAction(actionsKey, index)
    }
    const toggleCheckHandler = (index: number): void => {
      toggleActionCheck(actionsKey, index)
    }
    const editActionHandler = (index: number, text: string): void => {
      editAction(actionsKey, index, text)
    }
    const enableEditMode = (): void => {
      if (onEditStart) {
        setEditMode(true)
        onEditStart()
      }
    }
    const disableEditMode = (): void => {
      if (onEditEnd) {
        setEditMode(false)
        onEditEnd()
      }
    }
    return (
      <div className="bg-amber-300 h-52  w-72 rounded flex flex-col">
        <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
          {actionsKey}
        </h4>
        <div className="bg-amber-200 h-4/6 px-3 py-2">
          <ul>
            {actions.map((action, index) => (
              <TaskComponent
                item={action}
                itemIndex={index}
                key={index}
                taskIdentifier={actionsKey}
                removeItem={removeActionHandler}
                toggleCheck={toggleCheckHandler}
                editItem={editActionHandler}
                onEditStart={onEditStart}
                onEditEnd={onEditEnd}
              />
            ))}
          </ul>
          {editMode ? (
            <ItemInput onConfirm={addNewAction} disableEditeMode={disableEditMode} />
          ) : null}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={editMode}
          onClick={(e) => {
            e.preventDefault()
            enableEditMode()
          }}
        >
          {!readOnly ? <PlusCircleIcon className="size-7 self-center" /> : null}
        </button>
      </div>
    )
  }
)
export default ActionsComponent
