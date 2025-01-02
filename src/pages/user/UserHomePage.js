import React from 'react'
import Header from '../../components/Common/Header/Header'
import HomeBanner from '../../components/User/HomeBanner/HomeBanner'
import FindPackagesForm from '../../components/User/FindPackagesForm/FindPackagesForm'

const UserHomePage = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FindPackagesForm />
        </div>
    )
}

export default UserHomePage
