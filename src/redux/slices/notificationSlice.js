import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notificationCount: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.notificationCount = action.payload.count
        },
    }
})

export const { setCount } = notificationSlice.actions;
export default notificationSlice.reducer