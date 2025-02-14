import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './ViewPackage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatus } from '../../../redux/slices/authSlice'
import { selectChat } from '../../../redux/slices/chatSlice'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'
import InputPopup from '../Popups/InputPopup'
import ConfirmPopup from '../Popups/ConfirmPopup'
import UserBookingModal from './UserBookingModal'
import SuccessPopup from '../Popups/SuccessPopup'
import AddRatingModal from './AddRatingModal'
import TermsAndConditionsPopup from '../Popups/TermsAndConditionsPopup'

const ViewPackage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user, userRole, loggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [review, setReview] = useState(null)
    const [showRejectPopup, setShowRejectPopup] = useState(false)
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packageDetails, setPackageDetails] = useState()
    const [vendor, setVendor] = useState()
    const [formattedDate, setFormattedDate] = useState('')
    const [actionError, setActionError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const [activating, setActivating] = useState(false)
    const [deactivating, setDeactivating] = useState(false)
    const [chatLoading, setChatLoading] = useState(false)
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [bookingError, setBookingError] = useState('')
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [gotoLoginPopup, setGotoLoginPopup] = useState(false)
    const [approvePackagePopup, setApprovePackagePopup] = useState(false)
    const [activatePopup, setActivatePopup] = useState(false)
    const [deactivatePopup, setDeactivatePopup] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [errors, setErrors] = useState({
        delete: '',
        approve: '',
        activate: '',
        deactivate: '',
        rating: '',
    })
    const [loading, setLoading] = useState({
        delete: false,
        approve: false,
        activate: false,
        deactivate: false,
        rating: false
    })
    const [showSuccessPopup, setShowSuccessPopup] = useState({
        delete: false,
        approve: false,
        reject: false,
        activate: false,
        deactivate: false,
        rating: false
    })

    const fetchPackage = async (id) => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/common/get-package/${id}`)
            setPackageDetails(data.package);
            setVendor(data.vendor)
            setDataStatus('')
            const isoDate = data.package.startDate;
            const date = new Date(isoDate);
            setFormattedDate(date.toISOString().split('T')[0]);
        } catch (error) {
            setDataStatus(error.response?.data?.message || "internal server error")
        }
    }

    const handleUpdateFavourites = async (id, action) => {
        if (!user) {
            setGotoLoginPopup(true)
            return
        }
        try {
            await axios.put(`${config.API_BASE_URL}/api/user/add-or-remove-favourite`, { packageId: id, userId: user.userId, action })

            if (action === 'add') setFavourite(true)
            else setFavourite(false)
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    }

    const handleDeletePackage = async () => {
        setErrors({ delete: '' })
        setLoading({ delete: true })
        try {
            await axios.delete(`${config.API_BASE_URL}/api/common/delete-package/${packageDetails._id}`)
            setDeletePopup(false)
            setShowSuccessPopup({ delete: true })
        } catch (error) {
            setErrors({ delete: error.response?.data?.message || "Something went wrong while deleting package" })
        } finally {
            setLoading({ delete: false })
        }
    }

    const handleApprovePackage = async (id) => {
        setErrors({ approve: '' })
        setLoading({ approve: true })

        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/admin/approve-package/${id}`)
            setPackageDetails(response.data.package)
            setApprovePackagePopup(false)
            setShowSuccessPopup({ approve: true })
        } catch (error) {
            setErrors({ approve: error.response?.data?.message || "Error while approving package" })
        } finally {
            setLoading({ approve: false })
        }
    }

    const handleRejectPackage = async (id, rejectionReason) => {
        setActionError('')
        setIsLoading(true)
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/admin/reject-package/${id}`, { rejectionReason })
            setPackageDetails(response.data.package)
            setShowSuccessPopup({ reject: true })
        } catch (error) {
            setActionError(error.response?.data?.message || "Error while rejecting package")
        } finally {
            setIsLoading(false)
            setShowRejectPopup(false)
        }
    }

    const handleActivatePackage = async (id) => {
        setErrors({ activate: '' })
        setLoading({ activate: true })
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/admin/activate-package/${id}`)
            setActivatePopup(false)
            setPackageDetails(response.data.package)
            setShowSuccessPopup({ activate: true })
        } catch (error) {
            setErrors({ activate: error.response?.data?.message || "An error occured while activating package" })
        } finally {
            setLoading({ activate: false })
        }
    }

    const handleActivatePackagePopup = (confirm) => {
        if (confirm) {
            handleActivatePackage(packageDetails._id)
        } else {
            setErrors({ activate: '' })
            setActivatePopup(false)
        }
    }

    const handleDeactivatePackage = async (id) => {
        setActionError('')
        setLoading({ deactivate: true })
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/admin/deactivate-package/${id}`)
            setPackageDetails(response.data.package)
            setDeactivatePopup(false)
            setShowSuccessPopup({ deactivate: true })
        } catch (error) {
            setErrors({ deactivate: error.response?.data?.message || "An error occured while deactivating package" })
        } finally {
            setLoading({ deactivate: false })
        }
    }

    const deactivatePopupAction = (confirmed) => {
        if (confirmed) {
            handleDeactivatePackage(packageDetails._id)
        } else {
            setDeactivatePopup(false)
            setErrors({ deactivate: '' })
        }
    }

    const handleStartConversation = async (vendorId, userId) => {
        setActionError('');
        await dispatch(checkAuthStatus());

        if (!loggedIn) {
            setGotoLoginPopup(true)
            return;
        }

        setChatLoading(true);

        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/common/start-conversation`, { userId, vendorId });
            const chatId = response.data.conversation._id;
            dispatch(selectChat({ chatId }));

            const inboxPath = userRole === 'vendor' ? `/vendor/inbox` : `/inbox`;
            navigate(inboxPath);
        } catch (error) {
            setActionError(error.response?.data?.message || 'Error creating conversation');
        } finally {
            setChatLoading(false);
        }
    };

    const handleBookingPackage = async (inputData, totalAmount) => {
        setBookingError('')
        setIsLoading(true)
        try {
            await axios.post(`${config.API_BASE_URL}/api/user/book-package/${packageDetails._id}`, {
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
        if (confirm) {
            navigate('/my-bookings')
        } else {
            setBookingSuccess(false)
        }
    }

    const handleDeletePopupAction = (confirmed) => {
        if (confirmed) {
            handleDeletePackage()
        } else {
            setDeletePopup(false)
            setErrors({ delete: '' })
        }
    }

    const handleGotoLoginPopup = (confirmed) => {
        if (confirmed) {
            navigate('/auth/login', { state: { from: `/view-package/${packageDetails?._id}` } });
        } else {
            setGotoLoginPopup(false)
        }
    }

    const handleApprovePopupAction = (confirmed) => {
        if (confirmed) {
            handleApprovePackage(packageDetails._id)
        } else {
            setApprovePackagePopup(false)
        }
    }

    const handleRatePackage = async (rating) => {
        setErrors({ rating: '' })
        setLoading({ rating: true })
        try {
            const { data } = await axios.put(`${config.API_BASE_URL}/api/user/add-review`, {
                rating,
                packageId: id,
                userId: user.userId
            })
            setShowRatingModal(false)
            fetchReview()
            setPackageDetails((prevDetails) => ({
                ...prevDetails,
                rating: {
                    ...prevDetails.rating,
                    avgRating: data.updatedAvgRating
                }
            }));
            setShowSuccessPopup({ rating: true })
        } catch (error) {
            setErrors({ rating: error.response?.data?.message || 'Cannot send' })
        } finally {
            setLoading({ rating: false })
        }
    }

    const fetchReview = async () => {
        const { data } = await axios.get(`${config.API_BASE_URL}/api/user/get-review`, {
            params: {
                userId: user.userId,
                packageId: id
            }
        })
        setReview(data.review)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (userRole === 'user' && user) {
                await fetchReview();
            }
        };

        fetchData();
    }, [userRole, user, id]);


    useEffect(() => {
        fetchPackage(id)

        const checkFavourite = async () => {
            try {
                const checkIsFavourite = await axios.get(`${config.API_BASE_URL}/api/user/check-package-is-favourite`, {
                    params: { packageId: id, userId: user.userId }
                })
                if (checkIsFavourite.data.isFavourite)
                    setFavourite(true)
                else
                    setFavourite(false)
            } catch (error) {
                setFavourite(false)
            }

        }

        if (user) checkFavourite()
    }, [id, user])

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
                            : packageDetails.status === 'active'
                                ? 'text-info'
                                : packageDetails.status === 'expired'
                                    ? 'text-muted'
                                    : 'text-danger'
                        }`}
                >
                    {packageDetails.status}
                </h5>}

                {packageDetails?.status === 'expired' && userRole === 'user' && <h5
                    className={`fw-bold text-end text-muted`}
                >
                    {packageDetails.status}
                </h5>}

                {userRole === 'user' &&
                    <button
                        onClick={() => {
                            if (!favourite)
                                handleUpdateFavourites(packageDetails._id, 'add')
                            else
                                handleUpdateFavourites(packageDetails._id, 'remove')
                        }}
                        className={`${styles.addToFavouriteButton}`}
                    >
                        {favourite ? <i className="fa-solid fa-heart"></i>
                            : <i className="fa-regular fa-heart"></i>}
                    </button>
                }

            </div>

            {packageDetails ?
                <>
                    <div className="text-center">

                        <div className={styles.imageContainer}>
                            <img
                                src={packageDetails.imageUrl}
                                alt={packageDetails.title}
                                className={`${styles.packageImage} img-fluid rounded`}
                            />
                        </div>

                        <div className="d-flex justify-content-center gap-4 my-3">
                            {userRole !== 'vendor' &&
                                <div className="d-flex justify-content-center mt-2">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={vendor.dpUrl}
                                            alt="Profile"
                                            className="rounded-circle border"
                                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                        />
                                        <Link
                                            className='text-dark'
                                            to={userRole === 'admin' ? `/admin/view-vendor/${packageDetails.vendorId}`
                                                : `/vendor-profile/${packageDetails.vendorId}`
                                            }>
                                            <span className="ms-2 fw-bold">{vendor.name}</span>
                                        </Link>
                                    </div>
                                </div>}

                            <p className="text-muted mt-3 mb-0">
                                <i className="fa-solid fa-star" style={{ color: '#ffdf00' }}></i> {packageDetails.rating.avgRating}
                            </p>
                        </div>

                        <h2 className="mt-1 fw-bold">{packageDetails.title}</h2>

                        <div className="d-flex justify-content-center gap-4 my-3">
                            <h4 className="fw-semibold">
                                <i className="fa-solid fa-map-location-dot"></i> {packageDetails.destination}
                            </h4>
                            <p className="text-muted">
                                {packageDetails.days} days
                            </p>
                        </div>

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

                    {userRole === 'user' && packageDetails.status === 'active' &&
                        <div className={`${styles.actions} text-center mt-5`}>
                            <button
                                className="primary-btn me-2 mb-3"
                                style={{ padding: '0.5rem 1.5rem' }}
                                onClick={() => {
                                    dispatch(checkAuthStatus())
                                    if (!user) {
                                        setGotoLoginPopup(true)
                                        return
                                    }
                                    setShowBookingModal(true)
                                }}
                            >
                                Book Now
                            </button>
                            <br />
                            <Link>
                                <button
                                    disabled={chatLoading}
                                    onClick={() => {
                                        handleStartConversation(packageDetails.vendorId, user?.userId)
                                    }}
                                    className="outline-btn me-2 mt-2 mt-sm-0 mb-2"
                                >
                                    {chatLoading ? 'Please wait...'
                                        : 'want to know More? chat'}
                                </button>
                            </Link>
                            {!review && < button
                                className={styles.ratingBtn}
                                onClick={() => {
                                    dispatch(checkAuthStatus())
                                    if (!user) {
                                        setGotoLoginPopup(true)
                                        return
                                    }
                                    setShowRatingModal(true)
                                }}
                            >
                                Rate package
                            </button>}
                        </div>
                    }

                    {userRole === 'vendor' && user.userId === packageDetails.vendorId &&
                        <div className={styles.actions}>
                            <div className="text-center mt-5 mb-2">
                                <Link to={`/vendor/view-bookings-by-package/${packageDetails._id}`}>
                                    View bookings <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="text-center">
                                {(packageDetails.status === 'approved' || packageDetails.status === 'inactive') &&
                                    <>
                                        <button
                                            onClick={() => setActivatePopup(true)}
                                            disabled={activating}
                                            className="primary-btn me-2"
                                        >
                                            {activating ? "Activating..." : "Activate"}
                                        </button>
                                    </>
                                }

                                {(packageDetails.status === 'pending' || packageDetails.status === 'rejected') ?
                                    <Link to={`/vendor/edit-package/${packageDetails._id}`}>
                                        <button
                                            className="primary-btn me-2"
                                        >Edit</button>
                                    </Link> : null
                                }


                                {packageDetails.status !== 'expired' && packageDetails.status !== 'active' && <button
                                    onClick={() => setDeletePopup(true)}
                                    disabled={deleting}
                                    className="outline-btn"
                                >
                                    {deleting ?
                                        "Deleting..."
                                        :
                                        "Delete"
                                    }
                                </button>}
                                <p className='text-center text-danger'>{actionError}</p>
                            </div>
                        </div>}

                    {userRole === 'admin' &&
                        <div className={styles.actions}>
                            <div className="text-center mt-5 mb-2">
                                <Link
                                    to={`/admin/view-bookings-by-package/${packageDetails._id}`}
                                >
                                    View bookings <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="text-center">
                                {(packageDetails.status === 'rejected' || packageDetails.status === 'pending') &&
                                    <button
                                        onClick={() => setApprovePackagePopup(true)}
                                        className="primary-btn me-2"
                                    >Approve</button>}
                                {packageDetails.status === 'pending' && <button
                                    onClick={() => {
                                        setActionError('')
                                        setShowRejectPopup(true)
                                    }}
                                    className="primary-btn me-2"
                                >Reject</button>}
                                {packageDetails.status === 'active' && <>
                                    <button
                                        onClick={() => setDeactivatePopup(true)}
                                        disabled={deactivating}
                                        className="primary-btn me-2"
                                    >
                                        {deactivating ?
                                            "Deactivating..."
                                            :
                                            "Deactivate"
                                        }
                                    </button>
                                </>}

                                {packageDetails.status === 'inactive' &&
                                    <>
                                        <button
                                            onClick={() => setActivatePopup(true)}
                                            disabled={activating}
                                            className="primary-btn me-2"
                                        >
                                            {activating ? "Activating..." : "Activate"}
                                        </button>
                                    </>
                                }

                                <button
                                    onClick={() => setDeletePopup(true)}
                                    disabled={deleting}
                                    className="outline-btn"
                                >
                                    {deleting ?
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

            {
                showRejectPopup &&
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

            {
                showBookingModal &&
                <UserBookingModal
                    onAction={handleBookingPopupAction}
                    isLoading={isLoading}
                    error={bookingError}
                    price={packageDetails.price}
                />
            }

            {
                bookingSuccess &&
                <ConfirmPopup
                    title='Booking successfull'
                    description='See your bookings'
                    allowText='Ok'
                    denyText='Cancel'
                    onAction={handleBookingSuccessPopupAction}
                />
            }

            {
                deletePopup &&
                <ConfirmPopup
                    title='Delete Package'
                    description="Deleting the package will erase all the data of this package. You won't be able to retreive it again"
                    allowText='Ok'
                    denyText='Cancel'
                    isLoading={loading.delete}
                    error={errors.delete}
                    onAction={handleDeletePopupAction}
                />
            }

            {
                gotoLoginPopup &&
                <ConfirmPopup
                    title='Please Login to continue'
                    allowText='Ok'
                    denyText='Cancel'
                    onAction={handleGotoLoginPopup}
                />
            }

            {
                approvePackagePopup &&
                <ConfirmPopup
                    title='Are you sure want to approve this package?'
                    allowText='Yes'
                    denyText='No'
                    isLoading={loading.approve}
                    error={errors.approve}
                    onAction={handleApprovePopupAction}
                />
            }

            {
                deactivatePopup &&
                <ConfirmPopup
                    title='Deactivate'
                    description='Are you sure want to deactivate this package?'
                    allowText='Yes'
                    denyText='No'
                    isLoading={loading.deactivate}
                    error={errors.deactivate}
                    onAction={deactivatePopupAction}
                />
            }

            {
                showSuccessPopup.deactivate &&
                <SuccessPopup
                    title='Deactivated'
                    description='Successfully Deactivated Package'
                    onClose={() => setShowSuccessPopup({ deactivate: false })}
                />
            }

            {
                activatePopup &&
                <TermsAndConditionsPopup
                    title='Activate'
                    description='Read terms and conditions below'
                    termsName='packageActivation'
                    allowText='Activate'
                    denyText='Cancel'
                    onAction={handleActivatePackagePopup}
                    isLoading={loading.activate}
                    error={errors.activate}
                />
            }

            {
                showSuccessPopup.activate &&
                <SuccessPopup
                    title='Activated'
                    description='Package Activated successfully'
                    onClose={() => setShowSuccessPopup({ activate: false })}
                />
            }

            {
                showSuccessPopup.delete &&
                <SuccessPopup
                    title='Deleted'
                    description='Successfully deleted package'
                    onClose={() => navigate(-1)}
                />
            }

            {
                showSuccessPopup.approve &&
                <SuccessPopup
                    title='Approved'
                    description='Successfully approved package'
                    onClose={() => setShowSuccessPopup({ approve: false })}
                />
            }

            {
                showSuccessPopup.reject &&
                <SuccessPopup
                    title='Rejected'
                    description='Successfully rejected package'
                    onClose={() => setShowSuccessPopup({ reject: false })}
                />
            }

            {
                showRatingModal &&
                <AddRatingModal
                    close={() => {
                        setErrors({ rating: '' })
                        setLoading({ rating: false })
                        setShowRatingModal(false)
                    }}
                    onRate={handleRatePackage}
                    isLoading={loading.rating}
                    error={errors.rating}
                />
            }

            {
                showSuccessPopup.rating &&
                <SuccessPopup
                    title='Thank you'
                    description='Your rating added'
                    onClose={() => setShowSuccessPopup({ rating: false })}
                />
            }

        </section >
    )
}

export default ViewPackage;                                                                                         