import React from 'react'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import Header from '../../components/Common/Header/Header'

const AdminViewRejectedPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <ViewPackagesByStatus status='rejected' />
        </React.Fragment>
    )
}

export default AdminViewRejectedPackages
