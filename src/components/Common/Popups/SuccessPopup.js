import React from 'react'
import styles from './Popups.module.css'

const SuccessPopup = ({ title, description, onClose }) => {
    return (
        <div>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <h4 className='fw-bold'>{title}</h4>
                    <p className='fw-semibold'>
                        {description}
                    </p>

                    <div>
                        <button
                            className='primary-btn me-2'
                            onClick={onClose}
                        >
                            Ok
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SuccessPopup
