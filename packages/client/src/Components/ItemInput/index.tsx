import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useEffect, useState } from 'react'

interface Props {
  onEditEnd?: () => void
  onConfirm: (text: string) => void
  defaultValue?: string
  // addListener: () => void
  // removeListener: () => void
}
// ItemComponent, not ItemInput
const ItemInput = ({
  // addListener,
  // removeListener,
  onEditEnd, // which buttons?
  onConfirm,
  defaultValue,
}: // onEdit, onSave, onDelete, onClickOutside (possibly)
Props): ReactElement => {
  const [value, setValue] = useState(defaultValue ?? '')
  // useEffect(() => {
  //   addListener()
  //   return () => {
  //     removeListener()
  //   }
  // }, [addListener, removeListener])
  return (
    <span className="flex justify-between">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue ?? ''}
        value={value}
        className="outline-0 bg-amber-200 border-b w-8/12 border-black py-1 px"
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
