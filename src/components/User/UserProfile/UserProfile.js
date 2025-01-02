import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserProfile.module.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const [dpUrl, setDpUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8fDA%3D')
    const navigate = useNavigate()
    const [deleteError, setDeleteError] = useState('')

    const goback = () => navigate(-1)

    const deleteUser = async (userId) => {
        const confirmation = window.confirm('Are you sure want to delete this user?')
        if (!confirmation) return

        try {
            await axios.delete(`/api/user/delete-user/${userId}`);
            setDeleteError('')
            alert('Successfully deleted your account!')
            navigate('/')
        } catch (error) {
            console.log(error)
            alert('An error occured while deleting your account')
        }
    }

    return (
        <section className='container py-5'>
            <button onClick={goback} className='btn btn-outline-secondary btn-sm'><i className="fa-solid fa-caret-left"></i> back</button>

            <h2 className='section-title text-center mb-5'>{user ? user.name : 'Loading...'}</h2>

            {user &&
                <>
                    <div className="row my-4">
                        <div className="col-md-6 text-center mb-2">
                            <div className={`d-flex justify-content-center ${styles.profilePic}`} >
                                {dpUrl ? <img
                                    src={dpUrl}
                                    alt="Model"
                                />
                                    :
                                    <div className={styles.circle} ></div>}
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
                                    >Delete account</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            }


            <hr className='border-4 my-5 w-100' />

        </section >

    )
}

export default UserProfile
