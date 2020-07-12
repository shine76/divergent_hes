import React, { Component } from "react";
import Surveys from "./components/Surveys";
import { Router, Route, Switch, Link } from "react-router-dom";
import history from "./history";
import Home from "./components/Home";
import Information from "./components/Information";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feedback from "./components/Feedback";
import Score from "./components/Score";
import Dialog from "./components/Dialog";
import SurveyCreate from "./components/SurveyCreate";
import SurveyShow from "./components/Survey/SurveyShow";
import SurveyEdit from "./components/Survey/SurveyEdit";
import QuestionEdit from "./components/Survey/Questions/QuestionEdit";

class App extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <ToastContainer />
        <div className="text-center">
          <a href="/">
            <img
              src="/images/geslogo.png"
              alt=""
              className="img-fluid"
              style={{ width: 400 }}
            />
          </a>
        </div>

        <Router history={history}>
          <Switch>
            <Route exact path="/surveys/new" component={SurveyCreate} />
            <Route exact path="/surveys/:id" component={SurveyShow} />
            <Route exact path="/surveys/:id/edit" component={SurveyEdit} />
            <Route exact path="/surveys" component={Surveys} />
            <Route exact path="/questions/:id" component={QuestionEdit} />
            <Route exact path="/info" component={Information} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/dialog" component={Dialog} />
            <Route exact path="/score" component={Score} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
