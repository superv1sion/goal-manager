import * as React from 'react'

import ActionsComponent from '@/Components/ActionsComponent'
import { Actions } from '@/types/actions'

interface Props {
  actions: Actions[]
  onEditStart?: (index: number) => void
  onEditEnd?: (index: number) => void
  readOnly?: boolean
  addActionHandler?: (actionsIdx: number, text: string) => void
  removeActionHandler?: (actionsIdx: number, itemIdx: number) => void
  toggleCheckHandler?: (actionsIdx: number, text: number) => void
  editActionHandler?: (actionsIdx: number, index: number, text: string) => void
}
const ActionsSection = ({
  actions,
  onEditStart,
  onEditEnd,
  readOnly,
  addActionHandler,
  removeActionHandler,
  toggleCheckHandler,
  editActionHandler,
}: Props): React.JSX.Element => {
  return (
    <div className="self-center">
      {actions.map((action, index) => {
        return (
          <ActionsComponent
            actions={action}
            actionsIndex={index}
            key={action.name}
            onEditStart={onEditStart}
            onEditEnd={onEditEnd}
            readOnly={readOnly}
            addActionHandler={addActionHandler}
            removeActionHandler={removeActionHandler}
            toggleCheckHandler={toggleCheckHandler}
            editActionHandler={editActionHandler}
          />
        )
      })}
    </div>
  )
}
export default ActionsSection
