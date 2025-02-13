import React, { useEffect, useState } from 'react'
import Logo from '../Logo/Logo'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, checkAuthStatus } from '../../../redux/slices/authSlice';
import { setCount } from '../../../redux/slices/notificationSlice'
import axios from 'axios'
import config from '../../../config/api'
import ConfirmPopup from '../Popups/ConfirmPopup'
import SuccessPopup from '../Popups/SuccessPopup'
import ContactSupportPopup from '../Popups/ContactSupportPopup'

const Header = () => {
    const dispatch = useDispatch()
    const { loggedIn, userRole, user } = useSelector((state) => state.auth);
    const { notificationCount } = useSelector(state => state.notification)
    const [showLogoutPopup, setShowLogoutPopup] = useState(false)
    const [showLogoutSuccessPopup, setShowLogoutSuccessPopup] = useState(false)
    const navigate = useNavigate()
    const [showContactSupport, setShowContactSupport] = useState(false)


    const handleLogout = (confirmed) => {
        if (confirmed) {
            dispatch(logout());
            localStorage.removeItem('token');

            if (!userRole || userRole === "user") {
                navigate('/');
            } else {
                navigate(`/${userRole}/auth/login`)
            }
            setShowLogoutPopup(false)
            setShowLogoutSuccessPopup(true)
        } else {
            setShowLogoutPopup(false)
        }
    };

    const handleCloseLogoutSuccessPopup = () => {
        setShowLogoutSuccessPopup(false)
        if (!userRole || userRole === "user") {
            navigate('/');
        } else {
            navigate(`/${userRole}/auth/login`)
        }
    }

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch])

    useEffect(() => {
        const fetchNotificationCount = async () => {
            const response = await axios.get(`${config.API_BASE_URL}/api/common/get-notification-count/${user.userId}`)
            const count = response.data.count
            dispatch(setCount({ count }))

        }

        if (loggedIn && user) {
            fetchNotificationCount()
        }
    }, [user, dispatch, loggedIn])


    return (
        <header>
            <nav className="navbar navbar-expand-md bg-white shadow-sm">
                <div className="container-fluid px-md-5">
                    <Link className="navbar-brand" to={
                        userRole === 'user'
                            ? '/'
                            : userRole === 'admin'
                                ? '/admin/home'
                                : '/vendor'
                    } >
                        <Logo />
                    </Link>
                    <button
                        className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                        style={{ color: 'var(--primary-color)', fontSize: '25px' }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-md-0 text-end me-md-0 me-4 ms-md-auto">

                            {
                                loggedIn &&
                                <li>
                                    <button className={`nav-link position-relative ${styles.navLink} ${styles.notificationIcon}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                        <i className="fa-solid fa-bell"></i>
                                        <span className="position-absolute top-1 px-1 py-1 translate-middle badge rounded-pill bg-danger">
                                            {notificationCount && notificationCount}
                                        </span>
                                    </button>
                                </li>
                            }

                            {loggedIn && userRole === 'admin' &&
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${styles.navLink}`}
                                            aria-current="page"
                                            to='/admin/home'
                                        >Home</Link>
                                    </li>
                                </>
                            }


                            {userRole === 'user' && <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${styles.navLink}`}
                                        aria-current="page"
                                        to='/'
                                    >Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Packages
                                    </Link>
                                    <ul className="dropdown-menu text-end text-md-start">
                                        <li><Link className="dropdown-item" to='/#topPackages' >Top packages</Link></li>
                                        <li><Link className="dropdown-item" to='/packages-by-category' >Categories</Link></li>
                                        <li><Link className="dropdown-item" to='/find-packages' >Find packages</Link></li>
                                    </ul>
                                </li>

                                {loggedIn && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/inbox">Inbox</Link>
                                    </li>
                                </>
                                }
                            </>
                            }

                            {/* For VENDORS */}
                            {loggedIn && userRole === 'vendor' &&
                                <>
                                    <li>
                                        <Link
                                            to='/vendor/inbox'
                                            className={`nav-link ${styles.navLink}`}
                                        ><i className="fa-solid fa-message"></i></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${styles.navLink}`}
                                            aria-current="page"
                                            to='/vendor'
                                        >Home</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            packages
                                        </Link>
                                        <ul className="dropdown-menu text-end text-md-start">
                                            <li><Link className="dropdown-item" to='/vendor/active-packages' >Active</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/inactive-packages' >Inactive</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/approved-packages' >Approved</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/rejected-packages' >Rejected</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/pending-packages' >Pending</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/expired-packages' >Expired</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Bookings
                                        </Link>
                                        <ul className="dropdown-menu text-end text-md-start">
                                            <li><Link className="dropdown-item" to='/vendor/view-pending-bookings' >Pending Bookings</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/view-approved-bookings' >Approved Bookings</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/view-rejected-bookings' >Rejected Bookings</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Other
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link
                                                    to='/vendor/all-payments'
                                                    className='dropdown-item'
                                                >Payments</Link> </li>
                                            <li
                                                style={{ cursor: 'pointer' }}
                                                className='dropdown-item'
                                                onClick={() => setShowContactSupport(true)}
                                            >
                                                Contact support </li>
                                        </ul>
                                    </li>
                                </>
                            }

                            <li className="nav-item ms-md-2">
                                {loggedIn ? (
                                    userRole === 'admin' ? (
                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle fw-bold ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Admin <i className="fa-solid fa-user"></i>
                                            </Link>
                                            <ul className={`${styles.accountDropMenu} dropdown-menu text-end text-md-start`}>
                                                <li><Link className="dropdown-item" onClick={() => setShowLogoutPopup(true)} >Logout</Link></li>
                                            </ul>
                                        </li>
                                    ) : (userRole === 'vendor' ? (
                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle fw-bold ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user.name.split(" ")[0]} <i className="fa-solid fa-user"></i>
                                            </Link>
                                            <ul className={`${styles.accountDropMenu} dropdown-menu text-end text-md-start`}>
                                                <li><Link className="dropdown-item" to='/vendor/profile' >Profile</Link></li>
                                                <li><Link className="dropdown-item" onClick={() => setShowLogoutPopup(true)} >Logout</Link></li>
                                            </ul>
                                        </li>
                                    ) :
                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle fw-bold ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user.name.split(" ")[0]} <i className="fa-solid fa-user"></i>
                                            </Link>
                                            <ul className={`${styles.accountDropMenu} dropdown-menu text-end text-md-start`}>
                                                <li><Link className="dropdown-item" to='/profile' >Profile</Link></li>
                                                <li><Link className="dropdown-item" to='/my-bookings' >My Bookings</Link></li>
                                                <li><Link className="dropdown-item" to='/favorites' >Favourites</Link></li>
                                                {!user.isAppliedForVendor && <li><Link className="dropdown-item" to='/vendor-application' >Register as Vendor</Link></li>}
                                                <li><Link className="dropdown-item" onClick={() => setShowLogoutPopup(true)}>Logout</Link></li>
                                            </ul>
                                        </li>
                                    )
                                ) : (
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle fw-bold ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Account <i className="fa-solid fa-user"></i>
                                        </Link>
                                        <ul className={`${styles.accountDropMenu} dropdown-menu text-end text-md-start`}>
                                            <li><Link className="dropdown-item" to='/auth/login' >Login</Link></li>
                                            <li><Link className="dropdown-item" to='/auth/signup' >Signup</Link></li>
                                        </ul>
                                    </li>
                                )}
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>

            {
                showLogoutPopup &&
                <ConfirmPopup
                    title='Are sure want to Logout?'
                    allowText='Yes'
                    denyText='No'
                    onAction={handleLogout}
                />
            }

            {
                showLogoutSuccessPopup &&
                <SuccessPopup
                    title='Successfully logged out'
                    onClose={handleCloseLogoutSuccessPopup}
                />
            }

            {showContactSupport &&
                <ContactSupportPopup
                onClose={() => setShowContactSupport(false)}
                 />
            }

        </header>
    )
}

export default Header
