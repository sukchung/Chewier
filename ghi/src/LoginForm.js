import classes from "./LoginForm.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./Auth";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

const LogInForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsvalid, setFormIsValid] = useState(false);
  const [,login] = useToken();


  //   const registerHandler = (event) => {
  //     event.preventDefault();
  //     console.log("Clicked!");
  //     navigate("/signup");
  //   }
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await login(enteredEmail, enteredPassword);
      navigate("/");
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
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <h3 className="display-5">Sign In</h3>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!formIsvalid}
          >
            Login!
          </button>
        </div>
        <div className="text-center">
          <p>
            Not a Chewier member? <a href="#!">Sign up!</a>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default LogInForm;
