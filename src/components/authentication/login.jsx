import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { FormControl } from "react-bootstrap";
import defaultMenu from "../../config/defaultMenu.json";
import auth from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
          window.location = defaultMenu
            .filter((c) => c.accessLevel.includes(user.profileid))
            .map((m) => m.pathname)[0];
          setLoading(false);
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setLoading(false);
        toast.error(ex.response.data);
      }
    }
  }
  return (
    <React.Fragment>
      <nav
        id="navbar-main"
        class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
      >
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-controls="navbar-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="navbar-collapse navbar-custom-collapse collapse"
            id="navbar-collapse"
          >
            <div class="navbar-collapse-header">
              <div class="row">
                <div class="col-6 collapse-close">
                  <button
                    type="button"
                    class="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbar-collapse"
                    aria-controls="navbar-collapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <hr class="d-lg-none" />
          </div>
        </div>
      </nav>

      <div class="main-content">
        <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
          <div class="container">
            <div class="header-body text-center mb-7">
              <div class="row justify-content-center"></div>
            </div>
          </div>
        </div>

        <div class="container mt--8 pb-5">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
              <div class="card bg-secondary border-0 mb-0">
                <div class="card-header bg-transparent pb-5">
                  <div class="text-muted text-center mt-2 mb-3">
                    <h1 class="text-white">eRetailShop</h1>
                  </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                  <div class="text-center text-muted mb-4">
                    <h3 class="text-white">Sign in </h3>
                    {loading && (
                      <Loader
                        type="ThreeDots"
                        color="#0057e7"
                        height="50"
                        width="50"
                      />
                    )}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="form-group mb-3">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ni ni-email-83"></i>
                          </span>
                        </div>
                        <FormControl
                          placeholder="username"
                          autoFocus
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ni ni-lock-circle-open"></i>
                          </span>
                        </div>

                        <FormControl
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      </div>
                    </div>

                    <div class="text-center">
                      <button
                        class="btn btn-primary my-4"
                        disabled={!validateForm()}
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
