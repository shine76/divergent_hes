import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    //backgroundColor: "#E4E4E4",
    flexWrap: "wrap",
    marginTop: 8,
    marginLeft: 8,
  },
});

class Feedback extends Component {
  player = localStorage.getItem("pseudo");
  score = 22 + parseInt(localStorage.getItem("totalPoints"));

  pdfLink = () => (
    <PDFDownloadLink
      document={this.MyDocument()}
      fileName={`Evaluation - ${this.player}`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <React.Fragment>
            {/* <Spinner animation="grow" variant="info" /> */}
            <span className="sr-only">Loading...</span>
          </React.Fragment>
        ) : (
          <button to="/" className="btn btn-success">
            Télécharger maintenant
          </button>
        )
      }
    </PDFDownloadLink>
  );

  // Create Document Component
  MyDocument = () => {
    // this.setState({
    //   score: 22 + parseInt(localStorage.getItem("totalPoints")),
    // });
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              marginLeft: 150,
              marginBottom: 2,
              //width: 135,
              // height: 116,
            }}
          >
            <Text>------Feedback du joueur {this.player}------</Text>
          </View>
          <View
            style={{
              border: 2,
              marginLeft: 150,
              marginBottom: 2,
              marginTop: 25,
              width: 300,
              height: 116,
            }}
          >
            <Text>Détails ici</Text>
            <Text>Score: {this.score}</Text>
          </View>
        </Page>
      </Document>
    );
  };

  render() {
    console.log(JSON.parse(localStorage.getItem("choices")));
    const choices = JSON.parse(localStorage.getItem("choices"));
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: 10 }}>
          <div className="card">
            <div className="card-header text-center">
              <strong>Votre résultat</strong>
            </div>
            <div className="card-body text-center">
              <span>
                {" "}
                <strong>
                  Vous avez réussi à garder {this.score} étudiants dans votre
                  classe
                </strong>
              </span>
              <br />
              <hr />
              <div className="card col-md-8 offset-md-2">
                <div className="card-body">
                  On sait depuis longtemps que travailler avec du texte lisible
                  et contenant du sens est source de distractions, et empêche de
                  se concentrer sur la mise en page elle-même. L'avantage du
                  Lorem Ipsum sur un texte générique comme 'Du texte. Du texte.
                  Du texte.' est qu'il possède une distribution de lettres plus
                  ou moins normale, et en tout cas comparable avec celle du
                  français standard.
                </div>
              </div>
              <br />
              <div>Voici un résumé de vos choix</div> <br />
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Votre choix</th>
                    <th scope="col">Conseil</th>
                  </tr>
                </thead>
                <tbody>
                  {choices.map((choice) => (
                    <tr>
                      <th scope="row">{choice.question}</th>
                      <td>{choice.reponse}</td>
                      <td>
                        On sait depuis longtemps que travailler avec du texte
                        lisible et contenant du sens est source de distractions,
                        et empêche de se concentrer sur la mise en page
                        elle-même.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-11 offset-md-3 col-sm-12">
                  <span className="col-md-4 col-sm-12 col-xs-12">
                    <Link to={"/surveys"} className="btn btn-info">
                      Rejouer
                    </Link>
                  </span>

                  <span className="col-md-4 col-xs-12">
                    {" "}
                    <Link to={"/score"} className="btn btn-secondary">
                      Voir les scores
                    </Link>
                  </span>
                  <span className="col-md-4 col-xs-12">{this.pdfLink()}</span>
                </div>
              </div>
            </div>
            <div>
              {/* <PDFViewer>{this.MyDocument()}</PDFViewer> */}
              <div></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feedback;
