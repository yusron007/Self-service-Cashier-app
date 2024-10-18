import React, { useState, useEffect } from 'react';
import { AppBar, Box, Typography, Avatar, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const NavbarHome = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const nameFromScan = localStorage.getItem('scannedUserName');
        if (nameFromScan) {
            setUserName(nameFromScan);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUserName("");
        setAnchorEl(null);
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHistoryClick = () => {
        setAnchorEl(null);
        navigate("/history");
    };

    return (
        <AppBar style={{ background: "#3471eb", padding: "15px" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width={{ xs: "100%", md: "100%" }}
                marginX="auto"
            >
                {/* Logo and Toko CiYus title */}
                <Box display="flex" alignItems="center" gap={1} marginLeft={'1rem'}>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Toko Logo"
                        style={{ borderRadius: "50%" }}
                    />
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#fff",
                        }}>
                        TOKO CiYuS
                    </Typography>
                </Box>

                {/* Profile Icon and (conditionally) Username */}
                <Box display="flex" alignItems="center" gap={2} marginRight={'1rem'}>
                    {userName && (
                        <>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    fontWeight: "medium",
                                    color: "#fff",
                                }}>
                                {userName}
                            </Typography>

                            {/* Cart Icon Button */}
                            <IconButton
                                onClick={handleCartClick}
                                sx={{
                                    color: "#fff",
                                    ":hover": {
                                        color: "#ff6f61",
                                    },
                                }}
                            >
                                <Badge color="secondary" badgeContent={2}>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>

                            {/* Profile Avatar Button with Menu */}
                            <IconButton
                                onClick={handleMenuClick}
                                sx={{
                                    color: "#fff",
                                    ":hover": {
                                        color: "#ff6f61",
                                    },
                                }}
                            >
                                <AccountBoxIcon></AccountBoxIcon>
                            </IconButton>

                            {/* Menu yang muncul saat avatar diklik */}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleHistoryClick}>History</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Box>
        </AppBar>
    );
};

export default NavbarHome;
