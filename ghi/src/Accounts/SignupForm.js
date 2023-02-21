import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useToken } from "../Auth";

import "../Styles/SignupForm.css";

export default function SignupForm() {
  const [signUp, setSignUp] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    passwordConfirmation: "",
  });
  const [, login] = useToken();

  const navigate = useNavigate();

  function confirmEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const lowercaseEmail = String(email).toLowerCase();
    return regex.test(lowercaseEmail);
  }

  function confirmPassword(password, passwordConfirmation) {
    return password === passwordConfirmation;
  }

  function passwordCharacters(password) {
    return password.length >= 8 && password.length <= 20;
  }

  function handleChange(event) {
    setSignUp((prevSignUp) => {
      return {
        ...signUp,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!confirmPassword(signUp.password, signUp.passwordConfirmation)) {
      alert("Passwords do not match.");
    } else if (!confirmEmail(signUp.email)) {
      alert("Invalid email format");
    } else if (!passwordCharacters(signUp.password)) {
      alert("Password must have 8-20 characters.");
    } else {
      const formData = signUp;
      delete formData.passwordConfirmation;

      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/accounts`;
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        event.target.reset();
        setSignUp({
          first_name: "",
          last_name: "",
          email: "",
          address: "",
          password: "",
          passwordConfirmation: "",
        });
        await login(signUp.email, signUp.password);
        navigate("/");
      } else if (!response.ok) {
        const message = `${response.status}: ${response.statusText}`;
        throw new Error(message);
      }
    }
  }

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6">
        <div className="mt-4">
          <div className="container-form">
            <h2 className="heading">
              Sign Up
            </h2>
          </div>
          <form onSubmit={handleSubmit} id="create-signup-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="First Name"
                type="text"
                name="first_name"
                id="first_name"
                value={signUp.first_name}
                className="form-control"
                required
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Last Name"
                type="text"
                name="last_name"
                id="last_name"
                value={signUp.last_name}
                className="form-control"
                required
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Email"
                type="text"
                name="email"
                id="email"
                value={signUp.email}
                className="form-control"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Password (8-20 characters)"
                type="password"
                name="password"
                id="password"
                value={signUp.password}
                className="form-control"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Confirm Password"
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={signUp.passwordConfirmation}
                className="form-control"
                required
              />
              <label htmlFor="passwordConfirmation">Confirm Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Address"
                type="address"
                name="address"
                id="address"
                value={signUp.address}
                className="form-control"
                required
              />
              <label htmlFor="address">Address</label>
            </div>
            <button
              className="btn purple-button"
            >
              Sign up
            </button>
            <div>
              <p className="spacing">
                Already have a Chewier account?{" "}
                <NavLink
                  to="/login"
                  className="active login-font purple-text purple-hover"
                >
                  Log in
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
