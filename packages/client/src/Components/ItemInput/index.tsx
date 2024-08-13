import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

import styles from './ItemInput.module.css'

interface Props {
  onEditEnd?: () => void
  index: number
  onConfirm: (text: string) => void
  defaultValue?: string
  // addListener: () => void
  // removeListener: () => void
}
// ItemComponent, not ItemInput
const ItemInput = ({
  index,
  onEditEnd,
  onConfirm,
  defaultValue,
}: // onEdit, onSave, onDelete, onClickOutside (possibly)
Props): ReactElement => {
  const [value, setValue] = useState(defaultValue ?? '')
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.select()
  }
  return (
    <span className="flex justify-between px-5">
      <div className="self-center">{index + 1 + '. '}</div>

      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className={`outline-0 bg-amber-200 border-b w-8/12 border-black py-1 px ${styles.selection}`}
        onFocus={handleFocus}
        autoFocus
        placeholder="Enter your text"
        // onBlur={onEditEnd}
      />
      <span className="flex items-center">
        <button
          className="mr-1 size-5"
          onClick={(e) => {
            e.preventDefault()
            onConfirm(value)
            setValue('')
            if (onEditEnd) {
              onEditEnd()
            }
          }}
        >
          <CheckIcon />
        </button>
        <button
          className="size-5"
          onClick={() => {
            if (onEditEnd) {
              onEditEnd()
            }
          }}
        >
          <TrashIcon className="size-full text-black-500" />
        </button>
      </span>
    </span>
  )
}
export default ItemInput
