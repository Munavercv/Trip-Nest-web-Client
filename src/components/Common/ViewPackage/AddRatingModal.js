import React, { useState } from 'react'
import styles from './AddRatingModal.module.css'

const AddRatingModal = ({ close, onRate, isLoading, error }) => {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const handleSubmit = () => {
        onRate(rating)
    }

    return (
        <div>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <button className={`${styles.closeButton} mb-2`} onClick={close}>
                        <i className="fa-solid fa-x"></i>
                    </button>

                    <h4 className='fw-bold mb-2'>Rate package</h4>
                    <div className='d-flex justify-content-center gap-2 my-4'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className={`fs-3 cursor-pointer fa-star ${(tempRating || rating) >= star ? 'fa-solid text-warning' : 'fa-regular'}`}
                                onMouseEnter={() => setTempRating(star)}
                                onMouseLeave={() => setTempRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <p className='text-danger'>{error}</p>
                    <button
                        disabled={rating === 0 || isLoading}
                        onClick={handleSubmit}
                        className="primary-btn"
                    >
                        {isLoading ? 'Please wait...' : 'Submit'}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AddRatingModal
