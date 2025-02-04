import React from 'react'
import { Link } from 'react-router-dom'

const ManageVendorsSection = () => {
    return (
        <section className='container-fluid py-4 mb-0'>
            <h4 className='section-title text-center'>Manage Vendors</h4>
            <p className='section-subtitle mb-3 text-center'>See, Edit, Disable and Delete Vendors</p>

            <div className='text-center'>
                <Link to='/admin/active-vendors'>
                    <button className='primary-btn me-sm-2 me-1 mb-2 mb-md-0'>Active vendors</button>
                </Link>
                <Link to='/admin/disabled-vendors'>
                    <button className='primary-btn'>Inactive vendors</button>
                </Link>
            </div>

        </section>
    )
}

export default ManageVendorsSection
