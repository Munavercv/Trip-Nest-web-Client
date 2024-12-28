import React from 'react'
import Header from '../../components/Common/Header/Header'
import Vendors from '../../components/Admin/Vendors/Vendors'

const DisabledVendors = () => {
  return (
    <div>
      <Header/>
      <Vendors filter='disabled' />
    </div>
  )
}

export default DisabledVendors
