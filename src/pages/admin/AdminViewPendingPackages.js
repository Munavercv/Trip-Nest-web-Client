import React from 'react'
import Header from '../../components/Common/Header/Header'
import ViewPackages from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import AdminManagePackageCards from '../../components/Admin/AdminManagePackageCards/AdminManagePackageCards'

const AdminViewPendingPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <AdminManagePackageCards />
            <ViewPackages status='pending' />
        </React.Fragment>
    )
}

export default AdminViewPendingPackages
