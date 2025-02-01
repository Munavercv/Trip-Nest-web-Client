import React, { useEffect, useState } from 'react'
import styles from './UserAccount.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'

const UserAccount = () => {
    const { userId } = useParams()
    const [dpUrl, setDpUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8fDA%3D')
    const navigate = useNavigate()
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [user, setUser] = useState()
    const [deleteError, setDeleteError] = useState('')

    const goback = () => navigate(-1)

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-user-details/${userId}`)
            setDataStatus('')
            setUser(response.data.userDetails[0])
        } catch (error) {
            console.log("Internal server error: ", error);
            setDataStatus('Error fetching user details!')
        }
    }

    const deleteUser = async (userId) => {
        const confirmation = window.confirm('Are you sure want to delete this user?')
        if(!confirmation) return

        try {
            await axios.delete(`${config.API_BASE_URL}/api/admin/delete-user/${userId}`);
            setDeleteError('')
            alert('Successfully deleted user account!')
            navigate('/admin/users')
        } catch (error) {
            console.log(error)
            setDeleteError('an error occured')
        }
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
                                {/* <li>
                                    <Link className={styles.links} >Change password</Link>
                                </li> */}
                                <li>
                                    <Link className={styles.links} >Packages</Link>
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
                            onClick={() => deleteUser(user._id)}
                        >Delete</button>
                        <p className='text-danger'>{deleteError}</p>
                    </div>
                </>
            }


            <hr className='border-4 my-5 w-100' />

        </section >

    )
}

export default UserAccount
