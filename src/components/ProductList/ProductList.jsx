/// <reference path="../productcategory/productcategory.jsx" />
import * as React from 'react';
import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductShow from '../ProductList/ProductShow';
import ProductCategory from '../ProductCategory/ProductCategory';
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



export default function ProductList({ name, icon, price, details }) {
    const { url, path } = useRouteMatch();
    const routeMatch = useRouteMatch();
    const [category, setCategory] = React.useState('ALL');
    const [sort, setSort] = React.useState('');
    const { categoryitem } = useParams();

    const [messageError, setmessageError] = useState('Errors');

    const [openTrue, setOpenTrue] = React.useState(false);
    const [openFalse, setOpenFalse] = React.useState(false);

    const handleAlignment = (event, newCategory) => {
        setCategory(newCategory);
    };


    const handleChange = (event) => {
        setSort(event.target.value);
        
    };

    return (
        <>
            <Grid row container sx={{
                mt: 3
            }}>
                <Grid item xs={4} align="left">
                    <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                        <InputLabel id="sortbylabel">Sort By:</InputLabel>
                        <Select
                            labelId="sortbylabel"
                            id="sortbyselect"
                            value={sort}
                            label="Sort By"
                            onChange={handleChange}>
                            <MenuItem value={1}>Default</MenuItem>
                            <MenuItem value={2}>Price high to low</MenuItem>
                            <MenuItem value={3}>Price low to high</MenuItem>
                            <MenuItem value={4}>Newest</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} align="left">
                    <ProductCategory />
                </Grid>
            </Grid>
            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: { xs: "center", md: "space-around" },
                    alignContent: { xs: "center", md: "space-around" },
                    alignItems: "center",
                    flexWrap: "wrap",
                    height: "100%",
                }}>

                <Switch>
                    <Route path={`${path}/:categoryitem`}>
                        <ProductShow sort={sort} />
                    </Route>
                </Switch>



            </Box>

            <Snackbar open={openTrue} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {messageError}
                </Alert>
            </Snackbar>

            <Snackbar open={openFalse} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There are some errors! {messageError}
                </Alert>
            </Snackbar>
        </>


    );
}