import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const FormGroup = styled.div`
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const Textarea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: vertical;
`;

const Button = styled.button`
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    flex-basis: 100%; /* Make the button span the full width on smaller screens */
`;

const AddButton = styled(Button)`
    background-color: #4CAF50; /* Matte green */
    color: white;
    &:hover {
        background-color: #45a049; /* Darker matte green */
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    flex-basis: 100%; /* Make error message span the full width */
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 0.875rem;
    flex-basis: 100%; /* Make success message span the full width */
`;

const AddProduct = ({ onProductAdded, editingProduct }) => {
    const [name, setName] = useState(editingProduct?.name || '');
    const [price, setPrice] = useState(editingProduct?.price || '');
    const [description, setDescription] = useState(editingProduct?.description || '');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // File type validation
        if (image) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            if (!validTypes.includes(image.type)) {
                setError('Invalid image type. Only jpeg, png, jpg, gif are allowed.');
                setLoading(false);
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
            const response = editingProduct
                ? await axios.put(`http://localhost:8000/api/products/${editingProduct.id}`, formData, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                          'Content-Type': 'multipart/form-data',
                      }
                  })
                : await axios.post('http://localhost:8000/api/products', formData, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                          'Content-Type': 'multipart/form-data',
                      }
                  });

            onProductAdded(response.data);
            setName('');
            setPrice('');
            setDescription('');
            setImage(null);
            setSuccess('Product added successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleAddProduct}>
            <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
            <FormGroup>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/jpeg, image/png, image/jpg, image/gif"
                />
            </FormGroup>
            <AddButton type="submit" disabled={loading}>
                {loading ? 'Processing...' : editingProduct ? 'Update Product' : 'Add Product'}
            </AddButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </Form>
    );
};

export default AddProduct;
