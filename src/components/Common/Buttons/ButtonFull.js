import React from 'react'
import styles from './Buttons.module.css'

export const ButtonFull = ({ type, text, bsClasses, loading, onClick }) => {
    return (
        <button
            type={type}
            className={`${styles.ButtonFull} ${bsClasses}`}
            disabled={loading}
            onClick={onClick}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
                text
            )}
        </button>
    );
}

export const ButtonFullOutline = ({ type, text, onClick }) => {
    return (
        <button onClick={onClick} type={type} className={styles.ButtonFullOutline} > {text} </button>
    )
}