import React, { useEffect, useState } from 'react'
import styles from './HomeBanner.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomeBanner = () => {

    const [counts, setCounts] = useState({
        vendors: 0,
        packages: 0,
        users: 0,
        payments: 0,
    });

    const fetchCounts = async () => {
        try {
            const [vendorsResponse, packagesResponse, usersResponse, paymentsResponse] = await Promise.all([
                axios.get('/api/admin/get-vendors-count'),
                axios.get('/api/admin/get-packages-count'),
                axios.get('/api/admin/get-users-count'),
                axios.get('/api/admin/get-payments-count'),
            ]);

            setCounts((prev) => ({
                ...prev,
                vendors: vendorsResponse.data.count,
                packages: packagesResponse.data.count,
                users: usersResponse.data.count,
                payments: paymentsResponse.data.count,
            }));
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    return (
        <section className='text-center container py-5'>
            <h1 className='banner-heading'>Admin Dashboard</h1>
            <p className='banner-subtitle'>Manage Vendors, Users, Payments etc...</p>

            <div className="row cols-md-4 mt-5 py-5">

                <div className={`${styles.counts} col mb-5`}>
                    <h3>
                        <span>{
                            counts.vendors > 100 ? "100+" : counts.vendors
                        }</span>
                        <br />Vendors</h3>
                    <Link to='/admin/active-vendors'>
                        <button
                            className='primary-btn'
                        >
                            View all
                        </button>
                    </Link>
                </div>

                <div className={`${styles.counts} col mb-5`}>
                    <h3>
                        <span>{
                            counts.packages > 100 ? "100+" : counts.packages
                        }</span>
                        <br />Packages</h3>
                    <Link to=''>
                        <button
                            className='primary-btn'
                        >
                            View all
                        </button>
                    </Link>
                </div>

                <div className={`${styles.counts} col mb-5`}>
                    <h3>
                        <span>{
                            counts.users > 100 ? "100+" : counts.users
                        }</span>
                        <br />Users</h3>
                    <Link to=''>
                        <button
                            className='primary-btn'
                        >
                            View all
                        </button>
                    </Link>
                </div>

                <div className={`${styles.counts} col mb-5`}>
                    <h3>
                        <span>{
                            counts.payments > 100 ? "100+" : counts.payments
                        }</span>
                        <br />Payments</h3>
                    <Link to=''>
                        <button
                            className='primary-btn'
                        >
                            View all
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default HomeBanner
