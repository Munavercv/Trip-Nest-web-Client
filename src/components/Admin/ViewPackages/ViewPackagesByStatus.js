import React, { useEffect, useState } from 'react'
import styles from './ViewPackagesByStatus.module.css'
import PackageCard from '../../Common/PackageCard/PackageCard'
import axios from 'axios'
import config from '../../../config/api'

const ViewPackagesByStatus = ({ status }) => {
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packages, setPackages] = useState([])

    const fetchPackages = async (status) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-all-${status}-packages`)
            if (response.data.packages.length === 0) {
                setDataStatus('No packages found')
                return
            }
            setPackages(response.data.packages)
            setDataStatus('')
        } catch (error) {
            console.error(error.response?.data?.message || 'Internal server error');
            setDataStatus(error.response?.data?.message || 'Internal server error')
        }
    }

    useEffect(() => {
        fetchPackages(status)
    }, [status])

    return (
        <section className={`${styles.PackagesSec} container-fluid py-4`} id='packagesByCategory'>
            <h4 className='section-title text-center mb-4'> {status} Packages</h4>

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

export default ViewPackagesByStatus
