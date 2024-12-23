import React from 'react'
import styles from './Buttons.module.css'

export const ButtonFull = ({ type, text, bsClasses, loading }) => {
    return (
        <button
            type={type}
            className={`${styles.ButtonFull} ${bsClasses}`}
            disabled={loading}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
                text
            )}
        </button>
    );
}

export const ButtonFullOutline = ({ type, text }) => {
    return (
        <button type={type} className={styles.ButtonFullOutline} > {text} </button>
    )
}