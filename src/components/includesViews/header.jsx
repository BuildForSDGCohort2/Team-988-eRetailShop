import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function Header({ user }) {
  return (
    <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user.first_login_flag === false && (
            <React.Fragment>
              <form
                className="navbar-search navbar-search-light form-inline mr-sm-3"
                id="navbar-search-main"
              >
                <button
                  type="button"
                  className="close"
                  data-action="search-close"
                  data-target="#navbar-search-main"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </form>

              <ul className="navbar-nav align-items-center  ml-md-auto ">
                <li className="nav-item d-xl-none">
                  <div
                    className="pr-3 sidenav-toggler sidenav-toggler-dark"
                    data-action="sidenav-pin"
                    data-target="#sidenav-main"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav px-6">
                <li>
                  <DropdownButton title={user.username}>
                    <Dropdown.Item href="/changepasswordform">
                      <i className="ni ni-settings-gear-65"></i>
                      <span className="nav-link-text">Change Password</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="/logout">
                      <i className="ni ni-user-run"></i>
                      <span className="nav-link-text">Logout</span>
                    </Dropdown.Item>
                  </DropdownButton>
                </li>
              </ul>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}
