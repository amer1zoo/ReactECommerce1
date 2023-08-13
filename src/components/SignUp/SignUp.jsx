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

export default function SignUp() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [contact, setContact] = useState('');
    const [messageError, setmessageError] = useState('Errors');

    const [openTrue, setOpenTrue] = React.useState(false);
    const [openFalse, setOpenFalse] = React.useState(false);



    const handleChange = (event) => {
        switch (event.target.id) {
            case "firstName":
                setFirstname(event.target.value);
                break;
            case "lastName":
                setLastname(event.target.value);
                break;
            case "emailField":
                setEmail(event.target.value);
                break;
            case "passwordField":
                setPassword(event.target.value);
                break;
            case "confirmField":
                setConfirmpassword(event.target.value);
                break;
            case "contactField":
                setContact(event.target.value);
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
        if (lastname.length === 0) {
            setmessageError('Invalid Input, Last Name can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (contact.length === 0) {
            setmessageError('Invalid Input, Contact Number can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (email.length === 0) {
            setmessageError('Invalid Input, Email can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (password.length < 6) {
            setmessageError('Invalid Input, Password must contain greater than or equal to 6 characters.');
            setOpenFalse(true);
            return false;
        }
        if (password !== confirmpassword) {
            setmessageError('Invalid Input, Password not match.');
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
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            contactNumber: contact
        };

        const response = await fetch('http://localhost:8080/api/auth/signup', {
            body: JSON.stringify(params),
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            }
        });

        const result = await response.json();

        if (response.ok) {
            setOpenTrue(true);
        } else {
            setOpenFalse(true);
            setmessageError(result.message);
        }

    }

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', flexGrow: 1 }}>
            <Grid item xs={12}>
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" >
                    Sign Up
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField id="firstName" label="First Name" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={firstname} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="lastName" label="Last Name" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={lastname} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="emailField" label="Email Address" size="large" variant="outlined" type="email" required sx={{ width: { xs: 400 } }} value={email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="passwordField" label="Password" size="large" variant="outlined" type="password" required sx={{ width: { xs: 400 } }} value={password} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="confirmField" label="Confirm Password" size="large" variant="outlined" type="password" required sx={{ width: { xs: 400 } }} value={confirmpassword} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="contactField" label="Contact Number" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={contact} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" sx={{ width: { xs: 400 } }} onClick={handleSubmit}>SIGN UP</Button>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} >
                <Box>
                    <Link href="/login" variant="text" color="primary">Already have an account? Sign In</Link >
                </Box>
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
    );
}