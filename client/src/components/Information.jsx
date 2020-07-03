import React, { Component } from "react";
import { Link } from "react-router-dom";

class Information extends Component {
  render() {
    return (
      <div className="container text-center" style={{ marginTop: 10 }}>
        <h4>Description du projet et du jeu</h4>
        <br />
        <div className="row" style={{ marginTop: 30 }}>
          <div className="col-md-6 card">
            <div className="card-body">
              La HES SO dans son ambition de donner la chance à tous ces
              étudiants à mis en place le projet <strong>Divergent</strong>.
              Cette application va vous permettre de vous évaluer dans le cadre
              de l'intégration de la diversité et du genre dans vos cours.{" "}
              <br />
              Le jeu est composé de plusieurs thèmes et chaque thème est composé
              de plusieurs questions ou scénarios de dialogues. Une fois
              l'évaluation terminée, vous aurez un retour sur les choix que vous
              aurez fait.
            </div>
          </div>
          <div className="col-md-6">
            <img src="/images/Bulles.jpg" alt="" className="img-fluid" />
          </div>
        </div>

        <div style={{ marginTop: 100 }}>
          <Link className="btn btn-success btn-lg" to="/login">
            Continuer
          </Link>
        </div>
      </div>
    );
  }
}

export default Information;
