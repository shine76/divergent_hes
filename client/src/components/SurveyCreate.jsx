import React, { Component } from "react";
import SurveyForm from "./SurveyForm";

export default class SurveyCreate extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-md-7 offset-md-3" style={{ marginTop: 10 }}>
          <div class="card">
            <h5 class="card-header text-center">
              Ajouter une nouvelle évaluation
            </h5>
            <div class="card-body">
              <SurveyForm />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
