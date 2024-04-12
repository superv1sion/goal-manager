'use client'
import React, { ReactElement, useState } from 'react'

import StepItemComponent from '@/Components/StepItemComponent'
import { Step } from '@/types/step'

export default function StepComponent({ selfNumber, title, itemsList }: Step): ReactElement {
  const [editMode, setEditMode] = useState(false)

  const items = itemsList.map((item, index) => (
    <StepItemComponent item={item} index={index} key={index} />
  ))

  return (
    <div className={`bg-amber-300 h-fit w-80 ${editMode ? 'w-96' : ''} rounded`}>
      <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
        Step
        <span className="bg-black text-amber-300 rounded-full mx-2 px-2 inline-block">
          {selfNumber}
        </span>
        : {title}
      </h4>

      <div className="bg-amber-200 px-3 py-2">
        <ul>{items}</ul>
        <input type="text" className={`${editMode ? 'inline' : 'hidden'}`} />
      </div>
    </div>
  )
}
