import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Home from "./components/home";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

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
import auth from "./services/authService";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);
  return (
    <React.Fragment>
      <Header user={currentUser} />
      <Container fluid>
        <Row>
          {currentUser && <Sidebar />}
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
            <Route exact path="/" component={Login} />
          </Switch>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
