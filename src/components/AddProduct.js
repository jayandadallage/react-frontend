import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();

        // File type validation
        if (image) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            if (!validTypes.includes(image.type)) {
                setError('Invalid image type. Only jpeg, png, jpg, gif are allowed.');
                return;
            }
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Set to multipart/form-data for file uploads
                }
            });
            onProductAdded(response.data);
            setName('');
            setPrice('');
            setDescription('');
            setImage(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <form onSubmit={handleAddProduct}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/jpeg, image/png, image/jpg, image/gif" // Optional: restrict file types
            />
            <button type="submit">Add Product</button>
            {error && <p>{error}</p>}
        </form>
    );
};


export default AddProduct;
