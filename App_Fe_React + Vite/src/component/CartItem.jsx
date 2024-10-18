import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = ({ item, onAdd, onRemove, onDelete }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
            padding: '10px 0'
        }}>
            {/* Gambar Produk */}
            <Box component="img"
                 sx={{
                     width: 80,
                     height: 80,
                     objectFit: 'cover',
                     marginRight: 2,
                 }}
                 src="/makanan.jpg"
                 alt={item.productName}
            />

            {/* Nama Produk */}
            <Typography variant="h6" sx={{ flex: 1 }}>{item.productName}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Harga Produk */}
                <Typography variant="body1">Rp {item.price.toLocaleString('id-ID')}</Typography>

                {/* Tombol untuk menambah dan mengurangi kuantitas */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => onRemove(item.rfId)}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <IconButton onClick={() => onAdd(item.rfId)}>
                        <AddIcon />
                    </IconButton>
                </Box>

                {/* Total Harga */}
                <Typography variant="h6">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </Typography>

                {/* Tombol Delete */}
                <IconButton onClick={() => onDelete(item.rfId)} color="error">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CartItem;
