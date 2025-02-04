import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'
import AdminManageApplicationCards from '../../components/Admin/AdminManageApplicationCards/AdminManageApplicationCards'

const ActivatedApplicationsPage = () => {
  return (
    <div>
      <Header />
      <AdminManageApplicationCards />
      <hr className='my-0 border-2'/>
      <VendorApplications filter='activated' />
    </div>
  )
}

export default ActivatedApplicationsPage
