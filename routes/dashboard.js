const express = require("express");
const router = express.Router();
const models = require("../models");
const bcrypt = require("bcrypt");

// READ

router.get("/dashboard", async (req, res) => {
  const msg = req.query.msg;
  const user = await models.userGame.findAll();
  res.status(200).render("dashboard", {
    title: "Dashboard Page",
    user,
    msg: msg,
  });
});

// CREATE
router.post("/dashboard/add", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  userGame
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) =>
      !user
        ? userGame
            .create(userData)
            .then((userGame) => {
              userGame.create({
                userId: userGame.get("id"),
              });
              userGameHistory.create({
                userId: userGame.get("id"),
              });
              res.status(201).redirect("/dashboard?user=admin&msg=created");
            })
            .catch((err) => {
              res.status(422).send("Cannot create user:", err);
            })
        : res.redirect("/dashboard?user=admin&msg=exist")
    )
    .catch((err) => res.send("ERROR: " + err));
});

// UPDATE
router.post("/dashboard/edit/:id", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    username: username,
    password: hashedPassword,
  };

  const updateData = async (data) =>
    await userGame
      .update(data, { where: { id: req.params.id } })
      .then(() => {
        res.status(201).redirect("/dashboard?user=admin&msg=updated");
      })
      .catch((err) => res.status(422).send("Cannot update user: ", err));

  const findUsername = async (username) =>
    await userGame.findOne({
      where: {
        username: username,
      },
    });

  userGame
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((id) => {
      if (username != "" && password != "") {
        findUsername(username).then((dbUser) => {
          !dbUser
            ? updateData(userData)
            : res.redirect("/dashboard?user=admin&msg=error");
        });
      } else if (username != "" && password == "") {
        findUsername(username).then((dbUser) => {
          !dbUser
            ? updateData({ username: username })
            : res.redirect("/dashboard?user=admin&msg=error");
        });
      } else if (username == "" && password != "") {
        updateData({ password: hashedPassword });
      }
    })
    .catch((err) => res.send("ERROR: " + err));
});

// DELETE
router.post("/dashboard/delete/:id", (req, res) =>
  userGame
    .destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).redirect("/dashboard?user=admin&msg=deleted"))
    .catch(() => res.status(422).send("Cannot delete the games id"))
);

// HANDLE REDIRECTION READ if any access this page
router.get("/dashboard/*", (req, res) =>
  userGame
    .findAll()
    .then(() => res.status(200).redirect("/dashboard?user=admin"))
);

module.exports = router;
