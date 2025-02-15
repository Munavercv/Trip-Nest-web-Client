import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './UserViewBookings.module.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import config from '../../../config/api'

const UserViewBookings = ({ showLess }) => {
  const { user } = useSelector(state => state.auth)

  const [dataStatus, setDataStatus] = useState('Loading...')
  const [bookings, setBookings] = useState(null)

  const fetchBookings = async (userId) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/common/get-bookings-by-user/${userId}`)
      setBookings(response.data.bookings)
    } catch (error) {
      setDataStatus(error.response?.data?.message || 'Error while fetching your bookings')
    }
  }

  useEffect(() => {
    fetchBookings(user.userId)
  }, [user])

  return (
    <section className='container pt-4'>
      <h3 className='section-title text-center mb-4'>My bookings</h3>

      {bookings ?
        bookings
          .sort((a, b) => {
            const statusOrder = { approved: 1, pending: 2, rejected: 3, expired: 4 };
            return (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);
          })
          .slice(0, showLess ? 5 : bookings.length)
          .map((booking, index) => (
            <Link to={`/view-booking-details/${booking._id}`} key={index}>
              <div className={`${styles.bookingTile} row align-items-center px-sm-5 px-2 mb-3`}>
                <h5 className="text-start col-md-4 my-0 fw-bold">{booking.packageData[0]?.title}</h5>
                <h6 className="text-start text-md-center col-md-4 col-6 mt-2">{new Date(booking.packageData[0]?.startDate).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}</h6>
                <p className={`text-end col-md-4 col-6 my-0 fw-semibold ${booking.status === 'pending'
                  ? 'text-primary'
                  : booking.status === 'approved'
                    ? 'text-success'
                    : booking.status === 'expired'
                      ? 'text-muted'
                      : 'text-danger'
                  }`}
                >{booking.status}</p>
              </div>
            </Link>
          ))
        : <h4 className='text-normal text-center'>{dataStatus}</h4>
      }
    </section>
  )
}

export default UserViewBookings
