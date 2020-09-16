import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import auth from "../../services/authService";

export default function ChangePasswordForm() {
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const user = auth.getCurrentUser();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const userData = {
        confirmpassword: confirmpassword,
      };

      const response = await auth.login(user.username, oldpassword);
      if (response === "OK" && password.localeCompare(confirmpassword) === 0) {
        const resp = await auth.updateFirstLogin(user.userid, userData);
        console.log(resp);
        if (resp === "OK") window.location = "/confirmpasswordchange";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
      }
    }
  }

  return (
    <form className="form-style" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
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
  );
}
