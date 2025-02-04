import React from 'react'
import Header from '../../components/Common/Header/Header'
import HomeBanner from '../../components/Admin/HomeBanner.js/HomeBanner'
import AdminManagePackageCards from '../../components/Admin/AdminManagePackageCards/AdminManagePackageCards'
import AdminManageApplicationCards from '../../components/Admin/AdminManageApplicationCards/AdminManageApplicationCards'
import ManageVendorsSection from '../../components/Admin/ManageVendorsSection/ManageVendorsSection'

const AdminHome = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <AdminManagePackageCards />
            <ManageVendorsSection />
            <hr className='border-3' />
            <AdminManageApplicationCards />
        </div>
    )
}

export default AdminHome
