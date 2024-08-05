'use client'
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import TaskComponent from 'src/Components/TaskComponent'

import { useProcessingState } from '@/hooks/useProcessingState'
import { Step } from '@/types/step'

interface StepProps {
  step: Step
  stepNumber: number
  onEditStart?: (index: number) => void
  onEditEnd?: (index: number) => void
  readOnly?: boolean
  addItemHandler?: (stepNumber: number, text: string) => void
  removeItemHandler?: (stepNumber: number, index: number) => void
  toggleCheckHandler?: (stepNumber: number, index: number) => void
  editItemHandler?: (stepNumber: number, index: number, text: string) => void
  calculateSumHandler?: (stepNumber: number, sum: number) => void
}

const StepComponent = observer(
  ({
    step,
    onEditStart,
    onEditEnd,
    stepNumber,
    readOnly,
    addItemHandler,
    removeItemHandler,
    toggleCheckHandler,
    editItemHandler,
    calculateSumHandler,
  }: StepProps): ReactElement => {
    const { items, number, title, sum } = step
    const [editMode, setEditMode] = useState(false)
    const [addButtonDisable, setAddButtonDisable] = useState(false)
    const [anyTasksProcessing, setAnyTasksProcessing] = useProcessingState({})
    const [usersSum, setUsersSum] = useState(sum)
    const color = useMemo(() => {
      return [3, 4, 5].includes(stepNumber) ? 'bg-amber-200' : 'bg-amber-100'
    }, [stepNumber])

    const calculable = useMemo(() => {
      return [3, 5, 6].includes(stepNumber)
    }, [stepNumber])

    const parseIntegers = (str: string): number[] => {
      let subStr = ''
      const arrayOfNumbers = []
      for (let i = 0; i < str.length; i++) {
        if (!isNaN(+str[i])) {
          subStr += str[i]
        } else if (subStr.length > 0) {
          arrayOfNumbers.push(parseInt(subStr))
          subStr = ''
        }
      }
      if (subStr.length > 0) {
        arrayOfNumbers.push(parseInt(subStr, 10))
      }
      return arrayOfNumbers
    }

    const total = items.reduce((acc, item) => {
      const parsed = parseIntegers(item.text)
      const number = parsed.length === 1 ? parsed[0] : parsed.reduce((acc, num) => acc + num, 0)
      return acc + number
    }, 0)
    const superTotal = useMemo(() => {}, [sum, total])

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
        onDeleteClick={(index: number) => removeItemHandler && removeItemHandler(stepNumber, index)}
        key={index}
        taskIdentifier={stepNumber}
        readOnly={readOnly}
        onToggleCheckClick={(index: number) =>
          toggleCheckHandler && toggleCheckHandler(stepNumber, index)
        }
        onEditConfirm={(index: number, text: string) =>
          editItemHandler && editItemHandler(stepNumber, index, text)
        }
        onEditEnd={onEditStepEnd}
        onEditStart={onEditStepStart}
      />
    ))

    return (
      <div className="bg-amber-300 h-64  w-72 rounded flex flex-col" ref={ref}>
        <h4 className="text-center border-b border-slate-500 tracking-[.1em] font-semibold py-2">
          Step
          <span className="bg-black text-amber-300 m-1 rounded-full size-6 text-center inline-flex items-center justify-center">
            {number}
          </span>
          : {title}
        </h4>
        <div className={`${color} h-5/6 px-1 py-2 flex flex-col justify-between overflow-y-scroll`}>
          <div>
            <ul>{itemComponentsList}</ul>
            {editMode ? (
              <TaskComponent
                itemIndex={itemComponentsList.length}
                taskIdentifier={stepNumber}
                onAddConfirm={(text) => addItemHandler && addItemHandler(stepNumber, text)}
                onEditEnd={onEditStepEnd}
                writeMode
              />
            ) : null}
          </div>

          {calculable && !readOnly && (
            <span className="flex px-2 items-center">
              <input
                type="text"
                value={usersSum || ''}
                onChange={(e) => {
                  !isNaN(Number(e.target.value)) && setUsersSum(Number(e.target.value))
                }}
                className="outline-0 bg-amber-200 border-b w-1/3  border-black py-1 px-2 mr-2"
              />
              <button
                className="mr-1 size-5"
                onClick={(event) => {
                  event.preventDefault()
                  calculateSumHandler && calculateSumHandler(stepNumber, Number(usersSum))
                }}
              >
                <CheckIcon />
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault()
                  setUsersSum(total)
                }}
              >
                Calculate
              </button>
            </span>
          )}
        </div>
        <button
          className="size-fit mx-3 my-1 rounded-full text-amber-950 disabled:text-amber-400 disabled:cursor-not-allowed"
          disabled={addButtonDisable}
          onClick={() => {
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
