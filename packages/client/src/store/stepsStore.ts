'use client'
import { action, configure, makeAutoObservable, runInAction } from 'mobx'
import { omit } from 'ramda'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Actions } from '@/types/actions'
import { DraftPlan } from '@/types/draftPlan'
import { Plan } from '@/types/plan'
import { Step } from '@/types/step'
import { Task } from '@/types/task'

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
const getInitialActions = (): Actions => ({
  stepsNow: [] as Task[],
  tomorrow: [] as Task[],
  dayAfter: [] as Task[],
})
// const getInitialPlan = (): Plan => ({
//   name: '',
//   duration: null,
//   creationDate: null,
//   planId: '',
//   steps: getInitialSteps(),
//   actions: [],
// })

const saveToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
const deleteFromLocalStorage = <T>(key: string): void => {
  localStorage.removeItem(key)
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

  set draftPlan(planObj: DraftPlan | null) {
    this._draftPlan = planObj
    if (this._draftPlan) {
      saveToLocalStorage<DraftPlan>('draftPlan', this._draftPlan)
    } else {
      deleteFromLocalStorage('draftPlan')
    }
  }

  get draftPlan(): DraftPlan | null {
    if (this._draftPlan) {
      return this._draftPlan
    }
    return getFromLocalStorage<DraftPlan>('draftPlan')
  }

  consumeDraftPlan = (): void => {
    if (this.draftPlan) {
      this.draftPlan = { ...this.draftPlan, isConsumed: true }
    }
  }

  createDraftPlan = (draftPlan: DraftPlan): void => {
    this.draftPlan = {
      steps: draftPlan.steps ?? getInitialSteps(),
      actions: draftPlan.actions ?? getInitialActions(),
      name: draftPlan.name,
      duration: draftPlan.duration,
      planId: draftPlan.planId ?? uuidv4(),
    }
  }

  get allPlans(): Plan[] {
    if (this._allPlans.length > 2) {
      return this._allPlans
    } else {
      return getAllPlansFromLocalStorage()
    }
  }

  set allPlans(plans: Plan[]) {
    this._allPlans = plans
    saveToLocalStorage('allPlans', this._allPlans)
  }

  saveCurrentPlanToLocalStorage(): void {
    saveToLocalStorage('draftPlan', this.draftPlan)
  }

  setAllPlans = (): void => {
    this._allPlans = getAllPlansFromLocalStorage()
  }

  addPlan = (draftPlan: DraftPlan): void => {
    const plan: Plan = {
      ...omit(['isConsumed'], draftPlan),
      creationDate: new Date(),
      planId: draftPlan.planId ?? uuidv4(),
    }
    this.allPlans = [
      ...this.allPlans.filter((persistentPlan) => plan.planId !== persistentPlan.planId),
      plan,
    ]
    saveToLocalStorage('allPlans', this.allPlans)
  }

  deletePlan = (planId: string): void => {
    this.allPlans = this.allPlans.filter((persistentPlan) => persistentPlan.planId !== planId)
    saveToLocalStorage('allPlans', this.allPlans)
  }

  addItem = (stepIdx: number, text: string): void => {
    if (!this.draftPlan) {
      return
    }
    const newItem: Task = {
      text,
      isReady: false,
      requiresFulfillment: false,
    }
    this.draftPlan.steps[stepIdx].items.push(newItem)
    this.saveCurrentPlanToLocalStorage()
  }

  addAction = (actionKey: string, text: string): void => {
    if (!this.draftPlan) {
      return
    }
    const newItem: Task = {
      text,
      isReady: false,
      requiresFulfillment: false,
    }
    // this.draftPlan.actions[actionKey].push(newItem)
    const newTasks = [...this.draftPlan.actions[actionKey], newItem]
    const actions = { ...this.draftPlan.actions, [actionKey]: newTasks }

    this.draftPlan = {
      ...this.draftPlan,
      actions,
    }
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

  removeAction = (actionKey: string, actionIdx: number): void => {
    if (!this.draftPlan) {
      return
    }
    const filteredTasks = this.draftPlan.actions[actionKey].filter(
      (item, index) => index !== actionIdx
    )
    const actions = { ...this.draftPlan.actions, [actionKey]: filteredTasks }

    this.draftPlan = { ...this.draftPlan, actions }
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

  editAction = (actionsKey: string, actionIndex: number, newText: string): void => {
    console.log(newText)
    runInAction(() => {
      if (!this.draftPlan) {
        return
      }
      const newTasks = this.draftPlan.actions[actionsKey].map((task, index): Task => {
        if (index === actionIndex) {
          return { ...task, text: newText }
        }
        return task
      })
      console.log(newTasks)
      const actions = { ...this.draftPlan.actions, [actionsKey]: newTasks }
      console.log(actions)
      this.draftPlan = {
        ...this.draftPlan,
        actions,
      }
      console.log(this.draftPlan)
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

  toggleActionCheck = (actionsKey: string, actionIndex: number): void => {
    if (!this.draftPlan) {
      return
    }
    const newTasks = this.draftPlan.actions[actionsKey].map((task, index): Task => {
      if (index === actionIndex) {
        return { ...task, isReady: !task.isReady }
      }
      return task
    })
    const actions = { ...this.draftPlan.actions, [actionsKey]: newTasks }
    this.draftPlan = { ...this.draftPlan, actions }
    this.saveCurrentPlanToLocalStorage()
  }
}
export default PlansStore

export const store = new PlansStore()
export const StoreContext = React.createContext<PlansStore>(store)
export const useStore = (): PlansStore => React.useContext(StoreContext)
