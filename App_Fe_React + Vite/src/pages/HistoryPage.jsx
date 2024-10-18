import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from "@mui/material";
import TransactionList from '../component/HistoryList.jsx';
import dayjs from 'dayjs';
import Navbar from '../component/Navbar.jsx'

const HistoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const qrCode = localStorage.getItem('scannedQrCode');
                if (!qrCode) {
                    setError('QR Code not found. Please login using QR code.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8081/api/v1/transactions/${qrCode}`);
                const data = response.data.data;
                setTransactions(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch transaction history.');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const groupedTransactions = transactions.reduce((acc, transaction) => {
        const date = dayjs(transaction.date).format("YYYY-MM-DD");
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});

    return (
        <>
            <Navbar />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding="20px"
                bgcolor="#f4f6f8"
                minHeight="100vh"
                sx={{mt:13}}
            >
                <Typography variant="h4" gutterBottom>
                    Transaction History
                </Typography>

                {/* Loop untuk setiap tanggal transaksi */}
                {Object.keys(groupedTransactions).map((date) => (
                    <TransactionList key={date} date={date} transactions={groupedTransactions[date]} />
                ))}
            </Box>
        </>
    );
};

export default HistoryPage;
