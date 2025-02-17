import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './ViewVendorApplication.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import config from '../../../config/api'
import ConfirmPopup from '../Popups/ConfirmPopup'
import { updateJwt } from '../../../redux/slices/authSlice'

const ViewVendorApplication = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [applicationData, setApplicationData] = useState()
    const [formattedDate, setFormattedDate] = useState('')
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionError, setActionError] = useState('')


    const fetchApplication = async (userId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/common/get-vendor-application/${userId}`)
            setApplicationData(response.data.application)
            setDataStatus('')
            const isoDate = response.data.application.yearEst;
            const date = new Date(isoDate);
            setFormattedDate(date.toISOString().split('T')[0]);
        } catch (error) {
            console.error(error);
            setDataStatus(error.response?.data?.message || 'Error occured while fetching data')
        }
    }

    const deleteApplication = async () => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`${config.API_BASE_URL}/api/common/delete-vendor-application/${user.userId}`);
            dispatch(updateJwt({ token: response.data.token }));
            navigate('/');
        } catch (error) {
            console.error(error);
            setActionError(error.response?.data?.message || 'Error occurred while deleting application.')
        } finally {
            setIsLoading(false);
            setShowDeletePopup(false)
        }
    };

    const handleDeletePopupAction = (confirmed) => {
        if (confirmed) {
            deleteApplication();
        } else {
            setShowDeletePopup(false)
        }
    };

    useEffect(() => {
        fetchApplication(user.userId)
    }, [user])

    return (
        <section className='container-fluid py-5'>

            <div className="d-flex justify-content-between align-items-center mb-3 px-sm-5">
                <button
                    onClick={() => navigate('/')}
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


            <h1 className='section-title text-center mb-5'>Your Application</h1>

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
                    <div className='text-center'>
                        {applicationData?.status === 'pending' && <button
                            onClick={() => {
                                setActionError('')
                                setShowDeletePopup(true)
                            }}
                            className='primary-btn me-2'
                        >
                            Delete Application
                        </button>}
                        {applicationData?.status === 'approved' && <button
                            onClick={() => {
                                navigate(`/activate-vendor-account/${applicationData._id}`)
                            }}
                            className='green-btn'
                        >
                            Activate vendor account
                        </button>}
                        <p className='text-danger'>{actionError}</p>
                    </div>
                </div>
                :
                <h4 className='text-center fw-light'>{dataStatus}</h4>
            }

            {showDeletePopup &&
                <ConfirmPopup
                    title='Are you sure to delete this application!'
                    description="You won't be able to Retrieve this application once deleted."
                    allowText='Ok'
                    denyText='Cancel'
                    onAction={handleDeletePopupAction}
                    isLoading={isLoading}
                />}

        </section>
    )
}

export default ViewVendorApplication
