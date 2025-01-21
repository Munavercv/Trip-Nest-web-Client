import React from 'react'
import VendorViewBookings from '../../components/Vendor/VendorViewBookings/VendorViewBookings'
import Header from '../../components/Common/Header/Header'

const VendorViewApprovedBookingsPage = () => {
    return (
        <React.Fragment>
            <Header />
            <VendorViewBookings filter='approved' />
        </React.Fragment>
    )
}

export default VendorViewApprovedBookingsPage