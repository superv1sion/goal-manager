import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import { Task } from '@/types/task'

import IconCheckbox from '../IconCheckbox/index'

interface StepItemComponentProps {
  item?: Task
  itemIndex: number
  taskIdentifier: number | string
  readOnly?: boolean
  writeMode?: boolean
  onAddConfirm?: (text: string) => void
  onDeleteClick?: (index: number) => void
  onToggleCheckClick?: (itemIndex: number) => void
  onEditConfirm?: (itemIndex: number, text: string) => void
  onEditEnd?: () => void
  onEditStart?: () => void
  // addListener: () => void
  // removeListener: () => void
}

const TaskComponent = observer(
  ({
    item,
    itemIndex,
    onDeleteClick,
    readOnly,
    writeMode,
    onToggleCheckClick,
    onEditConfirm,
    onEditEnd, // which buttons?
    onEditStart, // which buttons?
    onAddConfirm,
  }: // addListener,
  // removeListener,
  // onChange, onEditStart, onAddItem, onSaveItem etc
  StepItemComponentProps): ReactElement => {
    const [isHovered, setIsHovered] = useState(false)
    const [editMode, setEditMode] = useState(writeMode ?? false)
    // useEffect(() => {
    //   if (editMode) {
    //     addListener()
    //   } else {
    //     removeListener()
    //   }
    //   return () => {
    //     removeListener()
    //   }
    // }, [addListener, editMode, removeListener])

    const handleCheckboxClick = (): void => {
      if (onToggleCheckClick) {
        onToggleCheckClick(itemIndex)
      }
    }
    const onEditItemConfirm = (text: string): void => {
      if (onEditConfirm) {
        onEditConfirm(itemIndex, text)
      }
    }

    const onEditTaskStart = (): void => {
      setEditMode(true)
      if (onEditStart) onEditStart()
    }
    const onEditTaskEnd = (): void => {
      setEditMode(false)
      if (onEditEnd) onEditEnd()
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
            onConfirm={onAddConfirm ?? onEditItemConfirm}
            onEditEnd={onEditTaskEnd}
            // addListener={addListener}
            // removeListener={removeListener}
          />
        ) : (
          <>
            {itemIndex + 1 + '. '}
            {item?.text}
            {!readOnly ? (
              <span className="flex items-center">
                <IconCheckbox
                  isChecked={item?.isReady ?? false}
                  hovered={isHovered}
                  onClick={handleCheckboxClick}
                />

                <button
                  className={`mr-1 size-5 ${isHovered ? '' : 'hidden'}`}
                  onClick={onEditTaskStart}
                >
                  <PencilSquareIcon className="size-full self-end text-black-500" />
                </button>

                <button
                  className={`mr-1 size-5 ${isHovered ? '' : 'hidden'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (onDeleteClick) {
                      onDeleteClick(itemIndex)
                    }
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
