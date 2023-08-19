import * as React from 'react';
import { useState, useContext } from 'react';
import { Alert, Snackbar, Grid, IconButton, Button, Typography, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { CreateIcon, DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useAuthentication from "../../common/useAuthentication";
import { URL_PRODUCT } from '../../common/constants';

export default function ProductCard({ id, name, icon, price, details }) {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);

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
    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(URL_PRODUCT + '/' + id, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            setOpenTrue(true);
            setmessageError(`Product ${name} deleted successfully`);

            window.location.reload(false);

        } else {
            const result = await response.json();
            setOpenFalse(true);
            setmessageError(result.message);
        }
    }

    return (
        <Card style={{ display: "flex", flexDirection: "column" }} sx={{ maxWidth: 400, minWidth: 400, m: 3, height: { xs: 150, sm: 400 }, }} >
            <CardMedia component="img" height="160" image={icon} alt={name} />
            <CardContent>
                <Grid row container>
                    <Grid item xs={6} align="left">
                        <Typography variant="h6" color="text.secondary">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Typography variant="h6" color="text.secondary">
                            ₹ {price}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <Typography variant="subtitle1" color="text.secondary" component="div" style={{ overflowY: 'auto' }} sx={{ maxHeight: 100, minHeight: 100 }}>
                    {details}
                </Typography>
            </CardContent>
            <CardActions style={{ marginTop: "auto" }}>
                <Grid row container>
                    <Grid item xs={6} align="left">
                        <Button variant="contained" color="primary" size="small" component={Link} to={"/productdetail/" + id}>Buy</Button>
                    </Grid>
                    {
                        !user ? (<></>) : user.role === "USER" ? (<></>) : (<Grid item xs={6} align="right">
                            <IconButton aria-label="edit">
                                <Link to={"/editproduct/" + id}><CreateIcon /></Link>
                            </IconButton>
                            <IconButton aria-label="remove">
                                <DeleteIcon onClick={handleSubmit} />
                            </IconButton>
                        </Grid>)
                    }
                </Grid>
            </CardActions>

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
        </Card>

    );
}