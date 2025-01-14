import React from 'react'
import Header from '../../components/Common/Header/Header'
import HomeBanner from '../../components/User/HomeBanner/HomeBanner'
import FindPackagesForm from '../../components/User/FindPackagesForm/FindPackagesForm'
import UserViewTopPackages from '../../components/User/UserViewTopPackages/UserViewTopPackages'

const UserHomePage = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FindPackagesForm />
            <UserViewTopPackages />
        </div>
    )
}

export default UserHomePage
