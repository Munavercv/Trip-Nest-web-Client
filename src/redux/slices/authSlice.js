import { createSlice } from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    userRole: null,
}

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = decodeToken(action.payload.token);
            state.userRole = action.payload.role;
            localStorage.setItem('token', action.payload.token);
        },
    }
})


export const { loginSuccess, setUserFromToken } = authSlice.actions;

export default authSlice.reducer;