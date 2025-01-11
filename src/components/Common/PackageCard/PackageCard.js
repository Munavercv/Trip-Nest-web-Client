import React from 'react'
import styles from './PackageCard.module.css'
import { Link } from 'react-router-dom'

const PackageCard = ({ imgUrl, price, title, description, destination, type }) => {
    return (
        <div className={`${styles.card} card my-4`}>
            <div className={styles.imgDiv}>
                <img src={imgUrl} className="card-img-top" alt="Package image" />
            </div>
            <div className="card-body">
                <p className={`${styles.type} my-0 text-end`}><i className="fa-solid fa-tag"></i> {type}</p>
                <h5 className={`${styles.title} my-0`}>{title}</h5>
                <p className={`${styles.price} my-0`}>Rs. {price}</p>
                <p className={`${styles.description} my-0`}>{description}</p>
                <p className={`${styles.destination} my-0`}><i className="fa-solid fa-location-arrow"></i> {destination}</p>
                <Link to="/">
                    <button className='primary-btn my-2'>
                        Book
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PackageCard
