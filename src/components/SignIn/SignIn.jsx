import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setmessageError] = useState('Errors');

    const [openTrue, setOpenTrue] = React.useState(false);
    const [openFalse, setOpenFalse] = React.useState(false);

    const handleChange = (event) => {
        switch (event.target.id) {
            case "emailField":
                setEmail(event.target.value);
                break;
            case "passwordField":
                setPassword(event.target.value);
                break;
            default:
                break;
        }

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenTrue(false);
        setOpenFalse(false);
    };

    function validateInput() {
        if (email.length === 0) {
            setmessageError('Invalid Input, Email can not be empty.');
            setOpenFalse(true);
            return false;
        }
        if (password.length === 0) {
            setmessageError('Invalid Input, Password can not be empty.');
            setOpenFalse(true);
            return false;
        }
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(validRegex)) {
            setmessageError('Invalid Input, Email address not valid.');
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
            username: email,
            password: password
        };

        const response = await fetch('http://localhost:8080/api/auth/signin', {
            body: JSON.stringify(params),
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            }
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token); 
            window.location = '/products/ALL';
        } else {
            setOpenFalse(true);
            setmessageError('You can not login to the system. Please register first if you do not have an account.');
        }

    }

    return (
        <Grid row
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', flexGrow: 2 }}>
            <Grid item xs={6}>
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" >
                    Sign In
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField id="emailField" label="Email Address" size="large" variant="outlined" type="email" required sx={{ width: { xs: 400 } }} value={email} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
                <TextField id="passwordField" label="Password" size="large" variant="outlined" type="password" required sx={{ width: { xs: 400 } }} value={password} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" size="large" sx={{ width: { xs: 400 } }} onClick={handleSubmit}>SIGN IN</Button>
            </Grid>
            <Grid item xs={6} >
                <Link href="/signup" variant="text" color="primary" style={{ marginRight: 16 }}>Don't have an account? Sign Up</Link >
            </Grid>


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
        </Grid>

    );
}