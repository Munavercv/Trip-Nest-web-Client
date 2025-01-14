import React from 'react'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import Header from '../../components/Common/Header/Header'

const AdminViewInactivePackages = () => {
    return (
        <React.Fragment>
            <Header />
            <ViewPackagesByStatus status='inactive' />
        </React.Fragment>
    )
}

export default AdminViewInactivePackages
