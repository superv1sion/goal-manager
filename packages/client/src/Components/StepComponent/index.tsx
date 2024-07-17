'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import TaskComponent from 'src/Components/TaskComponent'

import { useStore } from '@/store/stepsStore'
import { Step } from '@/types/step'
import { useProcessingState } from '@/utils/useProcessingState'

interface StepProps {
  step: Step
  stepNumber: number
  onEditStart?: (index: number) => void
  onEditEnd?: (index: number) => void
  readOnly?: boolean
}

const StepComponent = observer(
  ({ step, onEditStart, onEditEnd, stepNumber, readOnly }: StepProps): ReactElement => {
    const { items, number, title } = step
    const { addItem, removeItem, toggleCheck, editItem } = useStore()
    const [editMode, setEditMode] = useState(false)
    const [addButtonDisable, setAddButtonDisable] = useState(false)
    const [anyTasksProcessing, setAnyTasksProcessing] = useProcessingState({})

    useEffect(() => {
      if (anyTasksProcessing) {
        setAddButtonDisable(true)
        if (onEditStart) {
          onEditStart(stepNumber)
        }
        return
      }
      setAddButtonDisable(false)
      if (onEditEnd) {
        onEditEnd(stepNumber)
      }
    }, [anyTasksProcessing])
    const ref = useRef<HTMLDivElement>(null)

    const disableEditMode = (): void => {
      setEditMode(false)
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
    const onEditStepStart = (index: number): void => {
      setAnyTasksProcessing(index, true)
    }

    const onEditStepEnd = (index: number): void => {
      disableEditMode()
      setAnyTasksProcessing(index, false)
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
            onEditStepStart(items.length)
          }}
        >
          {!readOnly ? <PlusCircleIcon className="size-7 self-center" /> : null}
        </button>
      </div>
    )
  }
)
export default StepComponent
