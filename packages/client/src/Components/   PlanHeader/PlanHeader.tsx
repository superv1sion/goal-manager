'use client'
import { observer } from 'mobx-react-lite'
import React, { ReactElement } from 'react'

const PlanHeader = observer((): ReactElement => {
  return (
    <form className="flex m-auto flex-col mb-8 px-8 py-6">
      <label htmlFor="planName" className="mb-2">
        Enter plan name
      </label>
      <input
        className="outline-0 w-4/12 mb-4 px-1 py-1 border-2 focus:p-2 rounded-lg border-amber-200"
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
    </form>
  )
})

export default PlanHeader
