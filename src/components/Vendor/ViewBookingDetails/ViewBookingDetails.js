import React, { useEffect, useState } from 'react'
import styles from './ViewBookingDetails.module.css'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../../../config/api'
import { Link } from 'react-router-dom'
import { selectPayment } from '../../../redux/slices/paymentSlices'
import { useDispatch } from 'react-redux'
import PaymentDetailsPopup from '../../Common/Popups/PaymentDetailsPopup'

const ViewBookingDetails = () => {
    const { bookingId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [bookingDetails, setBookingDetails] = useState()
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [actionError, setActionError] = useState('')
    const [showPaymentDetails, setShowPaymentDetails] = useState(false)

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/vendor/get-booking-details/${bookingId}`)
            setBookingDetails(response.data.bookingDetails)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching booking details')
        }
    }

    const handleApproveBooking = async () => {
        setActionError('')
        const confirmed = window.confirm("Approve booking?")
        if (!confirmed) return

        try {
            await axios.put(`${config.API_BASE_URL}/api/vendor/approve-booking/${bookingId}`)
            window.alert('successfully approved booking')
            fetchBookingDetails()
        } catch (error) {
            setActionError(error.response?.data?.message || 'Error while approving booking')
        }
    }

    const handleRejectBooking = async () => {
        setActionError('');
        const confirmed = window.confirm('Reject booking?')

        if (!confirmed) return

        try {
            await axios.put(`${config.API_BASE_URL}/api/vendor/reject-booking/${bookingId}`)
            window.alert('successfully rejected booking');
            fetchBookingDetails()
        } catch (error) {
            setActionError(error.response?.data?.message || 'Error while rejecting booking')
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
                                onClick={handleApproveBooking}
                            >
                                <i className="fa-solid fa-check"></i> Approve
                            </button>
                            <button
                                className='primary-btn me-2'
                                onClick={handleRejectBooking}
                            >
                                <i className="fa-solid fa-xmark"></i> Reject
                            </button>
                            <p className='text-danger'>{actionError}</p>
                        </div>}

                    {bookingDetails.status === 'approved' &&
                        <div className='text-center'>
                            <button
                                className='primary-btn me-2'
                                onClick={handleRejectBooking}
                            >
                                <i className="fa-solid fa-xmark"></i> Cancel Booking
                            </button>
                            <p className='text-danger'>{actionError}</p>
                        </div>}

                    {bookingDetails.status === 'rejected' &&
                        <div className='text-center'>
                            <button
                                className='primary-btn me-2'
                                onClick={handleApproveBooking}
                            >
                                <i className="fa-solid fa-check"></i> Approve
                            </button>
                            <p className='text-danger'>{actionError}</p>
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
        </section>
    )
}

export default ViewBookingDetails
