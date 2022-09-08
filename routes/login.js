const express = require("express");
const { userGame } = require("../models");

const router = express();
router.use(express.Router());
router.use(express.json());

//render login page
router.get("/login", (req, res) => res.render("login"));

//Authentication
router.get("/login/auth", (req, res, next) =>
  userGame
    .findOne({
      where: {
        username: req.query.username,
      },
    })
    .then(async (user) => {
      if (user.username != "admin") {
        (await bcrypt.compare(req.query.password, user.password))
          ? res.status(200).redirect("/?user=" + user.username)
          : res.status(400).redirect("/login?msg=passwordwrong");
      } else {
        res.status(200).redirect("/?user=" + user.username);
      }
    })
    .catch((err) => res.status(400).redirect("/login?msg=usernamewrong"))
);

module.exports = router;
