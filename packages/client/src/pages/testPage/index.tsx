import React, { ReactElement, useEffect, useState } from 'react'

import { API_URL } from '@/constants/api'

const TestPage = (): ReactElement => {
  const [plans, setPlans] = useState('')
  const getAllPlans = async (): Promise<any> => {
    void fetch(API_URL + 'plans', { method: 'GET' }).then(async (data) => {
      const response = await data.json()
      setPlans(JSON.stringify(response))
    })
  }

  useEffect(() => {
    await getAllPlans()
  }, [])
  const addPlan = async (): Promise<any> => {
    void fetch(API_URL + 'plans', {
      method: 'POST',
      body: JSON.stringify({ name: 'testName', userId: 'testUserId' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (data) => {
      await getAllPlans()
    })
  }

  return (
    <div>
      plans: {plans}
      <button onClick={addPlan}> add plan</button>
    </div>
  )
}

export default TestPage
