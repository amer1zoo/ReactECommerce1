import React from 'react';
import ReactDOM from 'react-dom/client';
import TopAppBar from './components/TopAppBar/TopAppBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ProductList from './components/ProductList/ProductList';
import AddProduct from './components/AddProduct/AddProduct';
import EditProduct from './components/EditProduct/EditProduct';
import ProductDetail from './components/ProductDetail/ProductDetail';
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
            <Route path="/editproduct/:productid">
                <EditProduct />
            </Route>
            <Route path="/editproduct">
                <EditProduct />
            </Route>
            <Route path="/productdetail/:productid">
                <ProductDetail />
            </Route>
            <Route path="/productdetail">
                <ProductDetail />
            </Route>
            <Route path="*">
                {/* When there is no match in URL navigation...*/}
            </Route>
        </Switch>
    </BrowserRouter>
);
