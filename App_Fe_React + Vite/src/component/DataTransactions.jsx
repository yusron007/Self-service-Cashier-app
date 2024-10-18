import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box,
    TextField
} from '@mui/material';
import axios from 'axios';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/transactions')
            .then((response) => {
                setTransactions(response.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.customer.name.toLowerCase().includes(searchQuery)
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ mt: 6, mx: 'auto', maxWidth: '95%' }}>
            {/* Search Field */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                <TextField
                    label="Search by Customer Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: '300px' }}
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </Box>

            {/* Transaction Table */}
            <TableContainer component={Paper} elevation={3} sx={{ width: '110%', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.customer.name}</TableCell>
                                <TableCell>{transaction.product.productName}</TableCell>
                                <TableCell>Rp {transaction.price.toLocaleString('id-ID')}</TableCell>
                                <TableCell>{transaction.quantity}</TableCell>
                                <TableCell>Rp {transaction.totalPrice.toLocaleString('id-ID')}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleString('id-ID')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TransactionTable;
