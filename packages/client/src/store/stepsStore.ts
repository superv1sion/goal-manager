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

type PlanOrRecord = Plan | Record<string, Plan> | Partial<Plan>
const saveToLocalStorage = <T extends PlanOrRecord>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getFromLocalStorage = <Type>(key: string): Type | null => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  return null
}
const getAllPlansFromLocalStorage = <Type>(): Type => {
  return getFromLocalStorage<Type>('allPlans')
}

const getPlanFromLocalStorage = <Type>(): Type => {
  return getFromLocalStorage<Type>('currentPlan')
}

class PlansStore {
  _allPlans: Record<string, Plan> = {
    'bla-bla': {
      ...getInitialPlan(),
      name: 'name1',
      duration: 1,
      creationDate: new Date(),
    },
    'bla-bla-bla': {
      ...getInitialPlan(),
      name: 'name2',
      duration: 2,
      creationDate: new Date(),
    },
  }

  _draftPlan: DraftPlan | null = null

  constructor() {
    makeAutoObservable(this)
  }

  set draftPlan(planObj: DraftPlan) {
    this._draftPlan = planObj
    saveToLocalStorage<DraftPlan>('draftPlan', this._draftPlan)
  }

  get draftPlan(): DraftPlan {
    const draftPlan = getFromLocalStorage<DraftPlan>('draftPlan')
    if (this._draftPlan) {
      return this._draftPlan
    } else if (draftPlan) {
      return draftPlan
    }
    return getInitialPlan()
  }

  createDraftPlan = (name: string, duration: number): void => {
    this.draftPlan = { steps: getInitialSteps(), actions: [], name, duration, planId: uuidv4() }
  }

  get allPlans(): Record<string, Plan> {
    if (Object.keys(this._allPlans).length > 2) {
      return this._allPlans
    } else {
      const plansFromLocalStorage = getAllPlansFromLocalStorage()
      return plansFromLocalStorage > 2 ? plansFromLocalStorage : []
    }
  }

  saveCurrentPlanToLocalStorage(): void {
    saveToLocalStorage('draftPlan', this.draftPlan)
  }

  setAllPlans = (): void => {
    this._allPlans = getAllPlansFromLocalStorage()
  }

  addPlan = (name, duration): void => {
    const plan = {
      ...this.currentPlan,
      name,
      duration,
      creationDate: new Date().toLocaleDateString(),
      planId: uuidv4(),
    }
    this._allPlans = [...this._allPlans, plan]
    saveToLocalStorage('allPlans', this.allPlans)
  }

  addItem = (stepIdx: number, text: string): void => {
    const newItem: Item = {
      text,
      isReady: false,
      requiresFulfillment: false,
    }
    this.draftPlan.steps[stepIdx].items.push(newItem)
    this.saveCurrentPlanToLocalStorage()
  }

  removeItem = (stepIdx: number, itemIdx: number): void => {
    this.draftPlan.steps[stepIdx].items = [
      ...this.draftPlan.steps[stepIdx].items.filter((item, index) => index !== itemIdx),
    ]
    this.draftPlan = { ...this.draftPlan }
    // this.draftPlan.steps[stepIdx].items.splice(itemIdx, 1)
    this.saveCurrentPlanToLocalStorage()
  }

  editItem = (stepIdx: number, itemIdx: number, newText: string): void => {
    runInAction(() => {
      this.draftPlan.steps[stepIdx].items[itemIdx] = {
        ...this.draftPlan.steps[stepIdx].items[itemIdx],
        text: newText,
      }
      this.saveCurrentPlanToLocalStorage()
    })
  }

  toggleCheck = (stepIdx: number, itemIdx: number): void => {
    this.draftPlan.steps[stepIdx].items[itemIdx].isReady =
      !this.draftPlan.steps[stepIdx].items[itemIdx].isReady
    this.saveCurrentPlanToLocalStorage()
  }
}

export const store = new PlansStore()
export default PlansStore
export const StoreContext = React.createContext<PlansStore>(store)
export const useStore = (): PlansStore => React.useContext(StoreContext)
