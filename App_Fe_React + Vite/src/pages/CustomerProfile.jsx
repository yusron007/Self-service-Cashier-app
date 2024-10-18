// src/pages/CustomerProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import CustomerProfileTable from '../component/CustomerProfileTable';
import Navbar from '../component/Navbar.jsx';
import axios from 'axios';

const CustomerProfilePage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/customer');
                setCustomers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return (
        <>
            <Navbar />
            <Container sx={{ mt: 12, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    Loading customers...
                </Typography>
            </Container>
        </>
        );
    }

    if (error) {
        return (
        <>
            <Navbar />
            <Container sx={{ mt: 12, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    Error fetching data: {error}
                </Typography>
            </Container>
        </>
        );
    }

    return (
    <>
        <Navbar />
        <Container sx={{ mt: 12 }}>
            <Typography variant="h4" gutterBottom align="center">
                Customer Profile List
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
                Di bawah ini adalah daftar customer dengan QR Code, Nama, dan Wallet details.
            </Typography>
            <CustomerProfileTable customers={customers} />
        </Container>
    </>
    );
};

export default CustomerProfilePage;
