
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Alert, Snackbar, Grid, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material';
import ProductShow from '../ProductList/ProductShow';
import ProductCategory from '../ProductCategory/ProductCategory';
import { useRouteMatch, Switch, Route } from 'react-router-dom';


export default function ProductList({ name, icon, price, details, filter }) {
    const { path } = useRouteMatch();
    const [sort, setSort] = React.useState('');

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
        setSort(event.target.value);

    };

    useEffect(() => {
        if (window.sessionStorage.getItem('ProductModified') === 'OK') {
            setmessageError(`Product ${window.sessionStorage.getItem('ProductName')} modified successfully`);
            setOpenTrue(true);

            window.sessionStorage.removeItem('ProductModified');
            window.sessionStorage.removeItem('ProductName');
        }
        if (window.sessionStorage.getItem('OrderPlaced') === 'OK') {
            setmessageError(`Order placed successfully`);
            setOpenTrue(true);

            window.sessionStorage.removeItem('OrderPlaced');
        }
    }, []);

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
                        <ProductShow sort={sort} filter={filter} />
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