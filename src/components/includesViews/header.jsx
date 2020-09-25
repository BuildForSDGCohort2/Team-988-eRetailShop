import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Header({ user }) {
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to={"/home"}>
        eRetailShop
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {user.first_login_flag === false && (
        <React.Fragment>
          <form className="form-inline my-2 my-lg-0">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/changepasswordform">
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item href="/logout">Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </React.Fragment>
      )}
    </nav>
  );
}
