'use server'
import { API_URL } from '@/constants/api'

const getFormPlanValues = (formData): { name: string; duration: number } => {
  return {
    name: formData.get('planName'),
    duration: +formData.get('planDuration'),
    userId: '22',
  }
}
export const addPlan = async (prevState, formData): Promise<any> => {
  return await fetch(API_URL + 'plans', {
    method: 'POST',
    body: JSON.stringify(getFormPlanValues(formData)),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (data) => {
    const deita = prevState
    return deita
  })
}
