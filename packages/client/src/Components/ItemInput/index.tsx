import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useEffect, useState } from 'react'

interface Props {
  disableEditeMode: () => void
  enableButtons?: () => void
  onConfirm: (text: string) => void
  addListener: () => void
  removeListener: () => void
}
// ItemComponent, not ItemInput
const ItemInput = ({
  disableEditeMode,
  addListener,
  removeListener,
  enableButtons, // which buttons?
  onConfirm,
}: // onEdit, onSave, onDelete, onClickOutside (possibly)
Props): ReactElement => {
  const [value, setValue] = useState('')
  useEffect(() => {
    addListener()
    return () => {
      removeListener()
    }
  }, [addListener, removeListener])
  return (
    <span className="flex justify-between">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="outline-0 bg-amber-200 border-b w-10/12 border-black py-1 px-2"
        autoFocus
        placeholder="Enter your text"
        // onBlur={disableEditeMode}
      />
      <span className="flex items-center">
        <button
          className="mr-1 size-5"
          onClick={(e) => {
            e.preventDefault()
            onConfirm(value)
            setValue('')
            if (enableButtons) {
              enableButtons()
            }
            disableEditeMode()
          }}
        >
          <CheckIcon />
        </button>
        <button
          className="mr-1 size-5"
          onClick={() => {
            if (enableButtons) {
              enableButtons()
            }
            disableEditeMode()
          }}
        >
          <TrashIcon className="size-full text-black-500" />
        </button>
      </span>
    </span>
  )
}
export default ItemInput
