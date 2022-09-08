//const Modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

//const router
const apiRouter = require("./routes/api.js");
const loginRouter = require("./routes/login.js");
const gameRouter = require("./routes/game.js");
const indexRouter = require("./routes/index.js");
const dashboardRouter = require("./routes/dashboard");
// const registerRouter = require("./routes/register")

//Define Variables
const app = express();
const PORT = process.env.PORT || 5000;
app.set("view engine", "ejs");

// use static module
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//load router
app.use(indexRouter);
app.use(gameRouter);
app.use(loginRouter);
app.use(apiRouter);
app.use(dashboardRouter);
// app.use(registerRouter);

//use logger middleware
app.use(morgan("tiny"));

//Create error 404
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Port listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
