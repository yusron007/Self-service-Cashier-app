import React from 'react';
import { Box, Typography, Divider, Paper } from "@mui/material";
import TransactionItem from './HistoryItem.jsx';
import dayjs from 'dayjs';

const TransactionList = ({ date, transactions }) => {
    return (
        <Box width="100%" maxWidth="600px" marginBottom="30px">
            <Paper elevation={3} sx={{ padding: "20px", marginBottom: "15px" }}>
                <Typography variant="h6" color="secondary" gutterBottom>
                    {dayjs(date).format('MMMM D, YYYY')}
                </Typography>

                <Divider />

                {/* Loop untuk setiap transaksi di tanggal tersebut */}
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </Paper>
        </Box>
    );
};

export default TransactionList;
