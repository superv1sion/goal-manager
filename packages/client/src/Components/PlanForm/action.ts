'use client'
import { toJS } from 'mobx'

import PlansStore from '@/store/stepsStore'
// import PlanStore, { useStore } from '@/store/stepsStore'
import { Plan } from '@/types/plan'

const getFormPlanValues = (formData: FormData): { name: string; duration: number } => {
  return {
    name: formData.get('planName') as string,
    duration: parseInt(formData.get('planDuration') as string),
  }
}
export const addPlan = (
  prevState: (name: string, duration: number) => void,
  formData: FormData
): ((name: string, duration: number) => void) => {
  const { name, duration } = getFormPlanValues(formData)
  prevState(name, duration)
  return prevState
}
