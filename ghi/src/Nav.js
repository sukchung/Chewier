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
    <nav className="navbar navbar-expand-lg navbar-light bg-purple">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Chewier
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/products"
              >
                Products
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!loggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/signup"
                >
                  Sign up
                </NavLink>
              </li>
            )}
            {loggedIn ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
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
