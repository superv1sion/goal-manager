'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import StepItemComponent from '@/Components/StepItemComponent'
import stepsStore from '@/store/stepsStore'
import { Step } from '@/types/step'

interface StepProps {
  step: Step
  stepNumber: number
  submitDisabler: Dispatch<SetStateAction<boolean>>
  disabled: boolean
}

const StepComponent = observer(
  ({ step, submitDisabler, stepNumber, disabled }: StepProps): ReactElement => {
    const { items, number, title } = step
    const { addItem } = stepsStore
    const [editMode, setEditMode] = useState(false)
    // const [itemsList, setItemsList] = useState(items)

    useEffect(() => {
      submitDisabler(editMode)
    }, [editMode, submitDisabler])
    const addNewItem = (text: string): void => {
      addItem(stepNumber, text)
    }
    const itemComponentsList = items.map((item, index) => (
      <StepItemComponent item={item} index={index} key={index} stepNumber={stepNumber} />
    ))

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
          <ul>{itemComponentsList}</ul>
          {editMode ? <ItemInput onConfirm={addNewItem} onBlurHandler={setEditMode} /> : null}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault()
            setEditMode(true)
          }}
        >
          <PlusCircleIcon className="size-7 self-center" />
        </button>
      </div>
    )
  }
)
export default StepComponent
