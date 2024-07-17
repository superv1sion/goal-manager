import { useMemo, useState } from 'react'

export const useProcessingState = (
  obj: any
): [boolean, (index: number, value: boolean) => void] => {
  const [processingState, setProcessingState] = useState({})

  const updateProcessingState = (index: number, value: boolean): void => {
    setProcessingState((prevState) => ({
      ...prevState,
      [index]: value,
    }))
  }
  const isAnyProcessing = useMemo(
    (): boolean => Object.values(processingState).find((isProcessing) => isProcessing) as boolean,
    [processingState]
  )

  return [isAnyProcessing, updateProcessingState]
}
