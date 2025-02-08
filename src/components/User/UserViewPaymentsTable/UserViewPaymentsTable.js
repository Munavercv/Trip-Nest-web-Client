import React, { useEffect, useState } from 'react'
import config from '../../../config/api'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import PaymentDetailsPopup from '../../Common/Popups/PaymentDetailsPopup'
import { selectPayment } from '../../../redux/slices/paymentSlices'

const UserViewPaymentsTable = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [dataStatus, setDataStatus] = useState('Loading...')
    const [payments, setPayments] = useState(null)
    const [showPaymentDetails, setShowPaymentDetails] = useState(false)

    const handleShowPayDetails = (orderId) => {
        dispatch(selectPayment({ orderId }))
        setShowPaymentDetails(true)
    }

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const { data } = await axios.get(`${config.API_BASE_URL}/api/user/get-payments/${user.userId}`)
                setPayments(data.payments)
            } catch (error) {
                setDataStatus(error.response?.data?.message || 'Error fetching payments')
            }
        }

        fetchPaymentDetails()
    }, [user])

    return (
        <section className='container-fluid py-4'>
            <h4 className='section-title text-center mt-2'>Payments</h4>

            <div className='table-responsive mt-4 px-md-5'>
                {payments ?
                    <table className={`tableDefault table-hover table table-bordered`}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Order id</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleShowPayDetails(payment.orderId)}
                                >
                                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                                    <td>{payment.orderId}</td>
                                    <td>{payment.vendorId.contact.email}</td>
                                    <td>{payment.amount}</td>
                                    <td>
                                        <span className={`badge text-dark rounded-pill ${payment.status === 'paid' ? 'bg-approved' :
                                            payment.status === 'created' ? 'bg-primary' : 'bg-rejected'
                                            }`}
                                        >{payment.status}  </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :
                    <p className='text-center fs-5'>{dataStatus}</p>
                }
            </div>

            {showPaymentDetails &&
                <PaymentDetailsPopup close={() => setShowPaymentDetails(false)} />
            }

        </section >
    )
}

export default UserViewPaymentsTable
