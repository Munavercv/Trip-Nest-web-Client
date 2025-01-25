import React from 'react'
import Header from '../../components/Common/Header/Header'
import FindPackagesForm from '../../components/User/FindPackagesForm/FindPackagesForm'
import PackageSearchResult from '../../components/User/PackageSearchResult/PackageSearchResult'

const UserFindPackagesPage = () => {
  return (
    <React.Fragment>
      <Header />
      <FindPackagesForm />
      <PackageSearchResult />
    </React.Fragment>
  )
}

export default UserFindPackagesPage
