import { Container, Typography } from '@mui/material';
import Navbar from '../component/Navbar';
import ProductList from '../component/ProductList';

const ShoppingPage = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 12 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Selamat Datang Di Toko Kami
                </Typography>
                <ProductList />
            </Container>
        </>
    );
};

export default ShoppingPage;
