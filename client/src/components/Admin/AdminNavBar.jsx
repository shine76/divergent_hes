import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";

class AdminNavBar extends Component {
  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="/images/geslogo.png"
            alt=""
            className="img-fluid"
            style={{ width: 250 }}
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Surveys
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/admin/surveys" className="dropdown-item">
                  Liste des évaluations
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/admin/surveys/new" className="dropdown-item">
                 Nouvelle évaluation
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/filieres">
                Filières
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/scores">
                Scores
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                href="/"
                className="btn btn-danger"
                onClick={() => this.onLogoutClick()}
              >
                Déconnexion
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { logoutUser })(AdminNavBar);
