import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice'
import notificationReducer from './slices/notificationSlice'
import applicationCountsReducer from './slices/applicationCountsSlice'
import packageCountsReducer from './slices/packageCountsSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        notification: notificationReducer,
        applicationCounts: applicationCountsReducer,
        packageCounts: packageCountsReducer,
    }
});


export default store;