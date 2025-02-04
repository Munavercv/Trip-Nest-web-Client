import React, { useEffect } from 'react'
import styles from './AdminManageApplicationCards.module.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicationCounts } from '../../../redux/slices/applicationCountsSlice';

const AdminManageApplicationCards = () => {
    const dispatch = useDispatch()
    const applicationCounts = useSelector(state => state.applicationCounts)

    useEffect(() => {
        dispatch(fetchApplicationCounts());
    }, [dispatch]);

    return (
        <section className={`${styles.cardsSec} container-fluid px-lg-5 px-3 py-4`}>
            <h4 className='section-title text-center mb-3'>Manage Packages</h4>

            <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 justify-content-center">
                {applicationCounts.map(({ _id, count }, index) => (
                    <div key={index} className="col">
                        <div className={`${styles.card} card shadow ${
                            _id === 'approved' ? 'bg-approved' :
                            _id === 'pending' ? 'bg-pending' :
                            _id === 'rejected' ? 'bg-rejected' : 'bg-active'
                        }`}>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <span>{count}</span> {_id}
                                </h5>
                                <Link to={`/admin/${_id}-vendor-applications#vendorApplications`}>
                                    <button className='primary-btn'>View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
  )
}

export default AdminManageApplicationCards
