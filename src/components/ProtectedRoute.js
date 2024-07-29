import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ element: Element }) => {
    const location = useLocation();

    return isAuthenticated() ? (
        <Element />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
