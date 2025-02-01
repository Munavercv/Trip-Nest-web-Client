import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PackageCard from '../../Common/PackageCard/PackageCard'
import axios from 'axios'
import config from '../../../config/api'

const ViewFavourites = () => {
    const { user } = useSelector(state => state.auth)

    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packages, setPackages] = useState([])


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/user/get-favourite-packages/${user.userId}`)

                setPackages(response.data.packages)
                if (response.data.packages.length === 0)
                    setDataStatus('No favorites')
            } catch (error) {
                setDataStatus(error.response?.data?.message || 'Error fetching packages')
            }
        }
        if (user)
            fetchPackages()
    }, [user])

    return (
        <section className='container-fluid py-4 px-0'>
            <h4 className='section-title text-center mb-2'>Favourites</h4>

            <div className="row" style={{ backgroundColor: 'var(--section-grey)' }}>
                {packages.length === 0 ?
                    <h4 className='text-center text-danger'>{dataStatus}</h4>
                    :
                    packages.map((packageDetails, index) => (
                        <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6 ">
                            <PackageCard
                                {...packageDetails}
                            />
                        </div>))
                }
            </div>
        </section>
    )
}

export default ViewFavourites
