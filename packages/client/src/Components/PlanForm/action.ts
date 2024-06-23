'use client'
import { toJS } from 'mobx'

import PlanStore from '@/store/stepsStore'
import { Plan } from '@/types/plan'

const getFormPlanValues = (formData: FormData): { name: string; duration: number } => {
  return {
    name: formData.get('planName') as string,
    duration: parseInt(formData.get('planDuration') as string),
  }
}
export const addPlan = (prevState: Partial<Plan>, formData: FormData): Partial<Plan> => {
  const { name, duration } = getFormPlanValues(formData)
  PlanStore.addPlan(name, duration)
  console.log(name, duration)
  console.log(toJS(PlanStore))
  return prevState
}
