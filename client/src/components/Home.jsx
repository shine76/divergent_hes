import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="container text-center" style={{ marginTop: 10 }}>
        <div className="jumbotron" style={{ marginTop: 50 }}>
          Bienvenue sur la plateforme d'évaluation de la Haute école
        </div>
        <div style={{ marginTop: 100 }}>
          <Link className="btn btn-success btn-lg" to="/info">
            Cliquer pour continuer
          </Link>
        </div>
      </div>
    );
  }
}
export default Home;
