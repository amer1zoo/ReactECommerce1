import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from "react-router-dom";
export default function TopAppBar() {

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location = "/login";
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <ShoppingCart />
                    </IconButton>
                    <Typography variant="h6">
                        upGrad E-Shop
                    </Typography>
                    <Box component="div" justifyContent="center" sx={{ mr: 2, flexGrow: 1, display: 'flex' }}>
                        <TextField label="Search..." size="small" variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ width: '50ch', backgroundColor: '#6874b9' }} onChange={handleChange} value={searchInput} />
                    </Box>
                    <Link to="/login" variant="text" color="error" style={{ marginRight: 16 }}>Login</Link>
                    <Link to="/signup" variant="text" color="inherit" style={{ marginRight: 16 }}>Sign Up</Link>
                    <Link to="/products/ALL" variant="text" color="inherit" style={{ marginRight: 16 }}>Home</Link>
                    <Link to="/addproduct" variant="text" color="inherit" style={{ marginRight: 16 }}>Add Product</Link>
                    <Button variant="contained" color="error" style={{ marginRight: 16 }} onClick={handleClick} >LOGOUT</Button>
                </Toolbar>
            </AppBar>

        </Box>
    );
}