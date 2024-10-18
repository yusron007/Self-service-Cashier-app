import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField, Box } from '@mui/material';
import axios from 'axios';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/customer')
            .then((response) => {
                setCustomers(response.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery)
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ mt: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb : 1 }}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: '300px' }}
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </Box>
            <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>QR Code</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Wallet</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomers.map((customer, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{customer.qrCode}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>Rp {customer.wallet.toLocaleString('id-ID')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    );
};

export default CustomerTable;
