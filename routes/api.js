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

// READ /user/:id
app.get("/users/:id", (req, res) =>
  userGame
    .findOne({ where: { id: req.params.id } })
    .then((user) =>
      user ? res.status(200).json(user) : res.status(200).send("ID not found")
    )
);

// Update /user/:id
app.put("/users/edit/:id", (req, res) =>
  userGame
    .update(
      {
        username: req.body.username,
        password: req.body.password,
      },
      { where: { id: req.params.id } }
    )
    .then((user) => res.status(201).json("User updated !"))
    .catch(() => res.status(422).send("Cannot update the user"))
);

// Delete /user/:id
app.delete("/users/delete/:id", (req, res) =>
  userGame
    .destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      })
    )
    .catch(() => res.status(422).send("Cannot delete the user id"))
);

// READ /user/biodata
app.get("/biodata", (req, res) =>
  userBiodata
    .findAll({
      include: [
        {
          model: userGame,
        },
      ],
    })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/biodata
app.get("/biodata", (req, res) =>
  userBiodata
    .findAll({
      include: [
        {
          model: userGame,
        },
      ],
    })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/biodata/:id
app.get("/biodata/:id", (req, res) =>
  userBiodata
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: userGame,
        },
      ],
    })
    .then((user) =>
      user ? res.status(200).json(user) : res.status(200).send("ID not found")
    )
);

// READ /user/history
app.get("/history", (req, res) =>
  userGameHistory
    .findAll({
      include: [
        {
          model: userGame,
        },
      ],
    })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/history/:id
app.get("/history/:id", (req, res) =>
  userGameHistory
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: userGame,
        },
      ],
    })
    .then((user) =>
      user ? res.status(200).json(user) : res.status(200).send("ID not found")
    )
);

module.exports = app;
