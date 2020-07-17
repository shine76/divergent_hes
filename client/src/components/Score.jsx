import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFilieres } from "../actions/filiereActions";

class Score extends Component {
  componentDidMount() {
    this.props.fetchFilieres();
  }

  showFilieres = () => {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Filière</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {this.props.filieres.map((filiere) => (
            <tr className={`alert  ${this.setClassName(filiere)}`}>
              <td>{filiere.nom}</td>
              <td>
                <strong>{filiere.score}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  setClassName = (fil) => {
    let filiere = localStorage.getItem("filiere");
    if (filiere === fil._id) {
      return "alert-success";
    }
  };

  render() {
    if (!this.props.filieres) {
      return <div></div>;
    }
    return (
      <div className="container" style={{ marginTop: 10 }}>
        <h5 className="text-center">Scoring</h5>
        {this.showFilieres()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filieres: Object.values(state.filiereData),
  };
};
export default connect(mapStateToProps, { fetchFilieres })(Score);
