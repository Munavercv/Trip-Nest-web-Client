import axios from 'axios'
import config from '../../../config/api'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCount } from '../../../redux/slices/notificationSlice'

const NotificationSidebar = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { notificationCount } = useSelector(state => state.notification)
    const dispatch = useDispatch()

    const [notifications, setNotifications] = useState(null)
    const [dataStatus, setDataStatus] = useState('Loading...')

    const handleNotificationMarkAsRead = async (id) => {
        setNotifications(notifications => notifications.filter(notification => notification._id !== id))
        await axios.put(`${config.API_BASE_URL}/api/common/mark-notification-as-read/${id}`)
        dispatch(setCount({ count: notificationCount - 1 }))
    }

    const handleClearNotifications = async () => {
        setNotifications(null)
        setDataStatus('No notifications')
        await axios.put(`${config.API_BASE_URL}/api/common/mark-notifications-as-read/${user.userId}`)
        dispatch(setCount({ count: 0 }))
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/common/get-notifications/${user.userId}`)
                setNotifications(response.data.notifications)
                setDataStatus('')
            } catch (error) {
                setDataStatus(error.response?.data?.message || 'Error getting notifications')
            }
        }
        if (user) {
            fetchNotifications()
        }
    }, [user])

    return (
        <div>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header border-bottom border-2">
                    <h5 className="offcanvas-title fw-bold" id="offcanvasExampleLabel">
                        <span className='text-secondary me-2'>{notifications && notifications.length}</span>
                        Notifications
                    </h5>
                    <button
                        type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
                    {notifications && <>
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className="list-group list-group-flush border-bottom border-2 scrollarea">
                                <div
                                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                                    data-bs-toggle={notification.navLink ? "offcanvas" : undefined}
                                    className="list-group-item list-group-item-action pt-3 lh-sm">
                                    <div className="cursor-pointer"
                                        onClick={() => {
                                            if (notification?.navLink) {
                                                handleNotificationMarkAsRead(notification._id)
                                                navigate(notification.navLink)
                                            }
                                        }}
                                    >
                                        <div className="mb-1 d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-1">{notification.title}</strong>
                                            <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                                        </div>
                                        <div className="col-10 mb-1 small">{notification.body}</div>
                                    </div>
                                    <div className="text-end mb-0"
                                    >
                                        <button
                                            className='btn btn-light btn-sm'
                                            onClick={() => handleNotificationMarkAsRead(notification._id)}
                                        >Mark as read
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                        <h6 className='text-center'>{dataStatus}</h6>
                    </>}
                </div>
                <button
                    onClick={handleClearNotifications}
                    className='outline-btn'
                >Clear all</button>
            </div>
        </div>
    )
}

export default NotificationSidebar
