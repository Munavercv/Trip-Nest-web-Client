import React from 'react'
import Header from '../../components/Common/Header/Header'
import HomeBanner from '../../components/User/HomeBanner/HomeBanner'
import FindPackagesForm from '../../components/User/FindPackagesForm/FindPackagesForm'
import UserViewTopPackages from '../../components/User/UserViewTopPackages/UserViewTopPackages'
import DiscoverCategories from '../../components/User/DiscoverCategories/DiscoverCategories'

const UserHomePage = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FindPackagesForm />
            <UserViewTopPackages />
            <DiscoverCategories />
        </div>
    )
}

export default UserHomePage
