import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './ViewPackage.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ViewPackage = () => {
    const { id } = useParams()
    const { user, userRole } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packageDetails, setPackageDetails] = useState()
    const [formattedDate, setFormattedDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [actionError, setActionError] = useState('')

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

    useEffect(() => {
        fetchPackage(id)
    }, [id])

    return (
        <section className={`container-fluid ${styles.packagePage} py-5`}>
            <div className="d-flex justify-content-between align-items-center mb-3 px-sm-5">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <i className="fa-solid fa-caret-left"></i> Back
                </button>


                {packageDetails?.status && <h5
                    className={`fw-bold text-end ${packageDetails.status === 'pending'
                        ? 'text-primary'
                        : packageDetails.status === 'approved'
                            ? 'text-success'
                            : packageDetails.status === 'inactive'
                                ? 'text-secondary'
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
                        <h2 className="mt-3 fw-bold">{packageDetails.title}</h2>
                        <h4 className="mt-3 fw-semibold">
                            <i class="fa-solid fa-map-location-dot"></i> {packageDetails.destination}
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

                    {userRole === 'vendor' && user.userId === packageDetails.vendorId &&
                        <div className={styles.actions}>
                            <div className="text-center mt-5 mb-2">
                                <Link>
                                    View bookings <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="text-center">
                                <Link to={`/vendor/edit-package/${packageDetails._id}`}>
                                    <button
                                        className="primary-btn me-2"
                                    >Edit</button>
                                </Link>
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
                </> :
                <h4 className='text-center fw-medium'>{dataStatus}</h4>
            }
        </section >
    )
}

export default ViewPackage
