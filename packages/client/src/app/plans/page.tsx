'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React from 'react'

const PlansList = dynamic(async () => await import('@/Components/PlansList'), { ssr: false })
const Plans = (): React.JSX.Element => {
  const router = useRouter()
  return (
    <div>
      <h3 className="text-center text-3xl my-5">Your Plans</h3>
      <PlansList />
      <div className="flex justify-center w-100%">
        <button
          className={`m-10  bg-slate-700 mb-8 text-amber-200 w-48 self-center rounded-lg h-12
           hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed`}
          onClick={() => {
            router.push('initiatePlan')
          }}
        >
          Create plan
        </button>
      </div>
    </div>
  )
}

export default Plans
