import React, { useEffect, useState } from 'react'
import styles from './Popups.module.css'
import axios from 'axios'
import config from '../../../config/api'

const TermsAndConditionsPopup = ({ title, description, termsName, allowText, denyText, onAction, isLoading, error }) => {
    const [isAgreed, setIsAgreed] = useState(false)
    const [termsAndConditions, setTermsAndConditions] = useState(null)
    const [termsStatus, setTermsStatus] = ('Loading...')

    const getTermsAndConditions = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/vendor/get-terms-by-name/${termsName}`)
            setTermsAndConditions(data.data.content)
        } catch (error) {
            setTermsStatus('Error getting terms and conditions')
        }
    }

    useEffect(() => {
        getTermsAndConditions()
    }, [termsName])

    return (
        <div>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <h4 className='fw-bold'>{title}</h4>
                    <p className='fw-semibold'>
                        {description}
                    </p>

                    <div>

                        {(termsAndConditions && termsAndConditions.length !== 0) ? <ul
                            style={{ listStyle: 'disc' }}
                        >
                            {termsAndConditions.map((term, index) => (
                                <li key={index}>{term}</li>
                            ))}
                        </ul>
                            :
                            <p>{termsStatus}</p>
                        }

                        <div
                            className="form-check text-start mb-3"
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                onChange={() => setIsAgreed(!isAgreed)}
                            />
                            <label className="form-check-label text-dark fw-bold" for="flexCheckDefault">
                                I Agree terms & conditions
                            </label>
                        </div>

                        <button
                            className='primary-btn me-2'
                            onClick={() => onAction(true)}
                            disabled={isLoading || !isAgreed}
                        >
                            {isLoading ? 'Please Wait' : allowText}
                        </button>
                        <button
                            className='outline-btn'
                            onClick={() => onAction(false)}
                            disabled={isLoading}
                        >
                            {denyText}
                        </button>
                    </div>
                    <p className='text-danger'>{error}</p>

                </div>
            </div>
        </div>
    )
}

export default TermsAndConditionsPopup
