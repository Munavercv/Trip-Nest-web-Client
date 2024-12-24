import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    userRole: null,
    loggedIn: false,
}

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};

const isTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = decodeToken(action.payload.token);
            state.userRole = decodeToken.role;
            console.log(decodeToken)
            state.loggedIn = true;
            localStorage.setItem('token', action.payload.token);
        },
        checkAuthStatus: (state) => {
            const token = state.token || localStorage.getItem('token');
            if (token && !isTokenExpired(token)) {
                const decodedToken = decodeToken(token);
                state.loggedIn = true;
                state.user = decodedToken;
                state.userRole = decodedToken.role;
            } else {
                state.loggedIn = false;
                state.token = null;
                state.user = null;
                state.userRole = null;
                localStorage.removeItem('token');
            }

        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.userRole = null;
            state.loggedIn = false;
            localStorage.removeItem('token');
        },
    }
})


export const { loginSuccess, checkAuthStatus, logout } = authSlice.actions;

export default authSlice.reducer;