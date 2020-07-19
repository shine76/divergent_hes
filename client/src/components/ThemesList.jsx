import React, { Component } from "react";
import { fetchThemes } from "../actions/themeActions";
import { connect } from "react-redux";

class ThemesList extends Component {
  componentDidMount() {
    this.props.fetchThemes();
  }

  showThemes = () => {
    return (
      <div className="container">
        <div className="row card">
          <div className="card-header text-center text-white bg-dark mb-3">
            <strong>Veuillez choisir le thème</strong>
          </div>
          <div className="card-body">
            {this.props.themes.map((theme, i) => (
              <a
                className="col-md-5 col-sm-5 col-xs-5 btn btn-secondary btn-lg text-white"
                style={{ margin: 20 }}
                href={`/themes/${theme._id}`}
              >
                {theme.nom}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (!this.props.themes) {
      return <div>Loading...</div>;
    }
    return <div style={{ marginTop: 10 }}>{this.showThemes()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    themes: Object.values(state.themeData),
  };
};

export default connect(mapStateToProps, { fetchThemes })(ThemesList);
