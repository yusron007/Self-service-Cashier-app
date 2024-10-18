import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, CircularProgress } from '@mui/material';
import CartItem from '../component/CartItem';
import CartSummary from '../component/CartSummary';
import Navbar from '../component/Navbar';
import { gql, useQuery, useMutation } from '@apollo/client';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Swal from 'sweetalert2'; // Import SweetAlert2

const STORE_TRANSACTION = gql`
    mutation StoreTransaction($qrCode: String!, $rfId: String!, $price: Int!, $quantity: Int!) {
        storeTransaction(qrCode: $qrCode, rfId: $rfId, price: $price, quantity: $quantity)
    }
`;

const GET_TRANSACTIONS = gql`
    query GetTransactions($qrCode: String!) {
        getTransactions(qrCode: $qrCode) {
            qrCode
            rfId
            productName
            quantity
            price
        }
    }
`;

const CartPage = () => {
    const qrCode = localStorage.getItem('scannedQrCode');
    const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
        variables: { qrCode },
    });

    const [cartItems, setCartItems] = useState([]);
    const [storeTransaction] = useMutation(STORE_TRANSACTION);

    useEffect(() => {
        if (data && data.getTransactions) {
            const item = {
                ...data.getTransactions,
                quantity: data.getTransactions.quantity || 1,
            };
            setCartItems([item]);
        }
    }, [data]);

    const handleAdd = (rfId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.rfId === rfId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleRemove = (rfId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.rfId === rfId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleDelete = (rfId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.rfId !== rfId));
    };

    const handleCheckout = async () => {
        try {
            for (const item of cartItems) {
                await storeTransaction({
                    variables: {
                        qrCode,
                        rfId: item.rfId,
                        price: item.price,
                        quantity: item.quantity,
                    },
                });
            }
            await Swal.fire({
                icon: 'success',
                title: 'Checkout berhasil!',
                text: 'Transaksi Anda telah disimpan.',
                confirmButtonText: 'OK',
            });
            setCartItems([]);
        } catch (error) {
            console.error("Checkout error:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Checkout gagal',
                text: 'Silakan coba lagi.',
                confirmButtonText: 'OK',
            });
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (loading) {
        return (
            <>
                <Navbar />
                <Container sx={{ mt: 12, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                        Loading Product...
                    </Typography>
                </Container>
            </>
        );
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                        textAlign: 'center',
                    }}
                >
                    <ShoppingCartIcon sx={{ fontSize: 100, color: 'gray' }} />
                    <Typography variant="h4" color="textSecondary" sx={{ mt: 3 }}>
                        Keranjang Anda Kosong
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                        Silakan tambahkan beberapa produk ke keranjang Anda.
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px', mt: 12 }}>
                <Paper sx={{ width: '80%', padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Keranjang Belanjaan Anda
                    </Typography>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.rfId}
                            item={item}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                            onDelete={handleDelete}
                        />
                    ))}
                    <CartSummary totalPrice={totalPrice} onCheckout={handleCheckout} />
                </Paper>
            </Box>
        </>
    );
};

export default CartPage;
