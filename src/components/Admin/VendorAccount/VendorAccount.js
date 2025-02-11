import React, { useEffect, useState } from 'react'
import styles from './VendorAccount.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'
import ConfirmPopup from '../../Common/Popups/ConfirmPopup'
import SuccessPopup from '../../Common/Popups/SuccessPopup'

const VendorAccount = () => {
    const { vendorId } = useParams()
    const navigate = useNavigate()
    const [vendorDetails, setVendorDetails] = useState()
    const [actionError, setActionError] = useState('')
    const [showRemoveAccPopup, setShowRemoveAccPopup] = useState(false)
    const [removeAccSuccess, setRemoveAccSuccess] = useState(false)
    const [showStatusPopup, setShowStatusPopup] = useState(false)
    const [pendingStatusUpdate, setPendingStatusUpdate] = useState({})
    const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false)

    const goback = () => {
        navigate(-1)
    }

    const fetchVendorDetails = async (vendorId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-vendor-details/${vendorId}`)
            setVendorDetails(response.data.vendorDetails)
        } catch (error) {
            console.error('failed to fetch vendor details', error)
        }
    }

    const handleStatusUpdate = async (vendorId, status) => {
        setActionError('')
        try {
            await axios.put(`${config.API_BASE_URL}/api/admin/vendor-status-update/${vendorId}`, { status: status })
            setActionError('')
            setStatusUpdateSuccess(true)
        } catch (error) {
            setActionError('Error while updating vendor status!')
        }
    }

    const handleStatusPopupAction = (confirmed) => {
        if (confirmed && pendingStatusUpdate.vendorId) {
            handleStatusUpdate(pendingStatusUpdate.vendorId, pendingStatusUpdate.status)
        }
        setShowStatusPopup(false)
        setPendingStatusUpdate({})
    }

    const handleStatusButtonClick = (status) => {
        setPendingStatusUpdate({ vendorId, status })
        setShowStatusPopup(true)
    }

    const handleRemoveVendor = async () => {
        setActionError('')
        try {
            await axios.delete(`${config.API_BASE_URL}/api/admin/delete-vendor/${vendorDetails._id}`)
            setRemoveAccSuccess(true)
        } catch (error) {
            setActionError('Error while deleting vendor')
        } finally {
            setShowRemoveAccPopup(false)
        }
    }

    const handleRemoveVendorPopup = (confirmed) => {
        if (confirmed) {
            handleRemoveVendor()
        } else {
            setShowRemoveAccPopup(false)
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
                            onClick={() => handleStatusButtonClick('active')}
                        >Approve</button>
                        <button
                            className='primary-btn me-2'
                            onClick={() => handleStatusButtonClick('rejected')}
                        >Reject</button>
                    </>}
                    {vendorDetails.status === 'rejected' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => handleStatusButtonClick('active')}
                        >Approve</button>
                    </>}
                    {vendorDetails.status === 'active' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => handleStatusButtonClick('disabled')}
                        >Disable</button>
                    </>}
                    {vendorDetails.status === 'disabled' && <>
                        <button
                            className='primary-btn me-2'
                            onClick={() => handleStatusButtonClick('active')}
                        >Activate</button>
                    </>}
                    <button
                        className='primary-btn'
                        onClick={() => setShowRemoveAccPopup(true)}
                    >Remove</button>
                    <p className="text-center">{actionError}</p>
                </div>
            }

            <hr className='border-4 my-5 w-100' />

            {/* For remove account */}
            {showRemoveAccPopup &&
                <ConfirmPopup
                    title='Are you sure to remove this account'
                    description='Removing this account will erase all data of this vendor. Disable the account if you are not sure.'
                    denyText='Cancel'
                    allowText='Remove'
                    onAction={handleRemoveVendorPopup}
                />}
            {removeAccSuccess &&
                <SuccessPopup
                    title='Successful'
                    description='Successfully removed this vendor'
                    onClose={() => navigate(-1)}
                />
            }

            {/* For status update confirmation */}
            {showStatusPopup &&
                <ConfirmPopup
                    title='Are you sure you want to update the status?'
                    description={`This action will update the status to "${pendingStatusUpdate.status}".`}
                    denyText='Cancel'
                    allowText='Confirm'
                    onAction={handleStatusPopupAction}
                />}
                {statusUpdateSuccess &&
                <SuccessPopup
                title='Status updated successfully'
                description={`his Vendor account is "${pendingStatusUpdate.status}"`}
                onClose={() => {
                    setStatusUpdateSuccess(false)
                    fetchVendorDetails(vendorId)
                }}
                />
                }
        </section>
    )
}

export default VendorAccount;
