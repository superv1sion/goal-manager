import { configure, makeAutoObservable } from 'mobx'

import { Item } from '@/types/item'
import { Step } from '@/types/step'

configure({ enforceActions: 'always' })

const getInitialSteps = (): Step[] => [
  {
    title: 'HAVING',
    number: 1,
    items: [],
  },
  {
    title: 'BEING',
    number: 2,
    items: [],
  },
  {
    number: 3,
    title: 'DOING',
    items: [],
  },
  {
    number: 5,
    title: 'COST',
    items: [],
  },
  {
    number: 4,
    title: 'DOING',
    items: [],
  },
  {
    number: 5,
    title: 'COST',
    items: [],
  },
  {
    number: 5,
    title: 'COST',
    items: [],
  },
]

class StepsStore {
  steps: Step[] = getInitialSteps()

  constructor() {
    makeAutoObservable(this)
  }

  addItem = (stepIdx: number, text: string): void => {
    const newItem: Item = {
      text,
      isReady: false,
      requiresFulfillment: false,
    }
    this.steps[stepIdx].items.push(newItem)
  }

  removeItem = (stepIdx: number, itemIdx: number): void => {
    this.steps[stepIdx].items.splice(itemIdx, 1)
  }

  editItem = (stepIdx: number, itemIdx: number, newText: string): void => {
    this.steps[stepIdx].items[itemIdx] = {
      ...this.steps[stepIdx].items[itemIdx],
      text: newText,
    }
    // const updatedItem = {
    //   ...this.steps[stepIdx].items[itemIdx],
    //   text: newText,
    // }
    // this.steps[stepIdx].items = [
    //   ...this.steps[stepIdx].items.map((item, index) => {
    //     if (index === itemIdx) {
    //       return updatedItem
    //     } else {
    //       return item
    //     }
    //   }),
    // ]
  }

  toggleCheck = (stepIdx: number, itemIdx: number): void => {
    this.steps[stepIdx].items[itemIdx].isReady = !this.steps[stepIdx].items[itemIdx].isReady
  }
}

export default new StepsStore()
