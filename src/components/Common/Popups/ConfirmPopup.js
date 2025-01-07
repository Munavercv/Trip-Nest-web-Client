import React from 'react'
import styles from './Popups.module.css'

const ConfirmPopup = ({ title, description, allowText, denyText, onAction, isLoading, error }) => {
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : allowText}
                        </button>
                        <button
                            className='outline-btn'
                            onClick={() => onAction(false)}
                            disabled={isLoading}
                        >
                            {denyText}
                        </button>
                    </div>
                    <p>{error}</p>

                </div>
            </div>
        </div>
    )
}

export default ConfirmPopup
