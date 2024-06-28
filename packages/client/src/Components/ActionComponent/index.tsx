// @
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import * as React from 'react'

import ItemInput from '@/Components/ItemInput'

interface Props {}
export const Index = ({ title, actions }: Props): React.JSX.Element => {
  return (
    <div className="bg-amber-300 h-72  w-80 rounded flex flex-col">
      <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
        {title}
      </h4>
      <div className="bg-amber-200 h-5/6 px-3 py-2">
        <ul>
          {actions.map((actio, index) => (
            <></>
          ))}
        </ul>
        {editMode ? <ItemInput onConfirm={addNewItem} disableEditeMode={disableEditMode} /> : null}
      </div>
      <button
        className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
        disabled={editMode}
        onClick={(e) => {
          e.preventDefault()
          enableEditMode()
        }}
      >
        {!readOnly ? <PlusCircleIcon className="size-7 self-center" /> : null}
      </button>
    </div>
  )
}
