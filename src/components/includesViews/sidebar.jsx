import React from "react";
import { Link } from "react-router-dom";
import menu from "../../config/menuAccess.json";

export default function Sidebar({ user }) {
  const displayMenu = menu.filter((c) =>
    c.accessLevel.includes(user.profileid)
  );

  return (
    <nav
      className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
      id="sidenav-main"
    >
      <div>
        <h1>eRetailShop</h1>
      </div>
      <hr className="my-3" />
      <div className="navbar-inner">
        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            {displayMenu.map((m) => (
              <li className="nav-item" key={m.id}>
                <Link className="nav-link" to={m.pathname}>
                  <i className={m.menuIcon}></i>
                  <span className="nav-link-text">{m.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link active active-pro">
                &copy; Christian (Team-988)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
