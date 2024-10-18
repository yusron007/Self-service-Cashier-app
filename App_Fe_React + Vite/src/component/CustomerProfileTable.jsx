import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, IconButton, TextField, InputAdornment, Box } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
};

const CustomerProfileTable = ({ customers }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ mt: 6 }}>
            {/* Search Input */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    size="small"
                    sx={{ width: '300px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Table */}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>QR Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Wallet</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCustomers.map((customer, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <QRCodeCanvas value={customer.qrCode} size={64} includeMargin />
                                </TableCell>
                                <TableCell>
                                    <Avatar sx={{ bgcolor: '#1976d2', mr: 1 }}>{customer.name[0]}</Avatar>
                                    <Typography>{customer.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{formatCurrency(customer.wallet)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label="view details">
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CustomerProfileTable;
