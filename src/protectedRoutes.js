import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './redux/slices/authSlice';

const ProtectedRoutes = ({ children, requiredRole }) => {
    const { loggedIn, userRole, loading } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        const loginPath = requiredRole === 'user' ? '/auth/login' : `/${requiredRole}/auth/login`;
        return <Navigate to={loginPath} state={{ from: location }} replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/auth/login" replace />;
    }



    return children;
};

export default ProtectedRoutes;
