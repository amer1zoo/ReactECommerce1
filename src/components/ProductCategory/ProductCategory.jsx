import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ProductCard from '../ProductCard/ProductCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Link, useRouteMatch, Switch, Route, useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//const Categories = ["ALL", "APPAREL", "ELECTRONICS", "PERSONAL CARE"];
const Categories = ["ALL"];

export default function ProductCategory() {
    const { url, path } = useRouteMatch();
    const [category, setCategory] = React.useState('ALL');
    const { categoryitem } = useParams();
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


    async function handleRetrieveData() {
        const response = await fetch('http://localhost:8080/api/products/categories', {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            setOpenTrue(true);
            setmessageError("Categories reads "+result.length);
            for (let index = 0; index < result.length; index++) {
                Categories.push(result[index]);
            }
        } else {
            setOpenFalse(true);
            setmessageError('Can not access the categories of product.');
        }
    }

    const handleAlignment = (event, newCategory) => {
        setCategory(newCategory);
    };

    return (
        <>
            <ToggleButtonGroup value={category} exclusive onChange={handleAlignment}>
                {
                    handleRetrieveData(),
                    Categories.map((item) => (
                    <Link key={item} to={`${url}/${item}`}><ToggleButton value={item}>{item}</ToggleButton></Link>
                ))}
            </ToggleButtonGroup>

            <Snackbar open={openTrue} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {messageError}
                </Alert>
            </Snackbar>

            <Snackbar open={openFalse} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There are some errors! {messageError}
                </Alert>
            </Snackbar>
        </>
    );
}