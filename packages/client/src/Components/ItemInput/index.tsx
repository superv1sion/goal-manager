'use client'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

const ItemInput = ({ onBlurHandler, onConfirm }): ReactElement => {
  const [value, setValue] = useState('')
  return (
    <span className="flex justify-between">
      <input
        type="text"
        className="outline-0 bg-amber-200 border-b border-black py-1 px-2"
        autoFocus
        onBlur={() => onBlurHandler(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your text"
      />
      <span className="flex items-center">
        <button className="mr-1 size-5">
          <CheckIcon />
        </button>
        <button className="mr-1 size-5">
          <TrashIcon className="size-full text-black-500" />
        </button>
      </span>
    </span>
  )
}
export default ItemInput
