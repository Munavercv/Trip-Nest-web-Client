import React, { useState } from 'react'
import styles from './VendorAccountActivation.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'
import SuccessPopup from '../../Common/Popups/SuccessPopup'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'

const VendorAccountActivation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { applicationId } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const validateForm = () => {
    if (password.length < 8) {
      setError('Password should contain atleast 8 characters')
      return false
    }
    if (confirmPass !== password) {
      setError('Passwords does not match')
      return false
    }
    return true
  }

  const handleActivate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (validateForm()) {
      try {
        await axios.put(`${config.API_BASE_URL}/api/auth/activate-vendor-account/${applicationId}`, { password })
        setShowSuccessPopup(true);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occured while activating account')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSuccessPopupAction = (confirmed) => {
    if (confirmed) {
      dispatch(logout())
      navigate('/vendor/auth/login')
    }
  }

  return (
    <section className={`${styles.applicationSec} container-fluid px-md-5 px-2 py-3`}>

      <h2 className='section-title text-center mt-3'>Activate account</h2>

      <div className={`${styles.formApplication} w-100 m-auto shadow mt-5`} >
        <h1 className={`${styles.title} fw-semibold text-center`}>Set Password</h1>
        <hr className='border-2 mt-0' />

        <form onSubmit={handleActivate}>

          <div className="text-start mb-2">
            <label htmlFor="password" className="ms-2">Password</label>
            <input type="password"
              className="form-input"
              name='password'
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-start mb-2">
            <label htmlFor="confirmPass" className="ms-2">Confirm Password</label>
            <input type="password"
              className="form-input"
              name='confirmPass'
              id="confirmPass"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <p className='text-danger text-center mb-2' style={{ fontSize: '15px' }}> {error}</p>

          <div className="text-center">

            <button
              className='primary-btn w-100'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Activate'
              )}
            </button>

          </div>
        </form>

      </div>

      {showSuccessPopup && <SuccessPopup
        title='Congratulations! Your vendor account has been created'
        description='You will be Logged out and redirected to Vendor Login page'
        onClose={handleSuccessPopupAction}
      />}

    </section>

  )
}

export default VendorAccountActivation
