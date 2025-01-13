import React from 'react'
import Header from '../../components/Common/Header/Header'
import LandingManagePackages from '../../components/Vendor/LandingManagePackages/LandingManagePackages'
import VendorViewPackages from '../../components/Vendor/VendorViewPackages/VendorViewPackages'

const VendorPendingPackagesPage = () => {
    return (
        <React.Fragment>
            <Header />
            <LandingManagePackages />
            <VendorViewPackages status='pending' />
        </React.Fragment>
    )
}

export default VendorPendingPackagesPage
