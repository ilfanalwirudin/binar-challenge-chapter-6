import express from "express";

const router = express.Router();

router.get("/game", (req, res, next) => {
  const name = req.query.name || "Player";
  console.log(name);
  res.render("game");
});

export default router;
