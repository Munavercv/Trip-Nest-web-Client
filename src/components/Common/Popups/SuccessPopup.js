import React from 'react'
import styles from './Popups.module.css'

const SuccessPopup = ({ title, description, onAction }) => {
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
                            onClick={() => onAction(true)}
                        >
                            Ok
                        </button>

                        {/* Remove this button */}
                        <button
                            className='outline-btn'
                            onClick={() => onAction(false)}
                        >Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SuccessPopup
