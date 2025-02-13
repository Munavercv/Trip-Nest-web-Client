import React from 'react'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import Header from '../../components/Common/Header/Header'
import AdminManagePackageCards from '../../components/Admin/AdminManagePackageCards/AdminManagePackageCards'

const AdminViewExpiredPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <AdminManagePackageCards />
            <ViewPackagesByStatus status='expired' />
        </React.Fragment>
    )
}

export default AdminViewExpiredPackages
