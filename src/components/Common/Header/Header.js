import React, { useEffect } from 'react'
import Logo from '../Logo/Logo'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, checkAuthStatus } from '../../../redux/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch()
    const { loggedIn, userRole } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');

        if (userRole === "user") {
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
            <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                <div className="container-fluid px-md-5">
                    <Link className="navbar-brand" to="/admin/home">
                        <Logo />
                    </Link>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                        style={{ color: 'var(--primary-color)', fontSize: '25px' }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} aria-current="page" to="/admin/home">Home</Link>
                            </li>
                            {loggedIn &&
                                <>

                                    <li className="nav-item dropdown">
                                        <Link className={`nav-link dropdown-toggle ${styles.navLink}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Vendors
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to='/admin/active-vendors' >Active</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/pending-vendors' >Pending</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/rejected-vendors' >Rejected</Link></li>
                                            <li><Link className="dropdown-item" to='/admin/disabled-vendors' >Disabled</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/admin/users">Users</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/admin/payments">Payments</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className='primary-btn' onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
