import React, { useEffect } from 'react';
import styles from './AdminManagePackageCards.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackageCounts } from '../../../redux/slices/packageCountsSlice'

const AdminManagePackageCards = () => {
    const dispatch = useDispatch()
    const packageCounts = useSelector(state => state.packageCounts)

    useEffect(() => {
        dispatch(fetchPackageCounts())
    }, [dispatch])

    return (
        <section className={`${styles.cardsSec} container-fluid px-lg-5 px-3 py-4`}>
            <h4 className='section-title text-center mb-3'>Manage Packages</h4>

            <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
                {packageCounts.map(({ _id, count }, index) => (
                    <div key={index} className="col">
                        <div className={`${styles.card} card ${
                            _id === 'active' ? 'bg-active' :
                            _id === 'approved' ? 'bg-approved' :
                            _id === 'rejected' ? 'bg-rejected' :
                            _id === 'inactive' ? 'bg-inactive' :
                            _id === 'expired' ? 'bg-inactive' :
                            'bg-pending'
                        }`}>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <span>{count}</span> {_id}
                                </h5>
                                <Link to={`/admin/${_id}-packages#packagesByCategory`}>
                                    <button className='primary-btn'>View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminManagePackageCards;
