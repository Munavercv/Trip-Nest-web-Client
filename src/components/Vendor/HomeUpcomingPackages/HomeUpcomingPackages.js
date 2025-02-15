import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../../config/api'
import PackageCard from '../../Common/PackageCard/PackageCard'

const HomeUpcomingPackages = () => {
    const { user } = useSelector(state => state.auth)

    const [packages, setPackages] = useState(null)

    const fetchPackages = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/vendor/get-upcoming-packages`, {
                params: { vendorId: user.userId, page: 1, limit: 8 }
            })

            if (data.data.length > 0)
                setPackages(data.data)

        } catch (error) {
            setPackages(null)
        }
    }

    useEffect(() => {
        fetchPackages()
    }, [user])

    if (!packages)
        return null

    return (
        <section className={`container-fluid py-4`}>
            <h4 className='section-title text-center'>My Upcoming Packages</h4>

            <div className="row">
                {packages.map((packageDetails, index) => (
                    <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6 ">
                        <PackageCard
                            {...packageDetails}
                        />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default HomeUpcomingPackages
