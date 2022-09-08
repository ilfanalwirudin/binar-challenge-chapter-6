const express = require("express");
const router = express.Router();
const { userGame, userGameHistory, userBiodata } = require("../models");
const bcrypt = require("bcrypt");

// READ

router.get("/dashboard", async (req, res) => {
  const msg = req.query.msg;
  const user = await userGame.findAll();
  res.status(200).render("dashboard", {
    title: "Dashboard Page",
    user,
    msg: msg,
  });
});

// CREATE

// router.post("/dashboard/add", async (req, res) => {
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   const { username } = req.body;
//   try {
//     await userGame.create({
//       username: username,
//       password: hashedPassword,
//     });

//     res.status(300);
//     res.redirect("/dashboard");
//   } catch (error) {
//     const msg = "username has been created";
//     res.status(500);
//     res.render("../views/dashboard", {
//       title: "Dashboard Page",
//       msg: msg,
//     });
//   }
// });

// Create user

// router.post("/dashboard/add", async (req, res) => {
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   const { username } = req.body;
//   try {
//     await userGame.create({
//       username: username,
//       password: hashedPassword,
//     });
//     res.redirect("/dashboard");
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

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
            .then(() => {
              res.status(201).redirect("/dashboard");
            })
            .catch((err) => {
              res.status(422).send("Cannot create user");
            })
        : res.redirect("/dashboard")
    )
    .catch((err) => res.send(err));
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
        res.status(201).redirect("/dashboard");
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
          !dbUser ? updateData(userData) : res.redirect("/dashboard");
        });
      } else if (username != "" && password == "") {
        findUsername(username).then((dbUser) => {
          !dbUser
            ? updateData({ username: username })
            : res.redirect("/dashboard&msg=error");
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
    .then(() => res.status(201).redirect("/dashboard"))
    .catch(() => res.status(422).send("Cannot delete the games id"))
);

// HANDLE REDIRECTION READ if any access this page
router.get("/dashboard/*", (req, res) =>
  userGame.findAll().then(() => res.status(200).redirect("/dashboard"))
);

module.exports = router;
