import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import { useStore } from '@/store/stepsStore'
import { Task } from '@/types/task'

interface Props {
  actions: Task[]
  actionsKey: string
  onEditCallback?: (isEdit: boolean) => void
  readOnly?: boolean
}
const ActionsComponent = observer(
  ({ actionsKey, actions, readOnly, onEditCallback }: Props): React.JSX.Element => {
    const [editMode, setEditMode] = useState(false)

    const { addAction } = useStore()
    const addNewAction = (text: string): void => {
      addAction(actionsKey, text)
    }
    const enableEditMode = (): void => {
      if (onEditCallback) {
        setEditMode(true)
        onEditCallback(true)
      }
    }
    const disableEditMode = (): void => {
      if (onEditCallback) {
        setEditMode(false)
        onEditCallback(false)
      }
    }
    return (
      <div className="bg-amber-300 h-72  w-80 rounded flex flex-col">
        <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
          {actionsKey}
        </h4>
        <div className="bg-amber-200 h-5/6 px-3 py-2">
          <ul>
            {actions.map((action, index) => (
              <div key={index} />
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
