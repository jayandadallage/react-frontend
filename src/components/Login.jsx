import React, { useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import '../css/login.css';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem;
    background-color: #2575fc;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #1a5fc4;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
`;

const Logo = styled.img`
    width: 100px;
    margin-bottom: 1rem;
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });
            const token = response.data.token;

            // Proceed with Firebase 2FA verification

            console.log('Logged in:', token);
        } catch (err) {
            setError(err.response.data.message || 'Login failed');
        }
    };

    return (
        <LoginContainer>
            <Logo src="/path/to/logo.png" alt="Logo" />
            <Form onSubmit={handleLogin}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button type="submit">Login</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
        </LoginContainer>
    );
};

export default Login;
