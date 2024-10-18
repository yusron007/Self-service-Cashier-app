import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const QrScannerContainer = () => {
    const [scanning, setScanning] = useState(true);
    const navigate = useNavigate();

    const handleScan = (qrCode) => {
        if (scanning && qrCode) {
            setScanning(false);

            axios
                .get(`http://localhost:8081/api/v1/customer`)
                .then((response) => {
                    const customerDataArray = response.data.data;
                    const customerData = customerDataArray.find((customer) => customer.qrCode === qrCode);

                    if (customerData) {
                        const userName = customerData.name;

                        localStorage.setItem('scannedUserName', userName);
                        localStorage.setItem('scannedQrCode', qrCode)

                        Swal.fire({
                            title: 'QR Code Scanned!',
                            text: `Welcome, ${userName}!`,
                            icon: 'success',
                            confirmButtonText: 'Proceed to Shop'
                        }).then(() => {
                            navigate('/shopping-page');
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'QR Code not found. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Retry'
                        }).then(() => {
                            setScanning(true);
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to fetch customer data. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Retry'
                    }).then(() => {
                        setScanning(true);
                    });
                });
        }
    };

    const handleError = (err) => {
        console.error(err);
        Swal.fire({
            title: 'Error',
            text: 'Failed to scan QR Code. Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry'
        }).then(() => {
            setScanning(true);
        });
    };

    return (
        <div>
            <Scanner
                onScan={(result) => handleScan(result[0].rawValue)}
                onError={handleError}
            />
        </div>
    );
};

export default QrScannerContainer;
