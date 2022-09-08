const express = require("express");
const router = express();

router.use(express.Router());
router.use(express.json());

// Home Page
router.get("/", (req, res) =>
  res.render("index", {
    title: "Traditional Games",
    name: req.query.user,
  })
);

module.exports = router;
