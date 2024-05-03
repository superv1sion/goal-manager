import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

const ItemInput = ({ onBlurHandler, onConfirm }): ReactElement => {
  const [value, setValue] = useState('')
  return (
    <span className="flex justify-between">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="outline-0 bg-amber-200 border-b w-10/12 border-black py-1 px-2"
        autoFocus
        placeholder="Enter your text"
      />
      <span className="flex items-center">
        <button
          className="mr-1 size-5"
          onClick={() => {
            onConfirm(value)
            setValue('')
            onBlurHandler(false)
          }}
        >
          <CheckIcon />
        </button>
        <button
          className="mr-1 size-5"
          onClick={() => {
            onBlurHandler(false)
          }}
        >
          <TrashIcon className="size-full text-black-500" />
        </button>
      </span>
    </span>
  )
}
export default ItemInput
