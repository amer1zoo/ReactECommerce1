import React, { useState, useContext } from "react";
import { AppBar, Box, Toolbar, IconButton, InputAdornment, TextField, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import "./TopAppBar.css";
import useAuthentication from "../../common/useAuthentication";

export default function TopAppBar() {
    const { AuthCtx } = useAuthentication();
    const { user, logOut, searchData,search } = useContext(AuthCtx);

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        searchData(e.target.value);
        //setSearchInput(search);
        //setSearchInput(e.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCart />
                    </IconButton>
                    <Typography variant="h6">upGrad E-Shop</Typography>
                    <Box
                        component="div"
                        justifyContent="center"
                        sx={{ mr: 2, flexGrow: 1, display: "flex" }}
                    >
                        {!user ? (<></>) :
                            (<TextField className="input-box"
                                placeholder="Search..."
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"  >
                                            <SearchIcon className="search-icon" />
                                        </InputAdornment>
                                    ),
                                    style: { color: '#b1bcc2' }
                                }}
                                style={{ width: "50ch", backgroundColor: "#5c6bc0" }}
                                onChange={handleChange}
                                value={search}
                            />)
                        }
                    </Box>

                    {
                        !user ? (<><Link
                            to="/login"
                            variant="text"
                            color="error"
                            style={{ marginRight: 16, color: "white" }}>
                            Login
                        </Link><Link
                            to="/signup"
                            variant="text"
                            color="inherit"
                            style={{ marginRight: 16, color: "white" }}>
                                Sign Up
                            </Link>
                        </>) : (user.role === "USER" ? (<>
                            <Link
                                to="/products/ALL"
                                variant="text"
                                color="inherit"
                                style={{ marginRight: 16, color: "white" }}>
                                Home
                            </Link>
                            <Button
                                variant="contained"
                                color="error"
                                style={{ marginRight: 16 }}
                                onClick={() => logOut()}>
                                LOGOUT
                            </Button>
                        </>) : (<><Link
                            to="/products/ALL"
                            variant="text"
                            color="inherit"
                            style={{ marginRight: 16, color: "white" }}>
                            Home
                        </Link>
                            <Link
                                to="/addproduct"
                                variant="text"
                                color="inherit"
                                style={{ marginRight: 16, color: "white" }}>
                                Add Product
                            </Link>
                            <Button
                                variant="contained"
                                color="error"
                                style={{ marginRight: 16 }}
                                onClick={() => logOut()}>
                                LOGOUT
                            </Button></>))
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}