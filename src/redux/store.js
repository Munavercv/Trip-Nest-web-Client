import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vendorApplicationReducer from './slices/vendorApplictionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        vendorApplication: vendorApplicationReducer,
    }
});


export default store;