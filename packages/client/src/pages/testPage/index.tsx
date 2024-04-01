import { ReactElement, useEffect, useState } from 'react'

import { API_URL } from '@/constants/api'

const TestPage = (): ReactElement => {
  const [plans, setPlans] = useState('')
  const getAllPlans = () => {
    void fetch(API_URL + 'plans', { method: 'GET' }).then(async (data) => {
      const response = await data.json()
      setPlans(JSON.stringify(response))
    })
  }

  useEffect(() => {
    getAllPlans()
  }, [])
  const addPlan = async (): Promise<any> => {
    void fetch(API_URL + 'plans', {
      method: 'POST',
      body: JSON.stringify({ name: 'testName', userId: 'testUserId' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (data) => {
      getAllPlans()
    })
  }

  return (
    <div>
      plans: {plans}
      <button onClick={addPlan}> add plan </button>
    </div>
  )
}

export default TestPage
