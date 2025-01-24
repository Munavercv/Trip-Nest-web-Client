import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice'
import notificationReducer from './slices/notificationSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        notification: notificationReducer,
    }
});


export default store;