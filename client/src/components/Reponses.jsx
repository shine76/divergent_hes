import React, { Component } from "react";
import { fetchSurvey } from "../actions/surveyActions";
import { connect } from "react-redux";
import { toast, Slide, Zoom, Flip, Bounce } from "react-toastify";

class Reponses extends Component {
  componentDidMount() {
    //document.body.style.backgroundColor = "#e74c3c";
    //  this.props.fetchSurvey();
  }
  state = {
    noteToShow: "",
    selected: {
      id: null,
      enable: false,
    },
    choices: [],
    toastClass: "",
  };

  showSupplResponses = (answer) => {
    const { supplementResponses } = answer;
    //console.log(supplementResponses);
    if (this.state.selected.enable) {
      return supplementResponses.map((answer, i) => (
        <div key={i} className="col-md-10 offset-md-1">
          <button
            className={`col-md-12 btn ${this.setClassName(answer)}`}
            style={{ margin: 5 }}
            onClick={() => {
              // this.onSelected(answer.notes);
              this.setState({
                /* selected: {
                  id: answer._id,
                  enable: answer.supplement,
                },*/
              });
              this.getAnswerAndSetClasses(answer);
              this.props.getPoint(answer.points);
              this.getUserChoices(answer.code);
            }}
            disabled={this.state.selected.id === answer._id}
          >
            {answer.texte}
          </button>
        </div>
      ));
    }
  };

  getUserChoices = (answer) => {
    let q = 0;
    let data = [];
    data.push({ question: `question${q + 1}`, answer });
    this.setState({
      choices: [...this.state.choices, ...data],
    });
  };

  showResponses = () => {
    const { answers } = this.props;
   // console.log(answers);
    return answers.map((answer, i) => (
      <React.Fragment key={i}>
        <button
          className={`col-md-12 btn ${this.setClassName(answer)}`}
          style={{ margin: 5 }}
          onClick={() => {
            this.getAnswerAndSetClasses(answer);
            this.props.getPoint(answer.points);
            this.getUserChoices(answer.code);
          }}
          disabled={this.state.selected.id === answer._id}
        >
          {answer.texte}
        </button>
        {answer.supplement ? this.showSupplResponses(answer) : null}
      </React.Fragment>
    ));
  };

  emptyNotes = () => {
    setTimeout(() => {
      this.setState({ noteToShow: "" });
    }, 2000);
  };

  getAnswerAndSetClasses = (answer) => {
    this.setState({
      selected: {
        id: answer._id,
        enable: answer.supplement,
      },
      noteToShow: answer.notes,
    });
    setTimeout(() => {
      this.setState({ noteToShow: "" });
    }, 500);
  };

  setClassName = (answer) => {
    if (
      answer._id === this.state.selected.id &&
      answer.points === this.props.max
    ) {
      return "btn-danger";
    } else if (
      answer._id === this.state.selected.id &&
      answer.points !== 0 &&
      answer.points !== this.props.max
    ) {
      return "btn-warning";
    } else if (answer._id === this.state.selected.id && answer.points === 0) {
      return "btn-success";
    }
    return "btn-info";
  };

  setToastClassName = (answer) => {
    return "success";
  };

  showSelected = () => {
   // console.log(this.state.toastClass);
    if (this.state.selected.id && this.state.noteToShow) {
      toast(this.state.noteToShow, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        transition: Zoom,
        type: "dark",
        //className: "alert alert-success",
        //progressClassName: "pp-pgs-wrn",
      });
    }
  };

  showChoices = () => {
    return this.state.choices.map((choice) => (
      <div>
        {choice.question} | {choice.answer}
      </div>
    ));
  };

  render() {
   // console.log(this.state.choices);
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            {this.showResponses()}

            {/*this.showChoices()*/}
          </div>
        </div>
        {this.showSelected()}
      </React.Fragment>
    );
  }
}

export default connect(null, {})(Reponses);
