import React from 'react'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import Header from '../../components/Common/Header/Header'
import AdminManagePackageCards from '../../components/Admin/AdminManagePackageCards/AdminManagePackageCards'

const AdminViewRejectedPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <AdminManagePackageCards />
            <ViewPackagesByStatus status='rejected' />
        </React.Fragment>
    )
}

export default AdminViewRejectedPackages
