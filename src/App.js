import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/home";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

//Components
import Login from "./components/login";
import Logout from "./components/logout";
import Category from "./components/category";
import Products from "./components/products";
import Suppliers from "./components/suppliers";
import Users from "./components/users";
import Clients from "./components/clients";
import Orders from "./components/orders";
import Sales from "./components/sales";
import Purchases from "./components/purchases";
import ConfirmPasswordChange from "./components/confirmPasswordChange";
import auth from "./services/authService";

//Forms
import UserForm from "./components/Forms/userForm";
import ChangePasswordForm from "./components/Forms/changePasswordForm";

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
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/products" component={Products} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/users" component={Users} />
            <Route path="/clients" component={Clients} />
            <Route path="/orders" component={Orders} />
            <Route path="/sales" component={Sales} />
            <Route path="/purchases" component={Purchases} />
            <Route path="/userform/:id" component={UserForm} />
            <Route path="/changepasswordform" component={ChangePasswordForm} />
            <Route
              path="/confirmpasswordchange"
              component={ConfirmPasswordChange}
            />
            <Route exact path="/" component={Login} />
          </Switch>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
