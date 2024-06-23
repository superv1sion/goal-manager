import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import PlansStore from '@/store/stepsStore'
import { Item } from '@/types/item'

import IconCheckbox from '../IconCheckbox/index'

interface StepItemComponentProps {
  item: Item
  index: number
  stepNumber: number
}

const StepItemComponent = ({ item, index, stepNumber }: StepItemComponentProps): ReactElement => {
  const [isHovered, setIsHovered] = useState(false)
  const [editing, setEditing] = useState(false)
  const { editItem, toggleCheck, removeItem } = PlansStore

  const handleCheckboxClick = (): void => {
    toggleCheck(stepNumber, index)
  }
  const editItemConfirm = (text: string): void => {
    editItem(stepNumber, index, text)
  }

  return (
    <li
      className="mb-2 flex justify-between"
      key={index}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {editing ? (
        <ItemInput onConfirm={editItemConfirm} onBlurHandler={setEditing} />
      ) : (
        <>
          {index + 1 + '. '}
          {item.text}
          <span className="flex items-center">
            <IconCheckbox
              isChecked={item.isReady}
              hovered={isHovered}
              onClick={handleCheckboxClick}
            />

            <button className="mr-1 size-5" onClick={() => setEditing(true)}>
              <PencilSquareIcon className="size-full self-end text-black-500" />
            </button>

            <button className="mr-1 size-5" onClick={() => removeItem(stepNumber, index)}>
              <TrashIcon className="size-full text-black-500" />
            </button>
          </span>
        </>
      )}
    </li>
  )
}

export default StepItemComponent
