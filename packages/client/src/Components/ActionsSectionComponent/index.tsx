import { toJS } from 'mobx'
import * as React from 'react'

import ActionsComponent from '@/Components/ActionsComponent'
import { Actions } from '@/types/actions'

interface Props {
  actions: Actions
  onEditStart?: () => void
  onEditEnd?: () => void
}
const ActionsSection = ({ actions, onEditStart, onEditEnd }: Props): React.JSX.Element => {
  return (
    <div className="self-center">
      {Object.entries(actions).map(([key, value]) => {
        return (
          <ActionsComponent
            actions={value}
            actionsKey={key}
            key={key}
            onEditStart={onEditStart}
            onEditEnd={onEditEnd}
          />
        )
      })}
    </div>
  )
}
export default ActionsSection
