import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ProductCard({ id, name, icon, price, details }) {

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

        const response = await fetch('http://localhost:8080/api/products/' + id, {
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

        } else {
            const result = await response.json();
            setOpenFalse(true);
            setmessageError(result.message);
        }
    }

    return (
        <Card style={{ display: "flex", flexDirection: "column" }} sx={{ minWidth: 400, m: 3, height: { xs: 150, sm: 400 }, }} >
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
                <Typography variant="subtitle1" color="text.secondary">
                    {details}
                </Typography>
            </CardContent>
            <CardActions style={{ marginTop: "auto" }}>
                <Grid row container>
                    <Grid item xs={6} align="left">
                        <Button variant="contained" color="primary" size="small" component={Link} to={"/products/" + id}>Buy</Button>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <IconButton aria-label="edit">
                            <Link to={"/editproduct/" + id}><CreateIcon /></Link>
                        </IconButton>
                        <IconButton aria-label="remove">
                            <DeleteIcon onClick={handleSubmit} />
                        </IconButton>
                    </Grid>
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
