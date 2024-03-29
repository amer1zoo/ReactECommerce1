﻿import * as React from 'react';
import { useState, useEffect } from 'react';
import { Alert, Snackbar, Grid, TextField, Button, Typography, Card, CardContent, CardMedia, Box, Chip, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { URL_PRODUCT } from '../../common/constants';

export default function ProductDetail() {
    const [productName, setproductName] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [availableItems, setavailableItems] = useState('');
    const [price, setprice] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { productid } = useParams();
    const [messageError, setmessageError] = useState('Errors');

    const [openTrue, setOpenTrue] = React.useState(false);
    const [openFalse, setOpenFalse] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenTrue(false);
        setOpenFalse(false);
    };

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    function validateInput() {
        if (quantity.length === 0) {
            setmessageError('Invalid Input, Quantity can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (isNaN(quantity) || (quantity + '').includes('.')) {
            setmessageError('Invalid Input, Quantity Items is not valid');
            setOpenFalse(true);
            return false;
        }
        if (quantity <= 0) {
            setmessageError('Invalid Input, Quantity can not be less than 1!');
            setOpenFalse(true);
            return false;
        }
        if (parseInt(quantity) > parseInt(availableItems)) {
            setmessageError('Invalid Input, there are not enough items in stock!');
            setOpenFalse(true);
            return false;
        }
        return true;
    }

    function handleOrder(e) {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }
        window.sessionStorage.setItem('ProductQuantity' + productid, quantity);
        window.location = "../order/" + productid;

    }

    const fetchProduct = () => {
        return fetch(URL_PRODUCT+'/' + productid)
            .then((res) => res.json())
            .then((d) => {
                setproductName(d.name);
                setcategoryName(d.category);
                setavailableItems(d.availableItems + '');
                setprice(d.price + '');
                setimageURL(d.imageUrl);
                setproductDescription(d.description);
            });
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <Grid container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', flexGrow: 1 }}>
            <Card sx={{ display: 'flex' }} style={{ border: "none", boxShadow: "none" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 250 }}
                    image={imageURL}
                    alt={productName}
                    style={{ marginRight: "200" }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h4">
                            {productName} <Chip label={"Available Quantity: " + availableItems} color="primary" />
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Category: <strong>{categoryName}</strong>
                        </Typography>
                        <Typography component="div" variant="h5">
                            {productDescription}
                        </Typography>
                        <Typography variant="h5" component="div" style={{ color: "red" }}>
                            ₹ {price}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Stack spacing={2} alignItems="center" style={{ width: 400 }}>
                            <TextField id="quantity" label="Enter Quantity" size="large" variant="outlined" required style={{ zIndex: 0 }} sx={{ width: { xs: 400 } }} value={quantity} onChange={handleChange} />
                            <Button variant="contained" color="primary" size="small" onClick={handleOrder}>Place Order</Button>
                        </Stack>
                    </Box>
                </Box>

            </Card>
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
        </Grid>
    );
}