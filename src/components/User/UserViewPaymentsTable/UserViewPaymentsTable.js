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
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleShowPayDetails = (orderId) => {
        dispatch(selectPayment({ orderId }))
        setShowPaymentDetails(true)
    }

    const searchPayments = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/user/search-payments-by-date/${user.userId}`, {
                params: { startDate, endDate }
            })
            setDataStatus('')
            setPayments(data.payments)
        } catch (error) {
            setPayments(null)
            setDataStatus(error.response?.data?.message || 'Error fetching payments')
        } finally {
            setStartDate('')
            setEndDate('')
            setDropdownOpen(false)
        }
    }

    const fetchPaymentDetails = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/user/get-payments/${user.userId}`)
            setPayments(data.payments)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching payments')
        }
    }

    useEffect(() => {
        fetchPaymentDetails()
    }, [user])

    return (
        <section className='container-fluid py-4'>
            <h4 className='section-title text-center mt-2'>Payments</h4>

            <div className="d-md-none text-start">
                <button className="btn btn-outline-secondary btn-sm mb-1 ms-3 me-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <>Search <i class="fa-solid fa-magnifying-glass"></i></>
                </button>
                <button
                    className='btn btn-outline-secondary btn-sm mb-1'
                    onClick={fetchPaymentDetails}
                >
                    Clear search
                </button>
                {dropdownOpen && (
                    <div className="p-3 border rounded bg-light">
                        <label className="form-label mb-1">Start Date</label>
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label className="form-label mb-1">End Date</label>
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            disabled={!startDate || !endDate}
                            onClick={searchPayments}
                            className="btn btn-primary w-100"
                        >Search</button>
                    </div>
                )}
            </div>

            <div className="row justify-content-center align-items-end mb-3 d-none d-md-flex">
                <div className="col-md-4">
                    <label className="form-label mb-1">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label mb-1">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="col-md-auto">
                    <button
                        disabled={!startDate || !endDate}
                        onClick={searchPayments}
                        className="btn btn-primary me-2"
                    >Search</button>
                    <button
                        onClick={fetchPaymentDetails}
                        className="btn btn-outline-secondary">
                        Clear Search</button>
                </div>
            </div>

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
