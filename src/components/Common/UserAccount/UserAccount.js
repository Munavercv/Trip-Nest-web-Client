import React, { useEffect, useState } from 'react'
import styles from './UserAccount.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'
import ConfirmPopup from '../Popups/ConfirmPopup'
import SuccessPopup from '../Popups/SuccessPopup'

const UserAccount = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const defaultAvatar = '/images/default-dp.png'


    const [dataStatus, setDataStatus] = useState('Loading...')
    const [user, setUser] = useState()
    const [deleteError, setDeleteError] = useState('')
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)

    const goback = () => navigate(-1)

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-user-details/${userId}`)
            setDataStatus('')
            setUser(response.data.userDetails[0])
        } catch (error) {
            setDataStatus('Error fetching user details!')
        }
    }

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${config.API_BASE_URL}/api/admin/delete-user/${userId}`);
            setDeleteError('')
            setDeleteSuccess(true)
        } catch (error) {
            setDeleteError('an error occured')
        } finally {
            setShowDeletePopup(false)
        }
    }

    const handleDeletePopupAction = (confired) => {
        if (confired) {
            deleteUser(user._id)
        }
        else
            setShowDeletePopup(false)
    }

    useEffect(() => {
        fetchUserDetails(userId)
    }, [])

    return (
        <section className='container py-5'>
            <button onClick={goback} className='btn btn-outline-secondary btn-sm'><i className="fa-solid fa-caret-left"></i> back</button>

            <h2 className='section-title text-center mb-5'>{user ? user.name : dataStatus}</h2>

            {user &&
                <>
                    <div className="row my-4">
                        <div className="col-md-6 text-center mb-2">
                            <div className={`d-flex justify-content-center ${styles.profilePic}`} >
                                <img
                                    src={user.dpUrl ? user.dpUrl : defaultAvatar}
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
                                    <Link className={styles.links} >Enrolled Packages</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            className='primary-btn me-2'
                            onClick={() => navigate(`/admin/users/edit-user/${user._id}`)}
                        >Edit</button>
                        <button
                            className='primary-btn'
                            onClick={() => setShowDeletePopup(true)}
                        >Delete</button>
                        <p className='text-danger'>{deleteError}</p>
                    </div>
                </>
            }


            <hr className='border-4 my-5 w-100' />

            {/* Popups to handle delete user */}
            {showDeletePopup && <ConfirmPopup
                title='Are you sure want to delete this user?'
                description='Deleting this user account erase all data of this user.'
                allowText='Delete'
                denyText='Cancel'
                onAction={handleDeletePopupAction}
            />}
            {deleteSuccess && <SuccessPopup
                title='Successfully deleted user account'
                onClose={() => {
                    navigate(-1)
                }}
            />}

        </section >

    )
}

export default UserAccount
