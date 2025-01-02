import { createSlice } from '@reduxjs/toolkit';
import { decodeToken, isTokenExpired } from '../../tokenUtils';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    userRole: 'user',
    loggedIn: false,
    loading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const decodedToken = decodeToken(action.payload.token);
            if (!decodedToken) return;

            state.token = action.payload.token;
            state.user = decodedToken;
            state.userRole = decodedToken.role;
            state.loggedIn = true;

            localStorage.setItem('token', action.payload.token);
        },
        updateJwt: (state, action) => {
            const decodedToken = decodeToken(action.payload.token);
            if (!decodedToken) return;

            state.token = action.payload.token;
            state.user = decodedToken;

            localStorage.setItem('token', action.payload.token);
        },
        checkAuthStatus: (state) => {
            state.loading = true;
            const token = state.token || localStorage.getItem('token');
            if (token && !isTokenExpired(token)) {
                const decodedToken = decodeToken(token);
                if (!decodedToken) {
                    console.log("Failed to decode token.");
                    return;
                }

                state.loggedIn = true;
                state.user = decodedToken;
                state.userRole = decodedToken.role;
            } else {
                state.loggedIn = false;
                state.token = null;
                state.user = null;
                state.userRole = 'user';
                localStorage.removeItem('token');
            }
            state.loading = false;
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.userRole = 'user';
            state.loggedIn = false;

            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, updateJwt, checkAuthStatus, logout } = authSlice.actions;
export default authSlice.reducer;
