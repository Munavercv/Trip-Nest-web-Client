import React from 'react'
import styles from './VendorOverviewCards.module.css'

const VendorOverviewCards = () => {
    return (
        <section className={`${styles.cardsSec} container-fluid px-lg-5 px-3 py-4`} >

            <div className="row row-cols-md-3 row-cols-1">

                <div className="col">
                    <div className={`${styles.card} card`}>
                        <div className="card-body text-center">
                            <h5 className="card-title">Bookings</h5>
                            <h6 className="card-subtitle mb-3"><span>0</span> pending</h6>
                            <button className='primary-btn'>View</button>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className={`${styles.card} card`}>
                        <div className="card-body text-center">
                            <h5 className="card-title">My packages</h5>
                            <h6 className="card-subtitle mb-3"><span>0</span> Active packages</h6>
                            <button className='primary-btn'>View</button>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className={`${styles.card} card`}>
                        <div className="card-body text-center">
                            <h5 className="card-title">Revenue this month</h5>
                            <h6 className="card-subtitle mb-3"><span>0</span></h6>
                            <button className='primary-btn'>View</button>
                        </div>
                    </div>
                </div>


            </div>

        </section>
    )
}

export default VendorOverviewCards
