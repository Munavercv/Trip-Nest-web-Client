import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'

const ApprovedApplicationsPage = () => {
  return (
    <div>
      <Header />
      <VendorApplications filter='approved' />
    </div>
  )
}

export default ApprovedApplicationsPage
