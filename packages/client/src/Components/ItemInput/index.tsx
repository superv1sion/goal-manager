'use client'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'

const ItemInput = ({ onBlurHandler, onConfirm, name }): ReactElement => {
  return (
    <span className="flex justify-between">
      <input
        type="text"
        className="outline-0 bg-amber-200 border-b border-black py-1 px-2"
        autoFocus
        name={name}
        // onBlur={() => onBlurHandler(false)}
        placeholder="Enter your text"
      />
      <span className="flex items-center">
        <button
          type="submit"
          className="mr-1 size-5"
          // formAction={onConfirm}
          onClick={(e) => {
            onConfirm()
            // onBlurHandler(false)
          }}
        >
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
