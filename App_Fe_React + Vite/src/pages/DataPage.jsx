import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import CustomerTable from '../component/DataCustomer';
import ProductTable from '../component/DataProduct';
import TransactionTable from '../component/DataTransactions';
import { TabPanel, DataTabs } from '../component/TabPanel';
import Navbar from '../component/Navbar.jsx'

const DataLayout = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 12 }}>
                {/* Tab navigation */}
                <DataTabs value={tabValue} onChange={handleTabChange} />

                {/* Tab Panels */}
                <TabPanel value={tabValue} index={0}>
                    <CustomerTable />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <ProductTable />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <TransactionTable />
                </TabPanel>
            </Container>
        </>
    );
};

export default DataLayout;
