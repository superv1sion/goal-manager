import { Task } from '@/types/task'

// export interface Actions {
//   stepsNow: Task[]
//   tomorrow: Task[]
//   dayAfter: Task[]
//   [key: string]: Task[]
// }
export interface Actions {
  name: string
  tasks: Task[]
}
