import React, { Component } from "react";

class UserLayout extends Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default UserLayout;
