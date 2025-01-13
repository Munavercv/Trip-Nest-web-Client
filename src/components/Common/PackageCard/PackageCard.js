import React from 'react'
import styles from './PackageCard.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PackageCard = ({ imageUrl, price, title, description, destination, category, _id }) => {
    const { userRole } = useSelector((state) => state.auth)
    return (
        <div className={`${styles.card} card my-4 shadow-sm`}>
            <div className={styles.imgDiv}>
                <img src={imageUrl} className="card-img-top" alt="Package image" />
            </div>
            <div className="card-body">
                <p className={`${styles.type} my-0 text-end`}><i className="fa-solid fa-tag"></i> {category}</p>
                <h5 className={`${styles.title} my-0`}>{title}</h5>
                <p className={`${styles.price} my-0`}>Rs. {price}</p>
                <p className={`${styles.description} my-0`}>{description}</p>
                <p className={`${styles.destination} my-0`}><i className="fa-solid fa-location-arrow"></i> {destination}</p>

                {userRole === 'vendor' &&
                    < Link to={`/vendor/view-package/${_id}`}>
                        <button className='primary-btn my-2'>
                            View
                        </button>
                    </Link>
                }

            </div>
        </div >
    )
}

export default PackageCard
