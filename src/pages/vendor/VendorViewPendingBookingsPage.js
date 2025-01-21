import React from 'react'
import Header from '../../components/Common/Header/Header'
import VendorViewBookings from '../../components/Vendor/VendorViewBookings/VendorViewBookings'

const VendorViewPendingBookingsPage = () => {
    return (
        <React.Fragment>
            <Header />
            <VendorViewBookings filter='pending' />
        </React.Fragment>
    )
}

export default VendorViewPendingBookingsPage
