import React from 'react'
import Header from '../../components/Common/Header/Header'
import ViewPackagesByVendor from '../../components/Admin/ViewPackagesByVendor/ViewPackagesByVendor'

const AdminViewPackagesByVendorPage = () => {
    return (
        <React.Fragment>
            <Header />
            <ViewPackagesByVendor />
        </React.Fragment>
    )
}

export default AdminViewPackagesByVendorPage
