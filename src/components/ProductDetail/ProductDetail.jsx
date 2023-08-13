import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function ProductDetail() {
    const history = useHistory();
    const [productName, setproductName] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [manufacturere, setmanufacturere] = useState('');
    const [availableItems, setavailableItems] = useState('');
    const [price, setprice] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [productDescription, setproductDescription] = useState('');

    const [product, setProduct] = useState();
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
        const params = {
            name: productName,
            category: categoryName,
            price: price,
            description: productDescription,
            manufacturer: manufacturere,
            availableItems: availableItems,
            imageUrl: imageURL
        };

        const response = await fetch('http://localhost:8080/api/products/' + productid, {
            body: JSON.stringify(params),
            method: 'put',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            setOpenTrue(true);
            setmessageError(`Product ${productName} modified successfully`);
            window.sessionStorage.setItem('ProductModified','OK');
            window.sessionStorage.setItem('ProductName', productName);
            history.goBack();
        } else {
            const result = await response.json();
            setOpenFalse(true);
            setmessageError(result.message);
        }

    }

    const fetchProduct = () => {
        return fetch('http://localhost:8080/api/products/' + productid)
            .then((res) => res.json())
            .then((d) => {
                setproductName(d.name);
                setcategoryName(d.category);
                setmanufacturere(d.manufacturer);
                setavailableItems(d.availableItems+'');
                setprice(d.price+'');
                setimageURL(d.imageUrl);
                setproductDescription(d.description);
            });
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={imageURL}
                    alt={productName}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {productName} <Chip label={"Available Quantity: " + availableItems} />
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
                        <TextField id="manufacturere" label="Enter Quantity" size="large" variant="outlined" required style={{ zIndex: 0 }} sx={{ width: { xs: 400 } }} />
                        <Button variant="contained" color="primary" size="small">Place Order</Button>
                    </Box>
                </Box>
                
            </Card>
        </>
    );
}
