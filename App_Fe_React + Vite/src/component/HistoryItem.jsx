import React from 'react';
import { ListItem, ListItemText } from "@mui/material";

const TransactionItem = ({ transaction }) => {
    return (
        <ListItem>
            <ListItemText
                primary={transaction.product.productName}
                secondary=
                    {`Price: Rp ${transaction.price.toLocaleString('id-ID')}, 
                    Quantity: Rp ${transaction.quantity}, 
                    Total Price: Rp ${transaction.totalPrice.toLocaleString('id-ID')}`}
            />
        </ListItem>
    );
};

export default TransactionItem;
