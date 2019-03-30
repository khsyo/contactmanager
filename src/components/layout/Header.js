import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Header(props) {
  const { branding } = props;
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
        <div className="container">
          <a href="/" className="navbar-brand">
            {branding}
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <small>
                    <i className="fas fa-home mr-1" />
                  </small>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact/add" className="nav-link">
                  <small>
                    <i className="fas fa-plus mr-1" />
                  </small>
                  Add Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <small>
                    <i className="fas fa-info mr-1" />
                  </small>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

Header.defaultProps = {
  branding: "My App"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
