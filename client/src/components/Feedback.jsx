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
    console.log(this.score);
    return (
      <React.Fragment>
        <div className="container">
          <div className="alert alert-info">
            Votre score:{" "}
            <strong>
              {parseInt(localStorage.getItem("totalPoints")) ? 22 + parseInt(localStorage.getItem("totalPoints")) : 0}
            </strong>
          </div>
          <div className="col-md-6 offset-md-3 jumbotron">
            Feedback Here
            <br />
            <div>
              {/* <PDFViewer>{this.MyDocument()}</PDFViewer> */}
              <div></div>
            </div>
          </div>
          <div className="col-md-6 offset-md-3">
            <span>
              <Link to={"/surveys"} className="btn btn-info">
                Rejouer
              </Link>
            </span>

            <span>
              {" "}
              <Link to={"/score"} className="btn btn-secondary">
                Voir les scores
              </Link>
            </span>
            <span>
              {" "}
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
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feedback;
