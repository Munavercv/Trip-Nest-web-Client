import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './ViewPackage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatus } from '../../../redux/slices/authSlice'
import { selectChat } from '../../../redux/slices/chatSlice'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputPopup from '../Popups/InputPopup'
import ConfirmPopup from '../Popups/ConfirmPopup'
import UserBookingModal from './UserBookingModal'

const ViewPackage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user, userRole, loggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [showRejectPopup, setShowRejectPopup] = useState(false)
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packageDetails, setPackageDetails] = useState()
    const [formattedDate, setFormattedDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [actionError, setActionError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [activating, setActivating] = useState(false)
    const [deactivating, setDeactivating] = useState(false)
    const [chatLoading, setChatLoading] = useState(false)
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [bookingError, setBookingError] = useState('')
    const [bookingSuccess, setBookingSuccess] = useState(false)

    const fetchPackage = async (id) => {
        try {
            const response = await axios.get(`/api/common/get-package/${id}`)
            setPackageDetails(response.data.package);
            setDataStatus('')
            const isoDate = response.data.package.startDate;
            const date = new Date(isoDate);
            setFormattedDate(date.toISOString().split('T')[0]);
        } catch (error) {
            setDataStatus(error.response?.data?.message || "internal server error")
        }
    }

    const handleDeletePackage = async () => {
        setActionError('')
        try {
            const confirmed = window.confirm('Are you sure to delete this package')
            if (!confirmed) return
            setLoading(true)
            await axios.delete(`/api/common/delete-package/${packageDetails._id}`)
            window.alert('Package deleted successfully')
            navigate(-1)
        } catch (error) {
            setActionError(error.response?.data?.message || "Something went wrong while deleting package")
            setLoading(false)
        }
    }

    const handleApprovePackage = async (id) => {
        setActionError('')
        const confirmed = window.confirm('Are you sure to approve this package')
        if (!confirmed) return
        try {
            const response = await axios.put(`/api/admin/approve-package/${id}`)
            window.alert('Successfully approved package')
            setPackageDetails(response.data.package)
        } catch (error) {
            console.error(error.response?.data?.message || "Error while approving package");
            setActionError(error.response?.data?.message || "Error while approving package")
        }
    }

    const handleRejectPackage = async (id, rejectionReason) => {
        setActionError('')
        setIsLoading(true)
        try {
            const response = await axios.put(`/api/admin/reject-package/${id}`, { rejectionReason })
            window.alert('Successfully rejected package')
            setPackageDetails(response.data.package)
        } catch (error) {
            console.error(error.response?.data?.message || "Error while rejected package");
            setActionError(error.response?.data?.message || "Error while rejected package")
        } finally {
            setIsLoading(false)
            setShowRejectPopup(false)
        }
    }

    const handleActivatePackage = async (id) => {
        setActionError('')
        setActivating(true)
        try {
            const response = await axios.put(`/api/vendor/activate-package/${id}`)
            window.alert('Congratulations! Your package is now active')
            setPackageDetails(response.data.package)
        } catch (error) {
            console.error(error.response?.data?.message || "An error occured while activating package");
            setActionError(error.response?.data?.message || "An error occured while activating package")
        } finally {
            setActivating(false)
        }
    }

    const handleDeactivatePackage = async (id) => {
        setActionError('')
        setDeactivating(true)
        try {
            const response = await axios.put(`/api/vendor/deactivate-package/${id}`)
            window.alert('Your package deactivated successfully')
            setPackageDetails(response.data.package)
        } catch (error) {
            console.error(error.response?.data?.message || "An error occured while deactivating package");
            setActionError(error.response?.data?.message || "An error occured while deactivating package")
        } finally {
            setDeactivating(false)
        }
    }

    const handleStartConversation = async (vendorId, userId) => {
        setActionError('')
        setChatLoading(true)
        dispatch(checkAuthStatus())
        if (!loggedIn) {
            window.alert('Please login')
            setChatLoading(false)
            return
        }

        try {
            const response = await axios.post('/api/common/start-conversation', { userId, vendorId })
            const chatId = response.data.conversation._id
            dispatch(selectChat({ chatId }))
            userRole === 'vendor' ? navigate(`/vendor/inbox`)
                : navigate(`/inbox`)
        } catch (error) {
            console.error(error.response.data.message || 'Error creating conversation');
            setActionError(error.response.data.message || 'Error creating conversation')
        } finally {
            setChatLoading(false)
        }
    }

    const handleBookingPackage = async (inputData, totalAmount) => {
        setBookingError('')
        setIsLoading(true)
        try {
            await axios.post(`/api/user/book-package/${packageDetails._id}`, {
                formData: inputData,
                userId: user.userId,
                vendorId: packageDetails.vendorId,
                totalAmount,
            })
            setShowBookingModal(false)
            setBookingSuccess(true)
        } catch (error) {
            setBookingError(error.response?.data?.message || 'Internal server error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRejectPopupAction = (confirm, inputvalue) => {
        if (confirm) {
            handleRejectPackage(packageDetails._id, inputvalue)
        } else {
            setShowRejectPopup(false)
        }
    }

    const handleBookingPopupAction = (confirm, inputValue, totalAmount) => {
        setBookingError('')
        if (confirm) {
            if (inputValue.numberOfSeats < 1) {
                setBookingError('Please enter the number of seats you want')
                return
            } else if (inputValue.numberOfSeats > packageDetails.availableSlots) {
                setBookingError(`Only ${packageDetails.availableSlots} seats left`)
                return
            }
            handleBookingPackage(inputValue, totalAmount)
        } else {
            setShowBookingModal(false)
        }
    }

    const handleBookingSuccessPopupAction = (confirm) => {
        if(confirm) {
            navigate('/my-bookings')
        } else {
            setBookingSuccess(false)
        }
    }

    useEffect(() => {
        fetchPackage(id)
    }, [id])

    return (
        <section className={`container-fluid ${styles.packagePage} py-3`}>

            {((userRole === 'admin' || (userRole === 'vendor' && user.userId === packageDetails?.vendorId)) && packageDetails?.status === 'rejected') && (
                <div className="alert alert-danger" role="alert">
                    <strong>Rejected! </strong>
                    Delete or update package.
                    Reason: {packageDetails?.rejectionReason}
                </div>
            )}


            <div className="d-flex justify-content-between align-items-center mb-3 px-sm-5">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <i className="fa-solid fa-caret-left"></i> Back
                </button>


                {packageDetails?.status && userRole !== 'user' && <h5
                    className={`fw-bold text-end ${packageDetails.status === 'pending'
                        ? 'text-primary'
                        : packageDetails.status === 'approved'
                            ? 'text-success'
                            : packageDetails.status === 'inactive'
                                ? 'text-secondary'
                                : packageDetails.status === 'active'
                                    ? 'text-info'
                                    : 'text-danger'
                        }`}
                >
                    {packageDetails.status}
                </h5>}

            </div>

            {packageDetails ?
                <>
                    <div className="text-center mt-4">
                        <div className={styles.imageContainer}>
                            <img
                                src={packageDetails.imageUrl}
                                alt={packageDetails.title}
                                className={`${styles.packageImage} img-fluid rounded`}
                            />
                        </div>
                        <p className="text-muted mt-3 mb-0">
                            <i className="fa-solid fa-star" style={{ color: '#ffdf00' }}></i> {packageDetails.rating.avgRating}
                        </p>
                        <h2 className="mt-1 fw-bold">{packageDetails.title}</h2>
                        <h4 className="mt-3 fw-semibold">
                            <i className="fa-solid fa-map-location-dot"></i> {packageDetails.destination}
                        </h4>
                        <p className="text-muted">
                            {packageDetails.days} days
                        </p>
                    </div>

                    <div className={`${styles.detailsSection} pt-3`}>
                        <div className="container d-flex justify-content-between flex-wrap align-items-center">
                            <div>
                                <i className="fa-solid fa-route"></i> {packageDetails.transportationMode}
                            </div>
                            <div>
                                <i className="fa-solid fa-indian-rupee-sign"></i> {packageDetails.price}/person
                            </div>
                            <div>
                                <i className="fa fa-calendar"></i> {formattedDate}
                            </div>
                            <div>
                                <i className="fa fa-person"></i> {packageDetails.availableSlots} seats available
                            </div>
                            {userRole === 'vendor' &&
                                <div>
                                    <i className="fa fa-person"></i> {packageDetails.totalSlots} Total slots
                                </div>
                            }
                        </div>
                    </div>

                    <div className={`${styles.descriptionSection} mt-4 text-center`}>
                        <p className="text-muted">{packageDetails.description}</p>
                    </div>

                    {userRole === 'user' &&
                        <div className={`${styles.actions} text-center mt-5`}>
                            <button
                                className="primary-btn me-2"
                                onClick={() => {
                                    dispatch(checkAuthStatus())
                                    if (!user) {
                                        alert('please login')
                                        return
                                    }
                                    setShowBookingModal(true)
                                }}
                            >
                                Book Now
                            </button>
                            <Link>
                                <button
                                    disabled={chatLoading}
                                    onClick={() => {
                                        handleStartConversation(packageDetails.vendorId, user?.userId)
                                    }}
                                    className="outline-btn me-2 mt-2 mt-sm-0"
                                >
                                    {chatLoading ? 'Loading...'
                                        : 'want to know More? chat'}
                                </button>
                            </Link>
                        </div>
                    }

                    {userRole === 'vendor' && user.userId === packageDetails.vendorId &&
                        <div className={styles.actions}>
                            <div className="text-center mt-5 mb-2">
                                <Link>
                                    View bookings <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="text-center">
                                {(packageDetails.status === 'approved' || packageDetails.status === 'inactive') && (
                                    <>
                                        <button
                                            onClick={() => handleActivatePackage(packageDetails._id)}
                                            disabled={activating}
                                            className="primary-btn me-2"
                                        >
                                            {activating ? "Activating..." : "Activate"}
                                        </button>
                                    </>
                                )}

                                <Link to={`/vendor/edit-package/${packageDetails._id}`}>
                                    <button
                                        className="primary-btn me-2"
                                    >Edit</button>
                                </Link>



                                {packageDetails.status === 'active' && <>
                                    <button
                                        onClick={() => handleDeactivatePackage(packageDetails._id)}
                                        disabled={deactivating}
                                        className="primary-btn me-2"
                                    >
                                        {loading ?
                                            "Deactivating..."
                                            :
                                            "Deactivate"
                                        }
                                    </button>
                                </>}

                                <button
                                    onClick={handleDeletePackage}
                                    disabled={loading}
                                    className="outline-btn"
                                >
                                    {loading ?
                                        "Deleting..."
                                        :
                                        "Delete"
                                    }
                                </button>
                                <p className='text-center text-danger'>{actionError}</p>
                            </div>
                        </div>}

                    {userRole === 'admin' &&
                        <div className={styles.actions}>
                            <div className="text-center mt-5 mb-2">
                                <Link>
                                    View bookings <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="text-center">
                                {(packageDetails.status === 'rejected' || packageDetails.status === 'pending') &&
                                    <button
                                        onClick={() => handleApprovePackage(packageDetails._id)}
                                        className="primary-btn me-2"
                                    >Approve</button>}
                                {packageDetails.status === 'pending' && <button
                                    onClick={() => {
                                        setActionError('')
                                        setShowRejectPopup(true)
                                    }}
                                    className="primary-btn me-2"
                                >Reject</button>}
                                <button
                                    onClick={handleDeletePackage}
                                    disabled={loading}
                                    className="outline-btn"
                                >
                                    {loading ?
                                        "Deleting..."
                                        :
                                        "Delete"
                                    }
                                </button>
                                <p className='text-center text-danger'>{actionError}</p>
                            </div>
                        </div>
                    }
                </> :
                <h4 className='text-center fw-medium'>{dataStatus}</h4>
            }

            {showRejectPopup &&
                <InputPopup
                    title='Are you sure to reject this package'
                    description='Please enter the reason to reject'
                    inputPlaceholder='Reason to reject'
                    allowText='send'
                    denyText='cancel'
                    isLoading={isLoading}
                    onAction={handleRejectPopupAction}
                />
            }

            {showBookingModal &&
                <UserBookingModal
                    onAction={handleBookingPopupAction}
                    isLoading={isLoading}
                    error={bookingError}
                    price={packageDetails.price}
                />
            }

            {bookingSuccess &&
                <ConfirmPopup
                    title='Booking successfull'
                    description='See your bookings'
                    allowText='Ok'
                    denyText='Cancel'
                    onAction={handleBookingSuccessPopupAction}
                />
            }

        </section >
    )
}

export default ViewPackage;                                                                                         