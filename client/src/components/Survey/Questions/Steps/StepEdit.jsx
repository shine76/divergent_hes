import React, { Component } from "react";
import Teacher from "./Teacher";
import Student from "./Student";
import { connect } from "react-redux";
import {
  addTeacherText,
  addStudentText,
} from "../../../../actions/questionActions";

class StepEdit extends Component {
  saveTeacherText = (formData) => {
    this.props.addTeacherText(
      this.props.match.params.id,
      this.props.match.params.stepid,
      formData
    );
  };
  saveStudentText = (formData) => {
    this.props.addStudentText(
      this.props.match.params.id,
      this.props.match.params.stepid,
      formData
    );
  };

  render() {
    console.log(this.props.match.params);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Teacher data</div>
              <div className="card-body">
                <Teacher submitText={(texte) => this.saveTeacherText(texte)} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Student data</div>
              <div className="card-body">
                <Student submitText={(texte) => this.saveStudentText(texte)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { addTeacherText, addStudentText })(
  StepEdit
);
