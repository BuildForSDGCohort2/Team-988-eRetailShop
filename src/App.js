import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import auth from "./services/authService";

//Includes Views
import Header from "./components/includesViews/header";
import Sidebar from "./components/includesViews/sidebar";
import Footer from "./components/includesViews/footer";

//Authentication
import Login from "./components/authentication/login";
import Logout from "./components/authentication/logout";
import ConfirmPasswordChange from "./components/authentication/confirmPasswordChange";

//Partial Views
import Home from "./components/partialViews/home";
import Category from "./components/partialViews/category";
import Products from "./components/partialViews/products";
import Suppliers from "./components/partialViews/suppliers";
import Users from "./components/partialViews/users";
import Clients from "./components/partialViews/clients";
import Orders from "./components/partialViews/orders";
import Sales from "./components/partialViews/sales";
import Purchases from "./components/partialViews/purchases";
import Pos from "./components/partialViews/pos";

//Forms
import UserForm from "./components/Forms/userForm";
import CategoryForm from "./components/Forms/categoryForm";
import ChangePasswordForm from "./components/Forms/changePasswordForm";

import ClientForm from "./components/Forms/clientForm";
import ProductForm from "./components/Forms/productForm";
import SupplierForm from "./components/Forms/supplierForm";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Header user={currentUser} />
      <Container fluid>
        <Row>
          {currentUser.first_login_flag === false && <Sidebar />}
          <Switch>
            {/* Authentication Routes */}
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/home" component={Home} />
            <Route
              path="/confirmpasswordchange"
              component={ConfirmPasswordChange}
            />

            {/* Partials Routes */}
            <Route path="/category" component={Category} />
            <Route path="/products" component={Products} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/users" component={Users} />
            <Route path="/clients" component={Clients} />
            <Route path="/orders" component={Orders} />
            <Route path="/sales" component={Sales} />
            <Route path="/purchases" component={Purchases} />
            <Route path="/pos" component={Pos} />

            {/* Forms Routes */}
            <Route path="/userform/:id" component={UserForm} />
            <Route path="/changepasswordform" component={ChangePasswordForm} />
            <Route path="/categoryform/:id" component={CategoryForm} />
            <Route path="/clientform/:id" component={ClientForm} />
            <Route path="/productform/:id" component={ProductForm} />
            <Route path="/supplierform/:id" component={SupplierForm} />

            {/* Default Route */}
            <Route exact path="/" component={Login} />
          </Switch>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
