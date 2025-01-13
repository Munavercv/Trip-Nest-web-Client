import React from 'react'
import Header from '../../components/Common/Header/Header'
import LandingManagePackages from '../../components/Vendor/LandingManagePackages/LandingManagePackages'
import VendorViewPackages from '../../components/Vendor/VendorViewPackages/VendorViewPackages'

const VendorApprovedPackages = () => {
    return (
        <React.Fragment>
            <Header />
            <LandingManagePackages />
            <VendorViewPackages status='approved' />
        </React.Fragment>
    )
}

export default VendorApprovedPackages
