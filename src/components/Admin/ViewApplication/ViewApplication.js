import React, { useEffect, useState } from 'react'
import styles from './ViewApplication.module.css'
import { useNavigate, useParams } from 'react-router'
import ConfirmPopup from '../../Common/Popups/ConfirmPopup'
import axios from 'axios'
import config from '../../../config/api'
import { Link } from 'react-router-dom'

const ViewApplication = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [dataStatus, setDataStatus] = useState('Loading...')
    const [applicationData, setApplicationData] = useState()
    const [formattedDate, setFormattedDate] = useState('')
    const [showApprovePopup, setShowApprovePopup] = useState(false)
    const [showRejectPopup, setShowRejectPopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionError, setActionError] = useState('')
    const [user, setUser] = useState()
    const [vendor, setVendor] = useState('')
    const [vendorLoading, setVendorLoading] = useState(false)

    const fetchApplication = async (id) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-application/${id}`)
            setApplicationData(response.data.application)
            setUser(response.data.user)
            setDataStatus('')
            const isoDate = response.data.application.yearEst;
            const date = new Date(isoDate);
            setFormattedDate(date.toISOString().split('T')[0]);
        } catch (error) {
            console.error(error);
            setDataStatus(error.response?.data?.message || 'Error occured while fetching data')
        }
    }

    const gotoVendorAccount = async (email) => {
        setActionError('')
        setVendorLoading(true)
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-vendor-by-email`, { params: { email } })
            navigate(`/admin/view-vendor/${response.data.vendor._id}`)
        } catch (error) {
            setActionError(error.response?.data?.message || 'Vendor not found')
        } finally {
            setVendorLoading(false)
        }
    }

    const approveApplication = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/admin/approve-application/${id}`)
            setApplicationData(response.data.application)
        } catch (error) {
            console.error(error);
            setActionError(error.response?.data?.message || 'Error occurred while approving application.')
        } finally {
            setIsLoading(false)
            setShowApprovePopup(false)
        }
    }

    const rejectApplication = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/admin/reject-application/${id}`)
            setApplicationData(response.data.application)
        } catch (error) {
            console.error(error);
            setActionError(error.response?.data?.message || 'Error occurred while rejecting application.')
        } finally {
            setIsLoading(false)
            setShowRejectPopup(false)
        }
    }

    const deleteApplication = async (id) => {
        setIsLoading(true)
        try {
            await axios.delete(`${config.API_BASE_URL}/api/admin/delete-application/${id}`)
        } catch (error) {
            console.error(error);
            setActionError(error.response?.data?.message || 'Internal server error')
        } finally {
            setIsLoading(false);
            setShowDeletePopup(false)
        }
    }

    const handleApprovePopupAction = (confirmed) => {
        setActionError('')
        if (confirmed) {
            approveApplication(applicationData._id)
        } else {
            setShowApprovePopup(false)
        }
    }

    const handleRejectPopupAction = (confirmed) => {
        setActionError('')
        if (confirmed) {
            rejectApplication(applicationData._id)
        } else {
            setShowRejectPopup(false)
        }
    }

    const handleDeletePopupAction = (confirmed) => {
        setActionError('')
        if (confirmed) {
            deleteApplication(applicationData._id)
        } else {
            setShowDeletePopup(false)
        }
    }

    useEffect(() => {
        fetchApplication(id)
    }, [id])

    return (
        <section className='container-fluid py-5'>

            <div className="d-flex justify-content-between align-items-center mb-3 px-sm-5">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <i className="fa-solid fa-caret-left"></i> Back
                </button>


                {applicationData?.status && <h5
                    className={`fw-bold text-end ${applicationData.status === 'pending'
                        ? 'text-primary'
                        : applicationData.status === 'approved'
                            ? 'text-success'
                            : applicationData.status === 'activated'
                                ? 'text-secondary'
                                : 'text-danger'
                        }`}
                >
                    {applicationData.status}
                </h5>}

            </div>


            <h1 className='section-title text-center mb-5'>Application</h1>

            {applicationData ?
                <div className="px-2 px-sm-5">
                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Company Name</h5>
                        <h6>{applicationData.businessName}</h6>
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Address</h5>
                        <h6><span>State : </span>{applicationData.businessAddress.state}</h6>
                        <h6><span>District : </span>{applicationData.businessAddress.district}</h6>
                        <h6><span>Address : </span>{applicationData.businessAddress.address}</h6>
                        <h6><span>Pincode : </span>{applicationData.businessAddress.pincode}</h6>
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Contact</h5>
                        <h6><span>Phone : </span>{applicationData.contact.phone}</h6>
                        <h6><span>Email : </span>{applicationData.contact.email}</h6>
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Customer support</h5>
                        <h6><span>Phone : </span>{applicationData.supportContacts.phone}</h6>
                        <h6><span>Email : </span>{applicationData.supportContacts.email}</h6>
                    </div>

                    {applicationData.websiteUrl && <>
                        <hr className='border-2' />
                        <div className={`${styles.item} ms-md-5`}>
                            <h5>Website Url</h5>
                            <a href={applicationData.websiteUrl} target='_blank' rel="noopener noreferrer">
                                <h6>{applicationData.websiteUrl}</h6>
                            </a>
                        </div>
                    </>}

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Logo</h5>
                        <div className={styles.logo}>
                            <img src={applicationData.logoUrl}
                                alt="Logo" />
                        </div>
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Proofs</h5>
                        <h6>Certificate:
                            <a href={applicationData.certificateUrl}
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                {/* make imags popup */}
                                <button className='primary-btn ms-3'>View</button>
                            </a></h6>
                        <h6>Owner ID:
                            <a href={applicationData.ownerIdUrl}
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                <button className='primary-btn ms-3'>View</button>
                            </a></h6>
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Regions</h5>
                        {applicationData.regions.map((region, index) => (
                            <h6 key={index}>
                                - {region}
                            </h6>
                        ))}
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Year Established</h5>
                        <h6>{formattedDate}</h6>
                    </div>

                    <hr className='border-2' />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>User</h5>
                        <h6>{user.name}</h6>
                        <h6>{user.email}</h6>
                        <Link to={`/admin/users/user-account/${user._id}`}>
                            <h6>View profile <i className="fa-solid fa-chevron-right"></i></h6>
                        </Link>
                    </div>

                    <hr className='border-2' />
                    {applicationData.status === 'pending' && < div className='text-center'>
                        <button
                            onClick={() => setShowApprovePopup(true)}
                            className='primary-btn me-2'
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => setShowRejectPopup(true)}
                            className='primary-btn'
                        >
                            Reject
                        </button>
                    </div>}
                    {applicationData.status === 'rejected' && < div className='text-center'>
                        <button
                            onClick={() => setShowApprovePopup(true)}
                            className='primary-btn me-2'
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => setShowDeletePopup(true)}
                            className='primary-btn'
                        >
                            Delete
                        </button>
                    </div>}
                    {applicationData.status === 'activated' &&
                        < div className='text-center'>
                            <button
                                disabled={vendorLoading}
                                onClick={() => gotoVendorAccount(applicationData.contact.email)}
                                className='primary-btn me-2'
                            >
                                {vendorLoading ? 'Please wait...' : 'View account'}
                            </button>
                        </div>}
                    {applicationData.status === 'approved' && < div className='text-center'>
                        <button
                            onClick={() => setShowDeletePopup(true)}
                            className='primary-btn'
                        >
                            Delete
                        </button>
                    </div>}
                    <p className='text-danger text-center'>{actionError}</p>
                </div>
                :
                <h4 className='text-center fw-light'>{dataStatus}</h4>
            }

            {
                showApprovePopup &&
                <ConfirmPopup
                    title='Approve this application?'
                    allowText='Yes'
                    denyText='No'
                    onAction={handleApprovePopupAction}
                    isLoading={isLoading}
                />
            }
            {
                showRejectPopup &&
                <ConfirmPopup
                    title='Reject this application?'
                    allowText='Yes'
                    denyText='No'
                    onAction={handleRejectPopupAction}
                    isLoading={isLoading}
                />
            }
            {
                showDeletePopup &&
                <ConfirmPopup
                    title='Permanently Delete this application?'
                    allowText='Yes'
                    denyText='No'
                    onAction={handleDeletePopupAction}
                    isLoading={isLoading}
                />
            }

        </section >
    )
}

export default ViewApplication