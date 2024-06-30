import { Actions } from '@/types/actions'
import { Step } from '@/types/step'

export interface DraftPlan {
  name: string
  planId?: string
  duration: number | null
  steps: Step[]
  actions: Actions
  isConsumed?: boolean
}
