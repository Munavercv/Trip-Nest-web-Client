import React from 'react'
import Header from '../../components/Common/Header/Header'
import AdminViewPaymentsTable from '../../components/Admin/AdminViewPaymentsTable/AdminViewPaymentsTable'

const AdminViewAllPaymentsPage = () => {
  return (
    <React.Fragment>
      <Header />
      <AdminViewPaymentsTable />
    </React.Fragment>
  )
}

export default AdminViewAllPaymentsPage
