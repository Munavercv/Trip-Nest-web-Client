import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserProfile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import config from '../../../config/api'
import { logout } from '../../../redux/slices/authSlice'
import ConfirmPopup from '../../Common/Popups/ConfirmPopup'
import SuccessPopup from '../../Common/Popups/SuccessPopup'

const UserProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const defaultDpUrl = '/images/default-dp.png'
    const navigate = useNavigate()
    const [application, setApplication] = useState()
    const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    const goback = () => navigate(-1)

    const deleteUser = async (userId) => {
        setDeleteError('')
        setDeleteLoading(true)
        try {
            await axios.delete(`${config.API_BASE_URL}/api/user/delete-account/${userId}`);
            setDeleteSuccess(true)
            setShowDeleteConfirmPopup(false)
        } catch (error) {
            setDeleteError(error.response?.data?.message || 'An error occured while deleting your account')
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleDeleteConfirmPopup = (confirmed) => {
        if (confirmed) {
            deleteUser(user.userId)
        } else {
            setShowDeleteConfirmPopup(false)
        }
    }

    const handleDeleteSuccessPopup = () => {
        navigate('/')
        dispatch(logout())
    }

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
                                        onClick={setShowDeleteConfirmPopup}
                                    >Delete account</Link>
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

            {/* handle delete account */}
            {showDeleteConfirmPopup && <ConfirmPopup
                title='Are You sure want to delete your account'
                description="Deleting this account will erase all of your data. you won't be able to recover it again"
                denyText='Cancel'
                allowText='Delete'
                error={deleteError}
                isLoading={deleteLoading}
                onAction={handleDeleteConfirmPopup}
            />}
            {deleteSuccess &&
                <SuccessPopup
                    title='Successfully removed account'
                    onClose={handleDeleteSuccessPopup}
                />}

        </section >

    )
}

export default UserProfile
