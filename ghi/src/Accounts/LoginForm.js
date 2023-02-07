import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useToken } from "../Auth";

import classes from "../Styles/LoginForm.module.css";
import pawprint1 from "../Images/pawprint1.png";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

const LogInForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [, setPasswordIsValid] = useState();
  const [, setFormIsValid] = useState(false);
  const [, login] = useToken();

  const navigate = useNavigate();

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

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length >= 6);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4 smaller-container">
          <div className="container1">
            <h2 style={{ fontSize: "34px" }} className="heading">
              Log in
            </h2>
            <img src={pawprint1} className="icon" alt="icon" />
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
            <button
              id="button-purple"
              className="btn bg-violet-500 text-slate-100"
            >
              Log in
            </button>
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
