import { Box, Typography, Button } from '@mui/material';

const CartSummary = ({ totalPrice, onCheckout }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderTop: '1px solid #e0e0e0',
            marginTop: '20px'
        }}>
            <Typography variant="h6">Total Price: Rp {totalPrice.toLocaleString('id-ID')}</Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={onCheckout}
                disabled={totalPrice === 0}
            >
                Checkout
            </Button>
        </Box>
    );
};

export default CartSummary;
