import React, { Component } from "react";
import { Link } from "react-router-dom";
import { exportComponentAsPDF } from "react-component-export-image";
import { connect } from "react-redux";
import { fetchFeedback } from "../actions/feedbackActions";

class ComponentToPrint extends React.Component {
  showStatus = () => {
    if (this.props.feedb.code === "A") {
      return "badge badge-danger";
    } else if (this.props.feedb.code === "B") {
      return "badge badge-warning";
    } else if (this.props.feedb.code === "C") {
      return "badge badge-info";
    } else {
      return "badge badge-success";
    }
  };
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
                <span className={this.showStatus()}>
                  <strong>{this.props.feedb.status}</strong>
                </span>{" "}
                <br />
                {this.props.feedb.texte} <br />
                <strong>
                  Le texte à afficher est paramettrable en fonction du score
                  obtenu
                </strong>
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
  componentRef = React.createRef();

  componentDidMount() {
    let score = 22 + parseInt(localStorage.getItem("totalPoints"));
    if (score > 0 && score < 5) {
      this.props.fetchFeedback("A");
    } else if (score >= 5 && score < 10) {
      this.props.fetchFeedback("B");
    } else if (score >= 10 && score < 15) {
      this.props.fetchFeedback("C");
    } else {
      this.props.fetchFeedback("D");
    }
  }

  player = localStorage.getItem("pseudo");
  score = 22 + parseInt(localStorage.getItem("totalPoints"));

  render() {
    if (!this.props.feedback) {
      return <div></div>;
    }
    const choices = JSON.parse(localStorage.getItem("choices"));
    return (
      <React.Fragment>
        <div className="container">
          <ComponentToPrint
            ref={this.componentRef}
            data={choices}
            score={this.score}
            feedb={this.props.feedback}
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

const mapStateToProps = (state) => {
  return {
    feedback: state.feedbackData.feedback,
  };
};
export default connect(mapStateToProps, { fetchFeedback })(Feedback);
