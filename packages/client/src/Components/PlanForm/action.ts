'use client'
import { toJS } from 'mobx'

import PlanStore from '@/store/stepsStore'

const getFormPlanValues = (formData): { name: string; duration: number } => {
  return {
    name: formData.get('planName'),
    duration: +formData.get('planDuration'),
  }
}
export const addPlan = (prevState, formData): void => {
  const { name, duration } = getFormPlanValues(formData)
  PlanStore.addPlan(name, duration)

  console.log(name, duration)
  console.log(toJS(PlanStore))
}
