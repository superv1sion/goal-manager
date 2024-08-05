import * as React from 'react'

interface Props {}
const Navigation = (props: Props): React.JSX.Element => {
  return (
    <div>
      <button>Plans</button>
      <button>CreatePlan</button>
    </div>
  )
}

export default Navigation
