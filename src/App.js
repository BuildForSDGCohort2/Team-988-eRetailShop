import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Redux Store
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import auth from "./services/authService";

//Includes Views
import Header from "./components/includesViews/header";
import Sidebar from "./components/includesViews/sidebar";

//Authentication
import Login from "./components/authentication/login";
import Logout from "./components/authentication/logout";

//Partial Views
import Home from "./components/partialViews/home";
import Category from "./components/partialViews/category";
import Products from "./components/partialViews/products";
import Users from "./components/partialViews/users";
import Clients from "./components/partialViews/clients";
import Order from "./components/partialViews/order";
import Pos from "./components/partialViews/pos";

//Forms
import ChangePasswordForm from "./components/Forms/changePasswordForm";

import "./App.css";

const store = configureStore();

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  return (
    <React.Fragment>
      {currentUser.first_login_flag === false && <Sidebar user={currentUser} />}

      <div className="main-content" id="panel">
        <ToastContainer />

        {currentUser.first_login_flag === false && (
          <Header user={currentUser} />
        )}
        <Switch>
          {/* Default Route */}
          <Route exact path="/" component={Login} />
          {/* Authentication Routes */}
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/home" component={Home} />

          {/* Forms Routes */}
          <Route path="/changepasswordform" component={ChangePasswordForm} />

          {/* Partials Routes */}
          <Route path="/category" component={Category} />
          <Route path="/products" component={Products} />
          <Route path="/users" component={Users} />
          <Route path="/clients" component={Clients} />
          <Route path="/order" component={Order} />
          <Provider store={store}>
            <Route path="/pos">
              <Pos user={currentUser} />
            </Route>
          </Provider>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
