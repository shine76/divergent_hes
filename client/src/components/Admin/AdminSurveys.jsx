import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/surveyActions";
import { Link } from "react-router-dom";
class AdminSurveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  showSurveys = () => {
    return (
      <div className="container">
        <div className="row card">
          <div className="card-header text-center text-white bg-dark mb-3">
            <strong>Liste des évaluations actuelles</strong>
            <Link
              className="btn btn-success btn-sm"
              style={{ float: "right" }}
              to="/admin/surveys/new"
            >
              Créer nouvelle évaluation
            </Link>
          </div>
          <div className="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Titre</th>
                  <th scope="col">Nombre de questions</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.props.surveys.map((survey, i) => (
                  <tr>
                    <th scope="row">{i}</th>
                    <td> {survey.titre}</td>
                    <td>X</td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={`/admin/surveys/${survey._id}`}
                      >
                        Modifier/ajouter question
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  render() {
    if (!this.props.surveys) {
      return <div>Loading...</div>;
    }
    return <div>{this.showSurveys()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveyData.surveys,
  };
};

export default connect(mapStateToProps, { fetchSurveys })(AdminSurveys);
