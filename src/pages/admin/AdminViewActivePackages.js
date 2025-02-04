import React from 'react'
import Header from '../../components/Common/Header/Header'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'
import AdminManagePackageCards from '../../components/Admin/AdminManagePackageCards/AdminManagePackageCards'

const AdminViewActivePackages = () => {
  return (
    <React.Fragment>
      <Header />
      <AdminManagePackageCards/>
      <ViewPackagesByStatus status='active' />
    </React.Fragment>
  )
}

export default AdminViewActivePackages
