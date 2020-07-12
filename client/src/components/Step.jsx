import React, { Component } from "react";
import "./dialog.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, Slide, Zoom, Flip, Bounce } from "react-toastify";

export default class Step extends Component {
  state = {
    steps: this.props.data.steps, // all steps
    step: {}, // Current step
    stepId: 0,
    nextSpeaker: "teacher",
    dialogData: [],
    showQuestion: false,
    responseDownId: 0,
    responseUpId: 1,
    endScenario: {
      status: false,
      text: "",
      correct: false,
    },
    responses: this.props.data.responses,
    teacher_counter: 0,
    student_counter: 0,
    showModal: false,
    timer: 6000,
    noteToShow: "",
    responseSelectedId: null,
    scrollCounter: 0,
    responseClassName: "",
    showWaiting: false,
  };

  componentDidMount() {
    // Set Start with step 1 (Get data for the first step)
    this.setStep(this.state.steps[this.state.stepId]);

    setTimeout(() => {
      this.manageDialogData(this.state.step);
    }, 500);
  }
  setStep = (step) => {
    this.setState({
      step: step,
    });
    setTimeout(() => {
      this.setState({
        showWaiting: true,
      });
    }, 1000);
  };

  setStepID = () => {
    this.setState({
      stepId: this.state.stepId + 1,
    });
  };

  showElipsis = () => {
    return (
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };

  manageDialogData = (step) => {
    let interval = setInterval(() => {
      let data = [];
      this.counter++;
      //Vérifier qui parle
      if (this.state.nextSpeaker === "teacher") {
        // Le prof parle
        if (step.teacher.length > this.state.teacher_counter) {
          let textLength = 0;
          if (step.teacher[this.state.teacher_counter + 1] !== undefined) {
            textLength = step.teacher[this.state.teacher_counter].text.length;
          }

          data.push({
            speaker: "teacher",
            text: step.teacher[this.state.teacher_counter].text,
          });

          this.setState({
            dialogData: [...this.state.dialogData, ...data],
            timer:
              textLength <= 200
                ? 6000
                : textLength > 200 && textLength <= 300
                ? 8000
                : 6000,
            showWaiting: false,
          });

          let elem = document.getElementById(
            `text_${this.state.teacher_counter}`
          );
          elem.scrollIntoView();

          // arreter le dialogue si une question doit être posée
          if (step.teacher[this.state.teacher_counter].askQuestion) {
            setTimeout(() => {
              this.setState({
                showQuestion: true,
                showModal: true,
                showWaiting: false,
              });
            }, this.state.timer - 1000);

            clearInterval(interval);
          }

          // set the next speaker
          if (step.teacher[this.state.teacher_counter].studentNext) {
            // next speaker is student
            this.setState({
              nextSpeaker: "student",
            });
            setTimeout(() => {
              this.setState({
                showWaiting: true,
              });
            }, 1000);
            if (this.state.teacher_counter !== 0) {
              this.setState({
                student_counter: this.state.student_counter + 1,
              });
              this.scounter++;
            }
          } else {
            this.setState({
              nextSpeaker: "teacher",
              teacher_counter: this.state.teacher_counter + 1,
              showWaiting: true,
            });
          }
        }
      } else {
        console.log("Etudiant parle");
        // L'étudiant-e parle

        if (step.student.length > this.state.student_counter) {
          let textLength = 0;
          if (step.student[this.state.student_counter + 1] !== undefined) {
            textLength = step.student[this.state.student_counter].text.length;
          }

          data.push({
            speaker: "student",
            text: step.student[this.state.student_counter].text,
          });

          this.setState({
            dialogData: [...this.state.dialogData, ...data],
            timer:
              textLength <= 200
                ? 6000
                : textLength > 200 && textLength <= 300
                ? 9000
                : 6000,
            showWaiting: false,
          });

          // scroll to the student message view
          let elem = document.getElementById(
            `text_${this.state.student_counter}`
          );

          elem.scrollIntoView();

          if (step.student[this.state.student_counter].askQuestion) {
            this.setState({
              showQuestion: true,
            });
            clearInterval(interval);
          }

          if (step.student[this.state.student_counter].teacherNext) {
            this.setState({
              nextSpeaker: "teacher",
              teacher_counter: this.state.teacher_counter + 1,
            });
            setTimeout(() => {
              this.setState({
                showWaiting: true,
              });
            }, 1000);
            this.tcounter++;
          } else {
            this.setState({
              nextSpeaker: "student",
              student_counter: this.state.student_counter + 1,
            });
          }
        }
      }
    }, this.state.timer);
  };

  checkEventNextStep = () => {
    this.setStepID();
    setTimeout(() => {
      this.setStep(this.state.steps[this.state.stepId]);
      /*       this.setState({
      dialogData: [],
    }); */
      this.setState({
        teacher_counter: -1,
        student_counter: 0,
      });
      this.setResponsesId();
    }, 1000);

    setTimeout(() => {
      if (this.state.endScenario.status === false) {
        this.manageDialogData(this.state.step);
      }
    }, 4000);
  };

  setResponsesId = () => {
    this.setState({
      responseDownId: this.state.responseDownId + 2,
      responseUpId: this.state.responseUpId + 2,
      showQuestion: false,
    });
  };

  endGame = () => {
    return (
      <div>
        {this.state.endScenario.correct ? (
          <div style={{ color: "green" }}>{this.state.endScenario.text}</div>
        ) : (
          <div style={{ color: "red" }}>{this.state.endScenario.text}</div>
        )}
      </div>
    );
  };

  showSelected = () => {
    if (this.state.responseSelectedId && this.state.noteToShow) {
      toast(this.state.noteToShow, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4500,
        transition: Zoom,
        type: this.state.responseClassName,
        //className: "alert alert-success",
        //progressClassName: "pp-pgs-wrn",
      });
    }
  };

