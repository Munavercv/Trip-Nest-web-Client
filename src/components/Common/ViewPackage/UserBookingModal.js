import React, { useState } from 'react'
import styles from './ViewPackage.module.css'

const UserBookingModal = ({ isLoading, onAction, error, price }) => {
    const [totalAmount, setTotalAmount] = useState(0)
    const [inputValues, setInputValues] = useState({
        numberOfSeats: 0,
        specialRequests: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const updatedInputValues = { ...inputValues, [name]: value };
        setInputValues(updatedInputValues);

        const seats = updatedInputValues.numberOfSeats || 0;
        setTotalAmount(seats * price);
    }

    return (
        <div>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <h4 className="fw-bold">Book now</h4>
                    <p className="fw-semibold">
                    </p>

                    <div className="mb-3">
                        <input
                            type="number"
                            name='numberOfSeats'
                            className="form-input"
                            placeholder='Number of seats'
                            value={inputValues.numberOfSeats}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            type="text"
                            className="form-input"
                            name='specialRequests'
                            rows='5'
                            value={inputValues.specialRequests}
                            onChange={handleInputChange}
                            placeholder='Special requests'
                        />
                    </div>
                    <p className='text-start'>
                        Total Amount: Rs.{totalAmount.toFixed(2)}
                    </p>
                    {error && <p className="text-danger mt-2">{error}</p>}

                    <div>
                        <button
                            className="primary-btn me-2"
                            onClick={() => onAction(true, inputValues, totalAmount)}
                            disabled={isLoading}
                            type='submit'
                        >
                            {isLoading ? 'Processing...' : 'Book'}
                        </button>
                        <button
                            className="outline-btn"
                            onClick={() => onAction(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default UserBookingModal
