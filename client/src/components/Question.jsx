import React, { Component } from "react";
import { connect } from "react-redux";
import Reponses from "./Reponses";

import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Step from "./Step";
import Dialog from "./Dialog";
class Question extends Component {
  state = {
    total: 0,
    students: [],
    studentLeaving: 0,
    choosenId: 1,
    choices: [],
  };
  componentDidMount() {
    localStorage.setItem("totalPoints", this.state.total);
    this.setStudents();
    // this.removeStudent();
  }

  showQuestion = () => {
    const { data } = this.props;

    return (
      <div>
        {/* Points: {22 + this.state.total} */}
        <p className="jumbotron">{data.question.description}</p>
        <br />
        <p style={{ textAlign: "center" }}>
          <strong>{data.question.titre}</strong>
        </p>
        <br />
        <div className="col-md-10 offset-md-1 ">
          <Reponses
            answers={data.responses}
            max={data.question.maxPoints}
            getPoint={(point) => this.setTotal(point)}
            getChoices={(choice) => this.getUserChoices(choice)}
          />
        </div>
        <br />
      </div>
    );
  };

  setStudents = () => {
    let totalStudents = 22 + this.state.total;
    let students = [];

    for (let i = 1; i <= totalStudents; i++) {
      let rand = Math.floor(Math.random() * 20);

      if ((i + rand) % 2 === 0) {
        students.push("mstudent.png");
      } else {
        students.push("fstudent.png");
      }
    }
    this.setState({
      students: [...this.state.students, ...students],
    });
  };

  removeStudent = (studentNumber) => {
    let st = [...this.state.students];
    let i = 0;

    if (studentNumber !== 0) {
      let interval = setInterval(() => {
        st.pop();
        this.setState({
          students: st,
          studentLeaving: studentNumber,
        });
        i++;

        if (i === studentNumber) {
          clearInterval(interval);
          document.getElementById("sclass").click();
          setTimeout(() => {
            document.getElementById("sclass").click();
          }, 7000);
        }
      }, 1000);
    }
  };

  showStudents = () => {
    return (
      <div className="row">
        {this.state.students.map((student) => {
          return (
            <div className="col-md-6">
              <div className="card-body">
                <img src={`/images/${student}`} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /*style={{
                backgroundColor:
                  this.state.addStyleColor !== false ? "red" : "white",
              }} */

  popover = () => (
    <Popover id="popover-basic">
      <Popover.Title
        as="h3"
        className={`text-center text-white ${
          this.state.studentLeaving > 1 ? "bg-danger" : "bg-primary"
        }`}
      >
        OOOUUUPS
      </Popover.Title>
      <Popover.Content>
        <strong>{this.state.studentLeaving}</strong>{" "}
        {this.state.studentLeaving === 1
          ? "étudiant a quitté votre classe"
          : "étudiants ont quitté votre classe"}
      </Popover.Content>
    </Popover>
  );

  setStudentLeaving = () => {
    return this.state.studentLeaving;
  };

  setTotal = (points) => {
    this.setState({
      total: this.state.total + points,
    });
    let total = parseInt(localStorage.getItem("totalPoints")) + points;
    localStorage.setItem("totalPoints", total);

    this.removeStudent(points * -1);
  };

  getUserChoices = (answer) => {
    let data = [];

    if (answer.points < 0) {
      data.push({
        question: `${this.state.choosenId}`,
        reponse: answer.notes,
      });
      this.setState({
        choices: [...this.state.choices, ...data],
      });
    }
    this.setState({
      choosenId: this.state.choosenId + 1,
    });
  };

  render() {
    if (!this.props.data) {
      return <div></div>;
    }
    const { type } = this.props.data.question;
    localStorage.setItem("choices", JSON.stringify(this.state.choices));
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-2 card">
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={this.popover()}
            >
              <div
                className={`card-header text-white ${
                  22 + this.state.total < 15 ? "bg-danger" : "bg-success"
                }  mb-3 `}
                id="sclass"
                style={{ padding: "0.5rem 1rem" }}
              >
                Votre classe <br />
                <span class="badge badge-dark">
                  {22 + this.state.total}
                </span>{" "}
                étudiant-es
              </div>
            </OverlayTrigger>
            {this.showStudents()}
          </div>
          <div className="col-md-10">
            {/* <button onClick={() => this.removeStudent()}>Remove</button> */}
            {type ? (
              this.showQuestion()
            ) : (
              <Dialog
                getPoint={(point) => this.setTotal(point)}
                getChoices={(choice) => this.getUserChoices(choice)}
                // data={this.props.data}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {})(Question);
