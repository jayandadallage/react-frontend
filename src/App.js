import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                <Route path="/add-product" element={<ProtectedRoute element={AddProduct} />} />
            </Routes>
        </Router>
    );
};

export default App;
