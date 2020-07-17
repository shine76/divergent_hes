import React, { Component } from "react";
import FiliereForm from "./FiliereForm";
import { connect } from "react-redux";
import { fetchFilieres } from "../../actions/filiereActions";

class Filieres extends Component {
  componentDidMount() {
    this.props.fetchFilieres();
  }

  showFilieres = () => {
    return (
      <div className="card">
        <div className="card-header text-center">
          <strong>Liste des filières</strong>{" "}
          <span className="badge badge-dark">
            {" "}
            {this.props.filieres.length}
          </span>
        </div>
        <div className="card-body">
          <ul class="list-group">
            {this.props.filieres.map((filiere, i) => {
              return (
                <div key={i}>
                  <li class="list-group-item"> {filiere.nom}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
  render() {
    if (!this.props.filieres) {
      return <div></div>;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-7"> {this.showFilieres()}</div>
          <div className="col-md-5" style={{ marginTop: 10 }}>
            <div class="card">
              <h5 class="card-header text-center">
                Ajouter une nouvelle filière
              </h5>
              <div class="card-body">
                <FiliereForm />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filieres: Object.values(state.filiereData),
  };
};

export default connect(mapStateToProps, { fetchFilieres })(Filieres);
