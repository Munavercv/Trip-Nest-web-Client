import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorProfile from '../../components/Vendor/VendorProfile/VendorProfile'
import VendorOverviewCards from '../../components/Vendor/VendorOverviewCards/VendorOverviewCards'

const VendorProfilePage = () => {
  return (
    <React.Fragment>
      <Header />
      <VendorProfile />
      <VendorOverviewCards />
    </React.Fragment>
  )
}

export default VendorProfilePage
