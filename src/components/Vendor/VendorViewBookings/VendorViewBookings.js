import axios from 'axios'
import config from '../../../config/api'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const VendorViewBookings = ({ filter }) => {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [dataStatus, setDataStatus] = useState('Loading...')
    const [bookings, setBookings] = useState(null)

    const fetchBookings = async () => {
        try {
            
            const response = await axios.get(`${config.API_BASE_URL}/api/common/get-${filter}-bookings-by-vendor/${user.userId}`)
            setBookings(response.data.bookings)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching bookings')
        }
    }

    useEffect(() => {
        fetchBookings()
    },[user, filter])

    return (
        <section className='container-fluid py-4'>
            <h4 className='section-title text-center mt-2'>{filter} Bookings</h4>

            <div className='table-responsive mt-4 px-md-5'>
                {bookings ?
                    <table className={`tableDefault table table-bordered`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Package</th>
                                <th>user</th>
                                <th>Booking Date</th>
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

export default VendorViewBookings
