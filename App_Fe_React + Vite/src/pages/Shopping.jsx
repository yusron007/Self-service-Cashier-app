import { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import Navbar from '../component/Navbar.jsx';
import QrScannerContainer from '../component/QrScanner.jsx';

const ShoppingLayout = () => {

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 12 }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom align="center">
                                    Scan QR Code
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                                    <QrScannerContainer />
                                </Box>
                                <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 2 }}>
                                    Silahkan Scan QR Code Anda Terlebih Dahulu Sebelum Melakukan Perbelanjaan.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ShoppingLayout;
