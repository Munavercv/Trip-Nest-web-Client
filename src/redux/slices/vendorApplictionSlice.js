import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isApplied: false
}

const vendorApplicationSlice = createSlice({
    name: 'vendorApplication',
    initialState,
    reducers: {
        setTrue: (state) => {
            state.isApplied = true
        }
    }
})

export const { setTrue } = vendorApplicationSlice.actions;
export default vendorApplicationSlice.reducer;