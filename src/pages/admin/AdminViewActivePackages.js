import React from 'react'
import Header from '../../components/Common/Header/Header'
import ViewPackagesByStatus from '../../components/Admin/ViewPackages/ViewPackagesByStatus'

const AdminViewActivePackages = () => {
  return (
    <React.Fragment>
      <Header />
      <ViewPackagesByStatus status='active' />
    </React.Fragment>
  )
}

export default AdminViewActivePackages
