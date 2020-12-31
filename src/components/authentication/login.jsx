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
        className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-controls="navbar-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse navbar-custom-collapse collapse"
            id="navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-close">
                  <button
                    type="button"
                    className="navbar-toggler"
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
            <hr className="d-lg-none" />
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center"></div>
            </div>
          </div>
        </div>

        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-6">
                    <h3 className="text-white">Welcome to eRetailShop </h3>
                    <p className="text-white">
                      A retail management application with a simplified user
                      interface that combines useful tools for running a retail
                      store , such as inventory management and point of sale
                      (POS).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-header bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <h1 className="text-white">eRetailShop</h1>
                  </div>
                </div>
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h3 className="text-white">Sign in </h3>
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
                    <div className="form-group mb-3">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-email-83"></i>
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
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-lock-circle-open"></i>
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

                    <div className="text-center">
                      <button
                        className="btn btn-primary my-4"
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
