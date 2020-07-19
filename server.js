const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
require("dotenv").config();
const axios = require("axios");
const passport = require("passport");

require("./db");

// MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public")); //Serves resources from public folder

// Connect routing
const apiRouter = require("./routes/index");
app.use("/api", apiRouter);

// passport initialisation
app.use(passport.initialize());
require("./config/passport")(passport);

// ##### FOR DEPLOYEMENT ####

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js or css
  app.use(express.static("client/build"));

  // Express will serve index.html if he does not recognize a route
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Create server here
const port = process.env.PORT || 5000;

const server = http.createServer(app).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
