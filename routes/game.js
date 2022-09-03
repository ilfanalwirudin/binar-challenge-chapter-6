const express = require("express");

const router = express.Router();

router.get("/game", (req, res, next) => {
  const name = req.query.name || "Player";
  console.log(name);
  res.render("game");
});

module.exports = router;
