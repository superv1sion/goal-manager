'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home(): React.JSX.Element {
  const router = useRouter()
  void router.push('plans')
  return <div className="h-10 bg-slate-500">Welcome</div>
}
