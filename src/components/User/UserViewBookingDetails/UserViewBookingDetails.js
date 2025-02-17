import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './UserViewBookingDetails.module.css'
import axios from 'axios'
import config from '../../../config/api'
import { Link } from 'react-router-dom'
import PaymentOrderModal from './PaymentOrderModal'
import { useDispatch, useSelector } from 'react-redux'
import SuccessPopup from '../../Common/Popups/SuccessPopup'
import PaymentDetailsPopup from '../../Common/Popups/PaymentDetailsPopup'
import { selectPayment } from '../../../redux/slices/paymentSlices'
import ConfirmPopup from '../../Common/Popups/ConfirmPopup'

const UserViewBookingDetails = () => {
    const { bookingId } = useParams()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [bookingDetails, setBookingDetails] = useState()
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [paySuccessModal, setPaySuccessModal] = useState(false)
    const [showPaymentDetails, setShowPaymentDetails] = useState(false)
    const [showCancelPopup, setShowCancelPopup] = useState(false)
    const [cancelSuccess, setCancelSuccess] = useState(false)
    const [cancelError, setCancelError] = useState('')
    const [loading, setLoading] = useState({
        cancel: false
    })

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/user/get-booking-details/${bookingId}`)
            setBookingDetails(response.data.bookingDetails)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching booking details')
        }
    }

    const handleCancelBooking = async (bookingId) => {
        setCancelError('')
        setLoading({ cancel: true })
        try {
            await axios.delete(`${config.API_BASE_URL}/api/common/cancel-booking/${bookingId}`)
            setShowCancelPopup(false)
            setCancelSuccess(true)
        } catch (error) {
            setCancelError(error.response?.data?.message || 'Error while canceling')
        } finally {
            setLoading({ cancel: false })
        }
    }

    const handleCancelBookingPopup = (confirmed) => {
        if (confirmed) {
            handleCancelBooking(bookingDetails._id)
        } else {
            setShowCancelPopup(false)
        }
    }

    const handlePaymentSuccess = () => {
        setShowOrderModal(false)
        setPaySuccessModal(true)
        fetchBookingDetails()
    }

    const handleShowBookingDetails = () => {
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
                            : bookingDetails.status === 'cancelled'
                                ? 'text-secondary'
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
                        <h6><span>Name: </span>{bookingDetails.packageDetails.title}</h6>
                        <h6><span>Date : </span>{new Date(bookingDetails.packageDetails.startDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}</h6>
                        <h6><span>Destination : </span>{bookingDetails.packageDetails.destination}</h6>

                        <Link to={`/view-package/${bookingDetails.packageDetails._id}`}>
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
                        <h6>{new Date(bookingDetails.bookingDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}</h6>
                    </div>

                    {bookingDetails.status === 'approved' && <>
                        <hr className="border-2" />
                        <div className={`${styles.item} ms-md-5`}>
                            <h5>Payment</h5>
                            <h6>{bookingDetails.paymentDetails?.status ? 'Paid' : 'Not paid'}</h6>
                            {bookingDetails.paymentDetails?.status === true && <Link onClick={handleShowBookingDetails}>
                                View Payment Details
                            </Link>}
                        </div>
                    </>}

                    <hr className="border-2" />
                    <div className={`${styles.item} ms-md-5`}>
                        <h6>Having any trouble? <br />
                            <a
                                href={`tel:${bookingDetails.vendorDetails.contact.phone}`}
                            ><i className="fa-solid fa-phone"></i> Contact with vendor </a>
                        </h6>
                    </div>

                    {/* Action buttons */}
                    <hr className="border-2" />
                    <div className='text-center'>
                        {bookingDetails.status !== 'cancelled' && <button
                            onClick={() => setShowCancelPopup(true)}
                            className='primary-btn me-2'
                        >
                            Cancel booking
                        </button>}
                        {!bookingDetails.paymentDetails?.status && bookingDetails.status === 'approved' &&
                            <button
                                className='primary-btn me-2'
                                onClick={() => setShowOrderModal(true)}
                            >
                                Pay Now
                            </button>}
                    </div>

                </div>
                :
                <h4 className='text-center border-top'>{dataStatus}</h4>
            }

            {/* cancellation handling popups */}
            {showCancelPopup &&
                <ConfirmPopup
                    title='Are you sure to cancel this booking?'
                    description="You won't be able to undo booking once cancelled, contact vendor for refunding"
                    allowText='Ok'
                    denyText='No'
                    error={cancelError}
                    isLoading={loading.cancel}
                    onAction={handleCancelBookingPopup}
                />
            }
            {cancelSuccess &&
                <SuccessPopup
                    title='Successfully cancelled booking'
                    onClose={() => {
                        setCancelSuccess(false)
                        fetchBookingDetails()
                    }}
                />
            }

            {/* payment handling popups */}
            {bookingDetails && showOrderModal &&
                <PaymentOrderModal
                    packageId={bookingDetails.packageDetails._id}
                    amount={bookingDetails.totalAmount}
                    bookingId={bookingDetails._id}
                    vendorId={bookingDetails.packageDetails.vendorId}
                    userId={user.userId}
                    onClose={() => setShowOrderModal(false)}
                    packageName={bookingDetails.packageDetails.title}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            }
            {bookingDetails && paySuccessModal &&
                <SuccessPopup
                    title='Payment Successful'
                    description={`Your payment for ${bookingDetails.packageDetails?.title} is successful`}
                    onClose={() => setPaySuccessModal(false)}
                />
            }
            {showPaymentDetails &&
                <PaymentDetailsPopup
                    close={() => setShowPaymentDetails(false)}
                />
            }
        </section>
    )
}
export default UserViewBookingDetails
