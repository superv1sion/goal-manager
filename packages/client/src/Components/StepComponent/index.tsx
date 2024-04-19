'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import StepItemComponent from '@/Components/StepItemComponent'
import { Item } from '@/types/item'
import { Step } from '@/types/step'

export default function StepComponent({ number, title, items }: Step): ReactElement {
  const [editMode, setEditMode] = useState(false)
  const [newItem, setNewItem] = useState<Item>({
    text: '',
    isReady: false,
    requiresFulfillment: false,
  })
  const itemsList = items.map((item, index) => (
    <StepItemComponent item={item} index={index} key={index} />
  ))
  const addNewItem = (text): void => {
    setNewItem({ ...newItem, text })
    itemsList.push(newItem)
  }

  return (
    <div className="bg-amber-300 h-72  w-80 rounded flex flex-col">
      <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
        Step
        <span className="bg-black text-amber-300 m-1 rounded-full size-6 text-center inline-flex items-center justify-center">
          {number}
        </span>
        : {title}
      </h4>
      <div className="bg-amber-200 h-5/6 px-3 py-2">
        <ul>{itemsList}</ul>
        {editMode ? <ItemInput onConfirm={addNewItem} onBlurHandler={setEditMode} /> : null}
      </div>
      <button onClick={() => setEditMode(true)}>
        <PlusCircleIcon className="size-7 self-center my-1 mx-3 text-amber-950 " />
      </button>
    </div>
  )
}
