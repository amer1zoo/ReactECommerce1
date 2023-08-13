import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, Switch, Route } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./TopAppBar.css";

export default function TopAppBar() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location = "/login";
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
            <TextField className="input-box"
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
              value={searchInput}
            />
          </Box>
          <Link
            to="/login"
            variant="text"
            color="error"
            style={{ marginRight: 16, color: "white" }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            variant="text"
            color="inherit"
            style={{ marginRight: 16, color: "white" }}
          >
            Sign Up
          </Link>
          <Link
            to="/products/ALL"
            variant="text"
            color="inherit"
            style={{ marginRight: 16, color: "white" }}
          >
            Home
          </Link>
          <Link
            to="/addproduct"
            variant="text"
            color="inherit"
            style={{ marginRight: 16, color: "white" }}
          >
            Add Product
          </Link>
          <Button
            variant="contained"
            color="error"
            style={{ marginRight: 16 }}
            onClick={handleClick}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
