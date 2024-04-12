import { Action } from '@/types/action'
import { Step } from '@/types/step'

export interface Plan {
  name: string
  duration: number
  userId?: string
  steps: Step[]
  actions: Action[]
}
