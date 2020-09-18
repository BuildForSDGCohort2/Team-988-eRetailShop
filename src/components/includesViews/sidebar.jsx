import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to={"/home"}>
              <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/pos"}>
              <span data-feather="file"></span>
              POS
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/category"}>
              <span data-feather="file"></span>
              Category
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/products"}>
              <span data-feather="shopping-cart"></span>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/suppliers"}>
              <span data-feather="users"></span>
              Suppliers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/users"}>
              <span data-feather="bar-chart-2"></span>
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/clients"}>
              <span data-feather="bar-chart-2"></span>
              Clients
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/orders"}>
              <span data-feather="bar-chart-2"></span>
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/sales"}>
              <span data-feather="bar-chart-2"></span>
              Sales
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/purchases"}>
              <span data-feather="bar-chart-2"></span>
              Purchases
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>
              <span data-feather="layers"></span>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"#"}>
              <span data-feather="layers"></span>
              Reports
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <Link
            className="d-flex align-items-center text-muted"
            to={"#"}
            aria-label="Add a new report"
          >
            <span data-feather="plus-circle"></span>
          </Link>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link" to={"#"}>
              <span data-feather="file-text"></span>
              Current month
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"#"}>
              <span data-feather="file-text"></span>
              Last quarter
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"#"}>
              <span data-feather="file-text"></span>
              Social engagement
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"#"}>
              <span data-feather="file-text"></span>
              Year-end sale
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