  continueOrStop = (response) => {
    this.setState({
      responseSelectedId: response.id,
      noteToShow: response.notes,
    });
    setTimeout(() => {
      if (response.endGame === true) {
        this.setState({
          endScenario: {
            status: true,
            correct: true,
            text: "Vous pouvez cliquer sur suivant pour continuer le jeu",
          },
          responseClassName: "success",
        });
      } else if (response.points === this.props.data.ques.maxPoints) {
        this.setState({
          endScenario: {
            status: true,
            correct: false,
            text:
              "Votre choix a provoqué l'arrêt du scénario, veuillez cliquer sur suivant pour continuer le jeu",
          },
          responseClassName: "error",
        });
      } else if (response.points === 0) {
        this.setState({
          endScenario: {
            status: true,
            correct: true,
            text: "Vous pouvez cliquer sur suivant pour continuer le jeu",
          },
          responseClassName: "success",
        });
      } else {
        this.checkEventNextStep();
      }
    }, 4600);
    setTimeout(() => {
      this.setState({ noteToShow: "" });
    }, 200);
  };

  setResponseClassName = (response) => {
    console.log(response.points);
    if (
      this.state.responseSelectedId === response.id &&
      response.points === this.props.data.ques.maxPoints
    ) {
      return "btn-danger";
    } else if (
      this.state.responseSelectedId === response.id &&
      response.points === -1
    ) {
      return "btn-warning";
    }
    return "btn-info";
  };

  render() {
    if (!this.state.step) {
      return <div>Loading</div>;
    }
    console.log(this.props.data.ques.maxPoints);
    return (
      <div className="container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Description</h5>
            <p class="card-text">
              Cette scène se passe dans une de vos salles de classe. Observez le
              dialogue et faites le choix d'une proposition lorsqu'elles
              apparaitront
            </p>
          </div>
        </div>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="mesgs">
              <div className="msg_history">
                <ShowStep step={this.state.dialogData} />
              </div>
            </div>
          </div>
        </div>
        {this.state.showQuestion ? (
          <ShowQuestion
            responses={this.state.responses}
            down={this.state.responseDownId}
            up={this.state.responseUpId}
            continueStep={(response) => this.continueOrStop(response)}
            modal={this.state.showModal}
            respClassName={(response) => this.setResponseClassName(response)}
            setPoints={(points) => this.props.getPoint(points)}
          />
        ) : null}

        {/*  {this.state.endScenario.status ? this.endGame() : null} */}
        {this.showSelected()}
        {this.state.showWaiting ? this.showElipsis() : null}
      </div>
    );
  }
}

const ShowStep = ({ step }) => {
  return step.map(({ speaker, text }, i) => (
    <div key={i} id={`text_${i}`}>
      {speaker === "teacher" ? (
        <div className="incoming_msg">
          <div className="incoming_msg_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{text}</p>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="outgoing_msg">
            <div className="sent_msg">
              <p>{text}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  ));
};

const ShowQuestion = ({
  responses,
  down,
  up,
  continueStep,
  modal,
  respClassName,
  setPoints,
}) => {
  // 0 , 1
  let data = [];
  for (let i = down; i <= up; i++) {
    data.push(responses[i]);
  }
  return (
    <div class="card bg-light mb-3" style={{ marginBottom: 15 }}>
      <div class="card-header text-center">
        <strong>Veuillez faire un choix</strong>
      </div>
      <div class="card-body" style={{ padding: 0 }}>
        <div className="row">
          {data.map((resp, i) => (
            <div className="col-md-5" key={i} style={{ marginLeft: 40 }}>
              <button
                className={`btn ${respClassName(resp)}`}
                style={{ margin: 15, height: 100, width: 300 }}
                onClick={() => {
                  continueStep(resp);
                  setPoints(resp.points);
                }}
              >
                {resp.texte}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
