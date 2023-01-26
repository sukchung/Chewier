// Dependencies
import { useState, useEffect } from "react";
import { useToken } from "./Auth";
import { NavLink, useNavigate } from "react-router-dom";
import NavCartButton from "./Cart/NavCartButton";

// CSS
import "./Styles/Nav.css";
// import addtocart from "./Images/addtocart.png";

export default function Nav(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, , logout] = useToken();
  const { countCartItems } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  function handleLogout(event) {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light backgroundnav py-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white chewierfont" to="/">
          Chewier
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item navsize">
              <NavLink
                className="nav-link active text-white"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown navsize">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </a>
              <div className="dropdown-menu">
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </NavLink>
                <NavLink className="dropdown-item" to="/custom">
                  Customize Your Own
                </NavLink>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!loggedIn && (
              <li className="nav-item navbarspacing">
                <NavLink
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/signup"
                >
                  Sign up
                </NavLink>
              </li>
            )}
            {loggedIn ? (
              <li className="nav-item dropdown navsize navbarspacing">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <div className="dropdown-menu">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/account"
                  >
                    View Account
                  </NavLink>
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/petslist"
                  >
                    View Your Pets
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    className="nav-link active bg-light logout dropdown-item"
                    aria-current="page"
                    to="/"
                  >
                  Logout
                  </NavLink>
                </div>
              </li>
            ) : (
              <li className="nav-item navbarspacing">
                <NavLink
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )}
            <li>
              <NavCartButton
                onClick={props.onShowCart}
                countCartItems={countCartItems}
                className="nav-link active"
                to="/cart"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
