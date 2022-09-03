//Import Modules
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api.js";
import loginRouter from "./routes/login.js";
import gameRouter from "./routes/game.js";
import indexRouter from "./routes/index.js";

//Define Variables
const app = express();
const PORT = process.env.PORT || 5001;
app.set("view engine", "ejs");

// use static module
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexRouter);
app.use(gameRouter);
app.use(loginRouter);
app.use(apiRouter);

//use logger middleware
app.use(morgan("tiny"));

//Create error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Port listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
