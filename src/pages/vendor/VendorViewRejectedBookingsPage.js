import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorViewBookings from '../../components/Vendor/VendorViewBookings/VendorViewBookings'

const VendorViewRejectedBookingsPage = () => {
  return (
        <React.Fragment>
            <Header />
            <VendorViewBookings filter='rejected' />
        </React.Fragment>
  )
}

export default VendorViewRejectedBookingsPage
