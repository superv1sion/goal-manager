import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

interface Props {
  disableEditeMode: () => void
  onConfirm: (text: string) => void
}
const ItemInput = ({ disableEditeMode, onConfirm }: Props): ReactElement => {
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
          onClick={(e) => {
            e.preventDefault()
            onConfirm(value)
            setValue('')
            disableEditeMode()
          }}
        >
          <CheckIcon />
        </button>
        <button
          className="mr-1 size-5"
          onClick={() => {
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
