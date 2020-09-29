import React from "react";
import { Link } from "react-router-dom";
import menu from "../../config/menuAccess.json";

export default function Sidebar({ user }) {
  const displayMenu = menu.filter((c) =>
    c.accessLevel.includes(user.profileid)
  );

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          {displayMenu.map((m) => (
            <li className="nav-item" key={m.id}>
              <Link className="nav-link" to={m.pathname}>
                <span data-feather="file"></span>
                {m.description}
              </Link>
            </li>
          ))}
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Reports</span>
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
        </ul>
      </div>
    </nav>
  );
}
