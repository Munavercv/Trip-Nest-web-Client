import React from 'react'
import styles from './PackageCard.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PackageCard = ({ imageUrl, price, title, destination, category, _id, rating }) => {
    const { userRole } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const viewPakcage = () => {
        if (userRole === 'admin') {
            navigate(`/admin/view-package/${_id}`)
        } else if (userRole === 'vendor') {
            navigate(`/vendor/view-package/${_id}`)
        } else {
            navigate(`/view-package/${_id}`)
        }
    }

    return (
        <div

            className={`${styles.card} card my-4 shadow-sm`}
        >
            <div
                onClick={viewPakcage}
                style={{ cursor: 'pointer' }}
                className={styles.imgDiv}
            >
                <img src={imageUrl} className="card-img-top" alt="Package image" />
            </div>
            <div className="card-body">
                <div
                    onClick={viewPakcage}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="d-flex justify-content-between">
                        <p className={`${styles.type} mt-0 mb-1`}><i className="fa-solid fa-star" style={{ color: '#ffdf00' }}></i> {rating.avgRating}</p>
                        <p className={`${styles.type} mt-0 mb-1`}><i className="fa-solid fa-tag"></i> {category}</p>
                    </div>
                    <h5 className={`${styles.title} my-0`}>{title}</h5>
                    <p className={`${styles.price} my-0`}>Rs. {price}</p>
                    <p className={`${styles.destination} my-0`}><i className="fa-solid fa-location-arrow"></i> {destination}</p>
                </div>
                {userRole === 'vendor' &&
                    < Link to={`/vendor/view-package/${_id}`}>
                        <button className='primary-btn my-2'>
                            View
                        </button>
                    </Link>
                }

                {userRole === 'user' &&
                    < Link to={`/view-package/${_id}`}>
                        <button className='primary-btn my-2'>
                            Book Now
                        </button>
                    </Link>
                }

                {userRole === 'admin' &&
                    < Link to={`/admin/view-package/${_id}`}>
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
