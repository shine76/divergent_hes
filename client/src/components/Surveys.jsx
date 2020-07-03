import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../actions/surveyActions";


class Surveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  showSurveys = () => {
    return (
      <div className="row card">
        <div className="card-header text-center text-white bg-dark mb-3">
          <strong>Veuillez choisir le thème</strong>
        </div>
        <div className="card-body">
          {this.props.surveys.map((survey, i) => (
            <a
              className="col-md-5 col-sm-5 col-xs-5 btn btn-secondary btn-lg text-white"
              style={{ margin: 20 }}
              href={`/surveys/${survey._id}`}
            >
              {survey.titre}
            </a>
          ))}
        </div>
      </div>
    );
  };

  render() {
    if (!this.props.surveys) {
      return <div>Loading...</div>;
    }
    return <div style={{ marginTop: 10 }}>{this.showSurveys()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveyData.surveys,
  };
};

export default connect(mapStateToProps, { fetchSurveys })(Surveys);
