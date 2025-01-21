import React, { useEffect } from 'react'
import Logo from '../Logo/Logo'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, checkAuthStatus } from '../../../redux/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch()
    const { loggedIn, userRole, user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const handleLogout = () => {
        const confirm = window.confirm('Logout?');
        if (!confirm) return

        dispatch(logout());
        localStorage.removeItem('token');

        if (!userRole || userRole === "user") {
            navigate('/');
        } else {
            navigate(`/${userRole}/auth/login`)
        }
    };

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch])

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
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                        style={{ color: 'var(--primary-color)', fontSize: '25px' }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-md-0 text-end me-md-0 me-4 ms-md-auto">

                            {loggedIn && userRole === 'admin' &&
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${styles.navLink}`}
                                            aria-current="page"
                                            to='/admin/home'
                                        >Home</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Vendors
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to='/admin/active-vendors' >Active</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/disabled-vendors' >Disabled</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Applications
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to='/admin/approved-vendor-applications' >Approved</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/rejected-vendor-applications' >Rejected</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/pending-vendor-applications' >Pending</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/activated-vendor-applications' >Activated</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Packages
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to='/admin/approved-packages' >Approved</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/rejected-packages' >Rejected</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/pending-packages' >Pending</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/active-packages' >Active</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/admin/users">Users</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/admin/payments">Payments</Link>
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
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to='/#topPackages' >Top packages</Link></li>
                                        <li><Link className="dropdown-item" to='' >Adventure</Link></li>
                                        <li><Link className="dropdown-item" to='' >Honeymoon</Link></li>
                                        <li><Link className="dropdown-item" to='' >Holiday</Link></li>
                                    </ul>
                                </li>

                                {loggedIn && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/inbox">Inbox</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Account
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to='/profile' >Profile</Link></li>
                                            <li><Link className="dropdown-item" to='/my-bookings' >My Bookings</Link></li>
                                            {!user.isAppliedForVendor && <li><Link className="dropdown-item" to='/vendor-application' >Register as Vendor</Link></li>}
                                        </ul>
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
                                            className={`nav-link ${styles.navLink}`}
                                        ><i className="fa-solid fa-bell"></i></Link>
                                    </li>
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
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to='/vendor/active-packages' >Active</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/inactive-packages' >Inactive</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/approved-packages' >Approved</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/rejected-packages' >Rejected</Link></li>
                                            <li><Link className="dropdown-item" to='/vendor/pending-packages' >Pending</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link
                                            className={`nav-link ${styles.navLink}`}
                                            to='/vendor/profile'
                                        >Account</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Bookings
                                        </Link>
                                        <ul className="dropdown-menu">
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
                                            className='dropdown-item'
                                        >Payments</Link> </li>
                                        </ul>
                                    </li>
                                </>
                            }

                            <li className="nav-item ms-md-2">
                                {loggedIn ?
                                    <button className='primary-btn' onClick={handleLogout}>Logout</button>
                                    :
                                    <button
                                        className='primary-btn'
                                        onClick={() => navigate('/auth/login')}
                                    >Login</button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
