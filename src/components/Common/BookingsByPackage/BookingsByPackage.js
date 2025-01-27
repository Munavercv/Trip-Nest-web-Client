import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

const BookingsByPackage = () => {
    const { packageId } = useParams()
    const navigate = useNavigate()

    const [bookings, setBookings] = useState(null)
    const [dataStatus, setDataStatus] = useState('Loading...')

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/common/view-bookings-by-package/${packageId}`)
            setBookings(response.data.bookings)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching bookings')
        }
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
                    <table className={`tableDefault table table-bordered table-hover`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Package</th>
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
                                    onClick={() => navigate(`/vendor/view-booking-details/${booking._id}`)}
                                >
                                    <td>{index + 1}</td>
                                    <td>{booking.packageDetails[0].title}</td>
                                    <td>{booking.userDetails[0].email}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td className={`
                                            fw-bold ${booking.status === 'pending'
                                            ? 'text-primary'
                                            : booking.status === 'approved'
                                                ? 'text-success'
                                                : booking.status === 'inactive'
                                                    ? 'text-secondary'
                                                    : booking.status === 'active'
                                                        ? 'text-info'
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
