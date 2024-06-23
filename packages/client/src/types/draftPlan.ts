import { Action } from '@/types/action'
import { Step } from '@/types/step'

export interface DraftPlan {
  name: string
  planId?: string
  duration: number | null
  steps: Step[]
  actions: Action[]
}
