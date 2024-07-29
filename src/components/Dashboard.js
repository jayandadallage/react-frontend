import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct'; // Ensure this component exists

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (err) {
                console.error('Failed to fetch products', err);
                // Handle unauthenticated case
                if (err.response.status === 401) {
                    navigate('/'); // Redirect to login if unauthorized
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token'); // Remove token from local storage
            navigate('/'); // Redirect to login page
        } catch (err) {
            console.error('Logout failed', err);
            // Handle logout errors
        }
    };

    const handleProductAdded = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowAddProduct(false);
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setShowAddProduct(!showAddProduct)}>
                {showAddProduct ? 'Cancel' : 'Add Product'}
            </button>
            {showAddProduct && <AddProduct onProductAdded={handleProductAdded} />}
            <h3>Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h4>{product.name}</h4>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                        {product.image && <img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} style={{ width: '100px' }} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
