import express from "express";
import users from "../users.json" assert { type: "json" };
import bcrypt from "bcrypt";

const app = express();

app.use(express.Router());
app.use(express.json());

// Get /user

app.get("/user", async (req, res) => {
  res.status(200).json(users);
});

//post with bycrypt
app.post("/user", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { username: req.body.username, password: hashedPassword };
    user.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/user/login", async (req, res) => {
  const user = user.find((user) => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, username.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

export default app;
