import React from "react";
import { Link } from "react-router-dom";

export default function ConfirmPasswordChange() {
  return (
    <div className="form-style">
      <h2 className=" font-weight-normal">Password changed successfuly. </h2>
      <h3>
        Click <Link to={"/logout"}>Login </Link> to login again...
      </h3>
    </div>
  );
}
