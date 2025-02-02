import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../../../config/api'
import { useSelector } from 'react-redux'

const BookingsByPackage = () => {
    const { packageId } = useParams()
    const navigate = useNavigate()
    const { userRole } = useSelector((state) => state.auth)

    const [bookings, setBookings] = useState(null)
    const [dataStatus, setDataStatus] = useState('Loading...')

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/common/view-bookings-by-package/${packageId}`)
            setBookings(response.data.bookings)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching bookings')
        }
    }

    const gotoBookingDetailsPage = (id) => {
        userRole === 'admin' ? navigate(`/admin/view-booking-details/${id}`)
            : navigate(`/vendor/view-booking-details/${id}`)
    }

    useEffect(() => {
        fetchBookings()
    }, [packageId])

    return (
        <section className='container-fluid py-4'>
            {bookings &&
                <h4 className='section-title text-center mt-2'>Bookings for {bookings[0].packageDetails[0].title}</h4>
            }
            <div className='table-responsive mt-4 px-md-5'>
                {bookings ?
                    <table className='tableDefault table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>user</th>
                                <th>Booking Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => gotoBookingDetailsPage(booking._id)}
                                >
                                    <td>{index + 1}</td>
                                    <td>{booking.userDetails[0].email}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td className={`
                                            fw-bold ${booking.status === 'pending'
                                            ? 'text-primary'
                                            : booking.status === 'approved'
                                                ? 'text-success'
                                                : 'text-danger'
                                        }
            `}
                                    >{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :
                    <p className='text-center fs-5'>{dataStatus}</p>
                }
            </div>

        </section>
    )
}

export default BookingsByPackage
