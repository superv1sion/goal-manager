import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import { useStore } from '@/store/stepsStore'
import { Task } from '@/types/task'

import IconCheckbox from '../IconCheckbox/index'

interface StepItemComponentProps {
  item: Task
  itemIndex: number
  taskIdentifier: number | string
  readOnly?: boolean
  removeItem: (index: number) => void
  onEditCallback?: (isEdit: boolean) => void
  toggleCheck: (stepNumber: number, itemIndex: number) => void
  editItem: (stepNumber: number, itemIndex: number, text: string) => void
}

const TaskComponent = observer(
  ({
    item,
    itemIndex,
    onEditCallback,
    taskIdentifier,
    removeItem,
    readOnly,
    toggleCheck,
    editItem,
  }: StepItemComponentProps): ReactElement => {
    const [isHovered, setIsHovered] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleCheckboxClick = (): void => {
      if (typeof taskIdentifier === 'number') toggleCheck(taskIdentifier, itemIndex)
    }
    const editItemConfirm = (text: string): void => {
      if (typeof taskIdentifier === 'number') editItem(taskIdentifier, itemIndex, text)
    }
    const enableEditMode = (): void => {
      setEditMode(true)
      if (onEditCallback) onEditCallback(true)
    }
    const disableEditMode = (): void => {
      setEditMode(false)
      if (onEditCallback) onEditCallback(false)
    }

    return (
      <li
        className="mb-2 flex justify-between"
        key={itemIndex}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {editMode ? (
          <ItemInput onConfirm={editItemConfirm} disableEditeMode={disableEditMode} />
        ) : (
          <>
            {itemIndex + 1 + '. '}
            {item.text}
            {!readOnly ? (
              <span className="flex items-center">
                <IconCheckbox
                  isChecked={item.isReady}
                  hovered={isHovered}
                  onClick={handleCheckboxClick}
                />

                <button className="mr-1 size-5" onClick={enableEditMode}>
                  <PencilSquareIcon className="size-full self-end text-black-500" />
                </button>

                <button
                  className="mr-1 size-5"
                  onClick={(e) => {
                    e.preventDefault()
                    removeItem(itemIndex)
                  }}
                >
                  <TrashIcon className="size-full text-black-500" />
                </button>
              </span>
            ) : null}
          </>
        )}
      </li>
    )
  }
)

export default TaskComponent
