import { Action } from '@/types/action'
import { Step } from '@/types/step'

export interface Plan {
  name: string
  planId: string
  duration: number | null
  creationDate: Date | null
  steps: Step[]
  actions: Action[]
}
