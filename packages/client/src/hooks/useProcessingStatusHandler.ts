import { useEffect, useState } from 'react'

import { useProcessingState } from '@/hooks/useProcessingState'
interface ProcessingStatus {
  buttonDisabled: boolean
  onEditStepsStart: (index: number) => void
  onEditStepsEnd: (index: number) => void
  onEditActionsStart: (index: number) => void
  onEditActionsEnd: (index: number) => void
}

export const useProccessingStatusHandler = (): ProcessingStatus => {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [anyStepsProcessing, setAnyStepsProcessing] = useProcessingState({})
  const [anyActionsProcessing, setAnyActionsProcessing] = useProcessingState({})

  useEffect(() => {
    setButtonDisabled(anyStepsProcessing || anyActionsProcessing)
  }, [anyStepsProcessing, anyActionsProcessing])

  const onEditStepsStart = (index: number): void => {
    setAnyStepsProcessing(index, true)
  }
  const onEditStepsEnd = (index: number): void => {
    setAnyStepsProcessing(index, false)
  }
  const onEditActionsStart = (index: number): void => {
    setAnyActionsProcessing(index, true)
  }
  const onEditActionsEnd = (index: number): void => {
    setAnyActionsProcessing(index, false)
  }
  return {
    buttonDisabled,
    onEditStepsStart,
    onEditStepsEnd,
    onEditActionsStart,
    onEditActionsEnd,
  }
}
