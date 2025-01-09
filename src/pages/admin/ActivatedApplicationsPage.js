import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'

const ActivatedApplicationsPage = () => {
  return (
    <div>
      <Header />
      <VendorApplications filter='activated' />
    </div>
  )
}

export default ActivatedApplicationsPage
