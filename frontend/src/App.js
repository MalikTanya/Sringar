import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
function App() {
  return (
    <div className="position:relative">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route
            path="/search/:keyword"
            exact
            element={<HomeScreen search />}
          />
          {/* <Route path="/page/:pageNumber" element={<HomeScreen search />} /> */}
          <Route
            path="/admin/productlist"
            Component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            Component={ProductListScreen}
            exact
          />
          <Route path="/admin/orderlist" Component={OrderListScreen} />
          <Route path="/admin/user/:id/edit" Component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" Component={ProductEditScreen} />
          <Route path="/admin/userlist" Component={UserListScreen} />
          <Route path="/order/:orderId" Component={OrderScreen} />
          <Route path="/placeorder" Component={PlaceOrderScreen} />
          <Route path="/payment" Component={PaymentScreen} />
          <Route path="/shipping" Component={ShippingScreen} />
          <Route path="/profile" Component={ProfileScreen} />
          <Route path="/register" Component={RegisterScreen} />
          <Route path="/login" Component={LoginScreen} />
          <Route path="/product/:id" Component={ProductScreen} />
          <Route path="/cart/:id?" Component={CartScreen} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
