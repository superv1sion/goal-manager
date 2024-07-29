import React, { ReactElement, useState } from 'react'

import HeaderInput from '@/Components/HeaderInputComponent'

interface Props {
  defaultName: string
  nameErrors: Array<string | undefined> | undefined
  defaultDuration: number | null
  durationErrors: Array<string | undefined> | undefined
}
export const EditPlanHeader = ({
  defaultName,
  nameErrors,
  defaultDuration,
  durationErrors,
}: Props): ReactElement => {
  return (
    <div className="flex flex-col mb-8 mr-5">
      <HeaderInput
        label="name"
        fieldName="planName"
        placeholder="Enter Plan Name"
        defaultValue={defaultName}
        errors={nameErrors}
      />
      <HeaderInput
        label="duration"
        fieldName="planDuration"
        placeholder="Enter plan duration"
        defaultValue={defaultDuration}
        errors={durationErrors}
      />
    </div>
  )
}
