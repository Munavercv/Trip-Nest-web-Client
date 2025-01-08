import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'

const RejectedApplicationsPage = () => {
  return (
    <div>
      <Header />
      <VendorApplications filter='rejected' />
    </div>
  )
}

export default RejectedApplicationsPage
