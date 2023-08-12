import React from 'react';
import ReactDOM from 'react-dom/client';
import TopAppBar from './components/TopAppBar/TopAppBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ProductCard from './components/ProductCard/ProductCard';
import ProductList from './components/ProductList/ProductList';
import AddProduct from './components/AddProduct/AddProduct';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <TopAppBar />
        <Switch>
            <Route exact path="/">
            </Route>
            <Route path="/login">
                <SignIn />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/products">
                <ProductList />
            </Route>
            <Route path="/addproduct">
                <AddProduct />
            </Route>
            <Route path="*">
                {/* When there is no match in URL navigation...*/}
            </Route>
        </Switch>
    </BrowserRouter>
);