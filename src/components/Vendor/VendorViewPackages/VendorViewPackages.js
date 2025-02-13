import React, { useEffect, useState } from 'react'
import styles from './VendorViewPackage.module.css'
import PackageCard from '../../Common/PackageCard/PackageCard'
import { useSelector } from 'react-redux'
import axios from 'axios'
import config from '../../../config/api'

const VendorViewPackages = ({ status }) => {
    const { user } = useSelector((state) => state.auth)
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packages, setPackages] = useState([])

    const fetchPackages = async (vendorId, status) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/vendor/get-${status}-packages/${vendorId}`)
            if (response.data.packages.length === 0) {
                setDataStatus('No packages found')
                return
            }

            setPackages(response.data.packages)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Internal server error')
        }
    }

    useEffect(() => {
        fetchPackages(user.userId, status)
    }, [user, status])

    return (
        <section className={`${styles.PackagesSec} container-fluid py-4`}>
            <h4 className='section-title text-center'>My {status} Packages</h4>

            <div className="row">
                {packages.length > 0 ?
                    packages.map((packageDetails, index) => (
                        <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6 ">
                            <PackageCard
                                {...packageDetails}
                            />
                        </div>))
                    :
                    <h4 className='text-center text-danger'>{dataStatus}</h4>
                }
            </div>
        </section>

    )
}

export default VendorViewPackages
