'use client'

import { DraftPlan } from '@/types/draftPlan'

const getFormPlanValues = (formData: FormData): DraftPlan => {
  return {
    name: formData.get('planName') as string,
    duration: parseInt(formData.get('planDuration') as string),
    actions: [],
    steps: [],
  }
}
export const addPlanAction =
  (addPlan: (draftPlan: DraftPlan) => void) =>
  (_: any, formData: FormData): boolean => {
    const { name, duration, actions, steps } = getFormPlanValues(formData)
    addPlan({ actions, steps, name, duration })
    return true
  }
