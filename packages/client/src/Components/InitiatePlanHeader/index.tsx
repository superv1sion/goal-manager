'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { isEmpty } from 'ramda'
import React, { ReactElement, useMemo } from 'react'
import { useFormState } from 'react-dom'

import HeaderInput from '@/Components/HeaderInputComponent'
import { useStore } from '@/store/stepsStore'
import { DraftPlan } from '@/types/draftPlan'
import { validateDuration, validateName } from '@/utils/validation'

const action =
  (createDraftPlan: (draftPlan: DraftPlan) => void) =>
  async (initialState: DraftPlan, formData: FormData): Promise<any> => {
    const duration = parseInt(formData.get('planDuration') as string)
    const name = formData.get('planName') as string
    const errors = [validateName(name), validateDuration(duration)]
      .filter((validationResult) => !isEmpty(validationResult.errors))
      .reduce(
        (acc, validationResult) => ({ ...acc, [validationResult.fieldName]: validationResult }),
        {}
      )
    if (!isEmpty(errors)) {
      return { success: false, message: 'initiation failed', errors }
    }
    createDraftPlan({ ...initialState, name, duration })
    return { success: true, message: 'plan initiated successfully' }
  }

const InitiatePlanHeader = observer((): ReactElement => {
  const { draftPlan, createDraftPlan } = useStore()
  const plan = useMemo(() => {
    return !draftPlan || draftPlan?.isConsumed ? null : draftPlan
  }, [draftPlan])
  const router = useRouter()
  const [state, setState] = useFormState(
    action(createDraftPlan),
    draftPlan?.isConsumed ? {} : draftPlan
  )
  if (state?.success) {
    router.push('createPlan')
  }
  return (
    <form action={setState} className="flex m-auto flex-col mb-8 px-8 py-6">
      <HeaderInput
        label="name"
        fieldName="planName"
        placeholder="Enter Plan Name"
        defaultValue={plan?.name}
        errors={state?.errors?.planName?.errors}
      />
      <HeaderInput
        label="duration"
        fieldName="planDuration"
        placeholder="Enter plan duration"
        defaultValue={plan?.duration}
        errors={state?.errors?.planDuration?.errors}
      />
      {/* <label htmlFor="planDuration" className="mb-2"> */}
      {/*  Plan Duration (Days): */}
      {/* </label> */}
      {/* <input */}
      {/*  className="outline-0 w-4/12 mb-4 px-2 py-2 border-2 rounded-lg border-amber-200" */}
      {/*  type="text" */}
      {/*  name="planDuration" */}
      {/*  placeholder="Enter plan duration" */}
      {/*  defaultValue={plan?.duration ?? ''} */}
      {/* /> */}
      {/* {state?.errors?.planDuration?.errors.map((error: string) => { */}
      {/*  return <div>{error}</div> */}
      {/* })} */}

      <button
        className={`bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
      >
        Initiate Plan
      </button>
    </form>
  )
})

export default InitiatePlanHeader
