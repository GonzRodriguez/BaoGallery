const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session")

require("dotenv").config();

const app = express();

app.enable("trust proxy");
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
  methods: ['GET', 'POST'],
  credentials: true,
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
require("./config/passportConfig")(passport);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, }, () => { console.log("Mongoose is connected"); });
mongoose.set("useCreateIndex", true);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});
 
const testAPI = require("./api/testAPI");
const SingUp = require("./api/signup");
const LogIn = require("./api/login");
const Logout = require("./api/logout");
const dashboard = require("./api/dashboard");
const isAuth = require("./api/isAuth");
app.use('/api/isAuth', isAuth);
app.use('/api/testAPI', testAPI);
app.use('/api/dashboard', dashboard);
app.use('/api/signup', SingUp);
app.use('/api/login', LogIn);
app.use('/api/logout', Logout);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
