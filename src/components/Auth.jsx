import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import styled from 'styled-components';

const AuthContainer = styled.div`
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

const ToggleButton = styled(Button)`
    margin-top: 1rem;
    background-color: transparent;
    color: #2575fc;
    &:hover {
        color: #1a5fc4;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
`;

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect to Dashboard if user is authenticated
    if (isAuthenticated()) {
        navigate('/dashboard');
        return null;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store the token in localStorage
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
                phone_number: phoneNumber,
            });
            setIsLogin(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <Form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                    <>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                        <Input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                        />
                    </>
                )}
                {isLogin && (
                    <>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </>
                )}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
                </Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
            <ToggleButton onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </ToggleButton>
        </AuthContainer>
    );
};

export default Auth;
