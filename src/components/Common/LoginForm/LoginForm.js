import React, { useState } from 'react'
import styles from './LoginForm.module.css'
import Logo from '../Logo/Logo'
import axios from 'axios'
import { ButtonFull, ButtonFullOutline } from '../Buttons/ButtonFull'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/slices/authSlice'
import { useNavigate } from 'react-router'
import { ButtonNormalOutline } from '../Buttons/ButtonNormal'
import { Link } from 'react-router-dom';

const LoginForm = ({ title, role }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
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
      const response = await axios.post('/api/auth/login', { email: formData.email, password: formData.password, userRole: role });

      const { token } = response.data;
      dispatch(loginSuccess({ token }));

      if(role === 'user') navigate('/');
      if(role === 'vendor') navigate('/vendor/home');
      if(role === 'admin') navigate('/admin/home');

    } catch (error) {
      console.error(error)
      setError(error.response?.data?.message || "Invalid email or password");
      setLoading(false)
    }

  }

  return (
    <section className={`${styles.loginSec} container-fluid px-md-5 px-2 py-3`}>

      <div className='row'>
        <div className='col text-start'>
          <Logo />
        </div>
        {role !== 'admin' ?
          <div className="col text-end mt-2">
            {role === 'user' ?
              <ButtonNormalOutline
                type='button'
                text='Login as vendor'
                bsClasses=''
                onClick={() => navigate('/vendor/auth/login')}
              />
              :
              <ButtonNormalOutline
                type='button'
                text='Login as user'
                bsClasses=''
                onClick={() => navigate('/auth/login')}
              />
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

          <div className="text-start">
            <label htmlFor="password" className="ms-2">Password</label>
            <input type="password"
              className="form-input"
              name='password'
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <p className='text-danger mb-2' style={{ fontSize: '15px' }}> {error}</p>

          <div className="text-center">
            <ButtonFull type='submit' text='Login' loading={loading} />
          </div>
        </form>

        {role !== 'admin' ? <>
          <hr className='my-2 border-2' />

          <div className='mb-3'>
            <ButtonFullOutline type='button' text={<>
              <i className="fab fa-google me-2"></i>
              Continue with Google
            </>} />
          </div>

          <p
            className='text-center fw-medium'
            style={{ fontSize: '15px', color: 'var(--text-grey)' }}
          >Don't have an account?
            <Link
              to='/auth/signup'
              style={{ color: 'var(--primary-color)' }}
            > Create account</Link>
          </p>
        </> : null
        }
      </div>

    </section>
  )
}

export default LoginForm
