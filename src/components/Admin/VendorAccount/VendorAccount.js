import React, { useEffect, useState } from 'react'
import styles from './VendorAccount.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'

const VendorAccount = () => {

    const { vendorId } = useParams()
    const navigate = useNavigate()
    const [vendorDetails, setVendorDetails] = useState()
    const [actionError, setActionError] = useState('')

    const goback = () => {
        navigate(-1)
    }

    const fetchVendorDetails = async (vendorId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-vendor-details/${vendorId}`)
            setVendorDetails(response.data.vendorDetails)
        } catch (error) {
            console.error('failed to fetch vendor details', error);
        }
    }

    const handleStatusUpdate = async (vendorId, status) => {
        setActionError('')
        const confirm = window.confirm('Are you sure?')
        if (!confirm) return

        try {
            await axios.put(`${config.API_BASE_URL}/api/admin/vendor-status-update/${vendorId}`, { status: status })
            window.alert('successully updated user status')
            setActionError('')
            fetchVendorDetails(vendorId)
        } catch (error) {
            console.error(error);
            setActionError('Error while updating user!')
        }
    }

    const handleRemoveVendor = async (vendorId) => {
        setActionError('')
        const confirm = window.confirm('Are you sure want to remove this vendor?')
        if (!confirm) return

        try {
            await axios.delete(`${config.API_BASE_URL}/api/admin/delete-vendor/${vendorId}`)
            window.alert('Successfully removed user!')
            navigate(-1)
        } catch (error) {
            console.error(error);
            setActionError('Error while deleting vendor')
        }
    }

    useEffect(() => {
        fetchVendorDetails(vendorId)
    }, [vendorId])

    return (
        <section className='container py-5'>
            <button onClick={goback} className='btn btn-outline-secondary btn-sm'><i className="fa-solid fa-caret-left"></i> back</button>

            <h2 className='section-title text-center mb-5'>{vendorDetails ? vendorDetails.name : 'Loading...'}</h2>

            {vendorDetails &&
                <div className="row my-4">
                    <div className="col-md-6 text-center mb-2">
                        <div className={`d-flex justify-content-center ${styles.profilePic}`} >
                            {vendorDetails.logoUrl ? <img
                                src={vendorDetails.logoUrl}
                                alt="Profile pic"
                            />
                                :
                                <div className={styles.circle} ></div>}
                        </div>
                        <div className={styles.details} >
                            <p className='mb-1'>{vendorDetails.contact.email}</p>
                            <p className='mb-1'>Phone: {vendorDetails.contact.phone}</p>
                            {vendorDetails.address && <p className='mb-1'>
                                {vendorDetails.address.state},
                                {vendorDetails.address.address},
                                {vendorDetails.address.district},
                                {vendorDetails.address.pin}
                            </p>}
                            <p>Status: <span>{vendorDetails.status}</span></p>
                        </div>
                    </div>

                    <div className="col-md-6 mt-5 d-flex justify-content-center">
                        <ul className={styles.quickLinks} style={{ listStyleType: 'none' }}>
                            <li>Quick Links</li>
                            <li>
                                <Link to={`/admin/edit-vendor/${vendorDetails._id}`} className={styles.links} >Edit</Link>
                            </li>
                            <li>
                                <Link
                                to={`/admin/view-packages-by-vendor/${vendorDetails._id}`}
                                 className={styles.links} 
                                 >Packages</Link>
                            </li>
                            <li>
                                <Link className={styles.links} >Remove account</Link>
                            </li>
                        </ul>
                    </div>
                </div>}

            {vendorDetails &&
                <div className="text-center">
                    {vendorDetails.status === 'pending' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => {
                                const status = 'active';
                                handleStatusUpdate(vendorDetails._id, status)
                            }}
                        >Approve</button>
                        <button
                            className='primary-btn me-2'
                            onClick={() => {
                                const status = 'rejected';
                                handleStatusUpdate(vendorDetails._id, status)
                            }}
                        >Reject</button>
                    </>}
                    {vendorDetails.status === 'rejected' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => {
                                const status = 'active';
                                handleStatusUpdate(vendorDetails._id, status)
                            }}
                        >Approve</button>
                    </>}
                    {vendorDetails.status === 'active' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => {
                                const status = 'disabled';
                                handleStatusUpdate(vendorDetails._id, status)
                            }}
                        >Disable</button>
                    </>}
                    {vendorDetails.status === 'disabled' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => {
                                const status = 'active';
                                handleStatusUpdate(vendorDetails._id, status)
                            }}
                        >Activate</button>
                    </>}
                    <button
                        className='primary-btn'
                        onClick={() => handleRemoveVendor(vendorDetails._id)}
                    >Remove</button>
                    <p className="text-center">{actionError}</p>
                </div>
            }

            <hr className='border-4 my-5 w-100' />

        </section>
    )
}

export default VendorAccount
