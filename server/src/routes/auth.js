import Joi from "joi";
import _ from "lodash";
import bcrypt from "bcrypt";
import express from "express";
import { User, validateUser } from "../models/user.js";
import { sendMail, checkTransporter } from "../utils/mailService.js";

const router = express.Router();
const { pick } = _;
const privateKey = process.env.PRIVATE_KEY;
const tokenLife = process.env.TOKEN_LIFE || 3200;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY || 7200;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || 7200;

const validateRequestBody = (user) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
};

router.post("/login", async (req, res) => {
  const { error } = validateRequestBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Identifiant invalide.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    // count connection attempt if wrong credentials
    // user.connexionAttempts += 1;
    // await user.save();
    return res.status(400).send("Mot de passe invalide.");
  }

  const jwt = user.generateAuthToken(privateKey, tokenLife);
  // const refreshToken = user.generateAuthToken(refreshTokenKey, refreshTokenLife);
  // user.refreshToken = refreshToken;
  // reset connection attempt if correct credentials
  // user.connexionAttempts = 1;
  // await user.save();

  //   await user.generateHistorique("connexion", "User");
  res.status(200).json({ jwt });
});

router.post("/logout", async (req, res) => {
  const user = await User.findById(req.body.idUser);
  if (!user) return res.status(400).send("Utilisateur non valide.");

  //   user.generateHistorique("deconnexion", "User");
  res.status(200).json(pick(user, ["firstname", "lastname", "role"]));
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already used.");

  const newUser = new User(
    pick(req.body, [
      "firstname",
      "lastname",
      "sexe",
      "roles",
      "email",
      "password",
    ])
  );
  await newUser.save();

  res
    .status(200)
    .json(pick(newUser, ["_id", "firstname", "lastname", "roles", "sexe"]));
});

router.get("/mail", async (req, res) => {
  const message = {
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
  };

  checkTransporter()
  sendMail(message)

  res.status(200).send("SENT");
});

export default router;
