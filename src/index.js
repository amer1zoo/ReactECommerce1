import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import TopAppBar from './components/TopAppBar/TopAppBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ProductList from './components/ProductList/ProductList';
import AddProduct from './components/AddProduct/AddProduct';
import EditProduct from './components/EditProduct/EditProduct';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Order from './components/Order/Order';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useAuthentication from "./common/useAuthentication";
import Protected from "./common/Protected";

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const { AuthProvider } = useAuthentication();
    return (<AuthProvider><ConnectedApp /></AuthProvider>);
}

function ConnectedApp() {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);

    return (
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
                <Protected user={user} role="ADMIN;USER" path="/products">
                    <ProductList />
                </Protected>
                <Protected user={user} role="ADMIN" path="/addproduct">
                    <AddProduct />
                </Protected>
                <Protected user={user} role="ADMIN" path="/editproduct/:productid">
                    <EditProduct />
                </Protected>
                <Protected user={user} role="ADMIN" path="/editproduct">
                    <EditProduct />
                </Protected>
                <Protected user={user} role="ADMIN;USER" path="/productdetail/:productid">
                    <ProductDetail />
                </Protected>
                <Protected user={user} role="ADMIN;USER" path="/productdetail">
                    <ProductDetail />
                </Protected>
                <Protected user={user} role="ADMIN;USER" path="/order/:productid">
                    <Order />
                </Protected>
                <Protected user={user} role="ADMIN;USER" path="/order">
                    <Order />
                </Protected>
                <Route path="*">
                    {/* When there is no match in URL navigation...*/}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

root.render(
    <App />
);