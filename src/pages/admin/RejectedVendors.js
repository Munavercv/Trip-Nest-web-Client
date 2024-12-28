import React from 'react'
import Header from '../../components/Common/Header/Header'
import Vendors from '../../components/Admin/Vendors/Vendors'

const RejectedVendors = () => {
  return (
    <div>
      <Header />
      <Vendors filter='rejected' />
    </div>
  )
}

export default RejectedVendors
