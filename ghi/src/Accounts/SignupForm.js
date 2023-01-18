// Dependencies
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// CSS
import "../Styles/SignupForm.css";
import pawprint from "../Images/pawprint.png";

export default function SignupForm() {
  const [signUp, setSignUp] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    passwordConfirmation: "",
  });

  const navigate = useNavigate();

  function confirmEmail(email) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        navigate("/login");
      } else if (!response.ok) {
        const message = `${response.status}: ${response.statusText}`;
        throw new Error(message);
      }
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4 smaller-container">
          <div className="container">
            <h2 className="heading">Sign up</h2>
            <img src={pawprint} className="icon" alt="icon" />
          </div>
          <form onSubmit={handleSubmit} id="create-signup-form">
            <div className="form-floating mb-3 input-sm">
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
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={signUp.password}
                className="form-control"
                required
              />
              <label htmlFor="password">Password (8-20 characters)</label>
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
            <button id="button-purple" className="btn button-purple">
              Sign up
            </button>
            <div>
              <div></div>
              <p className="spacing">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="active login-font purple-text hover-underline-animation"
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
