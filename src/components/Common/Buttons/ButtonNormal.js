import React from 'react'
import styles from './Buttons.module.css'

export const ButtonNormal = ({ type, text, bsClasses, onClick, loading }) => {
    return (
        <button type={type} className={`${styles.ButtonNormal} ${bsClasses}`} onClick={onClick} > {text} </button>
    )
}

export const ButtonNormalOutline = ({ type, text, bsClasses, onClick }) => {
    return (
        <button type={type} className={`${styles.ButtonNormalOutline} ${bsClasses}`} onClick={onClick} > {text} </button>
    )
}