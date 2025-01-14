import React from 'react'
import Header from '../../components/Common/Header/Header'
import ViewPackages from '../../components/Admin/ViewPackages/ViewPackagesByStatus'

const AdminViewPendingPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <ViewPackages status='pending' />
        </React.Fragment>
    )
}

export default AdminViewPendingPackages
