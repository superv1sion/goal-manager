'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import { API_URL } from '@/constants/api'
import { Plan } from '@/types/plan'

import { addPlan } from './action'

const PlanForm = (): ReactElement => {
  const [resultMessage, setResultMessage] = useState(null)
  const [formState, submitForm] = useFormState(addPlan, {})

  const [plans, setPlans] = useState<Plan[]>([])
  const getAllPlans = () => {
    void fetch(API_URL + 'plans', { method: 'GET' }).then(async (data) => {
      const response = await data.json()
      setPlans(JSON.stringify(response))
    })
  }

  useEffect(() => {
    console.log(formState)
    setTimeout(() => setResultMessage(null), 10000)
    getAllPlans()
  }, [formState])

  return (
    <form action={submitForm} className="flex flex-col mb-8">
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
        id="planDuration"
        placeholder="Enter plan duration"
      />

      <button
        className="bg-slate-700 text-amber-200 w-48 self-center rounded-lg h-12 hover:bg-sky-700"
        type="submit"
      >
        Create Plan
      </button>

      {resultMessage}
    </form>
  )
}

export default PlanForm
