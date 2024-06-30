import { Actions } from '@/types/actions'
import { Step } from '@/types/step'

export interface Plan {
  name: string
  planId: string
  duration: number | null
  creationDate: Date | null
  steps: Step[]
  actions: Actions
}
