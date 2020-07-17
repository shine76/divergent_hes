import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 10 }}>
        <div className="card">
          <div className="card-header text-center">
            <strong>Votre résultat</strong>
          </div>
          <div className="card-body text-center">
            <span>
              {" "}
              <strong>
                Vous avez réussi à garder {this.props.score} étudiants dans
                votre classe
              </strong>
            </span>
            <br />
            <hr />
            <div className="card col-md-8 offset-md-2">
              <div className="card-body">
                On sait depuis longtemps que travailler avec du texte lisible et
                contenant du sens est source de distractions, et empêche de se
                concentrer sur la mise en page elle-même. L'avantage du Lorem
                Ipsum sur un texte générique comme 'Du texte. Du texte. Du
                texte.' est qu'il possède une distribution de lettres plus ou
                moins normale, et en tout cas comparable avec celle du français
                standard.
              </div>
            </div>
            <br />
            <div>Voici un résumé de vos choix</div> <br />
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Votre choix</th>
                  <th scope="col">Conseil</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.map((choice) => (
                  <tr>
                    <th scope="row">{choice.question}</th>
                    <td>{choice.reponse}</td>
                    <td>
                      On sait depuis longtemps que travailler avec du texte
                      lisible et contenant du sens est source de distractions,
                      et empêche de se concentrer sur la mise en page elle-même.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  player = localStorage.getItem("pseudo");
  score = 22 + parseInt(localStorage.getItem("totalPoints"));

  render() {
    console.log(JSON.parse(localStorage.getItem("choices")));
    const choices = JSON.parse(localStorage.getItem("choices"));
    return (
      <React.Fragment>
        <div className="container">
          <ComponentToPrint
            ref={this.componentRef}
            data={choices}
            score={this.score}
          />

          <div className="row" style={{ marginTop: 15 }}>
            <div className="col-sm-12">
              <span className="col-md-4 col-sm-12 col-xs-12">
                <Link to={"/surveys"} className="btn btn-info">
                  Rejouer
                </Link>
              </span>

              <span className="col-md-4 col-xs-12">
                {" "}
                <Link to={"/score"} className="btn btn-secondary">
                  Voir les scores
                </Link>
              </span>
              <span className="col-md-4 col-xs-12">
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    exportComponentAsPDF(
                      this.componentRef,
                      (__filename = `Evaluation - (${this.player})`)
                    )
                  }
                >
                  Télécharger en Pdf
                </button>
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feedback;
