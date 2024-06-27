'use client'
import { configure, makeAutoObservable, runInAction } from 'mobx'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { DraftPlan } from '@/types/draftPlan'
import { Item } from '@/types/item'
import { Plan } from '@/types/plan'
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
const getInitialPlan = (): Plan => ({
  name: '',
  duration: null,
  creationDate: null,
  planId: '',
  steps: getInitialSteps(),
  actions: [],
})

const saveToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getFromLocalStorage = <Type>(key: string): Type | null => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  return null
}
const getAllPlansFromLocalStorage = <Type>(): Type[] => {
  return getFromLocalStorage<Type[]>('allPlans') ?? ([] as Type[])
}

class PlansStore {
  public _allPlans: Plan[] = []

  public _draftPlan: DraftPlan | null = null

  constructor() {
    makeAutoObservable(this)
  }

  set draftPlan(planObj: DraftPlan) {
    this._draftPlan = planObj
    saveToLocalStorage<DraftPlan>('draftPlan', this._draftPlan)
  }

  get draftPlan(): DraftPlan | null {
    if (this._draftPlan) {
      return this._draftPlan
    }
    return getFromLocalStorage<DraftPlan>('draftPlan')
  }

  createDraftPlan = (name: string, duration: number): void => {
    this.draftPlan = { steps: getInitialSteps(), actions: [], name, duration, planId: uuidv4() }
  }

  get allPlans(): Plan[] {
    if (this._allPlans.length > 2) {
      return this._allPlans
    } else {
      return getAllPlansFromLocalStorage()
    }
  }

  saveCurrentPlanToLocalStorage(): void {
    saveToLocalStorage('draftPlan', this.draftPlan)
  }

  setAllPlans = (): void => {
    this._allPlans = getAllPlansFromLocalStorage()
  }

  addPlan = (draftPlan: DraftPlan): void => {
    const plan: Plan = {
      ...draftPlan,
      creationDate: new Date(),
      planId: uuidv4(),
    }
    this._allPlans = [...this._allPlans, plan]
    saveToLocalStorage('allPlans', this.allPlans)
  }

  addItem = (stepIdx: number, text: string): void => {
    if (!this.draftPlan) {
      return
    }
    const newItem: Item = {
      text,
      isReady: false,
      requiresFulfillment: false,
    }
    this.draftPlan.steps[stepIdx].items.push(newItem)
    this.saveCurrentPlanToLocalStorage()
  }

  removeItem = (stepIdx: number, itemIdx: number): void => {
    if (!this.draftPlan) {
      return
    }
    this.draftPlan.steps[stepIdx].items = [
      ...this.draftPlan?.steps[stepIdx].items.filter((item, index) => index !== itemIdx),
    ]
    this.draftPlan = { ...this.draftPlan }
    // this.draftPlan.steps[stepIdx].items.splice(itemIdx, 1)
    this.saveCurrentPlanToLocalStorage()
  }

  editItem = (stepIdx: number, itemIdx: number, newText: string): void => {
    runInAction(() => {
      if (!this.draftPlan) {
        return
      }
      this.draftPlan.steps[stepIdx].items[itemIdx] = {
        ...this.draftPlan.steps[stepIdx].items[itemIdx],
        text: newText,
      }
      this.saveCurrentPlanToLocalStorage()
    })
  }

  toggleCheck = (stepIdx: number, itemIdx: number): void => {
    if (!this.draftPlan) {
      return
    }
    this.draftPlan.steps[stepIdx].items[itemIdx].isReady =
      !this.draftPlan.steps[stepIdx].items[itemIdx].isReady
    this.saveCurrentPlanToLocalStorage()
  }
}
export default PlansStore

export const store = new PlansStore()
export const StoreContext = React.createContext<PlansStore>(store)
export const useStore = (): PlansStore => React.useContext(StoreContext)
