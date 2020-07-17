import React, { Component } from "react";
import NavBar from "../Admin/AdminNavBar";

class AdminLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container" style={{marginTop: 15}}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default AdminLayout;
