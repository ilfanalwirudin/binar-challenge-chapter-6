import express from "express";

import bodyParser from "body-parser";
import users from "../users.json" assert { type: "json" };

const router = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.Router());
router.use(express.json());

//render login page
router.get("/login", (req, res) => res.render("login"));

router.post("/login", (req, res) => {
  if (
    req.body.username == users[0].username &&
    req.body.password == users[0].password
  ) {
    res.status(300).redirect("/home");
  } else {
    res.status(400).end("Invalid Username or Password");
  }
});

export default router;
