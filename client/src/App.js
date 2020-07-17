import React, { Component } from "react";
import Surveys from "./components/Surveys";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
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
import StepEdit from "./components/Survey/Questions/Steps/StepEdit";
import LoginUser from "./components/auth/LoginUser";
import UserLayout from "./components/Layouts/UserLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import { connect } from "react-redux";
import Admin from "./components/Admin/Admin";
import AdminSurveys from "./components/Admin/AdminSurveys";

class App extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <React.Fragment>
          <div>
            <Router history={history}>
              <AdminLayout>
                <ToastContainer />
                <Switch>
                  <Route
                    exact
                    path="/admin/surveys/new"
                    component={SurveyCreate}
                  />
                  <Route
                    exact
                    path="/admin/surveys/:id"
                    component={SurveyEdit}
                  />

                  <Route exact path="/admin/surveys" component={AdminSurveys} />
                  <Route exact path="/admin/" component={Admin} />
                </Switch>
              </AdminLayout>
            </Router>
          </div>
        </React.Fragment>
      );
    }

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

        <div style={{ marginTop: 10 }}>
          <Router history={history}>
            <UserLayout>
              <Switch>
                <Route exact path="/surveys/:id" component={SurveyShow} />

                <Route exact path="/surveys" component={Surveys} />
                <Route
                  exact
                  path="/questions/:id/step/:stepid"
                  component={StepEdit}
                />
                <Route exact path="/questions/:id" component={QuestionEdit} />
                <Route exact path="/info" component={Information} />
                <Route exact path="/feedback" component={Feedback} />
                <Route exact path="/dialog" component={Dialog} />
                <Route exact path="/score" component={Score} />
                <Route exact path="/auth/login" component={LoginUser} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
              </Switch>
            </UserLayout>
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(App);
