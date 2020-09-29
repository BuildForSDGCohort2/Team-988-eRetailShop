import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Col, Button, Row, FormGroup, FormControl } from "react-bootstrap";
import defaultMenu from "../../config/defaultMenu.json";
import auth from "../../services/authService";

export default function ChangePasswordForm() {
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = auth.getCurrentUser();
  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    try {
      const userData = {
        confirmpassword: confirmpassword,
      };

      const response = await auth.login(user.username, oldpassword);
      if (response === "OK" && password.localeCompare(confirmpassword) === 0) {
        const resp = await auth.updateFirstLogin(user.userid, userData);
        if (resp === "OK") {
          setLoading(false);
          toast.success("Password changed successfuly");
          setTimeout(() => {
            window.location = defaultMenu
              .filter((c) => c.accessLevel.includes(user.profileid))
              .map((m) => m.pathname)[0];
          }, 5000);
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
      }
    }
  }

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Change Password</h1>
      </div>
      <Row className="justify-content-md-center">
        <Col>
          <form className="form-style" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
            {loading && (
              <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
            )}
            <FormGroup controlId="Old Password" size="lg">
              <label htmlFor="Old Password" className="sr-only">
                Old Password
              </label>
              <FormControl
                placeholder="Old Password"
                autoFocus
                type="password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="New Password" size="lg">
              <label htmlFor="New Password" className="sr-only">
                New Password
              </label>
              <FormControl
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="Confirm password" size="lg">
              <label htmlFor="Confirm password" className="sr-only">
                Confirm Password
              </label>
              <FormControl
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block size="lg" type="submit">
              Change Password
            </Button>
          </form>
        </Col>
      </Row>
    </main>
  );
}
