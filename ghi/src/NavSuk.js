import { NavLink } from "react-router-dom";

export default function NavSuk() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-purple">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Chewier
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/accounts/new"
              >
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
