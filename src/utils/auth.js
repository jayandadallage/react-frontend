// src/utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
};
