import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOrderId: null,
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        selectPayment: (state, action) => {
            state.selectedOrderId = action.payload.orderId
        },
        cleanPayment: (state) => {
            state.selectedOrderId = null
        }
    }
})

export const {selectPayment, cleanPayment} = paymentSlice.actions
export default paymentSlice.reducer