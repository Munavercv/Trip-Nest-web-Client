import React, { useState } from 'react'
import styles from './Popups.module.css'

const InputPopup = ({ title, description, allowText, denyText, onAction, isLoading, inputPlaceholder }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('')

    return (
        <div>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <h4 className="fw-bold">{title}</h4>
                    <p className="fw-semibold">
                        {description}
                    </p>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-input"
                            placeholder={inputPlaceholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <button
                            className="primary-btn me-2"
                            onClick={() => {
                                if(!inputValue) {
                                    setError('Input is required')
                                    return;
                                }
                                onAction(true, inputValue)}}
                            disabled={isLoading}
                            type='submit'
                        >
                            {isLoading ? 'Processing...' : allowText}
                        </button>
                        <button
                            className="outline-btn"
                            onClick={() => onAction(false)}
                            disabled={isLoading}
                        >
                            {denyText}
                        </button>
                    </div>

                    {error && <p className="text-danger mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );

}

export default InputPopup
