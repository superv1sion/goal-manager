import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React, { ReactElement } from 'react'

const IconCheckbox = ({
  isChecked,
  hovered,
  onClick,
  readOnly,
}: {
  isChecked: boolean
  readOnly: boolean
  hovered: boolean
  onClick: () => void
}): ReactElement => {
  return (
    <button
      className={`mr-1 ${isChecked ? 'size-5' : 'w-5 h-[.95rem]'} ${
        readOnly || hovered || isChecked ? '' : 'hidden'
      } ${readOnly ? 'cursor-default' : ''} flex justify-center`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {isChecked ? (
        <CheckCircleIcon className="size-full text-black-500" />
      ) : (
        <div className="size-4 bg-slate-50 self-center border-2 border-black rounded-full" />
      )}
    </button>
  )
}
export default IconCheckbox
