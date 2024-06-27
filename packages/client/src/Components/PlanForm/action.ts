'use client'

import { Action } from '@/types/action'
import { DraftPlan } from '@/types/draftPlan'
import { Step } from '@/types/step'

const getFormPlanValues = (
  formData: FormData
): { name: string; duration: number; actions: Action[]; steps: Step[] } => {
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
