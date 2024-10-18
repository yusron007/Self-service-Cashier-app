import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const DataTabs = ({ value, onChange }) => (
    <Tabs value={value} onChange={onChange} centered>
        <Tab label="Customer" icon={<PersonIcon />} />
        <Tab label="Product" icon={<ShoppingCartIcon />} />
        <Tab label="Transaction" icon={<ReceiptIcon />} />
    </Tabs>
);

export { TabPanel, DataTabs };
