import React from 'react'
import Header from '../../components/Common/Header/Header'
import Vendors from '../../components/Admin/Vendors/Vendors'

const PendingVendors = () => {
  return (
    <div>
      <Header/>
      <Vendors filter='pending' />
    </div>
  )
}

export default PendingVendors
