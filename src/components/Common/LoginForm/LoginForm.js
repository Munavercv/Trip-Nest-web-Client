import React, { useEffect, useState } from 'react'
import styles from './LoginForm.module.css'
import Logo from '../Logo/Logo'
import axios from 'axios'
import config from '../../../config/api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/slices/authSlice'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

const LoginForm = ({ title, role }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Email and Password are required');
      return;
    }
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/auth/login`, { email: formData.email, password: formData.password, userRole: role });

      const { token } = response.data;
      dispatch(loginSuccess({ token }));
      setLoading(false)

      const redirectPath = location.state?.from?.pathname || location.state?.from || '/';
      navigate(redirectPath, { replace: true });

    } catch (error) {
      setError(error.response?.data?.message || "Incorrect email or password");
      setLoading(false)
    }


  }

  const handleGoogleLogin = async () => {
    setError('')
    try {
      window.location.href = `${config.API_BASE_URL}/api/auth/google-auth`;

    } catch (error) {
      setError('failed to login with google')
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      dispatch(loginSuccess({ token }));
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <section className={`${styles.loginSec} container-fluid px-md-5 px-2 py-3`}>

      <div className='row'>
        <Link to='/' className='col text-start logo-link'>
          <Logo />
        </Link>
        {role !== 'admin' ?
          <div className="col text-end mt-2">
            {role === 'user' ?
              <button
                onClick={() => navigate('/vendor/auth/login')}
                className='outline-btn'
              >
                Login as vendor
              </button>
              :
              <button
                className='outline-btn'
                onClick={() => navigate('/auth/login')}
              >
                Login as user
              </button>
            }
          </div> : null}
      </div>

      <div className={`${styles.formSignin} w-100 m-auto shadow mt-5`} >
        <h1 className={`${styles.title} h3 fw-medium text-center`}>{title}</h1>
        <hr className='border-2 mt-0' />

        <form onSubmit={handleSubmit}>
          <div className="mb-2 text-start">
            <label htmlFor="email" className="ms-2">Email address</label>
            <input type="email"
              name='email'
              className="form-input"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="text-start" style={{ position: 'relative' }}>
            <label htmlFor="password" className="ms-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              name='password'
              id="password"
              value={formData.password}
              onChange={handleChange}
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='text-secondary'
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </button>
          </div>

          <p className='text-danger mb-2 text-center' style={{ fontSize: '15px' }}> {error}</p>

          <div className="text-center">

            <button
              className='primary-btn w-100'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Login'
              )}
            </button>

          </div>
        </form>

        {role === 'user' ?
          <>
            <hr className='my-2 border-2' />

            <div>
              <button
                className='w-100 outline-btn'
                type='button'
                onClick={handleGoogleLogin}
              >
                Continue with google <i className="fab fa-google me-2"></i>
              </button>

            </div>
          </>
          :
          null
        }

        {role !== 'admin' ?
          <p
            className='text-center fw-medium mt-3 mb-0'
            style={{ fontSize: '15px', color: 'var(--text-grey)' }}
          >Don't have an account?
            <Link
              to='/auth/signup'
              style={{ color: 'var(--primary-color)' }}
            > Create account</Link>
          </p> : null
        }
        <p className='text-center text-secondary m-0'>or</p>
        <p
          className='text-center fw-medium'
          style={{ fontSize: '15px' }}
        >
          <Link
            to='/'
            style={{ color: 'var(--primary-color)' }}
          > Continue without login <i className="fa-solid fa-caret-right"></i></Link>
        </p>
      </div>

    </section>
  )
}

export default LoginForm
