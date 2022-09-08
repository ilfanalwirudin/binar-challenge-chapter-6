const express = require("express");
const router = express();

router.use(express.Router());
router.use(express.json());

// Home Page
router.get("/details", (req, res) =>
  res.render("details", {
    title: "Details Page",
  })
);

module.exports = router;
