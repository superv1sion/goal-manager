'use client'
import { observer } from 'mobx-react-lite'
import { useParams, useRouter } from 'next/navigation'
import React, { ReactElement, useMemo } from 'react'

import EditPlanComponent from '@/app/editPlan/[id]/EditPlanComponent'
import { useStore } from '@/store/stepsStore'

const EditPlan = observer((): ReactElement => {
  const { allPlans } = useStore()
  const params = useParams()
  const router = useRouter()
  const plan = useMemo(() => {
    return allPlans.find((e) => e.planId === params?.id)
  }, [allPlans, params?.id])
  if (!plan) {
    router.push('/plans')
    return <></>
  }
  return (
    <>
      <EditPlanComponent plan={plan} />
    </>
  )
})
export default EditPlan
