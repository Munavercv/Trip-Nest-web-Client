import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserProfile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logout } from '../../../redux/slices/authSlice'

const UserProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const defaultDpUrl = '/images/default-dp.png'
    const navigate = useNavigate()
    const [application, setApplication] = useState()

    const goback = () => navigate(-1)

    const deleteUser = async (userId) => {
        const confirmation = window.confirm('Are you sure want to delete your account?')
        if (!confirmation) return

        try {
            await axios.delete(`/api/user/delete-account/${userId}`);
            alert('Successfully deleted your account!')
            navigate('/')
            dispatch(logout())
        } catch (error) {
            console.log(error)
            alert('An error occured while deleting your account')
        }
    }

    const fetchApplicationNameAndStatus = async (userId) => {
        try {
            const response = await axios.get(`/api/user/get-application-name-and-status/${userId}`);
            setApplication(response.data.application)
        } catch (error) {
            console.error(error)
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
                                        onClick={() => deleteUser(user.userId)}
                                    >Delete account</Link>
                                </li>
                                {user.isAppliedForVendor &&
                                    <li>
                                        <Link
                                            to='/view-my-vendor-application'
                                            className={styles.links}
                                        >Vendor application</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </>
            }


            <hr className='border-4 mt-5 w-100' />

            {user.isAppliedForVendor && application &&
                <div className='px-sm-5 px-2'>
                    <h3 className='section-title text-center mb-3'>Vendor application</h3>

                    <Link to='/view-my-vendor-application' >
                        <div className={`${styles.applicationTile} row align-items-center px-sm-5 px-2`}>
                            <h6 className="text-start col-6 my-0 fw-bold">{application.businessName}</h6>
                            <p className={`text-end col-6 my-0 fw-semibold ${application.status === 'pending'
                                ? 'text-primary'
                                : application.status === 'approved'
                                    ? 'text-success'
                                    : application.status === 'activated'
                                        ? 'text-secondary'
                                        : 'text-danger'
                                }`}
                            >{application.status}</p>
                        </div>
                    </Link>
                </div>}

        </section >

    )
}

export default UserProfile
