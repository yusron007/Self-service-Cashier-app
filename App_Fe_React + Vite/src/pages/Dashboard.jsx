import Navbar from '../component/Navbar.jsx';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import DataUsageIcon from '@mui/icons-material/DataUsage';

const dashboard = () => {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    mt: 20,
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        color: '#3471eb',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontSize: '4rem',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        mb: 3,
                    }}
                >
                    Toko CiYus
                </Typography>

                <Typography
                    variant="h6"
                    component="h1"
                    gutterBottom
                    sx={{
                        paddingBottom: '5vh',
                        color: '#3471eb',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        maxWidth: '80%',
                        mx: 'auto',
                        lineHeight: '1.5',
                    }}
                >
                    Selamat Datang di Toko CiYus <br />
                    Yang Menjual Berbagai Aneka Barang dan Sembako Sesuai Dengan Kebutuhan Anda
                </Typography>

                {/* Buttons Section */}
                <Grid container spacing={3} justifyContent="center">
                    {/* Button 1: Shopping Now */}
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => window.location.href = '/shopping'}
                            sx={{
                                backgroundColor: '#3471eb',
                                width: 200,
                                padding: '1rem',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#3471eb',
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <ShoppingCartIcon sx={{ mb: 1 }} />
                            Shopping Now
                        </Button>
                    </Grid>

                    {/* Button 2: Customer Profile */}
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => window.location.href = '/customer'}
                            sx={{
                                backgroundColor: '#3471eb',
                                width: 200,
                                padding: '1rem',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#3471eb',
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <PersonIcon sx={{ mb: 1 }} />
                            Customer Profile
                        </Button>
                    </Grid>

                    {/* Button 3: Data */}
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => window.location.href = '/data'}
                            sx={{
                                backgroundColor: '#3471eb',
                                width: 200,
                                padding: '1rem',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#3471eb',
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <DataUsageIcon sx={{ mb: 1 }} />
                            Data
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default dashboard;
