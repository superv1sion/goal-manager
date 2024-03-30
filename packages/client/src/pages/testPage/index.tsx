import { ReactElement, useEffect, useState } from 'react'

import { API_URL } from '@/constants/api'

const TestPage = (): ReactElement => {
  const [serverHello, setServerHello] = useState('')
  useEffect(() => {
    void fetch(API_URL, { method: 'GET' }).then(async (data) => {
      const response = await data.json()
      setServerHello(response.message)
    })
  }, [])
  return <div>testPage: {serverHello}</div>
}

export default TestPage
