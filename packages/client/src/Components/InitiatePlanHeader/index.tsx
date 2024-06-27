'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { isEmpty, isNil } from 'ramda'
import React, { ReactElement, useMemo } from 'react'
import { useFormState } from 'react-dom'

import { useStore } from '@/store/stepsStore'
import { DraftPlan } from '@/types/draftPlan'

type Predicate<T> = (value: T) => boolean
type ValidationRule<T> = [Predicate<T>, string]
interface ValidationResult {
  fieldName: string
  errors: string[]
}

const isNotNil = <T,>(val: T): boolean => !isNil(val)
const validate = <T,>(rules: Array<ValidationRule<T>>, value: T): string[] =>
  rules
    .map(([predicate, message]) => (predicate(value) ? undefined : message))
    .filter(isNotNil) as string[]

const validateName = (planName: string): ValidationResult => {
  const errors: string[] = validate(
    [
      [(val: string) => val.length > 0, 'Name should be at least 1 character'],
      [(val: string) => isNotNil(val), 'Name should be defined'],
    ],
    planName
  )
  return { fieldName: 'planName', errors }
}

const validateDuration = (duration: number): ValidationResult => {
  const errors: string[] = validate(
    [
      [(val: number) => isNotNil(val), 'Name should be defined'],
      [(val: number) => !isNaN(val), 'Duration must be a number'],
      [(val: number) => val > 0, 'Duration must be positive'],
    ],
    duration
  )
  return { fieldName: 'planDuration', errors }
}

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
      <label htmlFor="planName" className="mb-2">
        Enter plan name
      </label>
      <input
        className="outline-0 w-4/12 mb-4 px-1 py-1 border-2 focus:p-2 rounded-lg border-amber-200"
        type="text"
        name="planName"
        id="planName"
        placeholder="Plan Name"
        defaultValue={plan?.name ?? ''}
      />
      {state?.errors?.planName?.errors.map((error: string) => {
        return <div>{error}</div>
      })}

      <label htmlFor="planDuration" className="mb-2">
        Plan Duration (Days):
      </label>
      <input
        className="outline-0 w-4/12 mb-4 px-2 py-2 border-2 rounded-lg border-amber-200"
        type="text"
        name="planDuration"
        placeholder="Enter plan duration"
        defaultValue={plan?.duration ?? ''}
      />
      {state?.errors?.planDuration?.errors.map((error: string) => {
        return <div>{error}</div>
      })}

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
