import React, { useEffect, useState } from 'react'
import styles from './Popups.module.css'
import config from '../../../config/api'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PaymentDetailsPopup = ({ close }) => {
    const { selectedOrderId } = useSelector(state => state.payment)
    const { userRole } = useSelector(state => state.auth)

    const [dataStatus, setDataStatus] = useState('Please Wait...')
    const [paymentDetails, setPaymentDetails] = useState()
    useEffect(() => {
        if (!selectedOrderId) {
            setDataStatus('Error getting payment details')
            return
        }
        const fetchPaymentDetails = async () => {
            try {
                const { data } = await axios.get(`${config.API_BASE_URL}/api/common/get-payment-details/${selectedOrderId}`)
                setPaymentDetails(data.paymentDetails)
            } catch (error) {
                setDataStatus(error.response?.data?.message || "Error fetching payment details")
            }
        }

        fetchPaymentDetails()
    }, [selectedOrderId])

    return (
        <div>
            <div className={`${styles.popupOverlay}`}>
                <div className={`${styles.popupContent}`}>
                    <button className={`${styles.closeButton} mb-2`} onClick={close}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                    {paymentDetails ?
                        <>
                            <h2 className='section-title text-center border-bottom border-2 my-3'>Payment Details</h2>
                            <ul className='container bg-body-secondary py-2 rounded-3'>
                                <li><span className='fw-semibold me-2'>Order id : </span>{paymentDetails.orderId}</li>
                                <li><span className='fw-semibold me-2'>Amount : </span>Rs.{paymentDetails.amount}</li>
                                <li><span className='fw-semibold me-2'>Package : </span>{paymentDetails.bookingId.packageId.title}</li>
                                {userRole === 'user' ?
                                    <li><span className='fw-semibold me-2'>To : </span>{paymentDetails.vendorId.contact.email}</li> :
                                    <li><span className='fw-semibold me-2'>From : </span>{paymentDetails.userId.email}</li>
                                }
                                <li><span className='fw-semibold me-2'>Date : </span>{new Date(paymentDetails.date).toLocaleDateString()}</li>
                                <li><span className='fw-semibold me-2'>Status : </span>{paymentDetails.status}</li>
                            </ul>
                        </>
                        :
                        <h2 className='section-title text-center'>{dataStatus}</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailsPopup
