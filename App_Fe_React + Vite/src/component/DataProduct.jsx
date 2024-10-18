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
    Box, TextField
} from '@mui/material';
import axios from 'axios';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/product')
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery)
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
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default ProductTable;
