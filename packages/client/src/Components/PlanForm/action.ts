'use client'

import { DraftPlan } from '@/types/draftPlan'
export const addPlanAction =
  (addPlan: (draftPlan: DraftPlan) => void, draftPlan: DraftPlan) =>
  (_: any, formData: FormData): { success: boolean } => {
    addPlan(draftPlan)
    return { success: true }
  }
