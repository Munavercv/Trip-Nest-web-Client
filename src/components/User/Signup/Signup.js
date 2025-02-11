import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Logo from '../../Common/Logo/Logo'
import { Link } from 'react-router-dom'
import styles from './Signup.module.css'
import axios from 'axios'
import config from '../../../config/api'
import SuccessPopup from '../../Common/Popups/SuccessPopup'

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPass) {
      newErrors.confirmPass = "Passwords do not match";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

    if (!validateForm()) {
      return
    }
    setLoading(true);

    try {
      await axios.post(`${config.API_BASE_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setError(error.response?.data?.message || "An error occured");
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    try {
      window.location.href = `${config.API_BASE_URL}/api/auth/google-auth`;

    } catch (error) {
      setError('failed to login with google');
    }
  }

  return (
    <section className={`${styles.signupSec} container-fluid px-md-5 px-2 py-3`}>
      <div className='row'>
        <div className='col text-start'>
          <Logo />
        </div>
        <div className="col text-end mt-2">
          <button
            className='outline-btn'
            onClick={() => navigate('/auth/login')}
          >
            Login
          </button>
        </div>
      </div>


      <div className={`${styles.formSignin} w-100 m-auto shadow mt-5`} >
        <h1 className={`${styles.title} h3 fw-medium text-center`}>Create Account</h1>
        <hr className='border-2 mt-0' />

        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="mb-2 text-start col-sm-6">
              <label htmlFor="name" className="ms-2">Name</label>
              <input type="text"
                name='name'
                className="form-input"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {validationErrors.name && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.name}</p>}
            </div>

            <div className="mb-2 text-start col-sm-6">
              <label htmlFor="password" className="ms-2">Password</label>
              <input type="password"
                name='password'
                className="form-input"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              {validationErrors.password && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.password}</p>}
            </div>
          </div>

          <div className="row">
            <div className="mb-2 text-start col-sm-6">
              <label htmlFor="email" className="ms-2">Email</label>
              <input type="email"
                name='email'
                className="form-input"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.email}</p>}
            </div>

            <div className="mb-2 text-start col-sm-6">
              <label htmlFor="confirmPass" className="ms-2">Confirm Password</label>
              <input type="password"
                name='confirmPass'
                className="form-input"
                id="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
              />
              {validationErrors.confirmPass && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.confirmPass}</p>}
            </div>
          </div>

          <div className="row">
            <div className="mb-2 text-start col-sm-6">
              <label htmlFor="phone" className="ms-2">Phone Number</label>
              <input type="number"
                name='phone'
                className="form-input"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {validationErrors.phone && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.phone}</p>}
            </div>
          </div>

          <p className='text-danger mb-2 text-center' style={{ fontSize: '15px' }}> {error}</p>

          <div className="text-center mt-3">
            {/* <ButtonFull type="submit" text="Signup" loading={loading} /> */}
            <button
              className='primary-btn w-100'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Signup'
              )}
            </button>
          </div>
        </form>

        <hr className='my-2 border-2' />

        <div className='mb-3'>
          <button
            className='w-100 outline-btn'
            type='button'
            onClick={handleGoogleLogin}
          >
            Continue with google <i className="fab fa-google me-2"></i>
          </button>
        </div>

        <p
          className='text-center fw-medium'
          style={{ fontSize: '15px', color: 'var(--text-grey)' }}
        > Already have an account?
          <Link
            to='/auth/login'
            style={{ color: 'var(--primary-color)' }}
          > Login as user</Link> or
          <Link
            to='/vendor/auth/login'
            style={{ color: 'var(--primary-color)' }}
          > Login as vendor</Link>
        </p>
      </div>

      {success &&
        <SuccessPopup
          title='Account Created successfully'
          description='Your account Created successfully. Login to continue'
          onClose={() => navigate('/auth/login')}
        />
      }

    </section>
  )
}

export default Signup
