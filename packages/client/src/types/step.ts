import { Task } from '@/types/task'

export interface Step {
  number: number
  title: string
  items: Task[]
  sum?: number
}
