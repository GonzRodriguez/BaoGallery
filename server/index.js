// import routes from "./router/api.mjs"
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require('path')
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.static("assets"));
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "..", "client/build")));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
  });
}
// morgan is a middleware that allows us to easily log requests, errors, and more to the console
app.use(morgan("common"));
// Helmet.js helps to secure HTTP headers returned by your Express apps.
app.use(helmet());
// It is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated
app.use(cors({
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  credentials: true,
  origin: process.env.CORS_ORIGIN,
}));

  app.use(express.json({ limit: "50mb" }));

  app.use(methodOverride('_method'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true }));
  app.use(cookieParser());
  // in order to use passport its very important that first tell express tu use the session, initialize it and then use the passport session. 
  // after that, we requiere the passport configuration and connect with the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, () => { console.log("Mongoose is connected"); });
mongoose.set("useCreateIndex", true);


const postRutes = require("./router/api.js");
app.use('/api', postRutes)
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
// app.get("/", (req, res) => {
//   // res.sendFile({hello: "world"});
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
