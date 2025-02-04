import React from 'react'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'
import Header from '../../components/Common/Header/Header'
import AdminManageApplicationCards from '../../components/Admin/AdminManageApplicationCards/AdminManageApplicationCards'

const PendingApplicationsPage = () => {
    return (
        <div>
            <Header />
            <AdminManageApplicationCards />
            <hr className='my-0 border-2' />
            <VendorApplications filter='pending' />
        </div>
    )
}

export default PendingApplicationsPage
