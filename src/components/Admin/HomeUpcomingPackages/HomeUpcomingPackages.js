import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import config from '../../../config/api'
import PackageCard from '../../Common/PackageCard/PackageCard'
import axios from 'axios'

const HomeUpcomingPackages = () => {
    const navigate = useNavigate()

    const [packages, setPackages] = useState(null)

    const fetchPackages = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/admin/get-all-upcoming-packages`, {
                params: { page: 1, limit: 16 }
            })

            if (data.data.length > 0)
                setPackages(data.data)

        } catch (error) {
            setPackages(null)
        }
    }

    useEffect(() => {
        fetchPackages()
    }, [])

    if (!packages)
        return null

    return (
        <section
            className={`container-fluid py-4`}
            style={{ backgroundColor: 'var(--section-grey)' }}
        >
            <h4 className='section-title text-center'>Upcoming Packages</h4>

            <div className="row">
                {packages.map((packageDetails, index) => (
                    <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6 ">
                        <PackageCard
                            {...packageDetails}
                        />
                    </div>
                ))}
            </div>

            <div className='text-center'>
                <button
                    className="outline-btn"
                    onClick={() => navigate('/admin/upcoming-packages')}
                >
                    Show more...
                </button>
            </div>

        </section>
    )
}

export default HomeUpcomingPackages
