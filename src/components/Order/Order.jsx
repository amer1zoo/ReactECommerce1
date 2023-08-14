import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Address from './Address';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';

const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function Order({ qty }) {
    const history = useHistory();
    const [activeStep, setActiveStep] = React.useState(1);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [user, setUser] = useState('');
    const { productid } = useParams();

    const [messageError, setmessageError] = useState('Errors');

    const [openTrue, setOpenTrue] = useState(false);
    const [openFalse, setOpenFalse] = useState(false);

    const [product, setProduct] = useState({});
    const [address, setAddress] = useState({});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenTrue(false);
        setOpenFalse(false);
    };

    const handleNext = () => {
        if (selectedAddress.length === 0) {
            setmessageError('Please select address.');
            setOpenFalse(true);
            return;
        }
        if (activeStep === 2) {
            handleSubmitOrder();
            return;
        }

        fetch('http://localhost:8080/api/addresses/' + selectedAddress, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((d) => {
                setAddress(d);
            });

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handelAddress = (address,user) => {
        setSelectedAddress(address);
        setUser(user);
    }

    const fetchProduct = () => {
        return fetch('http://localhost:8080/api/products/' + productid, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((d) => {
                setProduct(d);
            });
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    async function handleSubmitOrder() {

        const params = {
            address: selectedAddress,
            product: productid,
            quantity: window.sessionStorage.getItem('ProductQuantity' + productid),
            user: user
        };

        const response = await fetch('http://localhost:8080/api/orders' , {
            body: JSON.stringify(params),
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            window.sessionStorage.setItem('OrderPlaced', 'OK');
            window.sessionStorage.removeItem('ProductQuantity' + productid);
            window.location = "../products/ALL";
        } else {
            const result = await response.json();
            setOpenFalse(true);
            setmessageError(result.message);
        }

    }

    return (
        <Box container sx={{ m: 5 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <React.Fragment>
                {activeStep === 1 ?
                    (<>
                        <Address handelAddress={handelAddress} />
                    </>)
                    :
                    (
                        <Grid container
                            spacing={2}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ minHeight: '50vh', flexGrow: 1 }}>
                            <Stack sx={{ display: 'flex' }} style={{ border: "none", boxShadow: "none" }} spacing={5} direction="row">
                                <Stack sx={{ flex: '1 0 auto' }} spacing={2} style={{ width: 600 }}>
                                    <Typography component="div" variant="h4">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        Quantity: <strong>{window.sessionStorage.getItem('ProductQuantity' + productid)}</strong>
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        Category: <strong>{product.category}</strong>
                                    </Typography>
                                    <Typography component="div" variant="h5">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h5" component="div" style={{ color: "red" }}>
                                        Total Price : ₹ {product.price * window.sessionStorage.getItem('ProductQuantity' + productid)}
                                    </Typography>
                                </Stack>
                                <Stack sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h4">
                                        Address Details:
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {address.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Contact Number : {address.contactNumber}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {address.street}, {address.city}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {address.state}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {address.zipcode}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    )
                }

                <Box alignItems="center" justifyContent="center" sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color="inherit" disabled={activeStep === 0 || activeStep === 1} onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'PLACE ORDER' : 'Next'}
                    </Button>
                </Box>

            </React.Fragment>

            <Snackbar open={openTrue} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {messageError}
                </Alert>
            </Snackbar>

            <Snackbar open={openFalse} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {messageError}
                </Alert>
            </Snackbar>
        </Box>
    );
}