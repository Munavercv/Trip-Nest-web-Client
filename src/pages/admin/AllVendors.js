import React from 'react'
import Header from '../../components/Common/Header/Header'
import Vendors from '../../components/Admin/Vendors/Vendors'

const AllVendors = () => {
    return (
        <div>
            <Header />
            <Vendors filter='active' />
        </div>
    )
}

export default AllVendors
