import React, { useEffect, useState } from 'react'
import styles from './VendorOverviewCards.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'
import { useSelector } from 'react-redux'

const VendorOverviewCards = () => {
    const { user } = useSelector(state => state.auth)

    const [pendingbookingCount, setPendingbookingCount] = useState(0)
    const [activePackagesCount, setActivePackagesCount] = useState(0);

    const fetchPendingbookingCount = async () => {
        const response = await axios.get(`${config.API_BASE_URL}/api/vendor/pending-booking-count/${user.userId}`)
        setPendingbookingCount(response.data.count)
    }

    const fetchActivePackageCount = async () => {
        const response = await axios.get(`${config.API_BASE_URL}/api/vendor/active-package-count/${user.userId}`)
        setActivePackagesCount(response.data.count)
    }

    useEffect(() => {
        if (user) {
            fetchPendingbookingCount()
            fetchActivePackageCount()
        }
    }, [user])

    return (
        <section className={`${styles.cardsSec} container-fluid px-lg-5 px-3 py-4`} >

            <div className="row row-cols-md-3 row-cols-1">

                <div className="col">
                    <div className={`${styles.card} card`}>
                        <div className="card-body text-center">
                            <h5 className="card-title">Bookings</h5>
                            <h6 className="card-subtitle mb-3"><span>{pendingbookingCount}</span> pending</h6>
                            <Link to='/vendor/view-pending-bookings'
                            ><button className='primary-btn'>View</button></Link>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className={`${styles.card} card`}>
                        <div className="card-body text-center">
                            <h5 className="card-title">My packages</h5>
                            <h6 className="card-subtitle mb-3"><span>{activePackagesCount}</span> Active packages</h6>
                            <button className='primary-btn'>View</button>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className={`${styles.card} card`}>
                        <div className="card-body text-center">
                            <h5 className="card-title">Revenue this month</h5>
                            <h6 className="card-subtitle mb-3"><span>0</span></h6>
                            <button className='primary-btn'>View</button>
                        </div>
                    </div>
                </div>


            </div>

        </section>
    )
}

export default VendorOverviewCards
