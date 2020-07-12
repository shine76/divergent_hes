import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurvey, clearSurvey } from "../../actions/surveyActions";
import { fetchQuestion } from "../../actions/questionActions";
import { setFiliereScore } from "../../actions/filiereActions";
import Question from "../Question";
import history from "../../history";

class SurveyShow extends Component {
  state = {
    questionPosition: 0,
    showStart: true,
    surveyTotal: 0,
  };

  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.id);

    // this.props.fetchQuestion("5ee9a778531d63ac080a37c7");
  }

  componentWillUnmount() {
    this.props.clearSurvey();
  }

  showSurvey = () => {
    if (!this.props.surv) {
      return <div> Loading...</div>;
    }
    const { surveyinfos } = this.props.surv.survey;
    //console.log(this.props.surv.survey.qlength);

    return (
      <div className="container">
        {/* <h2 className="alert alert-info text-center">{surveyinfos.titre}</h2> */}
        {/* <p className="jumbotron">{surveyinfos.description}</p> */}
      </div>
    );
  };

  startSurvey = () => {
    this.props.fetchQuestion(
      this.props.surv.survey.questionsids[this.state.questionPosition]
    );
    this.setState({
      questionPosition: this.state.questionPosition + 1,
      showStart: false,
    });
  };

  loadNextQuestion = (questionid) => {
    this.setState({
      questionPosition: this.state.questionPosition + 1,
    });
    this.props.fetchQuestion(
      this.props.surv.survey.questionsids[this.state.questionPosition]
    );
  };
  submitSurvey = () => {
    const id = localStorage.getItem("filiere");
    const total = 22 + parseInt(localStorage.getItem("totalPoints"));
    this.props.setFiliereScore(id, { score: total });
    history.push("/feedback");
  };
  render() {
    if (!this.props.surv.survey) {
      return <div> Loadingg...</div>;
    }
    const { question } = this.props.q;
    return (
      <div className="container text-center" style={{ marginTop: 10 }}>
        {this.showSurvey()}
        <br />
        {this.state.showStart ? (
          <div
            className="card border border-secondary text-center"
            style={{ backgroundColor: "#ecf0f1" }}
          >
            <div className="card-body" style={{ height: 600 }}>
              <h4 style={{ marginBottom: 70, marginTop: 15, color: "#2c3e50" }}>
                Questionnaire portant sur:{" "}
                {this.props.surv.survey.surveyinfos.titre}
              </h4>
              <div className="row">
                <div className="col-md-6">
                  <img src="/images/classe.jpg" alt="" className="img-fluid" />
                </div>
                <div className="col-md-6" style={{ marginTop: 90 }}>
                  <span style={{ color: "#34495e", fontSize: 18 }}>
                    Réussirez vous à garder vos élèves dans votre classe?
                    Cliquez sur le bouton en bas pour le découvrir
                  </span>
                </div>
              </div>
              <br />
              <button
                className="btn btn-warning btn-lg rounded"
                style={{ marginTop: 10 }}
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Commencer
              </button>
              <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title " id="exampleModalLongTitle">
                        Explications
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div>
                        Vous avez à votre disposition une salle de classe avec
                        22 élèves. Vos choix de réponses vous permettront à la
                        fin de l'évaluation de savoir combien d'élèves vous avez
                        réussi à garder dans votre classe.{" "}
                        <strong>
                          Vous aurez 2 types de questions à votre disposition:
                        </strong>{" "}
                        <br />
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            {" "}
                            le premier type se présentera simplement sous la
                            forme d'un sujet qui vous est présenté et pour
                            lequel vous devez faire un choix
                          </li>
                          <li className="list-group-item">
                            Chaque choix que vous faites vous fait attribuer un
                            certain nombre de points, ou retirer des points
                          </li>
                          <li className="list-group-item">
                            Le 2e type de questions se présentera sous la forme
                            de dialogue entre vous et votre classe
                          </li>
                          <li className="list-group-item">
                            Vos choix dans chaque situation déterminera le
                            nombre d'élèves qui restera après le jeu
                          </li>
                          <li className="list-group-item">
                            <strong>A vous de jouer!!</strong>
                          </li>
                        </ul>
                        <br />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.startSurvey()}
                        data-dismiss="modal"
                      >
                        Démarrer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Question
          data={question}
          totalSet={(points) => this.setTotal(points)}
        />
        {(this.props.surv.survey.qlength - this.state.questionPosition !== 0) &
        (this.props.surv.survey.qlength - this.state.questionPosition !==
          this.props.surv.survey.qlength) ? (
          <React.Fragment>
            <div style={{ float: "right", marginBottom: 15 }}>
              <span className="badge badge-warning" style={{ marginRight: 10 }}>
                Question {this.state.questionPosition} /
                {this.props.surv.survey.qlength}
              </span>
              <button
                className="btn btn-success  btn-sm"
                onClick={() => {
                  this.loadNextQuestion();
                }}
              >
                Suivant
              </button>
            </div>
          </React.Fragment>
        ) : null}

        {this.props.surv.survey.qlength - this.state.questionPosition === 0 ? (
          <div style={{ float: "right", marginBottom: 15 }}>
            <span className="badge badge-warning" style={{ marginRight: 10 }}>
              Question {this.state.questionPosition} /
              {this.props.surv.survey.qlength}
            </span>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => this.submitSurvey()}
            >
              Terminer
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surv: state.surveyData,
    q: state.questionData,
  };
};

export default connect(mapStateToProps, {
  fetchSurvey,
  fetchQuestion,
  clearSurvey,
  setFiliereScore,
})(SurveyShow);
