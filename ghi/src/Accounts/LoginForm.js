import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "../Auth";

import "../Styles/LoginForm.module.css";

const LogInForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [, setFormIsValid] = useState(false);
  const [, login] = useToken();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await login(enteredEmail, enteredPassword);
    } catch (error) {
      console.error(error);
    }
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length >= 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6">
        <div className="mt-4">
          <div className="container-form">
            <h2 style={{ fontSize: "34px" }} className="heading">
              Log In
            </h2>
          </div>
          <form onSubmit={submitHandler} id="create-signup-form">
            <div className="form-floating mb-3 input-sm">
              <input
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                placeholder="Email"
                type="email"
                name="email"
                id="enteredEmail"
                value={enteredEmail}
                className="form-control"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3 input-sm">
              <input
                onChange={passwordChangeHandler}
                placeholder="Password"
                type="password"
                name="password"
                id="enteredPassword"
                value={enteredPassword}
                className="form-control"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn bg-violet-500 text-slate-100">Log in</button>
            <div>
              <p className="spacing">
                Not a Chewier member?{" "}
                <NavLink
                  to="/signup"
                  className="active login-font purple-text purple-hover"
                >
                  Sign up
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
