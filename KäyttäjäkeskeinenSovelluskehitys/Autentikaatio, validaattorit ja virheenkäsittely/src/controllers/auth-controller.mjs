import jwt from "jsonwebtoken";
import "dotenv/config";
import { login } from "../models/user-model.mjs";

const postLogin = async (req, res) => {
  // TODO: use model to query sql for user info (username/pw)
  const user = await login(req.body);
  console.log("postLogin", user);
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "logged in", token, user });
  } catch (error) {
    res.status(401).json({ message: "invalid username/password" });
  }
};

const getMe = async (req, res) => {
  console.log("getMe", req.user);
  if (req.user) {
    res.json({ message: "token ok", user: req.user });
  } else {
    res.sendStatus(401);
  }
};

export { postLogin, getMe };
