import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import { Task } from '@/types/task'

import IconCheckbox from '../IconCheckbox/index'

interface StepItemComponentProps {
  item: Task
  itemIndex: number
  taskIdentifier: number | string
  readOnly?: boolean
  removeItem: (index: number) => void
  toggleCheck: (itemIndex: number) => void
  editItem: (itemIndex: number, text: string) => void
  enableButtons?: () => void
  disableButtons?: () => void
  addListener: () => void
  removeListener: () => void
}

const TaskComponent = observer(
  ({
    item,
    itemIndex,
    removeItem,
    readOnly,
    toggleCheck,
    editItem,
    enableButtons, // which buttons?
    disableButtons, // which buttons?
    addListener,
    removeListener,
  }: // onChange, onEditStart, onAddItem, onSaveItem etc
  StepItemComponentProps): ReactElement => {
    const [isHovered, setIsHovered] = useState(false)
    const [editMode, setEditMode] = useState(false)
    useEffect(() => {
      if (editMode) {
        addListener()
      } else {
        removeListener()
      }
      return () => {
        removeListener()
      }
    }, [addListener, editMode, removeListener])

    const handleCheckboxClick = (): void => {
      toggleCheck(itemIndex)
    }
    const editItemConfirm = (text: string): void => {
      editItem(itemIndex, text)
    }
    const enableEditMode = (): void => {
      setEditMode(true)
      if (disableButtons) disableButtons()
    }
    const disableEditMode = (): void => {
      setEditMode(false)
      if (enableButtons) enableButtons()
    }

    return (
      <li
        className="mb-2 flex justify-between"
        key={itemIndex}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {editMode ? (
          <ItemInput
            onConfirm={editItemConfirm}
            enableButtons={enableButtons}
            disableEditeMode={disableEditMode}
            addListener={addListener}
            removeListener={removeListener}
          />
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

                <button
                  className={`mr-1 size-5 ${isHovered ? '' : 'hidden'}`}
                  onClick={enableEditMode}
                >
                  <PencilSquareIcon className="size-full self-end text-black-500" />
                </button>

                <button
                  className={`mr-1 size-5 ${isHovered ? '' : 'hidden'}`}
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
