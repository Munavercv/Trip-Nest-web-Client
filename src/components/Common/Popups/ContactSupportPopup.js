import React from 'react'
import styles from './Popups.module.css'

const ContactSupportPopup = ({ onClose }) => {
    return (
        <div>
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <button className={`${styles.closeButton}`} onClick={onClose}>
                        <i className="fa-solid fa-x"></i>
                    </button>

                    <div className='mt-3'>
                        <h2 className='fw-bold mb-4'>Need Help ? <i className="fa-solid fa-headset"></i></h2>

                        <a
                            href="https://wa.me/919895799780?text=Hello,%20Support%20for%20Trip%20Nest"
                            target="_blank" rel="noopener noreferrer"
                            className='btn btn-success btn-lg mb-2 w-100'
                        >Whatsapp <i className="fa-brands fa-whatsapp"></i>
                        </a>
                        <a
                            href="mailto:munavermunu80@gmail.com?subject=Trip%20Nest%20Support%20Request"
                            className='btn btn-primary btn-lg w-100'
                        >Email Support <i className="fa-regular fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSupportPopup
