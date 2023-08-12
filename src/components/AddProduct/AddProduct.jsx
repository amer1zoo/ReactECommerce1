import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CreatableSelect from 'react-select/creatable';
import Stack from '@mui/material/Stack';

//const Categories = ["ALL", "APPAREL", "ELECTRONICS", "PERSONAL CARE"];
export default function ProductCategory() {

    const Categories = [];
    //Categories.push({ label: "ALL", value: "ALL" });

    const [productName, setproductName] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [manufacturere, setmanufacturere] = useState('');
    const [availableItems, setavailableItems] = useState('');
    const [price, setprice] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [productDescription, setproductDescription] = useState('');
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
        switch (event.target.id) {
            case "productName":
                setproductName(event.target.value);
                break;
            case "categoryName":
                setcategoryName(event.target.value);
                break;
            case "manufacturere":
                setmanufacturere(event.target.value);
                break;
            case "availableItems":
                setavailableItems(event.target.value);
                break;
            case "price":
                setprice(event.target.value);
                break;
            case "imageURL":
                setimageURL(event.target.value);
                break;
            case "productDescription":
                setproductDescription(event.target.value);
                break;
            default:
                break;
        }

    };

    function validateInput() {
        if (productName.length === 0) {
            setmessageError('Invalid Input, Product Name can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (categoryName.length === 0) {
            setmessageError('Invalid Input, Category can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (availableItems.length === 0) {
            setmessageError('Invalid Input, Available Items can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (price.length === 0) {
            setmessageError('Invalid Input, Price can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (manufacturere.length === 0) {
            setmessageError('Invalid Input, Manufacturere can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (isNaN(price)) {
            setmessageError('Invalid Input, Price is not valid');
            setOpenFalse(true);
            return false;
        }
        if (isNaN(availableItems) || availableItems.includes('.')) {
            setmessageError('Invalid Input, Available Items is not valid');
            setOpenFalse(true);
            return false;
        }
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }
        //const params = {
        //    firstName: firstname,
        //    lastName: lastname,
        //    email: email,
        //    password: password,
        //    contactNumber: contact
        //};

        //const response = await fetch('http://localhost:8080/api/auth/signup', {
        //    body: JSON.stringify(params),
        //    method: 'POST',
        //    headers: {
        //        "Accept": "application/json",
        //        "Content-Type": "application/json;charset=UTF-8"
        //    }
        //});

        //const result = await response.json();

        //if (response.ok) {
        //    setOpenTrue(true);
        //} else {
        //    setOpenFalse(true);
        //    setmessageError(result.message);
        //}

    }

    async function handleRetrieveData() {
        const response = await fetch('http://localhost:8080/api/products/categories', {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            setOpenTrue(true);
            setmessageError("Categories reads " + result.length);
            for (let index = 0; index < result.length; index++) {
                Categories.push(result[index]);
            }
        } else {
            setOpenFalse(true);
            setmessageError('Can not access the categories of product.');
        }
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh', flexGrow: 1 }}>

                <Grid item xs={12}>
                    <Typography variant="h6" >
                        Add Product
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="productName" label="Name" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={productName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <CreatableSelect id="categoryName" isClearable options={Categories} width={10000} required  onChange={(newValue) => setcategoryName(newValue)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="manufacturere" label="Manufacturere" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={manufacturere} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="availableItems" label="Available Items" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={availableItems} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="price" label="Price" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={price} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="imageURL" label="Image URL" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={imageURL} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="productDescription" label="Product Description" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={productDescription} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" sx={{ width: { xs: 400 } }} onClick={handleSubmit}>SAVE PRODUCT</Button>
                </Grid>

                <Snackbar open={openTrue} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Registration done successfully!
                    </Alert>
                </Snackbar>

                <Snackbar open={openFalse} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        There are some errors! {messageError}
                    </Alert>
                </Snackbar>

            </Grid>
        </>
    );
}