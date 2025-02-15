import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorHomeBanner from '../../components/Vendor/VendorHomeBanner/VendorHomeBanner'
import VendorOverviewCards from '../../components/Vendor/VendorOverviewCards/VendorOverviewCards'
import LandingManagePackages from '../../components/Vendor/LandingManagePackages/LandingManagePackages'
import YourTopPackages from '../../components/Vendor/YourTopPackages/YourTopPackages'
import HomeUpcomingPackages from '../../components/Vendor/HomeUpcomingPackages/HomeUpcomingPackages'

const VendorHomePage = () => {
    return (
        <div>
            <Header />
            <VendorHomeBanner />
            <VendorOverviewCards />
            <LandingManagePackages />
            <YourTopPackages />
            <HomeUpcomingPackages />
        </div>
    )
}

export default VendorHomePage
