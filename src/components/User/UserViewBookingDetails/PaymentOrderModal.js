import React, { useState } from 'react';
import styles from './UserViewBookingDetails.module.css';
import axios from 'axios';
import config from '../../../config/api';

const PaymentOrderModal = ({ amount, onClose, packageName, userId, bookingId, vendorId, onPaymentSuccess }) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const createRazorpayOrder = async () => {
        setLoading(true)
        setError('')
        try {
            const { data } = await axios.post(`${config.API_BASE_URL}/api/user/create-order`, {
                amount: amount * 100,
                currency: "INR",
                userId,
                bookingId,
                vendorId
            });

            handleRazorpayScreen(data.order_id, data.amount);
        } catch (error) {
            setError('Order creation error')
            setLoading(false)
        }
    };

    const handleRazorpayScreen = async (orderId, amount) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            const options = {
                key: 'rzp_test_9lrlVTSNPRhsQA',
                amount,
                currency: "INR",
                name: "Trip Nest",
                description: "Payment to Trip Nest",
                order_id: orderId,
                handler: async (response) => {
                    await axios.post(`${config.API_BASE_URL}/api/user/payment-success`,{
                        orderId,
                        paymentId: response.razorpay_payment_id,
                        bookingId,
                    })
                    onPaymentSuccess()
                },
                prefill: { name: "Trip Nest", email: "munavermunu80@gmail.com" },
                theme: { color: "#111" },
            };
            const rzp = new window.Razorpay(options);

            rzp.on('payment.failed',async () => {
                await axios.put(`${config.API_BASE_URL}/api/user/payment-failed`,{
                    orderId,
                })
            });
    
            rzp.open();
        };
        script.onerror = () => setError("Error loading Razorpay SDK");
        document.body.appendChild(script);
            setLoading(false)
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h4 className='fw-bold'>Confirm Payment</h4>
                <p className='fw-semibold mb-0 border-bottom'>Order details</p>
                <ul className="my-3">
                    <li className="border-0 my-0">Package: {packageName}</li>
                    <li className="border-0 my-0">Amount: Rs.{amount}</li>
                </ul>
                <div>
                    <button
                     onClick={createRazorpayOrder}
                      className='primary-btn me-2'
                      disabled={loading}
                      >
                        {loading? 'Please Wait' : `Pay ${amount} Rs.`}
                    </button>
                    <button
                     className='outline-btn'
                      onClick={onClose}
                      disabled={loading}
                     >
                        Cancel
                    </button>
                    <p className='text-danger'>{error}</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentOrderModal;