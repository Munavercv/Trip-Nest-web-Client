import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './UserViewBookings.module.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserViewBookings = () => {
  const { user } = useSelector(state => state.auth)

  const [dataStatus, setDataStatus] = useState('Loading...')
  const [bookings, setBookings] = useState(null)

  const fetchBookings = async (userId) => {
    try {
      const response = await axios.get(`/api/common/get-bookings-by-user/${userId}`)
      setBookings(response.data.bookings)
    } catch (error) {
      setDataStatus(error.response?.data?.message || 'Error while fetching your bookings')
    }
  }

  useEffect(() => {
    fetchBookings(user.userId)
  },[user])

  return (
    <section className='container py-4'>
      <h3 className='section-title text-center mb-4'>Your bookings</h3>

      {bookings ?
        bookings.map((booking, index) => (
          <Link to={`/view-booking-details/${booking._id}`} key={index}>
            <div className={`${styles.bookingTile} row align-items-center px-sm-5 px-2 mb-3`}>
              <h6 className="text-start col-6 my-0 fw-bold">{booking.packageData[0].title}</h6>
              <p className={`text-end col-6 my-0 fw-semibold ${booking.status === 'pending'
                ? 'text-primary'
                : booking.status === 'approved'
                  ? 'text-success'
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
