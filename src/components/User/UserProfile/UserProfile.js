import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserProfile.module.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import config from '../../../config/api'
import UserViewBookings from '../UserViewBookings/UserViewBookings'

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const defaultDpUrl = '/images/default-dp.png'
    const navigate = useNavigate()
    const [application, setApplication] = useState()

    const goback = () => navigate(-1)

    const fetchApplicationNameAndStatus = async (userId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/user/get-application-name-and-status/${userId}`);
            setApplication(response.data.application)
        } catch (error) {
            setApplication(null)
        }
    }

    useEffect(() => {
        fetchApplicationNameAndStatus(user.userId)
    }, [user.userId])

    return (
        <section className='container py-5'>
            <button onClick={goback} className='btn btn-outline-secondary btn-sm'><i className="fa-solid fa-caret-left"></i> back</button>

            <h2 className='section-title text-center mb-5'>{user ? user.name : 'Loading...'}</h2>

            {user &&
                <>
                    <div className="row my-4">
                        <div className="col-md-6 text-center mb-2">
                            <div className={`d-flex justify-content-center ${styles.profilePic}`} >
                                <img
                                    src={user.dpUrl || defaultDpUrl}
                                    alt="Model"
                                />
                            </div>
                            <div className={styles.details} >
                                <p className='mb-1'>{user.email}</p>
                                <p className='mb-1'>Phone: {user.phone}</p>
                            </div>
                        </div>

                        <div className="col-md-6 mt-5 d-flex justify-content-center">
                            <ul className={styles.quickLinks} style={{ listStyleType: 'none' }}>
                                <li>Quick Links</li>
                                <li>
                                    <Link
                                        to='/edit-profile'
                                        className={styles.links}
                                    >Edit profile</Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.links}
                                        to='/my-bookings'
                                    >My bookings</Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.links}
                                        to='/my-payments'
                                    >My payments</Link>
                                </li>
                                {user.isAppliedForVendor && application && <li>
                                    <Link
                                        className={styles.links}
                                        to='/view-my-vendor-application'
                                    >Vendor Application</Link>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </>
            }

            <hr className='border-4 mt-5 mb-0 w-100' />

            <UserViewBookings />

        </section >

    )
}

export default UserProfile
