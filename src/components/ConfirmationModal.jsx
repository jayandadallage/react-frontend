// ConfirmationModal.js
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    width: 300px;
    text-align: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
`;

const ConfirmButton = styled(Button)`
    background-color: #4CAF50; /* Green */
    color: white;
    &:hover {
        background-color: #45a049;
    }
`;

const CancelButton = styled(Button)`
    background-color: #e74c3c; /* Red */
    color: white;
    &:hover {
        background-color: #c0392b;
    }
`;

const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
    <ModalOverlay>
        <ModalContent>
            <p>{message}</p>
            <ButtonGroup>
                <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
            </ButtonGroup>
        </ModalContent>
    </ModalOverlay>
);

export default ConfirmationModal;
