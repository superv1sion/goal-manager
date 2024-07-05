'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import TaskComponent from 'src/Components/TaskComponent'

import ItemInput from '@/Components/ItemInput'
import { useStore } from '@/store/stepsStore'
import { Step } from '@/types/step'

interface StepProps {
  step: Step
  stepNumber: number
  onEditStart?: () => void
  onEditEnd?: () => void
  readOnly?: boolean
}

const StepComponent = observer(
  ({ step, onEditStart, onEditEnd, stepNumber, readOnly }: StepProps): ReactElement => {
    const { items, number, title } = step
    const { addItem, removeItem, toggleCheck, editItem } = useStore()
    const [editMode, setEditMode] = useState(false)
    const [addButtonDisable, setAddButtonDisable] = useState(false)
    // const [itemsList, setItemsList] = useState(items)
    const ref = useRef<HTMLDivElement>(null)

    const disableEditMode = (): void => {
      setEditMode(false)
    }

    const clickOutsideComponent = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        disableEditMode()
        enableButtons()
      }
    }
    useEffect(() => {
      if (addButtonDisable) {
        document.addEventListener('mousedown', clickOutsideComponent)
      } else {
        document.removeEventListener('mousedown', clickOutsideComponent)
      }
      return () => {
        document.removeEventListener('mousedown', clickOutsideComponent)
      }
    }, [addButtonDisable])
    const addOutsideClickListener = (): void => {
      document.addEventListener('click', clickOutsideComponent)
    }
    const removeOutsideClickListener = (): void => {
      document.removeEventListener('click', clickOutsideComponent)
    }
    const addNewItem = (text: string): void => {
      addItem(stepNumber, text)
    }
    const removeItemHandler = (index: number): void => {
      removeItem(stepNumber, index)
    }
    const toggleCheckHandler = (index: number): void => {
      toggleCheck(stepNumber, index)
    }
    const editItemHandler = (index: number, text: string): void => {
      editItem(stepNumber, index, text)
    }
    const enableEditMode = (): void => {
      setEditMode(true)
    }
    const disableButtons = (): void => {
      if (onEditStart) {
        onEditStart()
        setAddButtonDisable(true)
        // addOutsideClickListener()
      }
    }

    const enableButtons = (): void => {
      if (onEditEnd) {
        setAddButtonDisable(false)
        onEditEnd()
        // removeOutsideClickListener()
      }
    }
    const itemComponentsList = items.map((item, index) => (
      <TaskComponent
        item={item}
        itemIndex={index}
        removeItem={removeItemHandler}
        key={index}
        taskIdentifier={stepNumber}
        readOnly={readOnly}
        toggleCheck={toggleCheckHandler}
        editItem={editItemHandler}
        enableButtons={enableButtons}
        disableButtons={disableButtons}
        addListener={addOutsideClickListener}
        removeListener={removeOutsideClickListener}
      />
    ))

    return (
      <div className="bg-amber-300 h-52  w-72 rounded flex flex-col" ref={ref}>
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
            <ItemInput
              onConfirm={addNewItem}
              enableButtons={enableButtons}
              disableEditeMode={disableEditMode}
              addListener={addOutsideClickListener}
              removeListener={removeOutsideClickListener}
            />
          ) : null}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={addButtonDisable}
          onClick={(e) => {
            e.preventDefault()
            enableEditMode()
            disableButtons()
          }}
        >
          {!readOnly ? <PlusCircleIcon className="size-7 self-center" /> : null}
        </button>
      </div>
    )
  }
)
export default StepComponent
