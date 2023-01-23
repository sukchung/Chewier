// Dependencies
import { NavLink } from "react-router-dom";
import NavCartButton from "./Cart/NavCartButton";

// CSS

export default function Nav(props) {
  const { countCartItems } = props;

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
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/signup"
              >
                Sign up
              </NavLink>
            </li>
            <li>
              <NavCartButton
                onClick={props.onShowCart}
                countCartItems = {countCartItems}
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
