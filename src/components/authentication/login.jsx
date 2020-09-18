import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import auth from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(undefined);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await auth.login(username, password);
      if (response === "OK") {
        const user = await auth.getCurrentUser();
        if (user.first_login_flag === true) {
          window.location = "/changepasswordform";
          setLoading(false);
        } else {
          window.location = "/home";
          setLoading(false);
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  }
  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1>eRetailShop</h1>
      <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <FormGroup controlId="username" size="lg">
        <label htmlFor="Username" className="sr-only">
          Username
        </label>
        <FormControl
          autoFocus
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="password" size="lg">
        <label htmlFor="Password" className="sr-only">
          Password
        </label>
        <FormControl
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </FormGroup>
      <Button block size="lg" disabled={!validateForm()} type="submit">
        Login
      </Button>
    </form>
  );
}
