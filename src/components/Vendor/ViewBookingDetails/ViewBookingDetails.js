import React, { useEffect, useState } from 'react'
import styles from './ViewBookingDetails.module.css'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../../../config/api'
import { Link } from 'react-router-dom'
import { selectPayment } from '../../../redux/slices/paymentSlices'
import { useDispatch } from 'react-redux'
import PaymentDetailsPopup from '../../Common/Popups/PaymentDetailsPopup'
import ConfirmPopup from '../../Common/Popups/ConfirmPopup'
import SuccessPopup from '../../Common/Popups/SuccessPopup'

const ViewBookingDetails = () => {
    const { bookingId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [bookingDetails, setBookingDetails] = useState()
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [showPaymentDetails, setShowPaymentDetails] = useState(false)
    const [showApprovePopup, setShowApprovePopup] = useState(false)
    const [showRejectPopup, setShowRejectPopup] = useState(false)
    const [approveError, setApproveError] = useState('')
    const [rejectError, setRejectError] = useState('')
    const [loading, setLoading] = useState({
        approve: false,
        reject: false
    })
    const [approveSuccess, setApproveSuccess] = useState(false)
    const [rejectSuccess, setRejectSuccess] = useState(false)

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/vendor/get-booking-details/${bookingId}`)
            setBookingDetails(response.data.bookingDetails)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching booking details')
        }
    }

    const handleApprovePopup = (confirmed) => {
        if (confirmed) {
            handleApproveBooking()
        } else {
            setApproveError('')
            setShowApprovePopup(false)
        }
    }

    const handleApproveBooking = async () => {
        setApproveError('')
        setLoading({ approve: true })
        try {
            await axios.put(`${config.API_BASE_URL}/api/vendor/approve-booking/${bookingId}`)
            setShowApprovePopup(false)
            setApproveSuccess(true)
        } catch (error) {
            setApproveError(error.response?.data?.message || 'Error while approving booking')
        } finally {
            setLoading({ approve: false })
        }
    }

    const handleRejectPopup = (confirmed) => {
        if (confirmed) {
            handleRejectBooking()
        } else {
            setRejectError('')
            setShowRejectPopup(false)
        }
    }

    const handleRejectBooking = async () => {
        setRejectError('');
        setLoading({ reject: true })
        try {
            await axios.put(`${config.API_BASE_URL}/api/vendor/reject-booking/${bookingId}`)
            setShowRejectPopup(false)
            setRejectSuccess(true)
        } catch (error) {
            setRejectError(error.response?.data?.message || 'Error while rejecting booking')
        } finally {
            setLoading({ reject: false })
        }
    }

    const handleShowPaymentDetails = () => {
        dispatch(selectPayment({ orderId: bookingDetails.paymentDetails?.orderId }))
        setShowPaymentDetails(true)
    }

    useEffect(() => {
        fetchBookingDetails()
    }, [bookingId])
    return (
        <section className='container-fluid py-5'>
            <div className="d-flex justify-content-between align-items-center mb-3 px-sm-5">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <i className="fa-solid fa-caret-left"></i> Back
                </button>

                {bookingDetails?.status && <h5
                    className={`fw-bold text-end ${bookingDetails.status === 'pending'
                        ? 'text-primary'
                        : bookingDetails.status === 'approved'
                            ? 'text-success'
                            : 'text-danger'
                        }`}
                >
                    {bookingDetails.status}
                </h5>}

            </div>
            <h1 className='section-title text-center mb-5'>Booking Details</h1>

            {bookingDetails ?
                <div className="px-2 px-sm-5">
                    <hr className="border-2" />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Package Details</h5>
                        <h6><span>Name: </span>{bookingDetails.packageDetails[0].title}</h6>
                        <h6><span>Date : </span>{new Date(bookingDetails.packageDetails[0].startDate).toLocaleDateString()}</h6>
                        <h6><span>Destination : </span>{bookingDetails.packageDetails[0].destination}</h6>
                        <Link to={`/view-package/${bookingDetails.packageDetails[0]._id}`}>
                            View More details <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                    </div>

                    <hr className="border-2" />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Booked seats: <strong> {bookingDetails.numberOfSeats}</strong></h5>
                    </div>

                    {bookingDetails.specialRequests &&
                        <>
                            <hr className="border-2" />
                            <div className={`${styles.item} ms-md-5`}>
                                <h5>Special requests: </h5>
                                <h6>{bookingDetails.specialRequests}</h6>
                            </div>
                        </>}

                    <hr className="border-2" />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Amount: </h5>
                        <h6>Rs. {bookingDetails.totalAmount}</h6>
                    </div>

                    <hr className="border-2" />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>Booking Date: </h5>
                        <h6>{new Date(bookingDetails.bookingDate).toLocaleDateString()}</h6>
                    </div>

                    <hr className="border-2" />
                    <div className={`${styles.item} ms-md-5`}>
                        <h5>User Email: </h5>
                        <h6>{bookingDetails.user[0].email}</h6>
                        <h5>Whatsapp: </h5>
                        <h6>
                            {bookingDetails.userWhatsapp}</h6>
                            <a
                                href={`https://wa.me/${bookingDetails.userWhatsapp.replace(/\s+/g, '')}?text=Hello, I am contacting you regarding your *${bookingDetails.packageDetails[0].title}* booking on *Trip Nest* platform`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Chat on Whatsapp <i className="fa-brands fa-whatsapp"></i></a>
                    </div>

                    {bookingDetails.status === 'approved' && <>
                        <hr className="border-2" />
                        <div className={`${styles.item} ms-md-5`}>
                            <h5>Payment</h5>
                            <h6>{bookingDetails.paymentDetails?.status ? 'Paid' : 'Not paid'}</h6>
                            {bookingDetails.paymentDetails?.status === true &&
                                <Link
                                    onClick={handleShowPaymentDetails}
                                >
                                    View Payment Details
                                </Link>}
                        </div>
                    </>}

                    {/* Action buttons */}
                    <hr className="border-2" />
                    {bookingDetails.status === 'pending' &&
                        <div className='text-center'>
                            <button
                                className='primary-btn me-2'
                                onClick={() => setShowApprovePopup(true)}
                            >
                                <i className="fa-solid fa-check"></i> Approve
                            </button>
                            <button
                                className='primary-btn me-2'
                                onClick={() => setShowRejectPopup(true)}
                            >
                                <i className="fa-solid fa-xmark"></i> Reject
                            </button>
                        </div>}

                    {bookingDetails.status === 'approved' &&
                        <div className='text-center'>
                            <button
                                className='primary-btn me-2'
                                onClick={() => setShowRejectPopup(true)}
                            >
                                <i className="fa-solid fa-xmark"></i> Reject
                            </button>
                        </div>}

                    {bookingDetails.status === 'rejected' &&
                        <div className='text-center'>
                            <button
                                className='primary-btn me-2'
                                onClick={() => setShowApprovePopup(true)}
                            >
                                <i className="fa-solid fa-check"></i> Approve
                            </button>
                        </div>}

                </div>
                :
                <h4 className='text-center border-top'>{dataStatus}</h4>
            }

            {showPaymentDetails &&
                <PaymentDetailsPopup
                    close={() => setShowPaymentDetails(false)}
                />
            }

            {showApprovePopup &&
                <ConfirmPopup
                    title='Approve Booking?'
                    allowText='Yes'
                    denyText='No'
                    onAction={handleApprovePopup}
                    isLoading={loading.approve}
                    error={approveError}
                />
            }
            {approveSuccess &&
                <SuccessPopup
                    title='Successfully approved booking'
                    onClose={() => {
                        setApproveSuccess(false)
                        fetchBookingDetails('')
                    }}
                />
            }

            {showRejectPopup &&
                <ConfirmPopup
                    title='Reject Booking?'
                    allowText='Yes'
                    denyText='No'
                    onAction={handleRejectPopup}
                    isLoading={loading.reject}
                    error={rejectError}
                />
            }
            {rejectSuccess &&
                <SuccessPopup
                    title='Successfully rejected booking'
                    onClose={() => {
                        setRejectSuccess(false)
                        fetchBookingDetails('')
                    }}
                />
            }
        </section>
    )
}

export default ViewBookingDetails
