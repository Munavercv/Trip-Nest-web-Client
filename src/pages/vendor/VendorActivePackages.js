import React from 'react'
import VendorViewPackages from '../../components/Vendor/VendorViewPackages/VendorViewPackages'
import LandingManagePackages from '../../components/Vendor/LandingManagePackages/LandingManagePackages'
import Header from '../../components/Common/Header/Header'

const VendorActivePackages = () => {
    return (
        <React.Fragment>
            <Header />
            <LandingManagePackages />
            <VendorViewPackages status='active' />
        </React.Fragment>
    )
}

export default VendorActivePackages
