import React, { useEffect, useState } from 'react'
import styles from './YourTopPackages.module.css'
import PackageCard from '../../Common/PackageCard/PackageCard'
import CustomSlider from '../../../Slider/CustomSlider';
import { sliderSettings } from '../../../Slider/settings/packageSliderSettings';
import axios from 'axios';
import { useSelector } from 'react-redux';

const YourTopPackages = () => {
    const { user } = useSelector(state => state.auth)

    const [packages, setPackages] = useState(null)

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`/api/vendor/get-vendor-top-packages/${user.userId}`)
            setPackages(response.data.packages)
        } catch (error) {
            setPackages(null)
        }
    }

    useEffect(() => {
        fetchPackages()
    }, [user])

    return (
        <section className={`${styles.yourTopPackagesSec} container-fluid py-4`}>
            {packages && <>
                <h4 className='section-title text-center'>My Top Packages</h4>

                <CustomSlider settings={sliderSettings}>
                    {packages.map((packageDetails, index) => (
                        <div key={index} className="px-2 d-flex justify-content-center">
                            <PackageCard
                                {...packageDetails}
                            />
                        </div>
                    ))}
                </CustomSlider>
            </>
            }
        </section>

    )
}

export default YourTopPackages
