import React from 'react'
import VendorApplications from '../../components/Admin/VendorApplications/VendorApplications'
import Header from '../../components/Common/Header/Header'

const PendingApplicationsPage = () => {
    return (
        <div>
            <Header />
            <VendorApplications filter='pending' />
        </div>
    )
}

export default PendingApplicationsPage
