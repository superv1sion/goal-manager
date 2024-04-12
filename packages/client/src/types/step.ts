import { Item } from '@/types/item'

export interface Step {
  number: number
  title: string
  items: Item[]
}
