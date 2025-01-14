import React from 'react'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import Header from '../../components/Common/Header/Header'

const AdminViewApprovedPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <ViewPackagesByStatus status='approved' />
        </React.Fragment>
    )
}

export default AdminViewApprovedPackages
