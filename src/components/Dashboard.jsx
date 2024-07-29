import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddProduct from './AddProduct';

const DashboardContainer = styled.div`
    padding: 2rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const HeaderLeft = styled.div`
    display: flex;
    gap: 1rem;
`;

const HeaderRight = styled.div`
    margin-left: auto;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #2575fc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem; /* Smaller font size */
    &:hover {
        background-color: #1a5fc4;
    }
`;

const AddButton = styled(Button)`
    background-color: #4CAF50; /* Matte green */
    &:hover {
        background-color: #45a049; /* Darker matte green */
    }
`;

const EditButton = styled(Button)`
    background-color: #FF8C00; /* Matte orange */
    &:hover {
        background-color: #e07b00; /* Darker matte orange */
    }
`;

const DeleteButton = styled(Button)`
    background-color: #e74c3c; /* Matte red */
    &:hover {
        background-color: #c0392b; /* Darker matte red */
    }
`;

const ProductListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;
`;

const ProductCard = styled.div`
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 200px;
    text-align: center;
`;

const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 1rem;
`;

const ProductName = styled.h4`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
    margin: 0;
    margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
`;

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                // Convert response data to an array of products
                const productsData = Object.values(response.data); // Convert object to array
                setProducts(productsData);
            } catch (err) {
                console.error('Failed to fetch products', err);
                if (err.response?.status === 401) {
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
        }
    };

    const handleProductAdded = (newProduct) => {
        if (editingProduct) {
            setProducts(products.map(product => product.id === newProduct.id ? newProduct : product));
        } else {
            setProducts([...products, newProduct]);
        }
        setShowAddProduct(false);
        setEditingProduct(null);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowAddProduct(true);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Remove the product from the state
            setProducts(products.filter(product => product.id !== productId));
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    return (
        <DashboardContainer>
            <Header>
                <HeaderLeft>
                    <h2>Dashboard</h2>
                    <AddButton onClick={() => setShowAddProduct(!showAddProduct)}>
                        {showAddProduct ? 'Cancel' : 'Add Product'}
                    </AddButton>
                </HeaderLeft>
                <HeaderRight>
                    <Button onClick={handleLogout}>Logout</Button>
                </HeaderRight>
            </Header>
            {showAddProduct && <AddProduct onProductAdded={handleProductAdded} editingProduct={editingProduct} />}
            <ProductListContainer>
                <h3>Product List</h3>
                <ProductList>
                    {products.map(product => (
                        <ProductCard key={product.id}>
                            {product.image && <ProductImage src={`http://localhost:8000/storage/${product.image}`} alt={product.name} />}
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>Price: ${product.price}</ProductPrice>
                            <ProductDescription>{product.description}</ProductDescription>
                            <ButtonGroup>
                                <EditButton onClick={() => handleEditProduct(product)}>Edit</EditButton>
                                <DeleteButton onClick={() => handleDeleteProduct(product.id)}>Delete</DeleteButton>
                            </ButtonGroup>
                        </ProductCard>
                    ))}
                </ProductList>
            </ProductListContainer>
        </DashboardContainer>
    );
};

export default Dashboard;
