import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Auth from './components/Auth';

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Auth />} />
                <Route path="/addProduct" element={<AddProduct />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
