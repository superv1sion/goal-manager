'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import StepComponent from '@/Components/StepComponent'
import { API_URL } from '@/constants/api'
import { Item } from '@/types/item'
import { Plan } from '@/types/plan'

import { addPlan } from './action'

const getPlanInitialValue = (): Plan => {
  return {
    name: '',
    userId: '',
    duration: null,
    steps: [
      {
        title: 'HAVING',
        number: 1,
        items: [],
      },
      {
        title: 'BEING',
        number: 2,
        items: [],
      },
      {
        number: 3,
        title: 'DOING',
        items: [],
      },
      {
        number: 5,
        title: 'COST',
        items: [],
      },
      {
        number: 4,
        title: 'DOING',
        items: [],
      },
      {
        number: 5,
        title: 'COST',
        items: [],
      },
      {
        number: 5,
        title: 'COST',
        items: [],
      },
    ],
    actions: [],
  }
}

const setFromState = async (prevState, formData) => {
  let newState = { ...prevState }
  for (const [key, value] of formData.entries()) {
    if (typeof +key === 'number' && !isNaN(+key)) {
      const newItem: Item = {
        requiresFulfillment: true,
        isReady: false,
        text: value,
      }
      newState = {
        ...newState,
        steps: [
          ...newState.steps.map((step, index) => {
            if (index == key) {
              return {
                ...step,
                items: [...step.items, newItem],
              }
            }
            return step
          }),
        ],
      }
    } else {
      newState = { ...newState, key: value }
    }
  }
  return newState
}

const PlanForm = (): ReactElement => {
  const [resultMessage, setResultMessage] = useState(null)
  const [formState, submitForm] = useFormState(addPlan, getPlanInitialValue())
  const [items, setItemsAction] = useFormState(setFromState, getPlanInitialValue())

  const [plans, setPlans] = useState<Plan[]>([])
  const getAllPlans = () => {
    void fetch(API_URL + 'plans', { method: 'GET' }).then(async (data) => {
      const response = await data.json()
      setPlans(JSON.stringify(response))
    })
  }

  useEffect(() => {
    // console.log(formState, 'from client')
    setTimeout(() => setResultMessage(null), 10000)
    getAllPlans()
  }, [items])
  const steps = items?.steps?.map((step, index, arr) => {
    if (index === arr.length - 1) {
      return (
        <div className="row-start-2" key={index}>
          <StepComponent name={`${index}`} step={step} formAction={setItemsAction} />
        </div>
      )
    }
    return <StepComponent key={index} name={`${index}`} formAction={setItemsAction} step={step} />
  })

  return (
    <div className="px-8 py-6">
      <form action={setItemsAction} className="flex flex-col mb-8">
        <div className="mb-4">{plans}</div>
        <hr className="mb-2" />

        <label htmlFor="planName" className="mb-2">
          Enter plan name
        </label>
        <input
          className="outline-0 mb-4 px-2 py-2 border-2 rounded-lg border-amber-200"
          type="text"
          name="planName"
          id="planName"
          placeholder="Plan Name"
        />

        <label htmlFor="planDuration" className="mb-2">
          Plan Duration
        </label>
        <input
          className="outline-0 mb-4 px-2 py-2 border-2 rounded-lg border-amber-200"
          type="text"
          name="planDuration"
          placeholder="Enter plan duration"
        />

        <button
          className="bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12 hover:bg-sky-700"
          type="submit"
        >
          Create Plan
        </button>

        {resultMessage}

        <div className="grid grid-rows-3 grid-flow-col size-fit gap-1">{steps}</div>
      </form>
    </div>
  )
}

export default PlanForm
