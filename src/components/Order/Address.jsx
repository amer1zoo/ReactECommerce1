import * as React from 'react';
import { useState, useEffect } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Address({ handelAddress }) {

    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState('');

    const fetchInfo = () => {
        return fetch('http://localhost:8080/api/addresses', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')//
            }
        })
            .then((res) => res.json())
            .then((d) => { setAddresses(d); });
    }

    useEffect(() => {
        fetchInfo();
        fetchUser();
    }, []);

    const fetchUser = () => {
        return fetch('http://localhost:8080/api/users', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((d) => { setUser(d.filter((item) => item.email === localStorage.getItem('email'))[0].id); });
    }

    const [addressName, setAddressName] = useState('');
    const [addressContact, setAddressContact] = useState('');
    const [addressStreet, setAddressStreet] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressState, setAddressState] = useState('');
    const [addressLandmark, setAddressLandmark] = useState('');
    const [addressZip, setAddressZip] = useState('');
    const [messageError, setmessageError] = useState('Errors');

    const [openTrue, setOpenTrue] = React.useState(false);
    const [openFalse, setOpenFalse] = React.useState(false);
    const handleAddressSelect = (event) => {
        handelAddress(event.target.value, user);
    }
    const handleChange = (event) => {
        switch (event.target.id) {
            case "addressName":
                setAddressName(event.target.value);
                break;
            case "addressContact":
                setAddressContact(event.target.value);
                break;
            case "addressStreet":
                setAddressStreet(event.target.value);
                break;
            case "addressCity":
                setAddressCity(event.target.value);
                break;
            case "addressState":
                setAddressState(event.target.value);
                break;
            case "addressLandmark":
                setAddressLandmark(event.target.value);
                break;
            case "addressZip":
                setAddressZip(event.target.value);
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
        if (addressName.length === 0) {
            setmessageError('Invalid Input, Name can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (addressContact.length === 0) {
            setmessageError('Invalid Input, Contact Number can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (addressStreet.length === 0) {
            setmessageError('Invalid Input, Street can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (addressCity.length === 0) {
            setmessageError('Invalid Input, City can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (addressState.length === 0) {
            setmessageError('Invalid Input, State can not be empty');
            setOpenFalse(true);
            return false;
        }
        if (addressZip.length === 0) {
            setmessageError('Invalid Input, Zip Code can not be empty');
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
            name: addressName,
            contactNumber: addressContact,
            street: addressStreet,
            city: addressCity,
            state: addressState,
            landmark: addressLandmark,
            zipcode: addressZip,
            user: user,
        };
        console.log(JSON.stringify(params));
        const response = await fetch('http://localhost:8080/api/addresses', {
            body: JSON.stringify(params),
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            setOpenTrue(true);
            setmessageError('Address added successfully!');
            fetchInfo();
        } else {
            setOpenFalse(true);
            setmessageError('');
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
            <Grid item xs={12} sx={{ minWidth: 800 }}>
                <FormControl fullWidth>
                    <Typography variant="h6" >
                        Select Address
                    </Typography>
                    <Select id="addressSelect" onChange={handleAddressSelect}>
                        {addresses.map((item) => (<MenuItem key={item.id} value={item.id}> {item.name} - {item.street},{item.city}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" >
                    Add Address
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressName" label="Name" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={addressName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressContact" label="Contact Number" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={addressContact} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressStreet" label="Street" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={addressStreet} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressCity" label="City" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={addressCity} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressState" label="State" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={addressState} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressLandmark" label="Landmark" size="large" variant="outlined" sx={{ width: { xs: 400 } }} value={addressLandmark} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="addressZip" label="Zip Code" size="large" variant="outlined" required sx={{ width: { xs: 400 } }} value={addressZip} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" sx={{ width: { xs: 400 } }} onClick={handleSubmit}>Save Address</Button>
            </Grid>

            <Snackbar open={openTrue} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {messageError}
                </Alert>
            </Snackbar>

            <Snackbar open={openFalse} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There are some errors! Check Name and Contact number. {messageError}
                </Alert>
            </Snackbar>

        </Grid>
    );
}