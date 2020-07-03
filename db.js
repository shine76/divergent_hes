require("dotenv").config();
const mongoose = require("mongoose");

// DB connection
const authDataAndOptions = {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  //autoReconnect: true,
  //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  //reconnectInterval: 500, // Reconnect every 500ms,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
};

mongoose.promise = global.Promise;
mongoose
  .connect(process.env.mongoURI, authDataAndOptions)
  .then(() => {
    console.log("Mongo Db connected to " + process.env.mongoURI);
  })
  .catch((err) => console.log(err));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
