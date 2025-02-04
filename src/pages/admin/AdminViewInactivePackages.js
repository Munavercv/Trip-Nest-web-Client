import React from 'react'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import Header from '../../components/Common/Header/Header'
import AdminManagePackageCards from '../../components/Admin/AdminManagePackageCards/AdminManagePackageCards'

const AdminViewInactivePackages = () => {
    return (
        <React.Fragment>
            <Header />
            <AdminManagePackageCards />
            <ViewPackagesByStatus status='inactive' />
        </React.Fragment>
    )
}

export default AdminViewInactivePackages
