import React from 'react'
import Header from '../../components/Common/Header/Header'
import HomeBanner from '../../components/User/HomeBanner/HomeBanner'
import FindPackagesForm from '../../components/User/FindPackagesForm/FindPackagesForm'
import UserViewTopPackages from '../../components/User/UserViewTopPackages/UserViewTopPackages'
import DiscoverCategories from '../../components/User/DiscoverCategories/DiscoverCategories'
import TrendingPlacesTile from '../../components/User/TrendingPlacesTile/TrendingPlacesTile'

const UserHomePage = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FindPackagesForm />
            <UserViewTopPackages />
            <DiscoverCategories />
            <TrendingPlacesTile />
        </div>
    )
}

export default UserHomePage
