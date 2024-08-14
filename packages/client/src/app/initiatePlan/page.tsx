import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'

const InitiatePlanHeader = dynamic(async () => await import('@/Components/InitiatePlanHeader'), {
  ssr: false,
})
export default function InitiatePlan(): ReactElement {
  return <InitiatePlanHeader />
}
