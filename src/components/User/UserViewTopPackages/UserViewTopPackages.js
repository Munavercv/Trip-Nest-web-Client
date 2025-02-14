import React, { useEffect, useState } from 'react'
import styles from './UserViewTopPackages.module.css'
import CustomSlider from '../../../Slider/CustomSlider'
import PackageCard from '../../Common/PackageCard/PackageCard'
import { sliderSettings } from '../../../Slider/settings/packageSliderSettings'
import axios from 'axios'
import config from '../../../config/api'

const UserViewTopPackages = () => {
    const [packages, setPackages] = useState([])

    const fetchTopPackages = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/user/get-top-packages`);
            setPackages(response.data.packages)
        } catch (error) {
            console.log(error.response?.data?.message || 'Error while fetching packages');
        }
    }

    useEffect(() => {
        fetchTopPackages()
    }, [])

    return (
        <section
            id='topPackages'
            className={`${styles.topPackagesSec} container-fluid py-4`}>
            <h4 className='section-title text-center'>Top Packages</h4>

            {packages.length > 1 ? (
                <CustomSlider settings={sliderSettings}>
                    {packages.map((packageDetails, index) => (
                        <div key={index} className="px-2 d-flex justify-content-center">
                            <PackageCard {...packageDetails} />
                        </div>
                    ))}
                </CustomSlider>
            ) : (
                packages.map((packageDetails, index) => (
                    <div key={index} className="px-2 d-flex justify-content-center">
                        <PackageCard {...packageDetails} />
                    </div>
                ))
            )}
        </section>

    )
}

export default UserViewTopPackages
