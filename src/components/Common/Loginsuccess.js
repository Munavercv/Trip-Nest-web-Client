import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
    const { user, userRole } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.log('No user found, redirecting to login.');
            navigate('/auth/login');
        } else {
            console.log('User role:', userRole);
        }
    }, [user, userRole, navigate]);

    if (!user) {
        return (
            <div>
                <h1>User not found. Redirecting...</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome, {userRole}!</h1>
        </div>
    );
};

export default LoginSuccess;
