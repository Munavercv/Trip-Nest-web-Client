import React from 'react'
import styles from './VendorApplication.module.css'
import { Link, useNavigate } from 'react-router-dom'

const ApplicationSuccessfull = () => {
    const navigate = useNavigate()
    return (
        <section>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <h4 className='fw-bold'>Your application submitted successfully</h4>
                    <p className='fw-semibold'>
                        You will be notified the appliction status
                    </p>

                    <div>
                        <Link>
                            <button
                                className='primary-btn me-2'
                            >View application</button>
                        </Link>
                        <button
                            className='outline-btn'
                            onClick={() => navigate(-1)}
                        >Home</button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ApplicationSuccessfull
