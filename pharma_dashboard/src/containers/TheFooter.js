import React from 'react'
import { CFooter } from '@coreui/react'
import moment from 'moment';

const TheFooter = () => {
  const year = moment().year();

  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">ALL rights Reserved © {year}<b style={{color:"#126cdc"}}> Genesis</b></span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
