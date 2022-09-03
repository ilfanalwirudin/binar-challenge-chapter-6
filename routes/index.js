import express from "express";
const router = express();

router.use(express.Router());
router.use(express.json());

router.get("/home", (req, res) => {
  const name = req.query.name;
  console.log(name);
  res.render("index");
});

router.post("/home", (req, res) => {
  const user = req.query;
  console.log(user);

  res.render("index");
});

export default router;
