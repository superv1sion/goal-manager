import { toJS } from 'mobx'
import * as React from 'react'

import ActionsComponent from '@/Components/ActionsComponent'
import { Actions } from '@/types/actions'

interface Props {
  actions: Actions
  onEditCallback?: (isEdit: boolean) => void
}
const ActionsSection = ({ actions, onEditCallback }: Props): React.JSX.Element => {
  return (
    <div className="self-end">
      {Object.entries(actions).map(([key, value]) => {
        return (
          <ActionsComponent
            actions={value}
            actionsKey={key}
            key={key}
            onEditCallback={onEditCallback}
          />
        )
      })}
    </div>
  )
}
export default ActionsSection
