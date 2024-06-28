'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import StepItemComponent from '@/Components/StepItemComponent'
import { useStore } from '@/store/stepsStore'
import { Step } from '@/types/step'

interface StepProps {
  step: Step
  stepNumber: number
  onEditCallback?: (isEdit: boolean) => void
  readOnly?: boolean
}

const StepComponent = observer(
  ({ step, onEditCallback, stepNumber, readOnly }: StepProps): ReactElement => {
    const { items, number, title } = step
    const { addItem, removeItem } = useStore()
    const [editMode, setEditMode] = useState(false)
    // const [itemsList, setItemsList] = useState(items)

    const addNewItem = (text: string): void => {
      addItem(stepNumber, text)
    }
    const removeItemHandler = (index: number): void => {
      removeItem(stepNumber, index)
    }
    const enableEditMode = (): void => {
      if (onEditCallback) {
        setEditMode(true)
        onEditCallback(true)
      }
    }
    const disableEditMode = (): void => {
      if (onEditCallback) {
        setEditMode(false)
        onEditCallback(false)
      }
    }
    const itemComponentsList = items.map((item, index) => (
      <StepItemComponent
        item={item}
        itemIndex={index}
        removeItem={removeItemHandler}
        key={index}
        stepNumber={stepNumber}
        onEditCallback={onEditCallback}
        readOnly={readOnly}
      />
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
          {editMode ? (
            <ItemInput onConfirm={addNewItem} disableEditeMode={disableEditMode} />
          ) : null}
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
)
export default StepComponent
