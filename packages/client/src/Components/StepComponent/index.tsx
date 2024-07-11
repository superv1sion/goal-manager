'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import TaskComponent from 'src/Components/TaskComponent'

import ItemInput from '@/Components/ItemInput'
import { useStore } from '@/store/stepsStore'
import { Step } from '@/types/step'
import { Task } from '@/types/task'

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
        console.log('outside')
        disableEditMode()
        setAddButtonDisable(false)
        if (onEditEnd) onEditEnd()
      }
    }
    // useEffect(() => {
    //   if (addButtonDisable) {
    //     document.addEventListener('mousedown', clickOutsideComponent)
    //   } else {
    //     document.removeEventListener('mousedown', clickOutsideComponent)
    //   }
    //   return () => {
    //     document.removeEventListener('mousedown', clickOutsideComponent)
    //   }
    // }, [addButtonDisable])
    const addOutsideClickListener = (): void => {
      document.addEventListener('click', clickOutsideComponent)
    }
    const removeOutsideClickListener = (): void => {
      document.removeEventListener('click', clickOutsideComponent)
    }
    const addItemHandler = (text: string): void => {
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
    const onEditStepStart = (): void => {
      if (onEditStart) {
        onEditStart()
        setAddButtonDisable(true)
        addOutsideClickListener()
      }
    }

    const onEditStepEnd = (): void => {
      disableEditMode()
      if (onEditEnd) {
        setAddButtonDisable(false)
        onEditEnd()
        removeOutsideClickListener()
      }
    }
    const itemComponentsList = items.map((item, index) => (
      <TaskComponent
        item={item}
        itemIndex={index}
        onDeleteClick={removeItemHandler}
        key={index}
        taskIdentifier={stepNumber}
        readOnly={readOnly}
        onToggleCheckClick={toggleCheckHandler}
        onEditConfirm={editItemHandler}
        onEditEnd={onEditStepEnd}
        onEditStart={onEditStepStart}
        // addListener={addOutsideClickListener}
        // removeListener={removeOutsideClickListener}
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
            <TaskComponent
              itemIndex={itemComponentsList.length}
              taskIdentifier={stepNumber}
              onAddConfirm={addItemHandler}
              onEditEnd={onEditStepEnd}
              writeMode
            />
          ) : null}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={addButtonDisable}
          onClick={(e) => {
            enableEditMode()
            onEditStepStart()
          }}
        >
          {!readOnly ? <PlusCircleIcon className="size-7 self-center" /> : null}
        </button>
      </div>
    )
  }
)
export default StepComponent
