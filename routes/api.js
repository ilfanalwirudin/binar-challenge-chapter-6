const express = require("express");
const app = express();

const { userGame, userBiodata, userGameHistory } = require("../models");

app.use(express.Router());
app.use(express.json());

// Create /user
app.post("/users", (req, res) =>
  userGame
    .create({
      username: req.body.username,
      password: req.body.password,
    })
    .then((user) => res.status(2001).json(user))
    .catch(() => res.status(422).send("Cannot create user"))
);

//Read /user
app.get("/users", (req, res) =>
  userGame
    .findAll()
    .then((user) =>
      user.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(user)
    )
);

module.exports = app;
