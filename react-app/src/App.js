import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Products from "./components/Products/index"
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductForm from "./components/ProductForm";
import StoreManager from "./components/StoreManager";
import CreateForm from "./components/ProductForm/CreateProduct";
import UpdateForm from "./components/ProductForm/UpdateProduct";
import SearchBar from "./components/Search";
import SearchResults from "./components/Search/searchResult";
import ShoppingCart from "./components/ShoppingCart";
import OrderDetail from "./components/OrderDetail";
import OrderPage from "./components/OrderPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/search/searchItem" >
            <SearchResults />
          </Route>
          <Route exact path="/products/mystore">
            <StoreManager />
          </Route>
          <Route exact path="/products/new">
            <CreateForm />
          </Route>
          <Route exact path="/products/update/:productId">
            <UpdateForm />
          </Route>
          <Route exact path="/products/:productId">
            <ProductDetail />
          </Route>
          <Route exact path="/shopping_cart">
            <ShoppingCart />
          </Route>
          <Route exact path="/order/:orderId">
            <OrderDetail />
          </Route>
          <Route exact path="/orders">
            <OrderPage />
          </Route>
          <Route exact path="/search">
            <SearchResults />
          </Route>

          
        </Switch>
      )}
    </>
  );
}

export default App;
