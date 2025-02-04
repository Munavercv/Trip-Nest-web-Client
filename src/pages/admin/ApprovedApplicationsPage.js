import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'
import AdminManageApplicationCards from '../../components/Admin/AdminManageApplicationCards/AdminManageApplicationCards'

const ApprovedApplicationsPage = () => {
  return (
    <div>
      <Header />
      <AdminManageApplicationCards />
      <hr className='my-0 border-2'/>
      <VendorApplications filter='approved' />
    </div>
  )
}

export default ApprovedApplicationsPage
