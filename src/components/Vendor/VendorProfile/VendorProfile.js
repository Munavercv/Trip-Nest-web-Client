import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './VendorProfile.module.css'

const VendorProfile = () => {
    const {user} = useSelector((state) => state.auth)
    const defaultDpUrl = '/images/default-dp.png'

  return (
    <section className='container py-5'>
    <h2 className='section-title text-center mb-5'>{user.name}</h2>

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
                                to='/vendor/edit-profile'
                                className={styles.links}
                            >Edit profile</Link>
                        </li>
                        <li>
                            <Link
                                className={styles.links}
                            >Manage Pacakges</Link>
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


    <hr className='border-4 mt-5 mb-0 w-100' />

</section >

  )
}

export default VendorProfile
