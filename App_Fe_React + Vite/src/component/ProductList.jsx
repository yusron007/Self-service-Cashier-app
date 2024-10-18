import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, CardMedia, Button, Typography, CircularProgress, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

// GraphQL mutation for adding product to cart
const ADD_TO_CART_MUTATION = gql`
    mutation AddToCart($qrCode: String!, $rfId: String!, $productName: String!, $quantity: Int!, $price: Int!) {
        checkinProduct(qrCode: $qrCode, rfId: $rfId, productName: $productName, quantity:$quantity, price: $price)
    }
`;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const customerQrCode = localStorage.getItem('scannedQrCode');

    const [addToCart] = useMutation(ADD_TO_CART_MUTATION);

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/product')
            .then(response => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, []);

    const handleAddToCart = async (product) => {
        try {
            const { data } = await addToCart({
                variables: {
                    qrCode: customerQrCode,
                    rfId: product.rfId,
                    productName: product.productName,
                    quantity: 1,
                    price: product.price,
                },
            });

            if (data && data.checkinProduct) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added to cart',
                    text: `${product.productName} has been added to your cart!`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Failed to add product to cart',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding to cart',
            });
        }
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h6" color="error" align="center">{error}</Typography>;
    }

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.rfId}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="/makanan.jpg"
                                alt={product.productName}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: Rp {product.price.toLocaleString('id-ID')}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', paddingBottom: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ShoppingCartIcon />}
                                    sx={{ backgroundColor: '#4CAF50', color: '#fff', '&:hover': { backgroundColor: '#388E3C' } }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;
