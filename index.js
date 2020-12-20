// import routes from "./router/api.mjs"

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const session = require("express-session")
const cookieParser = require("cookie-parser")

require("dotenv").config();

const app = express();

// morgan is a middleware that allows us to easily log requests, errors, and more to the console
app.use(morgan("common"));
// Helmet.js is a Node.js module that helps you secure HTTP headers returned by your Express apps.
app.use(helmet());
// It is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  origin: process.env.CORS_ORIGIN,
}));

  app.use(express.json());
  app.use(express.static(__dirname));
  app.use(methodOverride('_method'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  // in order to use passport its very important that first tell express tu use the session, initialize it and then use the passport session. 
  // after that, we requiere the passport configuration and connect with the database.
  app.use(session({
    secret: process.env.SECRET_SESSION,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 3600000 * 24 * 360 * 10
    }
  }));


  app.use(passport.initialize());
  app.use(passport.session());


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log("Mongoose is connected"); });
mongoose.set("useCreateIndex", true);
// const conn = mongoose.connection;

// // Init gfs
// let gfs;

require("./config/passportConfig")(passport);

const postRutes = require("./router/api.js");
app.use('/api', postRutes)


// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
