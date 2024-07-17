import * as React from 'react'

import ActionsComponent from '@/Components/ActionsComponent'
import { Actions } from '@/types/actions'

interface Props {
  actions: Actions[]
  onEditStart?: (index: number) => void
  onEditEnd?: (index: number) => void
  readonly?: boolean
}
const ActionsSection = ({
  actions,
  onEditStart,
  onEditEnd,
  readonly,
}: Props): React.JSX.Element => {
  return (
    <div className="self-center">
      {actions.map((a, index) => {
        return (
          <ActionsComponent
            actions={a}
            actionsIdx={index}
            key={a.name}
            onEditStart={onEditStart}
            onEditEnd={onEditEnd}
            readOnly
          />
        )
      })}
    </div>
  )
}
export default ActionsSection
